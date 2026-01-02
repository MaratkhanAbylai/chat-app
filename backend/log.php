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

$stmt = $pdo->prepare("SELECT id, password FROM users WHERE username = ?");
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

// успех
echo json_encode([
    "status" => "success",
    "message" => "Успешный вход",
    "user_id" => $user['id']
    "username"=>$username
]);

