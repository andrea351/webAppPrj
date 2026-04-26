<?php
// ===================== VERIFICA TOKEN (sola lettura) =====================
// Riceve: ?token=...
// Risponde: { "valido": true } oppure { "valido": false }
//
// Questo endpoint viene chiamato in GET al caricamento di nuova_password.html
// per mostrare subito la schermata di errore se il token è scaduto o già usato,
// senza però consumare il token (non lo segna come "usato").

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
