<?php
require_once "db.php";
$input = json_decode(file_get_contents("php://input"), true);

$fromUser = (int)$input['from_user'];
$toUser = (int)$input['to_user'];
$stmt = $pdo->prepare("
  DELETE FROM friends
  WHERE user_id = ? AND friend_id = ? AND status = 'pending'
");
$stmt->execute([$fromUser,$toUser]);

echo json_encode([
  "status" => "success",
  "message" => "запрос отклонен"
]);

