<?php
// ===================== REGISTRAZIONE =====================
// Riceve: { "nome": "...", "email": "...", "password": "..." }
// Risponde: { "successo": true } oppure { "successo": false, "errore": "..." }

session_start();
require 'connessione.php';
header('Content-Type: application/json');

// 1. Legge il JSON inviato dal frontend
$dati = json_decode(file_get_contents("php://input"), true);

$nome  = trim($dati['nome']     ?? '');
$email = trim($dati['email']    ?? '');
$pass  = trim($dati['password'] ?? '');

// 2. Validazione base lato server (non fidarsi mai solo del frontend)
if (empty($nome) || empty($email) || empty($pass)) {
    echo json_encode(["successo" => false, "errore" => "Compila tutti i campi."]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["successo" => false, "errore" => "Email non valida."]);
    exit;
}

if (strlen($pass) < 6) {
    echo json_encode(["successo" => false, "errore" => "La password deve essere di almeno 6 caratteri."]);
    exit;
}

// 3. Controlla se l'email è già registrata
$stmt = $pdo->prepare("SELECT id FROM utenti WHERE email = ?");
$stmt->execute([$email]);

if ($stmt->fetch()) {
    echo json_encode(["successo" => false, "errore" => "Email già registrata."]);
    exit;
}

// 4. Cripta la password (MAI salvarla in chiaro!)
$passwordCriptata = password_hash($pass, PASSWORD_BCRYPT);

// 5. Salva il nuovo utente nel database
$stmt = $pdo->prepare("INSERT INTO utenti (nome, email, password) VALUES (?, ?, ?)");
$stmt->execute([$nome, $email, $passwordCriptata]);

// 6. Crea subito la sessione così l'utente risulta già loggato dopo la registrazione
$_SESSION['utente_id']   = $pdo->lastInsertId();
$_SESSION['utente_nome'] = $nome;
$_SESSION['utente_email'] = $email;

echo json_encode(["successo" => true, "nome" => $nome]);
?>
