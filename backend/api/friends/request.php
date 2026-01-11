<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../../db.php";
require_once "../../auth.php"; // ← даёт $user (отправитель)

$input = json_decode(file_get_contents("php://input"), true);

$to = (int)($input['to'] ?? 0);
$from = (int)$user['id'];

if ($to <= 0 || $to === $from) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid target user"
    ]);
    exit;
}

/* Проверяем, не существует ли уже заявка */
$check = $pdo->prepare("
    SELECT id FROM friend_requests
    WHERE from_user = ? AND to_user = ?
");
$check->execute([$from, $to]);

if ($check->fetch()) {
    echo json_encode([
        "status" => "success",
        "message" => "Request already exists"
    ]);
    exit;
}

/* Создаём заявку */
$stmt = $pdo->prepare("
    INSERT INTO friend_requests (from_user, to_user)
    VALUES (?, ?)
");
$stmt->execute([$from, $to]);

echo json_encode([
    "status" => "success"
]);
