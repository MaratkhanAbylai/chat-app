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
require_once "auth.php"; // 🔐 защита токеном

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['query']) || trim($input['query']) === "") {
    echo json_encode([
        "status" => "success",
        "users" => []
    ]);
    exit;
}

$query = "%" . trim($input['query']) . "%";


$stmt = $pdo->prepare("
    SELECT id, username AS login, avatar
    FROM users
    WHERE username LIKE ?
      AND id != ?
    LIMIT 10
");

$stmt->execute([$query, $user['id']]);
$users = $stmt->fetchAll();

echo json_encode([
    "status" => "success",
    "users" => $users
]);
exit;
