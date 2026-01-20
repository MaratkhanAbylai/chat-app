<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/../../auth.php"; // даёт $pdo и $user

$userId = (int)$user['id'];

$stmt = $pdo->prepare("
    SELECT
        u.id,
        u.username AS login,
        u.avatar
    FROM friends f
    JOIN users u
      ON u.id = IF(f.user1 = :uid, f.user2, f.user1)
    WHERE f.user1 = :uid OR f.user2 = :uid
    ORDER BY u.username
");

$stmt->execute(['uid' => $userId]);
$friends = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($friends);
exit;
