<?php

session_start(); // salva i dati in $_SESSION
require 'connessione.php';
header('Content-Type: application/json');

// 1. Legge il JSON inviato dal frontend
$dati = json_decode(file_get_contents("php://input"), true);

$email = trim($dati['email']    ?? '');
$pass  = trim($dati['password'] ?? '');

// 2. Validazione base
if (empty($email) || empty($pass)) {
    echo json_encode(["successo" => false, "errore" => "Inserisci email e password."]);
    exit;
}

// 3. Cerca l'utente nel database tramite email
// sql injection: preparo prima la query e la riepio dopo con i dati
$stmt = $pdo->prepare("SELECT * FROM utenti WHERE email = ?");
$stmt->execute([$email]);
$utente = $stmt->fetch();

// 4. Controlla se l'utente esiste e se la password è corretta
//    password_verify() confronta la password digitata con quella criptata nel DB
if (!$utente || !password_verify($pass, $utente['password'])) {
    echo json_encode(["successo" => false, "errore" => "Email o password errati."]);
    exit;
}

// 5. Crea la sessione: da questo momento il browser è "loggato"
$_SESSION['utente_id']    = $utente['id'];
$_SESSION['utente_nome']  = $utente['nome'];
$_SESSION['utente_email'] = $utente['email'];

echo json_encode(["successo" => true, "nome" => $utente['nome']]);
?>
