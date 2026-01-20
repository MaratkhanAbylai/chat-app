<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


require_once __DIR__ . "/../../auth.php";

$uid = (int)$user['id'];
$cid = (int)($_GET['conversation_id'] ?? 0);
$limit = (int)($_GET['limit'] ?? 50);
$beforeId = (int)($_GET['before_id'] ?? 0);

if ($cid <= 0) {
  http_response_code(400);
  echo json_encode(["status"=>"error","message"=>"conversation_id required"]);
  exit;
}

$limit = max(1, min($limit, 200));

// Проверим, что юзер участник диалога
$mem = $pdo->prepare("SELECT 1 FROM conversation_members WHERE conversation_id=? AND user_id=?");
$mem->execute([$cid, $uid]);
if (!$mem->fetchColumn()) {
  http_response_code(403);
  echo json_encode(["status"=>"error","message"=>"Forbidden"]);
  exit;
}

$params = ['cid'=>$cid, 'limit'=>$limit];

$where = "m.conversation_id = :cid";
if ($beforeId > 0) {
  $where .= " AND m.id < :before";
  $params['before'] = $beforeId;
}

$sql = "
SELECT
  m.id,
  m.sender_id,
  u.username AS sender_login,
  u.avatar AS sender_avatar,
  m.body,
  m.created_at
FROM messages m
JOIN users u ON u.id = m.sender_id
WHERE $where
ORDER BY m.id DESC
LIMIT :limit
";

$stmt = $pdo->prepare($sql);

// LIMIT биндим как int
$stmt->bindValue(':cid', $cid, PDO::PARAM_INT);
if ($beforeId > 0) $stmt->bindValue(':before', $beforeId, PDO::PARAM_INT);
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);

$stmt->execute();
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

// чтобы на фронте было удобно — отдаём по возрастанию времени
$messages = array_reverse($messages);

echo json_encode(["status"=>"success","messages"=>$messages]);
