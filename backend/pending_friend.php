<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once "auth.php";

$stmt = $pdo->prepare("
    SELECT 
        fr.id,
        u.username AS login,
        u.avatar
    FROM friend_requests fr
    JOIN users u ON u.id = fr.from_user
    WHERE fr.to_user = ?
      AND fr.status = 'pending'
");

$stmt->execute([$user['id']]);
$requests = $stmt->fetchAll();

echo json_encode([
    "status" => "success",
    "requests" => $requests
]);
exit;
