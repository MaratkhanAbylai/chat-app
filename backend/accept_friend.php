<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

require_once "auth.php";

$input = json_decode(file_get_contents("php://input"), true);
$requestId = $input['request_id'] ?? null;

if (!$requestId) {
    http_response_code(400);
    echo json_encode(["error" => "request_id required"]);
    exit;
}

/* Проверяем, что заявка моя */
$stmt = $pdo->prepare("
    SELECT from_user 
    FROM friend_requests 
    WHERE id = ? AND to_user = ? AND status = 'pending'
");
$stmt->execute([$requestId, $user['id']]);
$req = $stmt->fetch();

error_log("accept: request_id=$requestId, me=".$user['id']);

$debug = $pdo->prepare("SELECT id, from_user, to_user, status FROM friend_requests WHERE id = ?");
$debug->execute([$requestId]);
error_log("row=".json_encode($debug->fetch(PDO::FETCH_ASSOC)));

if (!$req) {
    http_response_code(403);
    echo json_encode(["error" => "Forbidden"]);
    exit;
}

/* Обновляем статус */
$pdo->prepare("
    UPDATE friend_requests SET status = 'accepted' WHERE id = ?
")->execute([$requestId]);

/* Добавляем в friends (нормализованная пара) */
$from = (int)$req['from_user'];
$to   = (int)$user['id'];

$pdo->prepare("
    INSERT IGNORE INTO friends (user1, user2)
    VALUES (LEAST(?, ?), GREATEST(?, ?))
")->execute([$from, $to, $from, $to]);


echo json_encode(["status" => "success"]);
exit;
