<?php
/**
 * Minimal mailer with optional SMTP (Gmail-ready).
 *
 * Configure via environment variables:
 * - SMTP_HOST (e.g. smtp.gmail.com)
 * - SMTP_PORT (e.g. 587)
 * - SMTP_USER (full email)
 * - SMTP_PASS (Gmail App Password)
 * - SMTP_FROM (optional, default SMTP_USER)
 * - SMTP_FROM_NAME (optional, default "Smart Travel")
 *
 * If SMTP_* are not configured, this will fall back to PHP mail() if available.
 * If mail() is also unavailable, it will return false (caller may log).
 */

function mailer_send(string $toEmail, string $subject, string $htmlBody, string $textBody = ''): array {
    $host = trim((string)getenv('SMTP_HOST'));
    $port = (int)(getenv('SMTP_PORT') ?: 587);
    $user = trim((string)getenv('SMTP_USER'));
    $pass = (string)getenv('SMTP_PASS');
    $from = trim((string)getenv('SMTP_FROM'));
    $fromName = trim((string)getenv('SMTP_FROM_NAME')) ?: 'Smart Travel';

    if ($from === '') $from = $user;

    // Prefer SMTP when configured
    if ($host !== '' && $port > 0 && $user !== '' && $pass !== '' && $from !== '') {
        $smtp = smtp_send_mail($host, $port, $user, $pass, $from, $fromName, $toEmail, $subject, $htmlBody, $textBody);
        return [
            'ok' => (bool)($smtp['ok'] ?? false),
            'via' => 'smtp',
            'error' => $smtp['error'] ?? null,
        ];
    }

    // Fallback: PHP mail()
    if (function_exists('mail')) {
        $boundary = 'bnd_' . bin2hex(random_bytes(8));
        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'From: ' . sprintf('"%s" <%s>', addcslashes($fromName, '"\\'), $from ?: 'no-reply@' . ($_SERVER['HTTP_HOST'] ?? 'localhost'));
        $headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';

        $text = $textBody !== '' ? $textBody : strip_tags($htmlBody);
        $body = '';
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
        $body .= $text . "\r\n";
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
        $body .= $htmlBody . "\r\n";
        $body .= "--{$boundary}--\r\n";

        $ok = @mail($toEmail, $subject, $body, implode("\r\n", $headers));
        return [
            'ok' => (bool)$ok,
            'via' => 'mail',
        ];
    }

    return [
        'ok' => false,
        'via' => 'none',
        'error' => 'No SMTP config and mail() unavailable',
    ];
}

function smtp_send_mail(
    string $host,
    int $port,
    string $user,
    string $pass,
    string $fromEmail,
    string $fromName,
    string $toEmail,
    string $subject,
    string $htmlBody,
    string $textBody = ''
): array {
    $timeout = 12;
    $transport = ($port === 465) ? "ssl://{$host}:{$port}" : "tcp://{$host}:{$port}";
    $fp = @stream_socket_client($transport, $errno, $errstr, $timeout, STREAM_CLIENT_CONNECT);
    if (!$fp) return ['ok' => false, 'error' => "connect failed: {$errstr} ({$errno})"];

    stream_set_timeout($fp, $timeout);

    $expect = function(array $codes) use ($fp) {
        $data = '';
        while (($line = fgets($fp, 515)) !== false) {
            $data .= $line;
            // multi-line response ends when 4th char is space
            if (strlen($line) >= 4 && $line[3] === ' ') break;
        }
        $code = (int)substr($data, 0, 3);
        return ['ok' => in_array($code, $codes, true), 'code' => $code, 'raw' => $data];
    };

    $send = function(string $cmd) use ($fp) {
        fwrite($fp, $cmd . "\r\n");
    };

    $r = $expect([220]);
    if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'bad greeting: ' . ($r['raw'] ?? '')]; }

    $localHost = $_SERVER['HTTP_HOST'] ?? 'localhost';
    $send("EHLO {$localHost}");
    $r = $expect([250]);
    if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'EHLO failed: ' . ($r['raw'] ?? '')]; }

    // STARTTLS (587). For 465, TLS is already established via ssl://
    if ($port !== 465) {
        $send("STARTTLS");
        $r = $expect([220]);
        if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'STARTTLS failed: ' . ($r['raw'] ?? '')]; }
        $cryptoOk = @stream_socket_enable_crypto($fp, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        if ($cryptoOk !== true) { fclose($fp); return ['ok' => false, 'error' => 'TLS negotiation failed']; }

        // EHLO again after TLS
        $send("EHLO {$localHost}");
        $r = $expect([250]);
        if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'EHLO(after TLS) failed: ' . ($r['raw'] ?? '')]; }
    }

    // AUTH LOGIN
    $send("AUTH LOGIN");
    $r = $expect([334]);
    if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'AUTH LOGIN rejected: ' . ($r['raw'] ?? '')]; }
    $send(base64_encode($user));
    $r = $expect([334]);
    if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'AUTH user rejected: ' . ($r['raw'] ?? '')]; }
    $send(base64_encode($pass));
    $r = $expect([235]);
    if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'AUTH pass rejected: ' . ($r['raw'] ?? '')]; }

    $send("MAIL FROM:<{$fromEmail}>");
    $r = $expect([250]);
    if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'MAIL FROM failed: ' . ($r['raw'] ?? '')]; }

    $send("RCPT TO:<{$toEmail}>");
    $r = $expect([250, 251]);
    if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'RCPT TO failed: ' . ($r['raw'] ?? '')]; }

    $send("DATA");
    $r = $expect([354]);
    if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'DATA failed: ' . ($r['raw'] ?? '')]; }

    $boundary = 'bnd_' . bin2hex(random_bytes(8));
    $text = $textBody !== '' ? $textBody : strip_tags($htmlBody);
    $encodedSubject = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $fromHeader = sprintf('"%s" <%s>', addcslashes($fromName, '"\\'), $fromEmail);

    $headers = [];
    $headers[] = "From: {$fromHeader}";
    $headers[] = "To: <{$toEmail}>";
    $headers[] = "Subject: {$encodedSubject}";
    $headers[] = "MIME-Version: 1.0";
    $headers[] = "Content-Type: multipart/alternative; boundary=\"{$boundary}\"";

    $msg = implode("\r\n", $headers) . "\r\n\r\n";
    $msg .= "--{$boundary}\r\n";
    $msg .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
    $msg .= $text . "\r\n";
    $msg .= "--{$boundary}\r\n";
    $msg .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $msg .= $htmlBody . "\r\n";
    $msg .= "--{$boundary}--\r\n";

    // Dot-stuffing
    $msg = preg_replace("/\r\n\./", "\r\n..", $msg);

    fwrite($fp, $msg . "\r\n.\r\n");
    $r = $expect([250]);
    if (!($r['ok'] ?? false)) { fclose($fp); return ['ok' => false, 'error' => 'message not accepted: ' . ($r['raw'] ?? '')]; }

    $send("QUIT");
    fclose($fp);
    return ['ok' => true];
}

