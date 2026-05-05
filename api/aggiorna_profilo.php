<?php

session_start();
require __DIR__ . '/../api/connessione.php';
header('Content-Type: application/json');

$dati = json_encode(file_get_contents('php://input'), true); // Riceve INPUT da ' profilo.js '
$nome = trim($dati['nome']);
$cognome = trim($dati['cognome']);

$nome_completo = $nome . ' ' . $cognome;

$stmt = $pdo->prepare("UPDATE utenti SET nome = ? WHERE utente_id = ?");

if ($stmt->execute([$nome_completo, $_SESSION['utente_id']])) { $_SESSION['utente_nome'] = $nome_completo; echo json_encode(['successo' => true]); }
else echo json_encode(['errore' => 'Modifica fallita']);