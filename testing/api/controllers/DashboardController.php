<?php
/**
 * Dashboard Controller
 * Handles dashboard-related API requests
 * Place this in /api/controllers/DashboardController.php
 */

class DashboardController {
    private $db;

    public function __construct() {
        // Initialize database connection
        // $this->db = new PDO('mysql:host=localhost;dbname=your_db', 'username', 'password');
    }

    /**
     * Get dashboard statistics
     * @return array
     */
    public function getStats() {
        // Example: Fetch from database
        // $stmt = $this->db->query("SELECT * FROM stats");
        // $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // For now, return mock data
        return [
            'success' => true,
            'stats' => [
                [
                    'label' => 'Total Revenue',
                    'value' => '$' . number_format(124500, 0),
                    'change' => '+12.5%',
                    'positive' => true
                ],
                [
                    'label' => 'Active Users',
                    'value' => number_format(2847, 0),
                    'change' => '+8.2%',
                    'positive' => true
                ],
                [
                    'label' => 'Conversion Rate',
                    'value' => '3.24%',
                    'change' => '-0.5%',
                    'positive' => false
                ],
                [
                    'label' => 'Avg. Session',
                    'value' => '4m 32s',
                    'change' => '+1.2%',
                    'positive' => true
                ]
            ]
        ];
    }

    /**
     * Get recent activity
     * @return array
     */
    public function getRecentActivity() {
        return [
            'success' => true,
            'activities' => [
                ['message' => 'New order #1234 received', 'time' => '2 minutes ago'],
                ['message' => 'User registration spike detected', 'time' => '15 minutes ago'],
                ['message' => 'System backup completed', 'time' => '1 hour ago'],
                ['message' => 'Performance optimization applied', 'time' => '3 hours ago']
            ]
        ];
    }
}

/**
 * Analytics Controller
 * Place this in /api/controllers/AnalyticsController.php
 */
class AnalyticsController {
    public function getMetrics() {
        return [
            'success' => true,
            'metrics' => [
                'pageViews' => 45234,
                'uniqueVisitors' => 12847,
                'bounceRate' => 42.3,
                'avgDuration' => '3m 45s'
            ]
        ];
    }

    public function getTrafficSources() {
        return [
            'success' => true,
            'sources' => [
                ['name' => 'Organic Search', 'value' => 45.2],
                ['name' => 'Direct', 'value' => 28.7],
                ['name' => 'Social Media', 'value' => 15.3],
                ['name' => 'Referral', 'value' => 10.8]
            ]
        ];
    }
}

/**
 * Reports Controller
 * Place this in /api/controllers/ReportsController.php
 */
class ReportsController {
    public function getSalesReport() {
        return [
            'success' => true,
            'data' => [
                'totalSales' => 125400,
                'transactions' => 847,
                'averageOrder' => 148.05,
                'topProducts' => [
                    ['name' => 'Product A', 'sales' => 45000],
                    ['name' => 'Product B', 'sales' => 32000],
                    ['name' => 'Product C', 'sales' => 28000]
                ]
            ]
        ];
    }

    public function getInventoryReport() {
        return [
            'success' => true,
            'data' => [
                'totalItems' => 1247,
                'lowStock' => 23,
                'outOfStock' => 5
            ]
        ];
    }
}