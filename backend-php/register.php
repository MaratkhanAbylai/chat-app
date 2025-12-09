<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"] ?? "";
$password = $data["password"] ?? "";

if (!$username || !$password) {
    echo json_encode(["status" => "error", "message" => "Введите логин и пароль"]);
    exit;
}

$stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Логин уже существует"]);
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);

$stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->bind_param("ss", $username, $hash);
$stmt->execute();

echo json_encode(["status" => "ok", "message" => "Регистрация успешна"]);
?>