<?php

session_start();
require __DIR__ . '/../api/connessione.php';
header('Content-Type: application/json');

if (!empty($_SESSION['utente_id'])) {
    try {
        $pdo->beginTransaction(); // Avvia TRANSAZIONE, poichè le Query, dato che viene INVIATO più di UN Comando Contemporaneamente, NON vengono salvate SUBITO [ Le Raccoglie / Accumula ]
    
        $pdo->prepare("DELETE FROM utenti WHERE id = ?") -> execute([$_SESSION['utente_id']]); 
        $pdo->prepare("DELETE FROM acquisti WHERE utente_id = ?") -> execute([$_SESSION['utente_id']]);
        $pdo->prepare("DELETE FROM reset_password WHERE utente_id = ?") -> execute([$_SESSION['utente_id']]);

        $pdo->commit(); // Conferma le Modifiche [ Effettua le Modifiche / Le Manda ]

        session_destroy(); // La SESSIONE va DISTRUTTA, altrimenti anche dopo l'ELIMINAZIONE dell'Utente dal DB, l'Utente continua ad essere Loggato

        echo json_encode(['successo' => True]);
    } catch(Exception $e) { $pdo -> rollBack(); echo json_encode(['errore' => 'Errore svolgimento QUERY']); } // RollBack ANNULLA TUTTE le MODIFICHE appena apportate, in caso di Errore
} else echo json_encode(['errore' => 'Utente NON autenticato']);