<?php

require 'connessione.php';
header('Content-Type: application/json');

$dati     = json_decode(file_get_contents('php://input'), true);
$token    = trim($dati['token']    ?? '');
$password = trim($dati['password'] ?? '');

// 1. Validazione base
if (empty($token) || empty($password)) {
    echo json_encode(['successo' => false, 'errore' => 'Dati mancanti.']);
    exit;
}

if (!preg_match("/[A-Z]/", $password) || !preg_match("/[a-z]{5,}/", $password) || !preg_match("/\d+/", $password) || !preg_match("/[.,;:!?-]+/", $password)) {
    echo json_encode(['successo' => false, 'errore' => 'La password deve essere contenere: almeno 6 caratteri alfabetici, di cui almeno una maiuscola, almeno un numero e almeno un simbolo speciale (.,;:!?-).']);
    exit;
}

// 2. Cerca il token: deve esistere, non essere usato e non essere scaduto
$stmt = $pdo->prepare("
    SELECT id, utente_id
    FROM reset_password
    WHERE token = ?
      AND usato = 0
      AND scadenza > NOW()
");
$stmt->execute([$token]);
$row = $stmt->fetch();

if (!$row) {
    // Token non valido, scaduto, o già utilizzato
    echo json_encode(['successo' => false, 'token_non_valido' => true]);
    exit;
}

$utenteId = $row['utente_id'];
$resetId  = $row['id'];

// 3. Cripta la nuova password
$nuovaPasswordHash = password_hash($password, PASSWORD_BCRYPT);

// 4. Aggiorna la password dell'utente
$stmtUpdate = $pdo->prepare("UPDATE utenti SET password = ? WHERE id = ?");
$stmtUpdate->execute([$nuovaPasswordHash, $utenteId]);

if ($stmtUpdate->rowCount() === 0) {
    echo json_encode(['successo' => false, 'errore' => 'Utente non trovato.']);
    exit;
}

// 5. Segna il token come usato (non può essere riutilizzato)
$stmtUsato = $pdo->prepare("UPDATE reset_password SET usato = 1 WHERE id = ?");
$stmtUsato->execute([$resetId]);

// 6. Invalida tutti gli altri token pendenti dello stesso utente
//    (misura di sicurezza: se qualcuno aveva richiesto più link, tutti diventano inutilizzabili)
$stmtPulisci = $pdo->prepare("
    UPDATE reset_password
    SET usato = 1
    WHERE utente_id = ?
      AND id != ?
      AND usato = 0
");
$stmtPulisci->execute([$utenteId, $resetId]);

echo json_encode(['successo' => true]);
