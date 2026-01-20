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

        // 모든 테이블 확인
        $tables = [];
        $result = $conn->query("SHOW TABLES");
        while ($row = $result->fetch_array()) {
            $tables[] = $row[0];
        }

        // guide 관련 테이블 찾기
        $guideTables = array_filter($tables, function($table) {
            return stripos($table, 'guide') !== false;
        });

        // accounts 테이블에서 가이드 타입 계정 찾기
        $guideAccounts = [];
        $query = "SELECT accountId, emailAddress, username, accountType FROM accounts WHERE accountType LIKE '%guide%' LIMIT 10";
        $result = $conn->query($query);
        if ($result) {
            while ($row = $result->fetch_assoc()) {
                $guideAccounts[] = $row;
            }
        }

        echo json_encode([
            'success' => true,
            'dbPassword' => $password === '' ? '(empty)' : $password,
            'allTables' => $tables,
            'guideRelatedTables' => array_values($guideTables),
            'guideAccounts' => $guideAccounts,
            'testUrl' => count($guideAccounts) > 0 ? 'http://localhost/smt-escape/admin/guide/full-list.html?test_guide=1' : null
        ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        $conn->close();
        exit;
    }
}

echo json_encode([
    'success' => false,
    'message' => 'Could not connect to database'
], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
?>
