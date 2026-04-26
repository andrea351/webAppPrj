<?php
// ===================== RECUPERO PASSWORD =====================
// Riceve: { "email": "..." }
// Risponde: { "successo": true } oppure { "successo": false, "errore": "..." }
//
// Risponde sempre "successo: true" anche se l'email non esiste,
// per evitare che un malintenzionato scopra quali email sono registrate.

require 'connessione.php';
header('Content-Type: application/json');

define('BASE_DIR', realpath(__DIR__ . '/..'));

require BASE_DIR . '/vendor/autoload.php';
use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

$dotenv = Dotenv::createImmutable(BASE_DIR);
$dotenv->safeLoad();

// 1. Legge il JSON
$dati  = json_decode(file_get_contents('php://input'), true);
$email = trim($dati['email'] ?? '');

// 2. Validazione
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['successo' => false, 'errore' => 'Email non valida.']);
    exit;
}

// 3. Controlla se l'email esiste nel DB
$stmt = $pdo->prepare('SELECT id, nome FROM utenti WHERE email = ?');
$stmt->execute([$email]);
$utente = $stmt->fetch();

if ($utente) {
    // 4. Genera un token sicuro (64 caratteri esadecimali)
    $token    = bin2hex(random_bytes(32));
    $scadenza = date('Y-m-d H:i:s', strtotime('+30 minutes'));

    // 5. Salva il token nel DB
    $stmtToken = $pdo->prepare('
        INSERT INTO reset_password (utente_id, token, scadenza)
        VALUES (?, ?, ?)
    ');
    $stmtToken->execute([$utente['id'], $token, $scadenza]);

    // 6. Costruisce il link di reset
    //    Usa APP_URL dal .env se disponibile, altrimenti fallback su localhost
    $baseUrl = rtrim($_ENV['APP_URL'] ?? 'http://localhost/cinemood', '/');
    $link    = $baseUrl . '/nuova_password.html?token=' . $token;

    $nomeUtente = $utente['nome'] ?? 'utente';

    // 7. Testo e HTML dell'email
    $oggetto = 'Recupera la tua password — Cinema Mood';

    $html = "
<html><body style='font-family:Georgia,serif;background:#0d0508;color:#faeef1;padding:30px;margin:0;'>
<div style='max-width:480px;margin:0 auto;background:#1a0810;border-radius:16px;
            border:1px solid rgba(128,0,32,0.35);overflow:hidden;'>

  <div style='background:linear-gradient(90deg,#3a000d,#800020,#3a000d);
              padding:26px;text-align:center;'>
    <h1 style='margin:0;color:white;font-size:22px;letter-spacing:3px;'>CINEMA MOOD</h1>
    <p style='margin:5px 0 0;color:rgba(250,238,241,0.55);font-size:11px;letter-spacing:2px;'>
        RECUPERO PASSWORD</p>
  </div>

  <div style='padding:32px;'>
    <p style='font-size:15px;color:#faeef1;margin:0 0 14px;'>
        Ciao <strong>" . htmlspecialchars($nomeUtente) . "</strong>,
    </p>
    <p style='font-size:14px;color:rgba(250,238,241,0.7);line-height:1.7;margin:0 0 28px;'>
        Abbiamo ricevuto una richiesta di reimpostazione della password per il tuo account.
        Clicca sul bottone qui sotto per scegliere una nuova password.<br><br>
        Il link è <strong>valido per 30 minuti</strong>.
    </p>

    <div style='text-align:center;margin-bottom:28px;'>
      <a href='" . htmlspecialchars($link) . "'
         style='display:inline-block;padding:14px 32px;
                background:linear-gradient(135deg,#5e0015,#800020);
                color:white;text-decoration:none;border-radius:10px;
                font-family:Georgia,serif;font-size:13px;letter-spacing:2px;
                text-transform:uppercase;
                box-shadow:0 4px 20px rgba(128,0,32,0.4);'>
        Reimposta password
      </a>
    </div>

    <p style='font-size:12px;color:rgba(250,238,241,0.35);line-height:1.7;margin:0;'>
        Se non hai richiesto tu la reimpostazione della password, ignora questa email:
        il tuo account è al sicuro e la password non verrà modificata.<br><br>
        In alternativa, copia e incolla questo link nel browser:<br>
        <span style='color:rgba(250,238,241,0.55);word-break:break-all;'>" . htmlspecialchars($link) . "</span>
    </p>
  </div>

  <div style='padding:16px;text-align:center;border-top:1px solid rgba(128,0,32,0.2);'>
    <p style='color:rgba(250,238,241,0.2);font-size:10px;margin:0;'>
        &copy; 2026 Cinema Mood
    </p>
  </div>

</div></body></html>";

    $testo = "Ciao {$nomeUtente},\n\n"
           . "Abbiamo ricevuto una richiesta di reimpostazione della password per il tuo account Cinema Mood.\n\n"
           . "Clicca sul link seguente per scegliere una nuova password (valido 30 minuti):\n"
           . $link . "\n\n"
           . "Se non hai richiesto tu questa operazione, ignora questa email.\n\n"
           . "Cinema Mood";

    // 8. Invio con PHPMailer
    $mailUser = $_ENV['MAIL_FROM'] ?? '';
    $mailPass = $_ENV['MAIL_PASS'] ?? '';
    $mailName = $_ENV['MAIL_NAME'] ?? 'Cinema Mood';
    $mailHost = $_ENV['MAIL_HOST'] ?? 'smtp.gmail.com';
    $mailPort = (int)($_ENV['MAIL_PORT'] ?? 587);

    if (!empty($mailUser) && !empty($mailPass)) {
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host       = $mailHost;
            $mail->SMTPAuth   = true;
            $mail->Username   = $mailUser;
            $mail->Password   = $mailPass;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = $mailPort;
            $mail->CharSet    = 'UTF-8';
            $mail->setFrom($mailUser, $mailName);
            $mail->addAddress($email);
            $mail->addReplyTo($mailUser, $mailName);
            $mail->isHTML(true);
            $mail->Subject = $oggetto;
            $mail->Body    = $html;
            $mail->AltBody = $testo;
            $mail->send();
        } catch (MailException $e) {
            // Logghiamo l'errore ma rispondiamo comunque "successo" al frontend
            // per non rivelare se l'email esiste o meno nel sistema
            error_log('Errore invio email recupero password: ' . $mail->ErrorInfo);
        }
    } else {
        // Credenziali SMTP non ancora configurate: logghiamo il link per debug locale
        error_log('[Cinema Mood - DEBUG] Link recupero password: ' . $link);
    }
}

// Rispondiamo SEMPRE successo (anche se l'email non esiste o l'invio fallisce)
echo json_encode(['successo' => true]);
