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

$stmt = $conn->prepare("SELECT password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Пользователь не найден"]);
    exit;
}

$user = $result->fetch_assoc();

if (password_verify($password, $user["password"])) {
    echo json_encode(["status" => "ok", "message" => "Добро пожаловать"]);
} else {
    echo json_encode(["status" => "error", "message" => "Неверный пароль"]);
}
?>