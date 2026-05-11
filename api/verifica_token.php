<?php


require 'connessione.php';
header('Content-Type: application/json');

$token = trim($_GET['token'] ?? '');

if (empty($token)) {
    echo json_encode(['valido' => false]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT id
    FROM reset_password
    WHERE token = ?
      AND usato = 0
      AND scadenza > NOW()
");
$stmt->execute([$token]);

if ($stmt->fetch()) {
    echo json_encode(['valido' => true]);
} else {
    echo json_encode(['valido' => false]);
}
