<?php
require_once __DIR__ . '/../conn.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/**
 * Expo Push API 호출 (서버에서 실행)
 * - 공식 endpoint: https://exp.host/--/api/v2/push/send
 *
 * @param string $expoPushToken ExponentPushToken[xxxxxxxx] 형식 (없으면 자동 보정)
 * @param string $title
 * @param string $body
 * @param array $data
 * @return array [ok(bool), httpStatus(int), response(mixed), error(string|null)]
 */
function send_expo_push_notification(string $expoPushToken, string $title, string $body, array $data = []): array {
    $token = trim($expoPushToken);
    if ($token === '') {
        return [false, 0, null, 'expoPushToken is required'];
    }
    // Normalize token format
    if (!preg_match('/^ExponentPushToken\\[[^\\]]+\\]$/', $token)) {
        if (preg_match('/\\[([^\\]]+)\\]/', $token, $m)) $token = 'ExponentPushToken[' . $m[1] . ']';
        else $token = 'ExponentPushToken[' . $token . ']';
    }

    $message = [
        'to' => $token,
        'sound' => 'default',
        'title' => $title,
        'body' => $body,
        'data' => (object)($data ?: ['someData' => 'goes here']),
    ];

    $url = 'https://exp.host/--/api/v2/push/send';
    $payload = json_encode($message, JSON_UNESCAPED_UNICODE);

    // Prefer cURL when available
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Accept: application/json',
            'Accept-encoding: gzip, deflate',
            'Content-Type: application/json',
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $raw = curl_exec($ch);
        $errno = curl_errno($ch);
        $err = $errno ? curl_error($ch) : null;
        $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($errno) {
            return [false, $status, $raw, $err ?: 'cURL error'];
        }
        $decoded = null;
        if (is_string($raw) && $raw !== '') {
            $decoded = json_decode($raw, true);
        }
        $ok = ($status >= 200 && $status < 300);
        return [$ok, $status, $decoded ?? $raw, null];
    }

    // Fallback: file_get_contents
    $opts = [
        'http' => [
            'method' => 'POST',
            'header' => "Accept: application/json\r\nAccept-encoding: gzip, deflate\r\nContent-Type: application/json\r\n",
            'content' => $payload,
            'timeout' => 10,
        ]
    ];
    $context = stream_context_create($opts);
    $raw = @file_get_contents($url, false, $context);
    $status = 0;
    if (isset($http_response_header) && is_array($http_response_header)) {
        foreach ($http_response_header as $h) {
            if (preg_match('#^HTTP/\\S+\\s+(\\d{3})#', $h, $m)) {
                $status = (int)$m[1];
                break;
            }
        }
    }
    $decoded = null;
    if (is_string($raw) && $raw !== '') $decoded = json_decode($raw, true);
    $ok = ($status >= 200 && $status < 300);
    return [$ok, $status, $decoded ?? $raw, $ok ? null : 'HTTP request failed'];
}

// If called as an API endpoint, require session (admin/agent/cs).
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    send_json_response(['success' => false, 'message' => 'POST 요청만 허용됩니다.'], 405);
}

$role = strtolower((string)($_SESSION['account_type'] ?? $_SESSION['accountRole'] ?? $_SESSION['user_type'] ?? ''));
$isAdminSession = isset($_SESSION['admin_accountId']) && (int)$_SESSION['admin_accountId'] > 0;
$isUserSession = isset($_SESSION['user_id']) && (int)$_SESSION['user_id'] > 0;
if (!$isAdminSession && !($isUserSession && in_array($role, ['admin', 'agent', 'cs'], true))) {
    send_json_response(['success' => false, 'message' => 'Unauthorized'], 401);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    send_json_response(['success' => false, 'message' => 'Invalid JSON'], 400);
}

$to = (string)($input['to'] ?? $input['expoPushToken'] ?? '');
$title = (string)($input['title'] ?? '');
$body = (string)($input['body'] ?? '');
$data = $input['data'] ?? [];
if (!is_array($data)) $data = [];

if (trim($to) === '' || trim($title) === '' || trim($body) === '') {
    send_json_response(['success' => false, 'message' => 'to/title/body is required'], 400);
}

[$ok, $status, $resp, $err] = send_expo_push_notification($to, $title, $body, $data);
send_json_response([
    'success' => $ok,
    'httpStatus' => $status,
    'response' => $resp,
    'error' => $err
], $ok ? 200 : 502);


