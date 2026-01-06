<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "../db.php";

/* 1. Проверяем заголовок Authorization */
$headers = getallheaders();

if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Authorization header missing"
    ]);
    exit;
}

/* 2. Достаём токен */
$token = str_replace("Bearer ", "", $headers['Authorization']);

/* 3. Ищем пользователя */
$stmt = $pdo->prepare(
    "SELECT id, username FROM users WHERE token = ?"
);
$stmt->execute([$token]);
$user = $stmt->fetch();

if (!$user) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid token"
    ]);
    exit;
}

/* 4. Возвращаем пользователя */
echo json_encode([
    "status" => "success",
    "user" => $user
]);
exit;
