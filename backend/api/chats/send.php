<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

require_once __DIR__ . "/../../auth.php";

$uid = (int)$user['id'];
$input = json_decode(file_get_contents("php://input"), true);

$cid = (int)($input['conversation_id'] ?? 0);
$body = trim((string)($input['body'] ?? ''));

if ($cid <= 0 || $body === '') {
  http_response_code(400);
  echo json_encode(["status"=>"error","message"=>"conversation_id and body required"]);
  exit;
}

if (mb_strlen($body) > 5000) {
  http_response_code(400);
  echo json_encode(["status"=>"error","message"=>"Message too long"]);
  exit;
}

// проверка участника
$mem = $pdo->prepare("SELECT 1 FROM conversation_members WHERE conversation_id=? AND user_id=?");
$mem->execute([$cid, $uid]);
if (!$mem->fetchColumn()) {
  http_response_code(403);
  echo json_encode(["status"=>"error","message"=>"Forbidden"]);
  exit;
}

$stmt = $pdo->prepare("
  INSERT INTO messages (conversation_id, sender_id, body)
  VALUES (?, ?, ?)
");
$stmt->execute([$cid, $uid, $body]);

echo json_encode([
  "status" => "success",
  "message_id" => (int)$pdo->lastInsertId()
]);
