<?php
require_once "../db.php";

$headers = getallheaders();

if (!isset($headers['Authorization'])) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Authorization required"
    ]);
    exit;
}

$token = str_replace("Bearer ", "", $headers['Authorization']);

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

/*
  ВАЖНО:
  после require auth.php
  переменная $user доступна
*/
