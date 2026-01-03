<?php
require_once "db.php";
$input = json_decode(file_get_contentcs("php://unput"),true);
$fromUser = (int)$input['from_user'];
$toUser = (int)$input['to_user'];

$stmt = $pdo->prepare("
  UPDATE friends
  SET status = 'accepted'
  WHERE user_id = ? AND friend_id = ? AND status = 'pending'
");

$stmt->execute([$fromUser, $toUser]);

$stmt = $pdo->prepare("
INSERT INTO friends (user_id, friend_id, status)
VALUES (?, ?, 'accepted')
");

$stmt->execute([$toUser,$fromUser]);

echo json_encode ([
  "status" => "success",
  "message" => "Запрос принят"
]);


