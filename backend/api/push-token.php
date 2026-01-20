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

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    send_json_response(['success' => false, 'message' => 'POST 요청만 허용됩니다.'], 405);
}

// Auth: rely on server session (webview/app)
$accountId = 0;
if (isset($_SESSION['user_id']) && (int)$_SESSION['user_id'] > 0) $accountId = (int)$_SESSION['user_id'];
else if (isset($_SESSION['accountId']) && (int)$_SESSION['accountId'] > 0) $accountId = (int)$_SESSION['accountId'];

if ($accountId <= 0) {
    send_json_response(['success' => false, 'message' => 'Unauthorized'], 401);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!is_array($input)) {
    send_json_response(['success' => false, 'message' => 'Invalid JSON'], 400);
}

$rawToken = (string)($input['token'] ?? $input['expoPushToken'] ?? $input['pushToken'] ?? '');
$rawToken = trim($rawToken);
if ($rawToken === '') {
    send_json_response(['success' => false, 'message' => 'token is required'], 400);
}

function normalize_expo_token(string $t): string {
    $t = trim($t);
    // Already in expected format
    if (preg_match('/^ExponentPushToken\\[[^\\]]+\\]$/', $t)) return $t;

    // Sometimes app may send only the token content, or "ExpoPushToken[...]"
    if (preg_match('/^Expo(nent)?PushToken\\[([^\\]]+)\\]$/', $t, $m)) {
        return 'ExponentPushToken[' . $m[2] . ']';
    }
    if (preg_match('/\\[([^\\]]+)\\]/', $t, $m)) {
        return 'ExponentPushToken[' . $m[1] . ']';
    }
    return 'ExponentPushToken[' . $t . ']';
}

$token = normalize_expo_token($rawToken);

function ensure_push_token_columns(mysqli $conn): array {
    $cols = [];
    $res = $conn->query("SHOW COLUMNS FROM accounts");
    if ($res) {
        while ($r = $res->fetch_assoc()) $cols[strtolower($r['Field'])] = true;
    }

    // Prefer expoPushToken/expoPushTokenUpdatedAt
    $needToken = !isset($cols['expopushtoken']);
    $needUpdated = !isset($cols['expopushtokenupdatedat']);

    if ($needToken || $needUpdated) {
        $parts = [];
        if ($needToken) $parts[] = "ADD COLUMN expoPushToken VARCHAR(255) NULL";
        if ($needUpdated) $parts[] = "ADD COLUMN expoPushTokenUpdatedAt DATETIME NULL";
        $sql = "ALTER TABLE accounts " . implode(", ", $parts);
        // Best-effort: do not hard-fail the entire request if ALTER fails; caller will see error.
        if (!$conn->query($sql)) {
            return [false, 'Failed to add token columns: ' . $conn->error];
        }
    }
    return [true, null];
}

[$ok, $err] = ensure_push_token_columns($conn);
if (!$ok) {
    send_json_response(['success' => false, 'message' => $err], 500);
}

$stmt = $conn->prepare("UPDATE accounts SET expoPushToken = ?, expoPushTokenUpdatedAt = NOW(), updatedAt = NOW() WHERE accountId = ?");
if (!$stmt) {
    send_json_response(['success' => false, 'message' => 'Prepare failed: ' . $conn->error], 500);
}
$stmt->bind_param('si', $token, $accountId);
$stmt->execute();
$stmt->close();

send_json_response([
    'success' => true,
    'message' => 'Token saved',
    'accountId' => $accountId,
    'expoPushToken' => $token
]);


