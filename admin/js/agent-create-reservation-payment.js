/**
 * Agent Create Reservation - Step 2: Payment
 * 예약 생성 2단계 - 결제 정보 입력
 */

// 전역 변수
let currentBookingId = null;
let currentBookingData = null;
let selectedPaymentType = 'staged';
let downPaymentFile = null;
let fullPaymentFile = null;

// 페이지 초기화
document.addEventListener('DOMContentLoaded', async function() {
    // URL에서 bookingId 파싱
    const urlParams = new URLSearchParams(window.location.search);
    currentBookingId = urlParams.get('bookingId');

    if (!currentBookingId) {
        alert('Booking ID is missing. Redirecting to reservation creation page.');
        window.location.href = 'create-reservation.html';
        return;
    }

    // 예약 정보 로드
    await loadReservationDetail(currentBookingId);

    // UI 초기화
    initializePaymentUI();
    initializeFileUpload();

    // 이벤트 핸들러 등록
    document.getElementById('saveBtn').addEventListener('click', handleSave);
    document.getElementById('backBtn').addEventListener('click', handleBack);
});

/**
 * 예약 상세 정보 로드
 */
async function loadReservationDetail(bookingId) {
    try {
        const response = await fetch('../backend/api/agent-api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin',
            body: JSON.stringify({
                action: 'getReservationDetail',
                bookingId: bookingId
            })
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to load reservation');
        }

        // API 응답: result.data.booking에 예약 정보가 있음
        currentBookingData = result.data.booking || result.data;

        // travelers와 selectedOptions도 currentBookingData에 병합
        if (result.data.travelers) {
            currentBookingData.travelers = result.data.travelers;
        }
        if (result.data.selectedOptions) {
            currentBookingData.selectedOptions = result.data.selectedOptions;
        }

        displayReservationSummary(currentBookingData);
        displayPaymentInfo(currentBookingData);

    } catch (error) {
        console.error('Error loading reservation:', error);
        alert('Failed to load reservation: ' + error.message);
        window.location.href = 'reservation-list.html';
    }
}

/**
 * 예약 요약 정보 표시
 */
function displayReservationSummary(data) {
    // 예약번호
    const bookingIdEl = document.getElementById('summary_booking_id');
    if (bookingIdEl) bookingIdEl.textContent = data.bookingId || '-';

    // 상품명
    const packageNameEl = document.getElementById('summary_package_name');
    if (packageNameEl) packageNameEl.textContent = data.packageName || '-';

    // 여행기간
    const tripRangeEl = document.getElementById('summary_trip_range');
    if (tripRangeEl) {
        const startDate = data.departureDate || '';
        const endDate = data.returnDate || '';
        if (startDate && endDate) {
            tripRangeEl.textContent = `${formatDisplayDate(startDate)} ~ ${formatDisplayDate(endDate)}`;
        } else if (startDate) {
            tripRangeEl.textContent = formatDisplayDate(startDate);
        } else {
            tripRangeEl.textContent = '-';
        }
    }

    // 인원
    const travelersEl = document.getElementById('summary_travelers');
    if (travelersEl) {
        const adults = parseInt(data.adults) || 0;
        const children = parseInt(data.children) || 0;
        const infants = parseInt(data.infants) || 0;
        const parts = [];
        if (adults > 0) parts.push(`Adult ${adults}`);
        if (children > 0) parts.push(`Child ${children}`);
        if (infants > 0) parts.push(`Infant ${infants}`);
        travelersEl.textContent = parts.length > 0 ? parts.join(', ') : '-';
    }

    // 총 금액
    const totalAmountEl = document.getElementById('summary_total_amount');
    if (totalAmountEl) {
        const totalAmount = parseFloat(data.totalAmount) || 0;
        totalAmountEl.textContent = `PHP ${formatCurrency(totalAmount)}`;
    }

    // 금액 상세 breakdown 표시
    displayAmountBreakdown(data);
}

/**
 * 금액 상세 breakdown 표시
 */
function displayAmountBreakdown(data) {
    const breakdownSection = document.getElementById('amount-breakdown-section');
    const breakdownList = document.getElementById('amount-breakdown-list');

    if (!breakdownSection || !breakdownList) return;

    // selectedOptions 파싱
    let selectedOptions = {};
    if (data.selectedOptions) {
        try {
            selectedOptions = typeof data.selectedOptions === 'string'
                ? JSON.parse(data.selectedOptions)
                : data.selectedOptions;
        } catch (e) {
            console.error('Failed to parse selectedOptions:', e);
        }
    }

    const breakdownItems = [];
    let calculatedTotal = 0;

    // travelers 파싱 (공통으로 사용)
    let travelersArr = [];
    if (data.travelers) {
        try {
            travelersArr = typeof data.travelers === 'string'
                ? JSON.parse(data.travelers)
                : (Array.isArray(data.travelers) ? data.travelers : []);
        } catch (e) {
            travelersArr = [];
        }
    }

    // 2. Room Options 계산
    const selectedRooms = selectedOptions.selectedRooms || [];
    let roomTotal = 0;
    selectedRooms.forEach(room => {
        const price = parseFloat(room.roomPrice || room.price || 0);
        const count = parseInt(room.count || 1);
        roomTotal += price * count;
    });

    // 3. Visa Amount 계산
    let visaTotal = 0;
    travelersArr.forEach(t => {
        const visaType = (t.visaType || t.visa_type || 'with_visa').toLowerCase();
        if (visaType === 'group') {
            visaTotal += 1500;
        } else if (visaType === 'individual') {
            visaTotal += 1900;
        }
    });

    // 4. Flight Options 계산
    let flightOptionsTotal = 0;
    travelersArr.forEach(t => {
        if (t.flightOptionPrices && typeof t.flightOptionPrices === 'object') {
            Object.values(t.flightOptionPrices).forEach(price => {
                flightOptionsTotal += parseFloat(price) || 0;
            });
        }
    });

    // 1. Base Amount (totalAmount에서 추가 금액을 뺀 값)
    const totalAmount = parseFloat(data.totalAmount) || 0;
    const additionalAmount = roomTotal + visaTotal + flightOptionsTotal;
    const baseAmount = totalAmount - additionalAmount;

    // Package Price 추가 (항상 표시)
    if (baseAmount > 0) {
        breakdownItems.push({ label: 'Package Price', value: baseAmount });
        calculatedTotal += baseAmount;
    }

    // Room Options 추가
    if (roomTotal > 0) {
        breakdownItems.push({ label: 'Room Options', value: roomTotal });
        calculatedTotal += roomTotal;
    }

    // Visa Fee 추가
    if (visaTotal > 0) {
        breakdownItems.push({ label: 'Visa Fee', value: visaTotal });
        calculatedTotal += visaTotal;
    }

    // Flight Options 추가
    if (flightOptionsTotal > 0) {
        breakdownItems.push({ label: 'Flight Options', value: flightOptionsTotal });
        calculatedTotal += flightOptionsTotal;
    }

    // Breakdown이 있으면 표시
    if (breakdownItems.length > 0) {
        let html = '';
        breakdownItems.forEach(item => {
            html += `
                <div class="breakdown-item">
                    <span class="breakdown-item-label">${item.label}</span>
                    <span class="breakdown-item-value">₱${formatCurrency(item.value)}</span>
                </div>
            `;
        });

        // Total
        const displayTotal = parseFloat(data.totalAmount) || calculatedTotal;
        html += `
            <div class="breakdown-item total">
                <span class="breakdown-item-label">Total Amount</span>
                <span class="breakdown-item-value">₱${formatCurrency(displayTotal)}</span>
            </div>
        `;

        breakdownList.innerHTML = html;
        breakdownSection.style.display = 'block';
    } else {
        breakdownSection.style.display = 'none';
    }
}

/**
 * 결제 정보 표시
 */
function displayPaymentInfo(data) {
    const totalAmount = parseFloat(data.totalAmount) || 0;

    // 인원수 계산 (adults + children, infants 제외)
    const adults = parseInt(data.adults) || 0;
    const children = parseInt(data.children) || 0;
    const travelerCount = adults + children;

    // Order Amount 표시
    const payTotalEl = document.getElementById('pay_total');
    const fullPayTotalEl = document.getElementById('full_pay_total');
    if (payTotalEl) payTotalEl.value = formatCurrency(totalAmount);
    if (fullPayTotalEl) fullPayTotalEl.value = formatCurrency(totalAmount);

    // 기존 결제 타입 설정
    const existingPaymentType = data.paymentType || 'staged';
    switchPaymentType(existingPaymentType);

    // Staged Payment 금액 계산 (인원수 전달)
    calculatePaymentAmounts(totalAmount, travelerCount);

    // Full Payment 금액
    const fullPaymentAmountEl = document.getElementById('full_payment_amount');
    if (fullPaymentAmountEl) fullPaymentAmountEl.value = formatCurrency(totalAmount);

    // 데드라인 계산
    calculatePaymentDeadlines(data.departureDate);
}

/**
 * Payment 금액 계산
 */
function calculatePaymentAmounts(totalAmount, travelerCount) {
    // Down Payment: 5,000 PHP × 인원수
    const downPayment = 5000 * travelerCount;
    const downPaymentEl = document.getElementById('down_payment_amount');
    if (downPaymentEl) downPaymentEl.value = formatCurrency(downPayment);

    // Second Payment: 10,000 PHP × 인원수
    const secondPayment = 10000 * travelerCount;
    const secondPaymentEl = document.getElementById('second_payment_amount');
    if (secondPaymentEl) secondPaymentEl.value = formatCurrency(secondPayment);

    // Balance: 나머지 금액
    const balance = totalAmount - downPayment - secondPayment;
    const balanceEl = document.getElementById('balance_amount');
    if (balanceEl) balanceEl.value = formatCurrency(balance);
}

/**
 * 결제 데드라인 계산
 */
function calculatePaymentDeadlines(departureDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Down Payment Deadline: 3일 이내
    const downPaymentDeadline = new Date(today);
    downPaymentDeadline.setDate(downPaymentDeadline.getDate() + 3);
    const downPaymentDeadlineEl = document.getElementById('down_payment_deadline_display');
    if (downPaymentDeadlineEl) {
        downPaymentDeadlineEl.textContent = `By ${formatDisplayDate(downPaymentDeadline.toISOString().split('T')[0])}`;
    }

    // Full Payment Deadline: 3일 이내
    const fullPaymentDeadlineEl = document.getElementById('full_payment_deadline_display');
    if (fullPaymentDeadlineEl) {
        fullPaymentDeadlineEl.textContent = `By ${formatDisplayDate(downPaymentDeadline.toISOString().split('T')[0])}`;
    }
}

/**
 * 결제 UI 초기화
 */
function initializePaymentUI() {
    // 탭 버튼에 이벤트 연결
    document.querySelectorAll('.payment-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.dataset.paymentType;
            if (type) switchPaymentType(type);
        });
    });
}

/**
 * 파일 업로드 초기화
 */
function initializeFileUpload() {
    // Down Payment 파일 업로드
    const downPaymentFileInput = document.getElementById('down_payment_file_input');
    const downPaymentFileBtn = document.getElementById('down_payment_file_btn');
    const downPaymentFileInfo = document.getElementById('down_payment_file_info');
    const downPaymentFileName = document.getElementById('down_payment_file_name');
    const downPaymentFileRemove = document.getElementById('down_payment_file_remove');

    if (downPaymentFileBtn && downPaymentFileInput) {
        downPaymentFileBtn.addEventListener('click', () => downPaymentFileInput.click());
        downPaymentFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                downPaymentFile = e.target.files[0];
                if (downPaymentFileName) downPaymentFileName.textContent = downPaymentFile.name;
                if (downPaymentFileInfo) downPaymentFileInfo.style.display = 'block';
            }
        });
    }
    if (downPaymentFileRemove) {
        downPaymentFileRemove.addEventListener('click', () => {
            downPaymentFile = null;
            if (downPaymentFileInput) downPaymentFileInput.value = '';
            if (downPaymentFileInfo) downPaymentFileInfo.style.display = 'none';
        });
    }

    // Full Payment 파일 업로드
    const fullPaymentFileInput = document.getElementById('full_payment_file_input');
    const fullPaymentFileBtn = document.getElementById('full_payment_file_btn');
    const fullPaymentFileInfo = document.getElementById('full_payment_file_info');
    const fullPaymentFileName = document.getElementById('full_payment_file_name');
    const fullPaymentFileRemove = document.getElementById('full_payment_file_remove');

    if (fullPaymentFileBtn && fullPaymentFileInput) {
        fullPaymentFileBtn.addEventListener('click', () => fullPaymentFileInput.click());
        fullPaymentFileInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                fullPaymentFile = e.target.files[0];
                if (fullPaymentFileName) fullPaymentFileName.textContent = fullPaymentFile.name;
                if (fullPaymentFileInfo) fullPaymentFileInfo.style.display = 'block';
            }
        });
    }
    if (fullPaymentFileRemove) {
        fullPaymentFileRemove.addEventListener('click', () => {
            fullPaymentFile = null;
            if (fullPaymentFileInput) fullPaymentFileInput.value = '';
            if (fullPaymentFileInfo) fullPaymentFileInfo.style.display = 'none';
        });
    }
}

/**
 * 결제 유형 탭 전환
 */
function switchPaymentType(paymentType) {
    selectedPaymentType = paymentType;

    // Update hidden field
    const paymentTypeInput = document.getElementById('payment_type');
    if (paymentTypeInput) paymentTypeInput.value = paymentType;

    // Update tab button states
    document.querySelectorAll('.payment-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-payment-type="${paymentType}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Show/hide content sections
    const stagedContent = document.getElementById('staged_payment_content');
    const fullContent = document.getElementById('full_payment_content');

    if (stagedContent) stagedContent.style.display = paymentType === 'staged' ? 'block' : 'none';
    if (fullContent) fullContent.style.display = paymentType === 'full' ? 'block' : 'none';
}

/**
 * 저장 핸들러
 */
async function handleSave() {
    try {
        const saveBtn = document.getElementById('saveBtn');
        saveBtn.disabled = true;
        saveBtn.textContent = 'Saving...';

        // 결제 데이터 수집
        const today = new Date();
        const downPaymentDueDate = new Date(today);
        downPaymentDueDate.setDate(downPaymentDueDate.getDate() + 3);
        const downPaymentDueDateStr = downPaymentDueDate.toISOString().split('T')[0];

        const totalAmount = parseFloat(currentBookingData?.totalAmount) || 0;
        const adults = parseInt(currentBookingData?.adults) || 0;
        const children = parseInt(currentBookingData?.children) || 0;
        const travelerCount = adults + children;

        const downPaymentAmount = 5000 * travelerCount;
        const secondPaymentAmount = 10000 * travelerCount;
        const balanceAmount = totalAmount - downPaymentAmount - secondPaymentAmount;

        const paymentData = {
            action: 'updatePaymentInfo',
            bookingId: currentBookingId,
            paymentType: selectedPaymentType,
            downPaymentAmount: downPaymentAmount,
            downPaymentDueDate: downPaymentDueDateStr,
            advancePaymentAmount: secondPaymentAmount,
            advancePaymentDueDate: null,
            balanceAmount: balanceAmount,
            balanceDueDate: null,
            fullPaymentAmount: totalAmount,
            fullPaymentDueDate: downPaymentDueDateStr
        };

        // FormData 구성 (파일 포함)
        const formData = new FormData();
        formData.append('action', 'updatePaymentInfo');
        formData.append('data', JSON.stringify(paymentData));

        // 파일 첨부
        if (selectedPaymentType === 'staged' && downPaymentFile) {
            formData.append('downPaymentFile', downPaymentFile);
        }
        if (selectedPaymentType === 'full' && fullPaymentFile) {
            formData.append('fullPaymentFile', fullPaymentFile);
        }

        // API 호출
        const response = await fetch('../backend/api/agent-api.php', {
            method: 'POST',
            credentials: 'same-origin',
            body: formData
        });

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to update payment info');
        }

        // 성공
        alert('Reservation completed successfully!');
        window.location.href = `reservation-detail.html?id=${currentBookingId}`;

    } catch (error) {
        console.error('Error saving payment info:', error);
        alert('Error: ' + error.message);
    } finally {
        const saveBtn = document.getElementById('saveBtn');
        saveBtn.disabled = false;
        saveBtn.textContent = 'Complete Reservation';
    }
}

/**
 * 뒤로가기 핸들러
 */
function handleBack() {
    if (confirm('Are you sure you want to go back? Payment information will not be saved.')) {
        // bookingId를 전달하여 예약 정보를 유지
        window.location.href = `create-reservation.html?bookingId=${currentBookingId}`;
    }
}

// ============ 유틸리티 함수 ============

/**
 * 통화 포맷
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US').format(Math.round(amount || 0));
}

/**
 * 날짜 표시 포맷
 */
function formatDisplayDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// 전역에서 접근 가능하도록 노출
window.switchPaymentType = switchPaymentType;
