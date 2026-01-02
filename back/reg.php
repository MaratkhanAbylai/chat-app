<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

header("Content-Type: application/json; charset=utf-8");

require_once "db.php";

$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['username'], $input['password'])) {
    echo json_encode(["status" => "error", "message" => "Некорректные данные"]);
    exit;
}

$username = trim($input['username']);
$password = $input['password'];

if ($username === "" || $password === "") {
    echo json_encode(["status" => "error", "message" => "Логин и пароль обязательны"]);
    exit;
}

/* проверка на существование */
$stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
$stmt->execute([$username]);

if ($stmt->fetch()) {
    echo json_encode(["status" => "error", "message" => "Пользователь уже существует"]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare(
        "INSERT INTO users (username, password) VALUES (?, ?)"
    );
    $stmt->execute([$username, $hashedPassword]);

    echo json_encode([
        "status" => "success",
        "user_id" => $pdo->lastInsertId(),
        "username" => $username
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}

