<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(200); exit; }

require_once __DIR__ . "/../../auth.php";

$uid = (int)$user['id'];

/*
  Для direct: покажем собеседника (id, login, avatar)
  Для group: пока просто title
  last_message: берём по max(id) на диалог
*/
$sql = "
SELECT
  c.id AS conversation_id,
  c.type,
  c.title,
  lm.body AS last_message,
  lm.created_at AS last_message_at,

  -- собеседник только для direct
  pu.id AS peer_id,
  pu.username AS peer_login,
  pu.avatar AS peer_avatar
FROM conversation_members cm
JOIN conversations c ON c.id = cm.conversation_id

LEFT JOIN messages lm ON lm.id = (
  SELECT m2.id
  FROM messages m2
  WHERE m2.conversation_id = c.id
  ORDER BY m2.id DESC
  LIMIT 1
)

LEFT JOIN conversation_members pcm
  ON pcm.conversation_id = c.id
 AND pcm.user_id <> :uid
 AND c.type = 'direct'

LEFT JOIN users pu ON pu.id = pcm.user_id

WHERE cm.user_id = :uid
ORDER BY COALESCE(lm.created_at, c.created_at) DESC
";

$stmt = $pdo->prepare($sql);
$stmt->execute(['uid' => $uid]);
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
  "status" => "success",
  "chats" => $rows
]);
