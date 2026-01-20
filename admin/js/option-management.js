/**
 * Option Management - 항공사별 옵션 관리
 */

const API_URL = '../backend/api/super-api.php';
let selectedAirline = '';

// 페이지 초기화
document.addEventListener('DOMContentLoaded', function() {
    loadAirlineList();
});

/**
 * 항공사 목록 로드
 */
async function loadAirlineList() {
    try {
        const response = await fetch(`${API_URL}?action=getAirlineList`, {
            credentials: 'same-origin'
        });
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to load airlines');
        }

        const airlines = result.data?.airlines || [];
        const select = document.getElementById('airlineSelect');

        select.innerHTML = '<option value="">-- Select Airline --</option>';
        airlines.forEach(airline => {
            const option = document.createElement('option');
            option.value = airline;
            option.textContent = airline;
            select.appendChild(option);
        });

    } catch (error) {
        console.error('Error loading airlines:', error);
        alert('Failed to load airline list: ' + error.message);
    }
}

/**
 * 선택된 항공사의 옵션 로드
 */
async function loadAirlineOptions() {
    const select = document.getElementById('airlineSelect');
    selectedAirline = select.value;

    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const container = document.getElementById('categoriesContainer');

    if (!selectedAirline) {
        addCategoryBtn.disabled = true;
        container.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" stroke-width="1.5">
                    <path d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"/>
                </svg>
                <p data-lan-eng="Select an airline to manage options">Select an airline to manage options</p>
            </div>
        `;
        return;
    }

    addCategoryBtn.disabled = false;

    try {
        const response = await fetch(`${API_URL}?action=getAirlineOptions&airlineName=${encodeURIComponent(selectedAirline)}`, {
            credentials: 'same-origin'
        });
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to load options');
        }

        renderCategories(result.data?.categories || []);

    } catch (error) {
        console.error('Error loading options:', error);
        alert('Failed to load options: ' + error.message);
    }
}

/**
 * 카테고리 및 옵션 렌더링
 */
function renderCategories(categories) {
    const container = document.getElementById('categoriesContainer');

    if (categories.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" stroke-width="1.5">
                    <path d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                <p data-lan-eng="No categories yet. Click 'Add Category' to create one.">No categories yet. Click 'Add Category' to create one.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = categories.map(cat => `
        <div class="category-card ${cat.is_active ? '' : 'inactive'}">
            <div class="category-header">
                <div>
                    <span class="category-title">${escapeHtml(cat.category_name)}</span>
                    ${cat.category_name_en ? `<span class="category-title-en">(${escapeHtml(cat.category_name_en)})</span>` : ''}
                    <span class="status-badge ${cat.is_active ? 'active' : 'inactive'}">${cat.is_active ? 'Active' : 'Inactive'}</span>
                </div>
                <div class="category-actions">
                    <button class="btn-icon edit" onclick="openEditCategoryModal(${cat.category_id}, '${escapeHtml(cat.category_name)}', '${escapeHtml(cat.category_name_en || '')}')" title="Edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                    <button class="btn-icon delete" onclick="deleteCategory(${cat.category_id})" title="Delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="category-body">
                <div class="option-list">
                    ${(cat.options || []).map(opt => `
                        <div class="option-item ${opt.is_active ? '' : 'inactive'}">
                            <div class="option-info">
                                <span class="option-name">${escapeHtml(opt.option_name)}</span>
                                ${opt.option_name_en ? `<span class="option-name-en">(${escapeHtml(opt.option_name_en)})</span>` : ''}
                            </div>
                            <div class="option-info">
                                <span class="option-price">PHP ${formatNumber(opt.price)}</span>
                                <div class="option-actions">
                                    <button class="btn-icon edit" onclick="openEditOptionModal(${opt.option_id}, ${cat.category_id}, '${escapeHtml(opt.option_name)}', '${escapeHtml(opt.option_name_en || '')}', ${opt.price})" title="Edit">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                    </button>
                                    <button class="btn-icon delete" onclick="deleteOption(${opt.option_id})" title="Delete">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6"/>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <button class="add-option-btn" onclick="openAddOptionModal(${cat.category_id})">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    <span data-lan-eng="Add Option">Add Option</span>
                </button>
            </div>
        </div>
    `).join('');
}

// ============ Category Modal ============

function openAddCategoryModal() {
    document.getElementById('categoryModalTitle').textContent = 'Add Category';
    document.getElementById('editCategoryId').value = '';
    document.getElementById('categoryName').value = '';
    document.getElementById('categoryNameEn').value = '';
    document.getElementById('categoryModal').style.display = 'flex';
}

function openEditCategoryModal(categoryId, name, nameEn) {
    document.getElementById('categoryModalTitle').textContent = 'Edit Category';
    document.getElementById('editCategoryId').value = categoryId;
    document.getElementById('categoryName').value = name;
    document.getElementById('categoryNameEn').value = nameEn;
    document.getElementById('categoryModal').style.display = 'flex';
}

function closeCategoryModal() {
    document.getElementById('categoryModal').style.display = 'none';
}

async function saveCategory() {
    const categoryId = document.getElementById('editCategoryId').value;
    const categoryName = document.getElementById('categoryName').value.trim();
    const categoryNameEn = document.getElementById('categoryNameEn').value.trim();

    if (!categoryName) {
        alert('Please enter a category name.');
        return;
    }

    try {
        const formData = new FormData();
        if (categoryId) {
            formData.append('action', 'updateOptionCategory');
            formData.append('categoryId', categoryId);
        } else {
            formData.append('action', 'createOptionCategory');
            formData.append('airlineName', selectedAirline);
        }
        formData.append('categoryName', categoryName);
        formData.append('categoryNameEn', categoryNameEn);

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to save category');
        }

        closeCategoryModal();
        loadAirlineOptions();

    } catch (error) {
        console.error('Error saving category:', error);
        alert('Failed to save category: ' + error.message);
    }
}

async function deleteCategory(categoryId) {
    if (!confirm('Are you sure you want to delete this category? All options in this category will also be deleted.')) {
        return;
    }

    try {
        const formData = new FormData();
        formData.append('action', 'deleteOptionCategory');
        formData.append('categoryId', categoryId);

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to delete category');
        }

        loadAirlineOptions();

    } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category: ' + error.message);
    }
}

// ============ Option Modal ============

function openAddOptionModal(categoryId) {
    document.getElementById('optionModalTitle').textContent = 'Add Option';
    document.getElementById('editOptionId').value = '';
    document.getElementById('optionCategoryId').value = categoryId;
    document.getElementById('optionName').value = '';
    document.getElementById('optionNameEn').value = '';
    document.getElementById('optionPrice').value = '0';
    document.getElementById('optionModal').style.display = 'flex';
}

function openEditOptionModal(optionId, categoryId, name, nameEn, price) {
    document.getElementById('optionModalTitle').textContent = 'Edit Option';
    document.getElementById('editOptionId').value = optionId;
    document.getElementById('optionCategoryId').value = categoryId;
    document.getElementById('optionName').value = name;
    document.getElementById('optionNameEn').value = nameEn;
    document.getElementById('optionPrice').value = price;
    document.getElementById('optionModal').style.display = 'flex';
}

function closeOptionModal() {
    document.getElementById('optionModal').style.display = 'none';
}

async function saveOption() {
    const optionId = document.getElementById('editOptionId').value;
    const categoryId = document.getElementById('optionCategoryId').value;
    const optionName = document.getElementById('optionName').value.trim();
    const optionNameEn = document.getElementById('optionNameEn').value.trim();
    const price = parseFloat(document.getElementById('optionPrice').value) || 0;

    if (!optionName) {
        alert('Please enter an option name.');
        return;
    }

    try {
        const formData = new FormData();
        if (optionId) {
            formData.append('action', 'updateAirlineOption');
            formData.append('optionId', optionId);
        } else {
            formData.append('action', 'createAirlineOption');
            formData.append('categoryId', categoryId);
        }
        formData.append('optionName', optionName);
        formData.append('optionNameEn', optionNameEn);
        formData.append('price', price);

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to save option');
        }

        closeOptionModal();
        loadAirlineOptions();

    } catch (error) {
        console.error('Error saving option:', error);
        alert('Failed to save option: ' + error.message);
    }
}

async function deleteOption(optionId) {
    if (!confirm('Are you sure you want to delete this option?')) {
        return;
    }

    try {
        const formData = new FormData();
        formData.append('action', 'deleteAirlineOption');
        formData.append('optionId', optionId);

        const response = await fetch(API_URL, {
            method: 'POST',
            body: formData,
            credentials: 'same-origin'
        });
        const result = await response.json();

        if (!result.success) {
            throw new Error(result.message || 'Failed to delete option');
        }

        loadAirlineOptions();

    } catch (error) {
        console.error('Error deleting option:', error);
        alert('Failed to delete option: ' + error.message);
    }
}

// ============ Utility Functions ============

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;',
        '"': '&quot;', "'": '&#39;'
    }[m]));
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num || 0);
}
