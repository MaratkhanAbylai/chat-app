<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "db.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['username'], $input['password'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Некорректные данные"
    ]);
    exit;
}

$username = trim($input['username']);
$password = $input['password'];

$stmt = $pdo->prepare(
    "SELECT id, username, password FROM users WHERE username = ?"
);
$stmt->execute([$username]);
$user = $stmt->fetch();

if (!$user) {
    echo json_encode([
        "status" => "error",
        "message" => "Пользователь не найден"
    ]);
    exit;
}

if (!password_verify($password, $user['password'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Неверный пароль"
    ]);
    exit;
}

/* === ВОТ ЕДИНСТВЕННОЕ МЕСТО С ТОКЕНОМ === */
$token = bin2hex(random_bytes(32));

$stmt = $pdo->prepare(
    "UPDATE users SET token = ? WHERE id = ?"
);
$stmt->execute([$token, $user['id']]);

echo json_encode([
    "status" => "success",
    "message" => "Успешный вход",
    "token" => $token,
    "user_id" => $user['id'],
    "username" => $user['username']
]);
exit;
