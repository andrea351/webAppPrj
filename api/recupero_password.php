<?php
// ===================== RECUPERO PASSWORD =====================
// Riceve: { "email": "..." }
// Risponde: { "successo": true } oppure { "successo": false, "errore": "..." }
//
// NOTA: Per inviare email reali in produzione (su un hosting online) questo script
// funziona già con la funzione mail() di PHP. In locale con XAMPP le email NON
// vengono inviate realmente — devi configurare un server SMTP esterno (es. Gmail)
// oppure usare un tool come Mailtrap.io per testare le email in sviluppo.

require 'connessione.php';
header('Content-Type: application/json');

// 1. Legge il JSON
$dati  = json_decode(file_get_contents("php://input"), true);
$email = trim($dati['email'] ?? '');

// 2. Validazione
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["successo" => false, "errore" => "Email non valida."]);
    exit;
}

// 3. Controlla se l'email esiste nel DB
//    Per sicurezza rispondiamo sempre "successo" anche se l'email non esiste:
//    questo evita che un malintenzionato possa scoprire quali email sono registrate.
$stmt = $pdo->prepare("SELECT id FROM utenti WHERE email = ?");
$stmt->execute([$email]);
$utente = $stmt->fetch();

if ($utente) {
    // 4. Genera un token sicuro e unico
    $token   = bin2hex(random_bytes(32)); // stringa casuale di 64 caratteri
    $scadenza = date('Y-m-d H:i:s', strtotime('+30 minutes')); // valido 30 minuti

    // 5. Salva il token nel DB (occorre una seconda tabella — vedi sotto)
    //    Se la tabella non esiste ancora, creala con:
    //    CREATE TABLE reset_password (
    //        id         INT AUTO_INCREMENT PRIMARY KEY,
    //        utente_id  INT NOT NULL,
    //        token      VARCHAR(64) NOT NULL,
    //        scadenza   DATETIME NOT NULL,
    //        usato      TINYINT(1) DEFAULT 0
    //    );
    $stmt = $pdo->prepare("INSERT INTO reset_password (utente_id, token, scadenza) VALUES (?, ?, ?)");
    $stmt->execute([$utente['id'], $token, $scadenza]);

    // 6. Componi e invia l'email
    $link      = "http://localhost/mio_progetto/nuova_password.html?token=$token";
    $oggetto   = "Recupero password — Cinema Mood";
    $messaggio = "Ciao,\n\nHai richiesto di reimpostare la tua password.\n\nClicca sul link qui sotto (valido 30 minuti):\n$link\n\nSe non hai richiesto tu questa operazione, ignora questa email.\n\nCinema Mood";
    $intestazioni = "From: noreply@cinemamood.it";

    @mail($email, $oggetto, $messaggio, $intestazioni);
}

// Rispondiamo sempre successo (vedi nota al punto 3)
echo json_encode(["successo" => true]);
?>
