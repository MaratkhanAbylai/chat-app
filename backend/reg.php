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

/* 1. Проверяем, что пользователя нет */
$stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
$stmt->execute([$username]);

if ($stmt->fetch()) {
    echo json_encode([
        "status" => "error",
        "message" => "Пользователь уже существует"
    ]);
    exit;
}

/* 2. Хешируем пароль */
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

/* 3. Генерируем токен (ДА, ТУТ) */
$token = bin2hex(random_bytes(32));

/* 4. Создаём пользователя СРАЗУ с токеном */
$stmt = $pdo->prepare(
    "INSERT INTO users (username, password, token)
     VALUES (?, ?, ?)"
);
$stmt->execute([$username, $hashedPassword, $token]);

/* 5. Отдаём токен клиенту */
echo json_encode([
    "status" => "success",
    "message" => "Регистрация успешна",
    "token" => $token,
    "username" => $username
]);
exit;
