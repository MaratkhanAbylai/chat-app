<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once "db.php";
require_once "auth.php";

$input = json_decode(file_get_contents("php://input"), true);
$requestId = (int)($input['request_id'] ?? 0);

if ($requestId <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "request_id required"]);
    exit;
}

/* Проверяем, что заявка моя (входящая) */
$stmt = $pdo->prepare("
    SELECT id
    FROM friend_requests
    WHERE id = ? AND to_user = ? AND status = 'pending'
");
$stmt->execute([$requestId, $user['id']]);
$req = $stmt->fetch();

if (!$req) {
    http_response_code(403);
    echo json_encode(["error" => "Forbidden"]);
    exit;
}

/* Удаляем заявку (или можешь сделать UPDATE status='rejected') */
$del = $pdo->prepare("
    DELETE FROM friend_requests
    WHERE id = ? AND to_user = ? AND status = 'pending'
    LIMIT 1
");
$del->execute([$requestId, $user['id']]);

echo json_encode(["status" => "success", "message" => "запрос отклонен"]);
exit;
