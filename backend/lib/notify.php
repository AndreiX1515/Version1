<?php
/**
 * Unified notification helper:
 * - inserts into `notifications` table (schema-flexible)
 * - enqueues to push_queue (legacy worker)
 * - sends Expo push immediately if accounts.expoPushToken exists
 */

require_once __DIR__ . '/push.php';

if (!function_exists('notify_table_exists')) {
    function notify_table_exists(mysqli $conn): bool {
        $r = $conn->query("SHOW TABLES LIKE 'notifications'");
        return ($r && $r->num_rows > 0);
    }
}

if (!function_exists('notify_notifications_columns')) {
    function notify_notifications_columns(mysqli $conn): array {
        $cols = [];
        $r = $conn->query("SHOW COLUMNS FROM notifications");
        while ($r && ($row = $r->fetch_assoc())) {
            $cols[strtolower($row['Field'])] = $row['Field'];
        }
        return $cols;
    }
}

if (!function_exists('notify_bind_params_by_ref')) {
    function notify_bind_params_by_ref(mysqli_stmt $stmt, string $types, array &$params): void {
        $bind = [];
        $bind[] = $types;
        foreach ($params as $i => $_) {
            $bind[] = &$params[$i];
        }
        call_user_func_array([$stmt, 'bind_param'], $bind);
    }
}

if (!function_exists('notify_user')) {
    /**
     * @param mysqli $conn
     * @param int $accountId receiver
     * @param string $title
     * @param string $message
     * @param string $type (booking/payment/visa/general/promotional/inquiry...)
     * @param string $category
     * @param string $priority (low/medium/high)
     * @param string $actionUrl relative user URL
     * @param array $data
     */
    function notify_user(mysqli $conn, int $accountId, string $title, string $message, string $type = 'general', string $category = 'general', string $priority = 'high', string $actionUrl = '', array $data = []): array {
        if ($accountId <= 0) return ['ok' => false, 'error' => 'invalid accountId'];
        if (!notify_table_exists($conn)) {
            // still attempt expo push even if notifications table missing
            $push = expo_send_push_for_account($conn, $accountId, $title, $message, $actionUrl, $data);
            return ['ok' => true, 'skipped' => 'no notifications table', 'push' => $push];
        }

        $cols = notify_notifications_columns($conn);
        $hasType = isset($cols['type']);
        $hasNotificationType = isset($cols['notificationtype']);
        $hasCategory = isset($cols['category']);
        $hasData = isset($cols['data']);
        $hasRelatedId = isset($cols['relatedid']);

        $fields = ["accountId", "title", "message"];
        $placeholders = ["?", "?", "?"];
        $values = [$accountId, $title, $message];
        $typesStr = "iss";

        if ($hasType) {
            $fields[] = $cols['type'];
            $placeholders[] = "?";
            $values[] = $type;
            $typesStr .= "s";
        } elseif ($hasNotificationType) {
            $fields[] = $cols['notificationtype'];
            $placeholders[] = "?";
            $values[] = $type;
            $typesStr .= "s";
        }

        if ($hasCategory) {
            $fields[] = $cols['category'];
            $placeholders[] = "?";
            $values[] = $category;
            $typesStr .= "s";
        }

        $fields[] = "priority";
        $placeholders[] = "?";
        $values[] = $priority;
        $typesStr .= "s";

        $fields[] = "isRead";
        $placeholders[] = "0";

        $fields[] = "actionUrl";
        $placeholders[] = "?";
        $values[] = $actionUrl;
        $typesStr .= "s";

        if ($hasData) {
            $fields[] = $cols['data'];
            $placeholders[] = "?";
            $values[] = json_encode($data, JSON_UNESCAPED_UNICODE);
            $typesStr .= "s";
        }

        if ($hasRelatedId) {
            $fields[] = $cols['relatedid'];
            $placeholders[] = "?";
            $values[] = (string)($data['bookingId'] ?? ($data['inquiryId'] ?? ($data['applicationId'] ?? ($data['relatedId'] ?? ''))));
            $typesStr .= "s";
        }

        $fields[] = "createdAt";
        $placeholders[] = "NOW()";

        $sql = "INSERT INTO notifications (" . implode(", ", $fields) . ") VALUES (" . implode(", ", $placeholders) . ")";
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            notify_bind_params_by_ref($stmt, $typesStr, $values);
            @$stmt->execute();
            @$stmt->close();
        }

        // legacy queue
        try {
            push_enqueue_for_account($conn, $accountId, $title, $message, $actionUrl, [
                'type' => $type,
                'category' => $category,
                'priority' => $priority,
                'data' => $data,
            ]);
        } catch (Throwable $_) {}

        // expo immediate
        $push = null;
        try {
            $push = expo_send_push_for_account($conn, $accountId, $title, $message, $actionUrl, [
                'type' => $type,
                'category' => $category,
                'priority' => $priority,
                'data' => $data,
            ]);
        } catch (Throwable $_) {}

        return ['ok' => true, 'push' => $push];
    }
}


