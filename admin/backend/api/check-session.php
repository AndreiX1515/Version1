<?php
// conn.php   (conn.php   )
require __DIR__ . '/../../../backend/conn.php';

//  conn.php    
//     

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit(0);
}

// : ?test_admin=super_admin  Referer test_admin=super_admin    (/ )
// - super-api.php test_admin   
// -    URL ?test_admin=super_admin   check-session   Referer 
try {
    $testAdmin = $_GET['test_admin'] ?? null;
    if (!$testAdmin) {
        $ref = (string)($_SERVER['HTTP_REFERER'] ?? '');
        if ($ref !== '' && preg_match('/[?&]test_admin=super_admin(?:&|$)/', $ref)) {
            $testAdmin = 'super_admin';
        }
    }
    if ($testAdmin === 'super_admin') {
        if (session_status() === PHP_SESSION_NONE) @session_start();
        $_SESSION['admin_accountId'] = $_SESSION['admin_accountId'] ?? 6; // admin@smarttravel.com
        $_SESSION['admin_userType'] = $_SESSION['admin_userType'] ?? 'admin';
        $_SESSION['admin_emailAddress'] = $_SESSION['admin_emailAddress'] ?? 'admin@smarttravel.com';
    }
} catch (Throwable $e) {
    // ignore
}

// : ?test_guide=1  Referer test_guide=1    (/ )
try {
    $testGuide = $_GET['test_guide'] ?? null;
    if (!$testGuide) {
        $ref = (string)($_SERVER['HTTP_REFERER'] ?? '');
        if ($ref !== '' && preg_match('/[?&]test_guide=1(?:&|$)/', $ref)) {
            $testGuide = '1';
        }
    }
    if ((string)$testGuide === '1') {
        if (session_status() === PHP_SESSION_NONE) @session_start();
        if (empty($_SESSION['guide_accountId'])) {
            // guides/accountType=guide     
            $gid = null;
            try {
                $r = $conn->query("SELECT a.accountId, a.emailAddress
                                   FROM accounts a
                                   INNER JOIN guides g ON a.accountId = g.accountId
                                   WHERE a.accountType = 'guide'
                                   LIMIT 1");
                if ($r && $r->num_rows > 0) {
                    $row = $r->fetch_assoc();
                    $gid = intval($row['accountId'] ?? 0);
                    $email = (string)($row['emailAddress'] ?? '');
                    if ($gid > 0) {
                        $_SESSION['guide_accountId'] = $gid;
                        $_SESSION['guide_userType'] = 'guide';
                        $_SESSION['guide_emailAddress'] = $email;
                    }
                }
            } catch (Throwable $e) {
                // ignore
            }
        }
    }
} catch (Throwable $e) {
    // ignore
}

//   (admin, agent, guide, cs )
// - ()  (accountId )      
function buildDisplayInfo($conn, $userType, $accountId) {
    $userType = (string)$userType;
    $accountId = (int)$accountId;

    $displayName = '';
    $roleLabel = '';

    //   
    if ($userType === 'agent') $roleLabel = 'Agent';
    else if ($userType === 'guide') $roleLabel = 'Guide';
    else $roleLabel = 'Employee'; // admin/cs  Employee ()

    //  
    if ($userType === 'admin') {
        $displayName = 'ADMIN';
        return ['displayName' => $displayName, 'roleLabel' => $roleLabel];
    }
    if ($userType === 'cs') {
        $displayName = 'CS';
        return ['displayName' => $displayName, 'roleLabel' => $roleLabel];
    }

    // agent: branchName -> companyName -> accounts.username
    if ($userType === 'agent') {
        $agentTable = $conn->query("SHOW TABLES LIKE 'agent'");
        if ($agentTable && $agentTable->num_rows > 0) {
            $sql = "SELECT
                        COALESCE(NULLIF(b.branchName,''), NULLIF(c.companyName,''), NULLIF(a.username,''), '') AS displayName
                    FROM agent ag
                    LEFT JOIN company c ON ag.companyId = c.companyId
                    LEFT JOIN branch b ON c.branchId = b.branchId
                    LEFT JOIN accounts a ON ag.accountId = a.accountId
                    WHERE ag.accountId = ?
                    ORDER BY ag.id ASC
                    LIMIT 1";
            $st = $conn->prepare($sql);
            if ($st) {
                $st->bind_param('i', $accountId);
                $st->execute();
                $row = $st->get_result()->fetch_assoc();
                $st->close();
                $displayName = (string)($row['displayName'] ?? '');
            }
        }
    }

    // guide: guides.guideName -> accounts.username
    if ($userType === 'guide') {
        $guidesTable = $conn->query("SHOW TABLES LIKE 'guides'");
        if ($guidesTable && $guidesTable->num_rows > 0) {
            $st = $conn->prepare("SELECT COALESCE(NULLIF(g.guideName,''), NULLIF(a.username,''), '') AS displayName
                                  FROM guides g
                                  LEFT JOIN accounts a ON g.accountId = a.accountId
                                  WHERE g.accountId = ?
                                  LIMIT 1");
            if ($st) {
                $st->bind_param('i', $accountId);
                $st->execute();
                $row = $st->get_result()->fetch_assoc();
                $st->close();
                $displayName = (string)($row['displayName'] ?? '');
            }
        }
    }

    if ($displayName === '') {
        // fallback: accounts.username
        $st = $conn->prepare("SELECT COALESCE(NULLIF(username,''), NULLIF(emailAddress,''), '') AS displayName FROM accounts WHERE accountId = ? LIMIT 1");
        if ($st) {
            $st->bind_param('i', $accountId);
            $st->execute();
            $row = $st->get_result()->fetch_assoc();
            $st->close();
            $displayName = (string)($row['displayName'] ?? '');
        }
    }

    return ['displayName' => $displayName, 'roleLabel' => $roleLabel];
}

if (isset($_SESSION['admin_accountId'])) {
    $uid = (int)($_SESSION['admin_accountId'] ?? 0);
    $ut = $_SESSION['admin_userType'] ?? 'admin';
    $info = buildDisplayInfo($conn, $ut, $uid);
    echo json_encode([
        'success' => true,
        'authenticated' => true,
        'userType' => $ut,
        'accountId' => $uid,
        'emailAddress' => $_SESSION['admin_emailAddress'] ?? '',
        'displayName' => $info['displayName'],
        'roleLabel' => $info['roleLabel']
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (isset($_SESSION['agent_accountId'])) {
    $uid = (int)($_SESSION['agent_accountId'] ?? 0);
    $ut = $_SESSION['agent_userType'] ?? 'agent';
    $info = buildDisplayInfo($conn, $ut, $uid);
    echo json_encode([
        'success' => true,
        'authenticated' => true,
        'userType' => $ut,
        'accountId' => $uid,
        'emailAddress' => $_SESSION['agent_emailAddress'] ?? '',
        'displayName' => $info['displayName'],
        'roleLabel' => $info['roleLabel']
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (isset($_SESSION['guide_accountId'])) {
    $uid = (int)($_SESSION['guide_accountId'] ?? 0);
    $ut = $_SESSION['guide_userType'] ?? 'guide';
    $info = buildDisplayInfo($conn, $ut, $uid);
    echo json_encode([
        'success' => true,
        'authenticated' => true,
        'userType' => $ut,
        'accountId' => $uid,
        'emailAddress' => $_SESSION['guide_emailAddress'] ?? '',
        'displayName' => $info['displayName'],
        'roleLabel' => $info['roleLabel']
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

if (isset($_SESSION['cs_accountId'])) {
    $uid = (int)($_SESSION['cs_accountId'] ?? 0);
    $ut = $_SESSION['cs_userType'] ?? 'cs';
    $info = buildDisplayInfo($conn, $ut, $uid);
    echo json_encode([
        'success' => true,
        'authenticated' => true,
        'userType' => $ut,
        'accountId' => $uid,
        'emailAddress' => $_SESSION['cs_emailAddress'] ?? '',
        'displayName' => $info['displayName'],
        'roleLabel' => $info['roleLabel']
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

echo json_encode([
    'success' => true,
    'authenticated' => false
], JSON_UNESCAPED_UNICODE);
exit;
?>
