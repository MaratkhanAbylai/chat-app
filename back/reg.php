<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");

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

if ($username === "" || $password === "") {
    echo json_encode([
        "status" => "error",
        "message" => "Логин и пароль обязательны"
    ]);
    exit;
}

/* проверка: существует ли пользователь */
$stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
$stmt->execute([$username]);

if ($stmt->fetch()) {
    echo json_encode([
        "status" => "error",
        "message" => "Пользователь уже существует"
    ]);
    exit;
}

/* хеширование пароля */
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

/* вставка пользователя */
$stmt = $pdo->prepare(
    "INSERT INTO users (username, password) VALUES (?, ?)"
);

if ($stmt->execute([$username, $hashedPassword])) {
    echo json_encode([
        "status" => "success",
        "message" => "Регистрация успешна"
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Ошибка регистрации"
        "user_id" => $user['id'],
        "username" => $username
    ]);
}

