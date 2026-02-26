<?php
/**
 * PHP API Router
 * This is the main entry point for all API requests
 * Place this in /api/index.php
 */

// Enable CORS if needed
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Simple router
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// Remove query string and API prefix
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/api', '', $path);

// Route handling
try {
    switch ($path) {
        case '/dashboard/stats':
            if ($request_method === 'GET') {
                require_once '../controllers/DashboardController.php';
                $controller = new DashboardController();
                echo json_encode($controller->getStats());
            }
            break;

        case '/analytics/metrics':
            if ($request_method === 'GET') {
                require_once 'controllers/AnalyticsController.php';
                $controller = new AnalyticsController();
                echo json_encode($controller->getMetrics());
            }
            break;

        case '/reports/sales':
            if ($request_method === 'GET') {
                require_once 'controllers/ReportsController.php';
                $controller = new ReportsController();
                echo json_encode($controller->getSalesReport());
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Endpoint not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}