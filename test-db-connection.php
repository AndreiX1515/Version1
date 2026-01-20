<?php
header('Content-Type: application/json; charset=utf-8');

// 다양한 비밀번호로 연결 시도
$passwords = ['cloud1234', '', 'root', '1234'];
$servername = "localhost";
$username = "root";
$dbname = "smarttravel";

$connectionResult = [];

foreach ($passwords as $password) {
    $conn = @new mysqli($servername, $username, $password, $dbname);

    if (!$conn->connect_error) {
        $connectionResult['success'] = true;
        $connectionResult['password'] = $password === '' ? '(empty)' : $password;

        // 가이드 계정 확인
        $checkQuery = "SELECT a.accountId, a.emailAddress, a.accountType, g.guideName
                       FROM accounts a
                       INNER JOIN guides g ON a.accountId = g.accountId
                       WHERE a.accountType = 'guide'
                       LIMIT 1";

        $result = $conn->query($checkQuery);

        if ($result && $result->num_rows > 0) {
            $guide = $result->fetch_assoc();
            $connectionResult['existingGuide'] = $guide;
            $connectionResult['testUrl'] = 'http://localhost/smt-escape/admin/guide/full-list.html?test_guide=1';
        } else {
            // 가이드 계정 생성
            $email = 'test.guide@smarttravel.com';
            $hashedPassword = password_hash('guide1234', PASSWORD_DEFAULT);
            $guideName = 'Test Guide';

            try {
                $conn->begin_transaction();

                // accounts 삽입
                $stmt1 = $conn->prepare("INSERT INTO accounts (emailAddress, password, accountType, username, createdAt) VALUES (?, ?, 'guide', ?, NOW())");
                $stmt1->bind_param('sss', $email, $hashedPassword, $guideName);
                $stmt1->execute();
                $accountId = $conn->insert_id;
                $stmt1->close();

                // guides 삽입
                $stmt2 = $conn->prepare("INSERT INTO guides (accountId, guideName, createdAt) VALUES (?, ?, NOW())");
                $stmt2->bind_param('is', $accountId, $guideName);
                $stmt2->execute();
                $stmt2->close();

                $conn->commit();

                $connectionResult['newGuide'] = [
                    'accountId' => $accountId,
                    'emailAddress' => $email,
                    'password' => 'guide1234',
                    'guideName' => $guideName
                ];
                $connectionResult['testUrl'] = 'http://localhost/smt-escape/admin/guide/full-list.html?test_guide=1';

            } catch (Exception $e) {
                $conn->rollback();
                $connectionResult['error'] = $e->getMessage();
            }
        }

        $conn->close();
        echo json_encode($connectionResult, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        exit;
    }
}

// 모든 비밀번호 실패
echo json_encode([
    'success' => false,
    'message' => 'Could not connect to database with any password',
    'triedPasswords' => $passwords
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
