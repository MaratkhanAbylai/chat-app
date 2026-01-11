<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../db.php";
require_once "../auth.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!is_array($input)) {
    echo json_encode([
        "status" => "success",
        "users" => []
    ]);
    exit;
}

$search = trim($input['query'] ?? '');

if ($search === '') {
    echo json_encode([
        "status" => "success",
        "users" => []
    ]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT id, username AS login
    FROM users
    WHERE username LIKE ?
      AND id != ?
    LIMIT 10
");

$stmt->execute([
    "%$search%",
    $user['id']
]);

echo json_encode([
    "status" => "success",
    "users" => $stmt->fetchAll()
]);
exit;
