/**
 * Agent Admin - Reservation List Page JavaScript
 */

let currentPage = 1;
let currentFilters = {
    search: '',
    // UI 라벨은 "Travel start date" 이므로 departureDate 필터로 동작해야 함
    travelStartDate: '',
    reservationStatus: '',
    paymentStatus: '',
    searchType: '',
    sortOrder: 'latest',
    travelStartDateSort: '' // '' = 정렬 없음, 'asc' = 오름차순, 'desc' = 내림차순
};

document.addEventListener('DOMContentLoaded', async function() {
    // 세션 확인
    try {
        const sessionResponse = await fetch('../backend/api/check-session.php', {
            credentials: 'same-origin'
        });
        const sessionData = await sessionResponse.json();
        
        if (!sessionData.authenticated || sessionData.userType !== 'agent') {
            window.location.href = '../index.html';
            return;
        }
        
        initializeReservationList();
    } catch (error) {
        console.error('Session check error:', error);
        window.location.href = '../index.html';
        return;
    }
});

// 요구사항(3): 검색 기준 셀렉트 옵션은 'All, Product Name, Reservation Name'만 존재해야 함
function ensureSearchTypeOptions() {
    const sel = document.getElementById('searchType') || document.querySelector('select[name="searchType"]');
    if (!sel) return;

    const cur = String(sel.value || '');

    // Hard reset options to avoid duplicate/incorrect labels from legacy/cached markup
    sel.innerHTML = '';
    const opts = [
        { value: '', text: 'All', eng: 'All' },
        { value: 'product', text: 'Product Name', eng: 'Product Name' },
        { value: 'customer', text: 'Reservation Name', eng: 'Reservation Name' },
    ];
    for (const o of opts) {
        const opt = document.createElement('option');
        opt.value = o.value;
        opt.textContent = o.text;
        opt.setAttribute('data-lan-eng', o.eng);
        sel.appendChild(opt);
    }
    // restore if still valid
    sel.value = (cur === 'product' || cur === 'customer') ? cur : '';

    // refresh custom jw_select UI
    try { if (typeof window.refreshAllJwSelect === 'function') window.refreshAllJwSelect(); } catch (_) {}
}

function initializeReservationList() {
    ensureSearchTypeOptions();

    // 검색 폼 이벤트 리스너
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            currentPage = 1;
            // 검색 타입/키워드 동기화
            const st = document.querySelector('select[name="searchType"]');
            const si = document.querySelector('.search-input');
            currentFilters.searchType = st ? (st.value || '') : '';
            currentFilters.search = si ? (si.value || '') : '';
            loadReservations();
        });
    }
    
    // 날짜 필터 변경 감지 (퍼블리싱 원본: #travelStartDate, 기존: #reservationDate)
    const reservationDateInput = document.getElementById('travelStartDate') || document.getElementById('reservationDate');
    if (reservationDateInput) {
        // daterangepicker 초기화 - 날짜 범위 선택 모드
        $(reservationDateInput).daterangepicker({
            autoUpdateInput: false,
            locale: {
                format: 'YYYY-MM-DD',
                separator: ' ~ ',
                applyLabel: 'Apply',
                cancelLabel: 'Clear',
                daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                firstDay: 0
            }
        });

        // daterangepicker의 apply 이벤트 감지 - 날짜 범위
        $(reservationDateInput).on('apply.daterangepicker', function(ev, picker) {
            const startDate = picker.startDate.format('YYYY-MM-DD');
            const endDate = picker.endDate.format('YYYY-MM-DD');
            reservationDateInput.value = startDate + ' ~ ' + endDate;
            // travelStartDate(출발일) 범위 필터로 저장 (쉼표 구분)
            currentFilters.travelStartDate = startDate + ',' + endDate;
            currentPage = 1;
            loadReservations();
        });

        // 취소(Clear) 시 필터 초기화
        $(reservationDateInput).on('cancel.daterangepicker', function() {
            reservationDateInput.value = '';
            currentFilters.travelStartDate = '';
            currentPage = 1;
            loadReservations();
        });
    }
    
    // 예약 상태 필터 변경 감지
    const reservationStatusSelect = document.getElementById('reservationStatus');
    if (reservationStatusSelect) {
        reservationStatusSelect.addEventListener('change', function() {
            currentFilters.reservationStatus = this.value;
            currentPage = 1;
            loadReservations();
        });
    }
    
    // 결제 상태 필터 변경 감지
    const paymentStatusSelect = document.getElementById('paymentStatus');
    if (paymentStatusSelect) {
        paymentStatusSelect.addEventListener('change', function() {
            currentFilters.paymentStatus = this.value;
            currentPage = 1;
            loadReservations();
        });
    }
    
    // 정렬 필터 변경 감지
    const sortOrderSelect = document.getElementById('sortOrder');
    if (sortOrderSelect) {
        sortOrderSelect.addEventListener('change', function() {
            currentFilters.sortOrder = this.value;
            currentPage = 1;
            loadReservations();
        });
    }
    
    // 검색 입력 필드 실시간 감지 (debounce)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentFilters.search = this.value;
                const st = document.querySelector('select[name="searchType"]');
                currentFilters.searchType = st ? (st.value || '') : '';
                currentPage = 1;
                loadReservations();
            }, 500);
        });
    }

    // 검색 타입 변경 시 즉시 반영
    const searchTypeSelect = document.querySelector('select[name="searchType"]');
    if (searchTypeSelect) {
        searchTypeSelect.addEventListener('change', function () {
            currentFilters.searchType = this.value || '';
            currentPage = 1;
            loadReservations();
        });
    }
    
    // 초기 로드
    loadReservations();
}

async function loadReservations() {
    try {
        showLoading();
        
        const params = new URLSearchParams({
            action: 'getReservations',
            page: currentPage,
            limit: 20,
            ...currentFilters
        });
        
        const response = await fetch(`../backend/api/agent-api.php?${params.toString()}`, { credentials: 'same-origin' });
        const result = await response.json();
        
        if (result.success) {
            renderReservations(result.data.reservations);
            renderPagination(result.data.pagination);
            updateResultCount(result.data.pagination.total);
        } else {
            console.error('Failed to load reservations:', result.message);
            showError(t({
                ko: '예약 목록을 불러오는데 실패했습니다.',
                eng: 'Failed to load reservation list.',
                tl: 'Failed to load reservation list.'
            }));
        }
    } catch (error) {
        console.error('Error loading reservations:', error);
        showError(t({
            ko: '예약 목록을 불러오는 중 오류가 발생했습니다.',
            eng: 'An error occurred while loading reservations.',
            tl: 'An error occurred while loading reservations.'
        }));
    } finally {
        hideLoading();
    }
}

function getCurrentLang() {
    try {
        if (typeof getCookie === 'function') {
            return getCookie('lang') || 'eng';
        }
    } catch (_) {}
    return 'eng';
}

function t(map) {
    const lang = getCurrentLang();
    return map[lang] || map.eng || map.tl || map.ko || '';
}

function renderReservations(reservations) {
    const tbody = document.getElementById('reservations-tbody');
    if (!tbody) return;
    
    if (reservations.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="is-center">${escapeHtml(t({
            ko: '예약 내역이 없습니다.',
            eng: 'No reservations found.',
            tl: 'No reservations found.'
        }))}</td></tr>`;
        return;
    }
    
    tbody.innerHTML = reservations.map(item => {
        // 새로운 11단계 상태값 지원
        const normalizeStatus = (s, bookingStatus, paymentStatus) => {
            const bs = String(bookingStatus || s || '').toLowerCase().trim();

            // 새로운 11단계 상태값 매핑
            const statusLabels = {
                'waiting_down_payment': 'Waiting for Down Payment',
                'checking_down_payment': 'Checking Down Payment',
                'waiting_second_payment': 'Waiting for Second Payment',
                'checking_second_payment': 'Checking Second Payment',
                'waiting_balance': 'Waiting for Balance',
                'checking_balance': 'Checking Balance',
                'rejected': 'Payment Rejected',
                'confirmed': 'Reservation Confirmed',
                'completed': 'Trip Completed',
                'cancelled': 'Reservation Cancelled',
                'refunded': 'Refund Completed'
            };

            if (statusLabels[bs]) return statusLabels[bs];

            // 하위 호환성
            if (bs === 'pending') return statusLabels['waiting_down_payment'];
            if (bs === 'refund_completed') return statusLabels['refunded'];
            if (bs === 'canceled') return statusLabels['cancelled'];

            // statusLabel이 직접 왔을 경우
            const v = String(s || '').trim();
            if (v && Object.values(statusLabels).includes(v)) return v;

            return v || 'Waiting for Down Payment';
        };

        const reservationStatus = normalizeStatus(item.statusLabel, item.bookingStatus, item.paymentStatus);
        const travelStart = item.departureDate || '-';
        const numPeople = (typeof item.numPeople === 'number') ? String(item.numPeople) : (item.numPeople || '-');
        
        return `
            <tr onclick="goToReservationDetail('${escapeHtml(item.bookingId || '')}')" style="cursor:pointer;">
                <td class="no is-center">${item.rowNum}</td>
                <td class="ellipsis">${escapeHtml(item.packageName || '-')}</td>
                <td class="is-center">${escapeHtml(travelStart)}</td>
                <td class="is-center">${escapeHtml(item.customerName || item.reserverName || item.bookingName || item.travelerName || 'N/A')}</td>
                <td class="is-center">${escapeHtml(numPeople)}</td>
                <td class="is-center">
                    <span class="badge ${escapeHtml(item.statusClass || 'badge-gray')}">${escapeHtml(reservationStatus)}</span>
                </td>
            </tr>
        `;
    }).join('');

    // 동적 콘텐츠(버튼 등) 언어 적용
    try {
        if (typeof language_apply === 'function') {
            language_apply(getCurrentLang());
        }
    } catch (_) {}
}

function formatCurrency(amount) {
    if (!amount) return '0';
    return new Intl.NumberFormat('ko-KR', { 
        style: 'currency', 
        currency: 'PHP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount).replace('PHP', '₱');
}

function getPaymentStatusText(paymentStatus) {
    const mapKo = { pending: '미결제', partial: '부분 결제', paid: '전액 결제' };
    const mapEng = { pending: 'Pending', partial: 'Partial', paid: 'Paid' };
    const mapTl = { pending: 'Pending', partial: 'Partial', paid: 'Paid' };

    const lang = getCurrentLang();
    const chosen = (lang === 'tl') ? mapTl : (lang === 'eng') ? mapEng : mapKo;
    return chosen[paymentStatus] || paymentStatus || '-';
}

function getPaymentStatusClass(paymentStatus) {
    const classMap = {
        'pending': 'badge-red',
        'partial': 'badge-yellow',
        'paid': 'badge-green'
    };
    return classMap[paymentStatus] || 'badge-gray';
}

function getReservationStatusText(bookingStatus, paymentStatus) {
    const lang = getCurrentLang();

    // 새로운 11단계 상태값 지원
    const ko = {
        waiting_down_payment: 'Down Payment 대기',
        checking_down_payment: 'Down Payment 확인중',
        waiting_second_payment: 'Second Payment 대기',
        checking_second_payment: 'Second Payment 확인중',
        waiting_balance: 'Balance 대기',
        checking_balance: 'Balance 확인중',
        rejected: '증빙 거절',
        confirmed: '예약 확정',
        completed: '여행 완료',
        cancelled: '예약 취소',
        refunded: '환불 완료'
    };
    const eng = {
        waiting_down_payment: 'Waiting for Down Payment',
        checking_down_payment: 'Checking Down Payment',
        waiting_second_payment: 'Waiting for Second Payment',
        checking_second_payment: 'Checking Second Payment',
        waiting_balance: 'Waiting for Balance',
        checking_balance: 'Checking Balance',
        rejected: 'Payment Rejected',
        confirmed: 'Reservation Confirmed',
        completed: 'Trip Completed',
        cancelled: 'Reservation Cancelled',
        refunded: 'Refund Completed'
    };
    const tl = eng; // Tagalog 번역이 없으면 영어 fallback

    const statusKey = String(bookingStatus || '').toLowerCase().trim();

    // 새로운 상태값 직접 매핑
    if (ko[statusKey]) {
        return (lang === 'tl') ? tl[statusKey] : (lang === 'eng') ? eng[statusKey] : ko[statusKey];
    }

    // 하위 호환성
    if (statusKey === 'pending') {
        const key = 'waiting_down_payment';
        return (lang === 'tl') ? tl[key] : (lang === 'eng') ? eng[key] : ko[key];
    }
    if (statusKey === 'refund_completed') {
        const key = 'refunded';
        return (lang === 'tl') ? tl[key] : (lang === 'eng') ? eng[key] : ko[key];
    }

    return bookingStatus || '-';
}

function handleCancelReservation(bookingId, event) {
    event.stopPropagation();
    if (confirm(t({
        ko: '예약을 취소하시겠습니까?',
        eng: 'Do you want to cancel this reservation?',
        tl: 'Do you want to cancel this reservation?'
    }))) {
        // TODO: 예약 취소 API 호출
        console.log('Cancel reservation:', bookingId);
    }
}

function renderPagination(pagination) {
    const pagebox = document.querySelector('.jw-pagebox');
    if (!pagebox) return;
    
    const pageContainer = pagebox.querySelector('.page');
    if (!pageContainer) return;
    
    const totalPages = pagination.totalPages;
    const current = pagination.page;
    
    // 페이지 번호 생성
    let pageNumbers = [];
    const maxPages = 5;
    let startPage = Math.max(1, current - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }
    
    pageContainer.innerHTML = pageNumbers.map(page => `
        <button type="button" class="p ${page === current ? 'show' : ''}" 
                role="listitem" ${page === current ? 'aria-current="page"' : ''}
                onclick="goToPage(${page})">${page}</button>
    `).join('');
    
    // 첫 페이지/이전 페이지 버튼 상태
    const firstBtn = pagebox.querySelector('.first');
    const prevBtn = pagebox.querySelector('.prev');
    if (firstBtn && prevBtn) {
        const disabled = current === 1;
        firstBtn.disabled = disabled;
        prevBtn.disabled = disabled;
        firstBtn.setAttribute('aria-disabled', disabled);
        prevBtn.setAttribute('aria-disabled', disabled);
        if (!disabled) {
            firstBtn.onclick = () => goToPage(1);
            prevBtn.onclick = () => goToPage(current - 1);
        }
    }
    
    // 다음 페이지/마지막 페이지 버튼 상태
    const nextBtn = pagebox.querySelector('.next');
    const lastBtn = pagebox.querySelector('.last');
    if (nextBtn && lastBtn) {
        const disabled = current === totalPages;
        nextBtn.disabled = disabled;
        lastBtn.disabled = disabled;
        nextBtn.setAttribute('aria-disabled', disabled);
        lastBtn.setAttribute('aria-disabled', disabled);
        if (!disabled) {
            nextBtn.onclick = () => goToPage(current + 1);
            lastBtn.onclick = () => goToPage(totalPages);
        }
    }
}

function goToPage(page) {
    currentPage = page;
    loadReservations();
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function goToReservationDetail(bookingId) {
    window.location.href = `reservation-detail.html?id=${bookingId}`;
}

function updateResultCount(total) {
    const resultCountNum = document.querySelector('.result-count__num');
    if (resultCountNum) {
        resultCountNum.textContent = total;
    }
}

function showLoading() {
    const tbody = document.getElementById('reservations-tbody');
    if (tbody) {
        tbody.innerHTML = `<tr><td colspan="6" class="is-center">${escapeHtml(t({
            ko: '로딩 중...',
            eng: 'Loading...',
            tl: 'Loading...'
        }))}</td></tr>`;
    }
}

function hideLoading() {
    // 로딩은 renderReservations에서 처리됨
}

function showError(message) {
    const tbody = document.getElementById('reservations-tbody');
    if (tbody) {
        tbody.innerHTML = `<tr><td colspan="6" class="is-center" style="color: red;">${escapeHtml(message)}</td></tr>`;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 다운로드 기능
function downloadReservations() {
    try {
        // 현재 필터 조건 가져오기
        const filters = {
            search: currentFilters.search || '',
            reservationDate: currentFilters.reservationDate || '',
            reservationStatus: currentFilters.reservationStatus || '',
            paymentStatus: currentFilters.paymentStatus || '',
            sortOrder: currentFilters.sortOrder || 'latest'
        };

        // 쿼리 파라미터 구성
        const params = new URLSearchParams();
        params.append('action', 'downloadReservations');
        if (filters.search) params.append('search', filters.search);
        if (filters.reservationDate) params.append('reservationDate', filters.reservationDate);
        if (filters.reservationStatus) params.append('reservationStatus', filters.reservationStatus);
        if (filters.paymentStatus) params.append('paymentStatus', filters.paymentStatus);
        if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);

        // 다운로드 URL 생성
        const downloadUrl = `../backend/api/agent-api.php?${params.toString()}`;

        // 새 창에서 다운로드 실행
        window.location.href = downloadUrl;
    } catch (error) {
        console.error('Download error:', error);
        alert(t({
            ko: '다운로드 중 오류가 발생했습니다.',
            eng: 'An error occurred during download.',
            tl: 'An error occurred during download.'
        }));
    }
}

// Travel start date 정렬 토글 기능
function toggleTravelDateSort() {
    const th = document.getElementById('th-travel-start-date');
    if (!th) return;

    // 정렬 상태 토글: '' -> 'asc' -> 'desc' -> ''
    if (currentFilters.travelStartDateSort === '') {
        currentFilters.travelStartDateSort = 'asc';
    } else if (currentFilters.travelStartDateSort === 'asc') {
        currentFilters.travelStartDateSort = 'desc';
    } else {
        currentFilters.travelStartDateSort = '';
    }

    // UI 업데이트
    updateSortIcon();

    // 페이지 초기화 후 데이터 로드
    currentPage = 1;
    loadReservations();
}

// 정렬 아이콘 UI 업데이트
function updateSortIcon() {
    const th = document.getElementById('th-travel-start-date');
    if (!th) return;

    // 모든 정렬 클래스 제거
    th.classList.remove('sort-asc', 'sort-desc');

    // 현재 정렬 상태에 따라 클래스 추가
    if (currentFilters.travelStartDateSort === 'asc') {
        th.classList.add('sort-asc');
    } else if (currentFilters.travelStartDateSort === 'desc') {
        th.classList.add('sort-desc');
    }
}
