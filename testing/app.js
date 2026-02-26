/**
 * COMMON ENHANCEMENTS & PATTERNS
 * Copy these patterns into your app.js as needed
 */

// ============================================
// 1. FORM HANDLING WITH VALIDATION
// ============================================

const formExample = {
    render() {
        return `
            <div class="page-header">
                <h1 class="page-title">Create User</h1>
            </div>
            
            <div class="card">
                <form id="userForm">
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Name</label>
                        <input type="text" name="name" required 
                               style="width: 100%; padding: 12px; border: 1px solid var(--color-border); border-radius: 8px;">
                        <span class="error" id="nameError"></span>
                    </div>
                    
                    <div style="margin-bottom: 16px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600;">Email</label>
                        <input type="email" name="email" required
                               style="width: 100%; padding: 12px; border: 1px solid var(--color-border); border-radius: 8px;">
                        <span class="error" id="emailError"></span>
                    </div>
                    
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        `;
    },
    
    onMount() {
        const form = document.getElementById('userForm');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.error').forEach(el => el.textContent = '');
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate
            if (!data.name || data.name.length < 2) {
                document.getElementById('nameError').textContent = 'Name must be at least 2 characters';
                return;
            }
            
            try {
                // Submit to API
                const result = await api.post('/users', data);
                
                // Success - navigate or show message
                alert('User created successfully!');
                router.navigate('/users');
            } catch (error) {
                alert('Error creating user: ' + error.message);
            }
        });
    }
};


// ============================================
// 2. DATA TABLE WITH SORTING & PAGINATION
// ============================================

const tableExample = {
    async load() {
        return await api.get('/users?page=1&limit=10');
    },
    
    render(params, data) {
        const rows = data.users.map(user => `
            <tr>
                <td style="padding: 12px;">${user.id}</td>
                <td style="padding: 12px;">${user.name}</td>
                <td style="padding: 12px;">${user.email}</td>
                <td style="padding: 12px;">
                    <button class="btn-edit" data-id="${user.id}">Edit</button>
                    <button class="btn-delete" data-id="${user.id}">Delete</button>
                </td>
            </tr>
        `).join('');
        
        return `
            <div class="page-header">
                <h1 class="page-title">Users</h1>
                <button class="btn btn-primary" onclick="router.navigate('/users/create')">
                    Add User
                </button>
            </div>
            
            <div class="card">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--color-border);">
                            <th style="padding: 12px; text-align: left;">ID</th>
                            <th style="padding: 12px; text-align: left;">Name</th>
                            <th style="padding: 12px; text-align: left;">Email</th>
                            <th style="padding: 12px; text-align: left;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
                
                <div style="margin-top: 20px; display: flex; gap: 8px; justify-content: center;">
                    <button class="btn btn-secondary" id="prevPage">Previous</button>
                    <span style="padding: 12px;">Page ${data.page} of ${data.totalPages}</span>
                    <button class="btn btn-secondary" id="nextPage">Next</button>
                </div>
            </div>
        `;
    },
    
    onMount() {
        // Handle edit buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const userId = btn.dataset.id;
                router.navigate(`/users/${userId}/edit`);
            });
        });
        
        // Handle delete buttons
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                const userId = btn.dataset.id;
                if (confirm('Are you sure you want to delete this user?')) {
                    try {
                        await api.delete(`/users/${userId}`);
                        location.reload(); // Reload data
                    } catch (error) {
                        alert('Error deleting user');
                    }
                }
            });
        });
    }
};


// ============================================
// 3. MODAL / POPUP SYSTEM
// ============================================

const Modal = {
    open(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                border-radius: 12px;
                padding: 32px;
                max-width: 500px;
                width: 90%;
                position: relative;
                animation: modalSlideIn 0.3s ease-out;
            ">
                <button class="modal-close" style="
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                ">&times;</button>
                
                <h2 style="margin-bottom: 16px;">${title}</h2>
                <div>${content}</div>
            </div>
        `;
        
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        document.body.appendChild(modal);
        
        // Close handlers
        modal.querySelector('.modal-close').addEventListener('click', () => Modal.close(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) Modal.close(modal);
        });
    },
    
    close(modal) {
        modal.style.animation = 'modalSlideOut 0.3s ease-in';
        setTimeout(() => modal.remove(), 300);
    }
};

// Add to your CSS
const modalCSS = `
@keyframes modalSlideIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes modalSlideOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
}
`;

// Usage:
// Modal.open('Delete User', 'Are you sure you want to delete this user?');


// ============================================
// 4. SEARCH / FILTER FUNCTIONALITY
// ============================================

const searchExample = {
    async load() {
        return await api.get('/products');
    },
    
    render(params, data) {
        window.productsData = data.products; // Store for filtering
        
        return `
            <div class="page-header">
                <h1 class="page-title">Products</h1>
            </div>
            
            <div class="card" style="margin-bottom: 24px;">
                <input 
                    type="search" 
                    id="searchInput" 
                    placeholder="Search products..."
                    style="width: 100%; padding: 12px; border: 1px solid var(--color-border); border-radius: 8px; font-size: 16px;"
                >
            </div>
            
            <div id="productsContainer">
                ${this.renderProducts(data.products)}
            </div>
        `;
    },
    
    renderProducts(products) {
        if (!products.length) {
            return '<div class="card">No products found</div>';
        }
        
        return `
            <div class="grid grid-3">
                ${products.map(product => `
                    <div class="card">
                        <h3>${product.name}</h3>
                        <p style="color: var(--color-text-secondary);">${product.description}</p>
                        <p style="font-weight: 700; margin-top: 12px;">$${product.price}</p>
                    </div>
                `).join('')}
            </div>
        `;
    },
    
    onMount() {
        const searchInput = document.getElementById('searchInput');
        const container = document.getElementById('productsContainer');
        
        // Debounced search
        let timeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                const query = e.target.value.toLowerCase();
                const filtered = window.productsData.filter(p => 
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
                );
                container.innerHTML = this.renderProducts(filtered);
            }, 300);
        });
    }
};


// ============================================
// 5. TOAST NOTIFICATIONS
// ============================================

const Toast = {
    show(message, type = 'info') {
        const toast = document.createElement('div');
        const colors = {
            success: '#2D7D3A',
            error: '#8B2635',
            warning: '#F59E0B',
            info: '#3B82F6'
        };
        
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: toastSlideIn 0.3s ease-out;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s ease-in';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Usage:
// Toast.show('User created successfully!', 'success');
// Toast.show('Error loading data', 'error');


// ============================================
// 6. LOADING STATES & SKELETONS
// ============================================

const LoadingSkeleton = {
    card() {
        return `
            <div class="card skeleton-card" style="animation: pulse 1.5s ease-in-out infinite;">
                <div style="height: 20px; background: #E0E0E0; border-radius: 4px; margin-bottom: 12px; width: 60%;"></div>
                <div style="height: 16px; background: #E0E0E0; border-radius: 4px; margin-bottom: 8px;"></div>
                <div style="height: 16px; background: #E0E0E0; border-radius: 4px; width: 80%;"></div>
            </div>
        `;
    },
    
    table(rows = 5) {
        return `
            <div class="card">
                ${Array(rows).fill(0).map(() => `
                    <div style="height: 40px; background: #E0E0E0; border-radius: 4px; margin-bottom: 8px; animation: pulse 1.5s ease-in-out infinite;"></div>
                `).join('')}
            </div>
        `;
    }
};

// Add to CSS:
const skeletonCSS = `
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
`;


// ============================================
// 7. LOCAL STORAGE STATE MANAGEMENT
// ============================================

const Store = {
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    },
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Error reading from localStorage', e);
            return defaultValue;
        }
    },
    
    remove(key) {
        localStorage.removeItem(key);
    },
    
    clear() {
        localStorage.clear();
    }
};

// Usage:
// Store.set('user', { id: 1, name: 'John' });
// const user = Store.get('user');


// ============================================
// 8. FILE UPLOAD WITH PREVIEW
// ============================================

const fileUploadExample = {
    render() {
        return `
            <div class="page-header">
                <h1 class="page-title">Upload File</h1>
            </div>
            
            <div class="card">
                <input type="file" id="fileInput" accept="image/*" style="margin-bottom: 16px;">
                <div id="preview"></div>
                <button id="uploadBtn" class="btn btn-primary" style="margin-top: 16px;">Upload</button>
            </div>
        `;
    },
    
    onMount() {
        const fileInput = document.getElementById('fileInput');
        const preview = document.getElementById('preview');
        const uploadBtn = document.getElementById('uploadBtn');
        
        let selectedFile = null;
        
        fileInput.addEventListener('change', (e) => {
            selectedFile = e.target.files[0];
            if (selectedFile && selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    preview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; border-radius: 8px;">`;
                };
                reader.readAsDataURL(selectedFile);
            }
        });
        
        uploadBtn.addEventListener('click', async () => {
            if (!selectedFile) {
                alert('Please select a file');
                return;
            }
            
            const formData = new FormData();
            formData.append('file', selectedFile);
            
            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });
                const result = await response.json();
                Toast.show('File uploaded successfully!', 'success');
            } catch (error) {
                Toast.show('Upload failed', 'error');
            }
        });
    }
};


// ============================================
// 9. REAL-TIME UPDATES (WebSocket or Polling)
// ============================================

const realtimeExample = {
    interval: null,
    
    render(params, data) {
        return `
            <div class="page-header">
                <h1 class="page-title">Real-time Dashboard</h1>
            </div>
            <div id="liveData" class="grid grid-4">
                ${this.renderStats(data)}
            </div>
        `;
    },
    
    renderStats(data) {
        return data.stats.map(stat => `
            <div class="stat-card">
                <div class="stat-label">${stat.label}</div>
                <div class="stat-value">${stat.value}</div>
            </div>
        `).join('');
    },
    
    onMount() {
        // Poll for updates every 5 seconds
        this.interval = setInterval(async () => {
            try {
                const data = await api.get('/live-stats');
                document.getElementById('liveData').innerHTML = this.renderStats(data);
            } catch (error) {
                console.error('Failed to fetch updates');
            }
        }, 5000);
    },
    
    onUnmount() {
        // Clean up interval when leaving page
        if (this.interval) {
            clearInterval(this.interval);
        }
    }
};


// ============================================
// 10. CONFIRM DIALOGS
// ============================================

const Confirm = {
    async show(message, title = 'Confirm') {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            `;
            
            modal.innerHTML = `
                <div style="background: white; border-radius: 12px; padding: 32px; max-width: 400px; width: 90%;">
                    <h3 style="margin-bottom: 16px;">${title}</h3>
                    <p style="margin-bottom: 24px; color: var(--color-text-secondary);">${message}</p>
                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button class="btn btn-secondary" id="cancelBtn">Cancel</button>
                        <button class="btn btn-primary" id="confirmBtn">Confirm</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            modal.querySelector('#confirmBtn').addEventListener('click', () => {
                modal.remove();
                resolve(true);
            });
            
            modal.querySelector('#cancelBtn').addEventListener('click', () => {
                modal.remove();
                resolve(false);
            });
        });
    }
};

// Usage:
// const confirmed = await Confirm.show('Delete this item?', 'Are you sure?');
// if (confirmed) { /* do something */ }