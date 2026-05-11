<?php
// ===================== CONTATTI — INVIA MESSAGGIO =====================
// Riceve: { "nome": "...", "email": "...", "oggetto": "...", "messaggio": "..." }
// Risponde: { "successo": true } oppure { "successo": false, "errore": "..." }

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('BASE_DIR', realpath(__DIR__ . '/..'));

require BASE_DIR . '/vendor/autoload.php';

use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

$dotenv = Dotenv::createImmutable(BASE_DIR);
$dotenv->safeLoad();

header('Content-Type: application/json');

$dati     = json_decode(file_get_contents('php://input'), true);
$nome     = trim($dati['nome']     ?? '');
$email    = $_SESSION['utente_email'];
$oggetto  = trim($dati['oggetto']  ?? '');
$msg      = trim($dati['messaggio'] ?? '');

// sovrascrivo l'email inserita nel form con quella della sessione.
// motivo: evito che persona X mandi un msg a nome (email) di persona Y

if (empty($_SESSION['utente_id'])) {
    echo json_encode(['successo' => false, 'errore' => 'Devi essere loggato per inviare un messaggio.']);
    exit;
}

// Validazione
if (empty($nome) || empty($email) || empty($oggetto) || empty($msg)) {
    echo json_encode(['successo' => false, 'errore' => 'Compila tutti i campi.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['successo' => false, 'errore' => 'Indirizzo email non valido.']);
    exit;
}

$mailTo   = $_ENV['MAIL_FROM']  ?? '';
$mailPass = $_ENV['MAIL_PASS']  ?? '';
$mailName = $_ENV['MAIL_NAME']  ?? 'Cinema Mood';
$mailHost = $_ENV['MAIL_HOST']  ?? 'smtp.gmail.com';
$mailPort = (int)($_ENV['MAIL_PORT'] ?? 587);

if (empty($mailTo) || empty($mailPass)) {
    echo json_encode(['successo' => false, 'errore' => 'Configurazione email mancante.']);
    exit;
}

$soggetto = '[Contatti] ' . $oggetto;
$testo = "Nuovo messaggio dal sito Cinema Mood\n\n"
      . "Nome:     {$nome}\n"
      . "Email:    {$email}\n"
      . "Oggetto:  {$oggetto}\n\n"
      . "Messaggio:\n{$msg}";

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $mailHost;
    $mail->SMTPAuth   = true;
    $mail->Username   = $mailTo;
    $mail->Password   = $mailPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = $mailPort;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom($mailTo, $mailName);
    $mail->addAddress($mailTo, $mailName);
    $mail->addReplyTo($email, $nome);   // Rispondi direttamente all'utente

    $mail->Subject = $soggetto;
    $mail->Body    = $testo;

    $mail->send();
    echo json_encode(['successo' => true]);
} catch (MailException $e) {
    error_log('Errore invio email contatti: ' . $mail->ErrorInfo);
    echo json_encode(['successo' => false, 'errore' => 'Errore durante l\'invio. Riprova più tardi.']);
}
