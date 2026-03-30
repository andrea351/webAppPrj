<?php
// ===================== LOGOUT =====================
session_start();

// Rimuove tutte le variabili di sessione
$_SESSION = array();

// Cancella il cookie di sessione se presente
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Distrugge definitivamente la sessione
session_destroy();

header('Content-Type: application/json');
echo json_encode(["successo" => true, "messaggio" => "Logout effettuato con successo."]);
exit;