<?php
require_once "db.php";
$input = json_decode(file_get_contents("php://input"), true);

$fromUser = (int)$input['from_user'];
$toUser = (int)$input['to_User'];

if($fromUser === $toUser) {
    echo json_encode(["status" => "error", "message" => "нельзя себя добавить"]);
    exit;
}

$stmt->execute([$fromUser , $toUser]);
if($stmt->fetch()){
    echo json_encode(["status" => "error", "message" => "Запрос уже отправлен"]);
    exit;
}

$stmt = $pdo->prepare(
  "INSERT INTO friends (user_id, friend_id, status)
   VALUES (?, ?, 'pending')");
$stmt->execute([fromUser, $toUser]);

echo json_encode([
  "status" => "success",
  "message" => "Запрос отправлен"
]);
