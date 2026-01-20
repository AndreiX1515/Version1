<?php
header('Content-Type: application/json; charset=utf-8');

$passwords = ['', 'cloud1234', 'root', '1234'];
$servername = "localhost";
$username = "root";
$dbname = "smarttravel";

foreach ($passwords as $password) {
    $conn = @new mysqli($servername, $username, $password, $dbname);

    if (!$conn->connect_error) {
        $conn->set_charset("utf8");

        // 모든 가이드 계정 확인
        $query = "SELECT a.accountId, a.emailAddress, a.username, g.guideName
                  FROM accounts a
                  INNER JOIN guides g ON a.accountId = g.accountId
                  WHERE a.accountType = 'guide'
                  LIMIT 10";

        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            $guides = [];
            while ($row = $result->fetch_assoc()) {
                $guides[] = $row;
            }

            echo json_encode([
                'success' => true,
                'message' => 'Found ' . count($guides) . ' guide account(s)',
                'dbPassword' => $password === '' ? '(empty)' : $password,
                'guides' => $guides,
                'testUrl' => 'http://localhost/smt-escape/admin/guide/full-list.html?test_guide=1',
                'instructions' => 'Use the test URL above to login automatically with the first guide account'
            ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
        } else {
            // 가이드 없으면 새로 생성 (랜덤 username)
            $randomNum = rand(1000, 9999);
            $email = "guide{$randomNum}@smarttravel.com";
            $hashedPassword = password_hash('guide1234', PASSWORD_DEFAULT);
            $guideName = "Guide {$randomNum}";
            $username_val = "guide{$randomNum}";

            $sql1 = "INSERT INTO accounts (emailAddress, password, accountType, username, createdAt)
                     VALUES ('$email', '$hashedPassword', 'guide', '$username_val', NOW())";

            if ($conn->query($sql1)) {
                $accountId = $conn->insert_id;

                $sql2 = "INSERT INTO guides (accountId, guideName, createdAt)
                         VALUES ($accountId, '$guideName', NOW())";

                if ($conn->query($sql2)) {
                    echo json_encode([
                        'success' => true,
                        'message' => 'New guide account created',
                        'dbPassword' => $password === '' ? '(empty)' : $password,
                        'guide' => [
                            'accountId' => $accountId,
                            'emailAddress' => $email,
                            'password' => 'guide1234',
                            'username' => $username_val,
                            'guideName' => $guideName
                        ],
                        'testUrl' => 'http://localhost/smt-escape/admin/guide/full-list.html?test_guide=1',
                        'loginInfo' => [
                            'email' => $email,
                            'password' => 'guide1234'
                        ]
                    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                } else {
                    echo json_encode([
                        'success' => false,
                        'message' => 'Failed to create guide',
                        'error' => $conn->error
                    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
                }
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'Failed to create account',
                    'error' => $conn->error
                ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
            }
        }

        $conn->close();
        exit;
    }
}

echo json_encode([
    'success' => false,
    'message' => 'Could not connect to database'
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
