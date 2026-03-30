<?php
// ===================== VERIFICA SESSIONE =====================
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['utente_id'])) {
    // L'utente è loggato
    echo json_encode([
        "loggato" => true,
        "utente" => [
            "id"    => $_SESSION['utente_id'],
            "nome"  => $_SESSION['utente_nome'],
            "email" => $_SESSION['utente_email']
        ]
    ]);
} else {
    // L'utente non è loggato
    echo json_encode(["loggato" => false]);
}
exit;