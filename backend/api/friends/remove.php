<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// remove.php лежит в: backend/api/friends/remove.php
// auth.php лежит в: backend/auth.php
require_once __DIR__ . "/../../auth.php"; // <-- ВОТ ТАК

$input = json_decode(file_get_contents("php://input"), true);
$targetId = (int)($input['user_id'] ?? 0);
$me = (int)$user['id'];

if ($targetId <= 0 || $targetId === $me) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid user_id"]);
    exit;
}

$user1 = min($me, $targetId);
$user2 = max($me, $targetId);

$stmt = $pdo->prepare("DELETE FROM friends WHERE user1 = ? AND user2 = ?");
$stmt->execute([$user1, $user2]);

if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(["status" => "error", "message" => "Friendship not found"]);
    exit;
}

echo json_encode(["status" => "success"]);
