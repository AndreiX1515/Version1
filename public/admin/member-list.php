<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Member List</title>

    <!-- Initial Links -->

    <!-- 공통 스타일 -->
    <link rel="shortcut icon" href="../../favicon.ico" />

    <!-- Root Styles (Always on Top) and Components Styles -->
    <link href="../../public/assets/css/root.css?v=<?= time(); ?>" rel="stylesheet">

    <link href="../../public/assets/css/flatpckr-design.css?v=<?= time(); ?>" rel="stylesheet">
    <link href="../../public/assets/css/apexchart-design.css?v=<?= time(); ?>" rel="stylesheet">

    <!-- Tabulator CSS (REQUIRED!) -->
    <link href="https://unpkg.com/tabulator-tables@6.2.1/dist/css/tabulator.min.css" rel="stylesheet">

    <!-- Tabulator JS -->
    <script src="https://unpkg.com/tabulator-tables@6.2.1/dist/js/tabulator.min.js"></script>


    <?php include '../../public/includes/initial-links.php'; ?>


    <!-- Page Specifics -->

    <!-- Main Script for ApexCharts -->
    <script src="https://cdn.jsdelivr.net/npm/apexcharts@latest"></script>


 
    <link href="../../public/assets/css/member-list.css?v=<?= time(); ?>" rel="stylesheet">
    <link href="../../public/assets/css/general-full-table.css?v=<?= time(); ?>" rel="stylesheet">
    <link href="../../public/assets/css/tabulator.css?v=<?= time(); ?>" rel="stylesheet">


    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
    <script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>


</head>

<?php
include '../functions/csrf.php';
?>

<body>
    <div class="dashboard-container">

        <!-- Sidebar -->
        <?php include '../../public/includes/admin-sidebar.php'; ?>

        <!-- Main Content -->
        <div class="main-wrapper">

            <!-- Header -->
            <?php include '../../public/includes/header.php'; ?>

            <!-- Main Content Area -->
            <main class="main-content">

                <div class="content-wrapper member-list-main-wrapper">

                    <div class="content-header member-list-main-header">

                        <!-- Left: Page title / breadcrumb -->
                        <div class="content-header-left">
                            <h1 class="page-title">Member List</h1>
                        </div>

                        <!-- Right: Actions -->
                        <div class="content-header-right">

                        </div>

                    </div>

                    <div class="content-body member-list-main-body">

                        <div class="full-table-wrapper">

                            <div class="table-header-actions">

                                <div class="table-actions-left">

                                    <!-- <div class="bulk-action-dropdown">
                                        <button class="bulk-action-btn">
                                            <span>Bulk Action</span>
                                            <i class="fas fa-chevron-down"></i>
                                        </button>
                                    </div>
                                    <button class="apply-btn">Apply</button> -->

                                </div>

                                <div class="table-actions-right">
                                    <button class="icon-action-btn" id="tableSearchBtn" aria-label="Search">
                                        <i class="fas fa-search"></i>
                                    </button>
                                    <button class="icon-action-btn" aria-label="Filter">
                                        <i class="fas fa-filter"></i>
                                        <span class="filter-badge">2</span>
                                    </button>
                                    <button class="icon-action-btn" aria-label="Settings">
                                        <i class="fas fa-cog"></i>
                                    </button>
                                </div>

                            </div>
 
                            <div class="table-container" id="customerTable"></div>
                           
                            <div class="table-footer">
                                <div class="table-footer-left">
                                    <div class="rows-per-page">
                                        <span class="rows-label">Rows per page:</span>
                                        <div class="rows-dropdown">
                                            <select id="pageSizeSelector" class="rows-select-btn">
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="50">50</option>
                                                <option value="all">All</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="table-info">
                                        <span class="info-text" id="tableInfo">Showing 1-10 of 0 results</span>
                                    </div>
                                </div>

                                <div class="table-footer-right">
                                    <div class="pagination" id="tablePagination"></div>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>

            </main>

        </div>
    </div>
</body>





<script>
/**
 * ============================================================================
 * CUSTOMER MANAGEMENT TABLE - TABULATOR IMPLEMENTATION
 * ============================================================================
 * 
 * This script manages a customer table with the following features:
 * - Custom formatters for customer info, branches, and status badges
 * - Dynamic pagination with custom controls
 * - Responsive row fitting to available height
 * - Search and filtering capabilities
 * - Row selection
 * 
 * Dependencies: Tabulator 5.x, Font Awesome (for icons)
 */

/* =========================================================
   CONFIGURATION & CONSTANTS
========================================================= */

/**
 * Member type definitions with color coding
 * Used for categorizing branches (Agent, B2C, B2B)
 */
const MEMBER_TYPES = [
    { id: 1, name: "Agent", color: "#ef4444" },
    { id: 2, name: "B2C", color: "#8b5cf6" },
    { id: 3, name: "B2B", color: "#10b981" }
];

/**
 * Branch/organization definitions
 * Each branch has a type (from MEMBER_TYPES) and color for visual identification
 */
const BRANCHES = [
    { id: 1, name: "Sulit Traveler", typeId: 1, color: "#6366f1" },
    { id: 2, name: "Lipad Lakbay", typeId: 2, color: "#10b981" },
    { id: 3, name: "P91", typeId: 3, color: "#f59e0b" },
    { id: 4, name: "Future Diamond", typeId: 1, color: "#8b5cf6" },
    { id: 5, name: "E-Winer", typeId: 2, color: "#6366f1" },
    { id: 6, name: "Francia", typeId: 3, color: "#f59e0b" },
    { id: 7, name: "Travel Escape", typeId: 1, color: "#10b981" },
    { id: 8, name: "APD", typeId: 2, color: "#6366f1" }
];

/**
 * Status color mapping for visual indicators
 */
const STATUS_COLORS = {
    active: "#22c55e",      // Green
    pending: "#fbbf24",     // Yellow
    suspended: "#ef4444",   // Red
    default: "#6b7280"      // Gray
};

/**
 * Default pagination settings
 */
const PAGINATION_CONFIG = {
    defaultSize: 13,
    availableSizes: [10, 13, 20, 25, 50]
};


/* =========================================================
   CUSTOM FORMATTERS
========================================================= */

/**
 * Formats customer cell with avatar/initials and name
 * @param {Object} cell - Tabulator cell object
 * @returns {string} HTML string for customer display
 */

function customerFormatter(cell) {
    const data = cell.getValue();
    
    // Safety check for empty data
    if (!data) return "";
    
    // IMPROVEMENT: Add fallback for missing name
    const name = data.name || "Unknown";
    const initials = data.initials || "??";
    
    // Determine avatar type: image or colored initials
    // Only show initials if there's no avatar image
    let avatarHTML = data.avatar
        ? `<img src="${data.avatar}" 
                alt="${name}" 
                class="customer-avatar-img" 
                onerror="this.outerHTML='<div class=\\'customer-avatar\\' style=\\'background-color: ${data.color || '#6b7280'}\\'>${initials}</div>';">`
        : `<div class="customer-avatar" style="background-color: ${data.color || '#6b7280'};">${initials}</div>`;

    return `<div class="customer-info">
                ${avatarHTML}
                <span class="customer-name">${name}</span>
            </div>`;
}

/**
 * Formats branch cell with avatar, name, and member type badge
 * @param {Object} cell - Tabulator cell object
 * @returns {string} HTML string for branch display
 */
function branchFormatter(cell) {
    const branchId = cell.getValue();
    
    // Safety checks
    if (!branchId) return "";
    
    const branch = BRANCHES.find(b => b.id === branchId);
    if (!branch) {
        console.warn(`Branch not found for ID: ${branchId}`);
        return `<span class="error-text">Unknown Branch</span>`;
    }

    // Generate initials from branch name
    const initials = branch.name
        .split(" ")
        .map(w => w[0])
        .join("")
        .toUpperCase()
        .substring(0, 3); // IMPROVEMENT: Limit to 3 characters max

    const avatarHTML = `<div class="customer-avatar" style="background-color: ${branch.color}">${initials}</div>`;

    // Find and display member type badge
    const memberType = MEMBER_TYPES.find(m => m.id === branch.typeId);
    const branchTypeBadge = memberType
        ? `<span class="member-type-badge" 
                  style="background-color: ${memberType.color}; margin-left: 4px;">
                ${memberType.name}
            </span>`
        : "";

    return `<div class="customer-info">
                ${avatarHTML}
                <span class="customer-name">${branch.name}</span>
                ${branchTypeBadge}
            </div>`;
}

/**
 * Formats status cell with colored badge
 * @param {Object} cell - Tabulator cell object
 * @returns {string} HTML string for status badge
 */
function statusFormatter(cell) {
    const status = cell.getValue();
    
    if (!status) return "";

    // Get color from status mapping (case-insensitive)
    const statusKey = status.toLowerCase();
    const color = STATUS_COLORS[statusKey] || STATUS_COLORS.default;

    return `<span class="member-type-badge" 
                  style="background-color: ${color};">
                ${status}
            </span>`;
}


/* =========================================================
   TABLE DATA
========================================================= */

/**
 * Customer table data
 * Structure: id, customer{name, initials, color, avatar?}, branchId, status, email, regDate
 */
const TABLE_DATA = [
    { id: 1, customer: { name: "Bobby Gilbert", initials: "BG", color: "#6366f1" }, branchId: 1, status: "Active", email: "bobby.gilbert@example.com", regDate: "12 Dec 2021, 12:12 am" },
    { id: 2, customer: { name: "Olivia Poulsen", initials: "OP", color: "#ef4444" }, branchId: 2, status: "Pending", email: "olivia.poulsen@example.com", regDate: "08 Dec 2021, 04:03 am" },
    { id: 3, customer: { name: "Heather Marshall", initials: "HM", avatar: "https://i.pravatar.cc/150?img=1" }, branchId: 3, status: "Active", email: "heather.marshall@example.com", regDate: "02 Dec 2021, 02:34 am" },
    { id: 4, customer: { name: "Benjamin Harris", initials: "BH", color: "#8b5cf6" }, branchId: 4, status: "Suspended", email: "benjamin.harris@example.com", regDate: "29 Nov 2021, 03:19 am" },
    { id: 5, customer: { name: "Joshua Kennedy", initials: "JK", color: "#f59e0b" }, branchId: 5, status: "Active", email: "joshua.kennedy@example.com", regDate: "24 Nov 2021, 04:21 am" },
    { id: 6, customer: { name: "Justine Bauwens", initials: "JB", avatar: "https://i.pravatar.cc/150?img=5" }, branchId: 6, status: "Active", email: "justine.bauwens@example.com", regDate: "19 Nov 2021, 09:56 am" },
    { id: 7, customer: { name: "Ethan Hunter", initials: "EH", color: "#a855f7" }, branchId: 7, status: "Pending", email: "ethan.hunter@example.com", regDate: "13 Nov 2021, 05:45 am" },
    { id: 8, customer: { name: "Sarah Johnson", initials: "SJ", color: "#10b981" }, branchId: 8, status: "Active", email: "sarah.johnson@example.com", regDate: "10 Nov 2021, 08:30 am" },
    { id: 9, customer: { name: "Michael Chen", initials: "MC", color: "#f97316" }, branchId: 1, status: "Suspended", email: "michael.chen@example.com", regDate: "05 Nov 2021, 02:15 pm" },
    { id: 10, customer: { name: "Emma Wilson", initials: "EW", avatar: "https://i.pravatar.cc/150?img=10" }, branchId: 2, status: "Active", email: "emma.wilson@example.com", regDate: "28 Oct 2021, 11:45 am" },
    { id: 11, customer: { name: "Lucas Brown", initials: "LB", color: "#f43f5e" }, branchId: 3, status: "Pending", email: "lucas.brown@example.com", regDate: "20 Oct 2021, 09:15 am" },
    { id: 12, customer: { name: "Sophia Davis", initials: "SD", avatar: "https://i.pravatar.cc/150?img=12" }, branchId: 4, status: "Active", email: "sophia.davis@example.com", regDate: "18 Oct 2021, 03:50 pm" },
    { id: 13, customer: { name: "Ryan Lee", initials: "RL", color: "#22c55e" }, branchId: 5, status: "Suspended", email: "ryan.lee@example.com", regDate: "15 Oct 2021, 07:25 am" },
    { id: 14, customer: { name: "Chloe Martinez", initials: "CM", avatar: "https://i.pravatar.cc/150?img=14" }, branchId: 6, status: "Active", email: "chloe.martinez@example.com", regDate: "12 Oct 2021, 05:10 pm" },
    { id: 15, customer: { name: "Nathan White", initials: "NW", color: "#8b5cf6" }, branchId: 7, status: "Pending", email: "nathan.white@example.com", regDate: "10 Oct 2021, 11:40 am" },
    { id: 16, customer: { name: "Isabella Taylor", initials: "IT", avatar: "https://i.pravatar.cc/150?img=16" }, branchId: 8, status: "Active", email: "isabella.taylor@example.com", regDate: "08 Oct 2021, 09:30 am" },
    { id: 17, customer: { name: "Mason Clark", initials: "MC", color: "#3b82f6" }, branchId: 1, status: "Active", email: "mason.clark@example.com", regDate: "05 Jan 2022, 10:15 am" },
    { id: 18, customer: { name: "Ava Thompson", initials: "AT", avatar: "https://i.pravatar.cc/150?img=18" }, branchId: 2, status: "Pending", email: "ava.thompson@example.com", regDate: "02 Jan 2022, 02:45 pm" },
    { id: 19, customer: { name: "Liam Walker", initials: "LW", color: "#f97316" }, branchId: 3, status: "Suspended", email: "liam.walker@example.com", regDate: "29 Dec 2021, 06:30 am" },
    { id: 20, customer: { name: "Mia Robinson", initials: "MR", avatar: "https://i.pravatar.cc/150?img=20" }, branchId: 4, status: "Active", email: "mia.robinson@example.com", regDate: "25 Dec 2021, 12:05 pm" },
    { id: 21, customer: { name: "Noah Hall", initials: "NH", color: "#14b8a6" }, branchId: 5, status: "Pending", email: "noah.hall@example.com", regDate: "22 Dec 2021, 08:20 am" },
    { id: 22, customer: { name: "Charlotte Allen", initials: "CA", avatar: "https://i.pravatar.cc/150?img=22" }, branchId: 6, status: "Active", email: "charlotte.allen@example.com", regDate: "19 Dec 2021, 03:45 pm" },
    { id: 23, customer: { name: "James Young", initials: "JY", color: "#a855f7" }, branchId: 7, status: "Suspended", email: "james.young@example.com", regDate: "15 Dec 2021, 09:30 am" },
    { id: 24, customer: { name: "Amelia King", initials: "AK", avatar: "https://i.pravatar.cc/150?img=24" }, branchId: 8, status: "Active", email: "amelia.king@example.com", regDate: "12 Dec 2021, 05:15 pm" },
    { id: 25, customer: { name: "William Scott", initials: "WS", color: "#f43f5e" }, branchId: 1, status: "Pending", email: "william.scott@example.com", regDate: "10 Dec 2021, 11:50 am" },
    { id: 26, customer: { name: "Harper Adams", initials: "HA", avatar: "https://i.pravatar.cc/150?img=26" }, branchId: 2, status: "Active", email: "harper.adams@example.com", regDate: "08 Dec 2021, 09:10 am" }
];


/* =========================================================
   PAGINATION CONTROLS
========================================================= */

/**
 * Renders custom pagination controls
 * Shows: Previous button, page numbers with ellipsis, Next button
 * @param {Object} table - Tabulator instance
 */
function renderPagination(table) {
    const paginationEl = document.getElementById("tablePagination");
    
    if (!paginationEl) {
        console.warn("Pagination element #tablePagination not found");
        return;
    }

    const currentPage = table.getPage();
    const maxPage = table.getPageMax();

    // IMPROVEMENT: Handle edge case of no data
    if (maxPage === 0) {
        paginationEl.innerHTML = '<div class="pagination-empty">No pages available</div>';
        return;
    }

    let paginationHTML = `
        <button class="pagination-btn prev-btn" 
                ${currentPage === 1 ? 'disabled' : ''} 
                onclick="table.previousPage()"
                aria-label="Previous page">
            <i class="fas fa-chevron-left"></i>
        </button>
        <div class="pagination-numbers">
    `;

    // Always show first page
    paginationHTML += `
        <button class="pagination-number ${currentPage === 1 ? 'active' : ''}" 
                onclick="table.setPage(1)"
                aria-label="Go to page 1"
                aria-current="${currentPage === 1 ? 'page' : 'false'}">
            1
        </button>`;

    if (maxPage > 1) {
        // Show ellipsis if there's a gap after page 1
        if (currentPage > 3) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }

        // Show pages around current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(maxPage - 1, currentPage + 1);
        
        for (let i = startPage; i <= endPage; i++) {
            paginationHTML += `
                <button class="pagination-number ${currentPage === i ? 'active' : ''}" 
                        onclick="table.setPage(${i})"
                        aria-label="Go to page ${i}"
                        aria-current="${currentPage === i ? 'page' : 'false'}">
                    ${i}
                </button>`;
        }

        // Show ellipsis if there's a gap before last page
        if (currentPage < maxPage - 2) {
            paginationHTML += `<span class="pagination-ellipsis">...</span>`;
        }

        // Always show last page
        paginationHTML += `
            <button class="pagination-number ${currentPage === maxPage ? 'active' : ''}" 
                    onclick="table.setPage(${maxPage})"
                    aria-label="Go to page ${maxPage}"
                    aria-current="${currentPage === maxPage ? 'page' : 'false'}">
                ${maxPage}
            </button>`;
    }

    paginationHTML += `
        </div>
        <button class="pagination-btn next-btn" 
                ${currentPage === maxPage ? 'disabled' : ''} 
                onclick="table.nextPage()"
                aria-label="Next page">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

    paginationEl.innerHTML = paginationHTML;
}

/**
 * Updates table information display (e.g., "Showing 1-13 of 26 results")
 * @param {Object} table - Tabulator instance
 */
function updateTableInfo(table) {
    const infoEl = document.getElementById("tableInfo");
    
    if (!infoEl) {
        console.warn("Table info element #tableInfo not found");
        return;
    }

    const pageSize = table.getPageSize();
    const page = table.getPage();
    const total = table.getDataCount();

    // IMPROVEMENT: Handle empty table
    if (total === 0) {
        infoEl.textContent = "No results found";
        return;
    }

    const start = ((page - 1) * pageSize) + 1;
    const end = Math.min(page * pageSize, total);

    infoEl.textContent = `Showing ${start}-${end} of ${total} result${total !== 1 ? 's' : ''}`;
}


/* =========================================================
   DYNAMIC ROW FITTING
========================================================= */

/**
 * Calculates and sets row height to fit available table space
 * Ensures rows fill the container height perfectly
 * @param {Object} table - Tabulator instance
 */
function fitRowsToTable(table) {
    const tableEl = table.getElement();
    
    if (!tableEl) {
        console.warn("Table element not found for row fitting");
        return;
    }

    const wrapper = tableEl.closest(".full-table-wrapper");
    const header = tableEl.querySelector(".tabulator-header");
    const footer = wrapper?.querySelector(".table-footer");

    if (!wrapper || !header) {
        console.warn("Required elements for row fitting not found");
        return;
    }

    // Calculate available height for table body
    const wrapperHeight = wrapper.clientHeight;
    const headerHeight = header.offsetHeight;
    const footerHeight = footer ? footer.offsetHeight : 0;
    const bodyHeight = wrapperHeight - headerHeight - footerHeight;

    const rowsPerPage = table.getPageSize();
    
    // IMPROVEMENT: Add minimum row height constraint
    const MIN_ROW_HEIGHT = 35;
    const calculatedRowHeight = Math.floor(bodyHeight / rowsPerPage);
    const rowHeight = Math.max(calculatedRowHeight, MIN_ROW_HEIGHT);

    table.setRowHeight(rowHeight);
    table.redraw(true);
}


/* =========================================================
   SEARCH & FILTER FUNCTIONALITY
========================================================= */

/**
 * Handles table search across multiple fields
 * IMPROVEMENT: Changed from prompt() to proper search input
 * @param {Object} table - Tabulator instance
 * @param {string} searchTerm - Search query
 */
function handleTableSearch(table, searchTerm) {
    if (!searchTerm || searchTerm.trim() === "") {
        // Clear all filters if search is empty
        table.clearFilter();
        return;
    }

    // IMPROVEMENT: Use OR logic for better search results
    table.setFilter([
        [
            { field: "customer.name", type: "like", value: searchTerm },
            { field: "email", type: "like", value: searchTerm },
            { field: "status", type: "like", value: searchTerm },
            { field: "regDate", type: "like", value: searchTerm }
        ]
    ]);
}


/* =========================================================
   TABLE INITIALIZATION
========================================================= */

// Global table instance
let table;

/**
 * Initialize Tabulator table on DOM ready
 */
document.addEventListener("DOMContentLoaded", function() {
    // Check if Tabulator library is loaded
    if (typeof Tabulator === 'undefined') {
        console.error("Tabulator library not loaded! Please include Tabulator CSS and JS.");
        const tableContainer = document.getElementById("customerTable");
        if (tableContainer) {
            tableContainer.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #ef4444;">
                    <i class="fas fa-exclamation-triangle" style="font-size: 48px; margin-bottom: 16px;"></i>
                    <p style="font-size: 18px; font-weight: 600;">Error: Tabulator library not loaded</p>
                    <p style="color: #6b7280; margin-top: 8px;">Please check your script includes.</p>
                </div>`;
        }
        return;
    }

    // Initialize Tabulator
    table = new Tabulator("#customerTable", {
        // Layout & Display
        layout: "fitColumns",
        height: "100%",
        responsiveLayout: "hide", // IMPROVEMENT: Add responsive behavior
        
        // Selection
        selectable: true,
        selectableRangeMode: "click", // IMPROVEMENT: Better selection UX
        
        // Rendering
        renderVertical: "basic",
        
        // Pagination
        pagination: true,
        paginationMode: "local",
        paginationSize: PAGINATION_CONFIG.defaultSize,
        paginationCounter: "rows",
        
        // IMPROVEMENT: Add placeholder for empty table
        placeholder: "No customers found",
        
        // Column Definitions
        columns: [
            { 
                formatter: "rowSelection", 
                titleFormatter: "rowSelection", 
                hozAlign: "center", 
                headerSort: false, 
                width: 40, 
                minWidth: 40, 
                maxWidth: 40, 
                resizable: false,
                frozen: true // IMPROVEMENT: Keep checkbox visible on horizontal scroll
            },
            { 
                title: "Customer", 
                field: "customer", 
                formatter: customerFormatter, 
                minWidth: 180, 
                widthGrow: 2.5,
                headerSort: true, // IMPROVEMENT: Enable sorting
                sorter: function(a, b, aRow, bRow, column, dir, sorterParams) {
                    // Custom sorter for nested customer.name
                    return (a?.name || "").localeCompare(b?.name || "");
                }
            },
            { 
                title: "Branch", 
                field: "branchId", 
                formatter: branchFormatter, 
                minWidth: 180, 
                widthGrow: 2.5,
                headerSort: true,
                sorter: function(a, b, aRow, bRow, column, dir, sorterParams) {
                    // Sort by branch name
                    const branchA = BRANCHES.find(br => br.id === a);
                    const branchB = BRANCHES.find(br => br.id === b);
                    return (branchA?.name || "").localeCompare(branchB?.name || "");
                }
            },
            { 
                title: "Status", 
                field: "status", 
                formatter: statusFormatter, 
                minWidth: 120, 
                widthGrow: 1,
                headerSort: true
            },
            { 
                title: "Email", 
                field: "email", 
                minWidth: 160, 
                widthGrow: 2,
                headerSort: true
            },
            { 
                title: "Reg. Date", 
                field: "regDate", 
                minWidth: 160, 
                widthGrow: 1.5,
                headerSort: true
            }
        ],

        // Data
        data: TABLE_DATA,

        // Event Callbacks
        tableBuilt: function() {
            console.log("Table built successfully");
            fitRowsToTable(this);
        },
        
        pageLoaded: function() {
            updateTableInfo(this);
            renderPagination(this);
        },
        
        dataLoaded: function() {
            console.log(`Loaded ${this.getDataCount()} records`);
            updateTableInfo(this);
            renderPagination(this);
        },

        // IMPROVEMENT: Add error handling
        dataLoadError: function(error) {
            console.error("Error loading table data:", error);
        },

        // IMPROVEMENT: Add row click handler (optional - can be customized)
        rowClick: function(e, row) {
            // You can add custom row click behavior here
            // Example: console.log("Clicked row:", row.getData());
        }
    });

    // ============================================================
    // PAGE SIZE SELECTOR
    // ============================================================
    const pageSizeSelector = document.getElementById("pageSizeSelector");
    if (pageSizeSelector) {
        pageSizeSelector.addEventListener("change", function() {
            const newSize = parseInt(this.value);
            
            if (isNaN(newSize) || newSize < 1) {
                console.error("Invalid page size:", this.value);
                return;
            }

            table.setPageSize(newSize);
            updateTableInfo(table);
            renderPagination(table);
            
            // IMPROVEMENT: Add small delay to ensure DOM is updated
            setTimeout(() => fitRowsToTable(table), 100);
        });
    } else {
        console.warn("Page size selector #pageSizeSelector not found");
    }

    // ============================================================
    // SEARCH FUNCTIONALITY
    // ============================================================
    const searchBtn = document.getElementById("tableSearchBtn");
    const searchInput = document.getElementById("tableSearchInput");

    if (searchBtn && searchInput) {
        // IMPROVEMENT: Modern search with input field instead of prompt
        searchBtn.addEventListener("click", function() {
            const searchTerm = searchInput.value.trim();
            handleTableSearch(table, searchTerm);
        });

        // IMPROVEMENT: Search on Enter key
        searchInput.addEventListener("keyup", function(e) {
            if (e.key === "Enter") {
                const searchTerm = this.value.trim();
                handleTableSearch(table, searchTerm);
            }
        });

        // IMPROVEMENT: Live search (optional - can be debounced)
        // Uncomment if you want real-time filtering
        /*
        let searchTimeout;
        searchInput.addEventListener("input", function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                handleTableSearch(table, this.value.trim());
            }, 300); // 300ms debounce
        });
        */
    } else if (searchBtn) {
        // Fallback to prompt if no search input exists
        searchBtn.addEventListener("click", function() {
            const searchTerm = prompt("Enter search term:");
            if (searchTerm !== null) {
                handleTableSearch(table, searchTerm);
            }
        });
    }

    // ============================================================
    // DYNAMIC ROW FITTING ON RESIZE
    // ============================================================
    const wrapper = document.querySelector(".full-table-wrapper");
    if (wrapper && window.ResizeObserver) {
        // IMPROVEMENT: Debounce resize observer for better performance
        let resizeTimeout;
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                fitRowsToTable(table);
            }, 150); // 150ms debounce
        });
        resizeObserver.observe(wrapper);
    } else if (!window.ResizeObserver) {
        console.warn("ResizeObserver not supported - dynamic row fitting disabled");
        
        // Fallback to window resize event
        window.addEventListener("resize", function() {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(() => {
                fitRowsToTable(table);
            }, 150);
        });
    }

    // ============================================================
    // EXPOSE TABLE TO WINDOW (for debugging/external access)
    // ============================================================
    // IMPROVEMENT: Make table accessible globally for debugging
    window.customerTable = table;
    console.log("Customer table initialized. Access via window.customerTable");
});


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

/**
 * Get selected rows from table
 * @returns {Array} Array of selected row data
 */
function getSelectedRows() {
    if (!table) {
        console.error("Table not initialized");
        return [];
    }
    return table.getSelectedData();
}

/**
 * Export table data to CSV
 * IMPROVEMENT: Added export functionality
 */
function exportToCSV() {
    if (!table) {
        console.error("Table not initialized");
        return;
    }
    table.download("csv", "customers.csv");
}

/**
 * Export table data to JSON
 * IMPROVEMENT: Added export functionality
 */
function exportToJSON() {
    if (!table) {
        console.error("Table not initialized");
        return;
    }
    table.download("json", "customers.json");
}

/**
 * Refresh table data
 * IMPROVEMENT: Added refresh functionality
 */
function refreshTable() {
    if (!table) {
        console.error("Table not initialized");
        return;
    }
    table.setData(TABLE_DATA);
}

// Expose utility functions globally
window.tableUtils = {
    getSelectedRows,
    exportToCSV,
    exportToJSON,
    refreshTable
};
</script>








<?php include '../../public/includes/initial-js.php'; ?>


</html>