<?php
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/../../auth.php"; // $pdo, $user

$input = json_decode(file_get_contents("php://input"), true);

$targetId = (int)($input['target_user_id'] ?? 0);
$me = (int)$user['id'];

if ($targetId <= 0 || $targetId === $me) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid target_user_id"
    ]);
    exit;
}

/* 1. Проверяем, есть ли уже direct чат */
$stmt = $pdo->prepare("
    SELECT c.id
    FROM conversations c
    JOIN conversation_members m1 ON m1.conversation_id = c.id AND m1.user_id = :me
    JOIN conversation_members m2 ON m2.conversation_id = c.id AND m2.user_id = :target
    WHERE c.type = 'direct'
    LIMIT 1
");
$stmt->execute([
    'me' => $me,
    'target' => $targetId
]);

$chat = $stmt->fetch(PDO::FETCH_ASSOC);

if ($chat) {
    echo json_encode([
        "status" => "success",
        "conversation_id" => (int)$chat['id']
    ]);
    exit;
}

/* 2. Создаём новый чат */
$pdo->beginTransaction();

try {
    $pdo->prepare("
        INSERT INTO conversations (type, created_at)
        VALUES ('direct', NOW())
    ")->execute();

    $conversationId = (int)$pdo->lastInsertId();

    $pdo->prepare("
        INSERT INTO conversation_members (conversation_id, user_id)
        VALUES (?, ?), (?, ?)
    ")->execute([
        $conversationId, $me,
        $conversationId, $targetId
    ]);

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "conversation_id" => $conversationId
    ]);
} catch (Throwable $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to create chat"
    ]);
}
