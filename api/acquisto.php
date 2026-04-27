<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();
header('Content-Type: application/json');

define('BASE_DIR', realpath(__DIR__ . '/..'));

require BASE_DIR . '/vendor/autoload.php';
use Dotenv\Dotenv;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception as MailException;

$dotenv = Dotenv::createImmutable(BASE_DIR);
$dotenv->safeLoad();

// Salvo i DATI che mi serviranno DOPO
$body = json_decode(file_get_contents('php://input'), true); // Trasforma in STRUCT il Contenuto della Richiesta arrivata a PHP da ' booking.js '

// modifica
file_put_contents(BASE_DIR . '/tmp_biglietti/log.txt', 
    json_encode($body, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
);
//fine modifica

$email = trim($body['email'] ?? '');
$titolo = trim($body['titolo'] ?? '');
$orario = trim($body['orario'] ?? '');
$sala  = trim($body['sala'] ?? 'Sala 1');
$posti = $body['posti'] ?? [];
$totale = trim($body['totale'] ?? '0:00');
$dataStr = trim($body['data'] ?? '');
$locPath = trim($body['locandina'] ?? '');

// Verifico i DATI
    // Verifica che EMAIL sia VALIDA [ username@dominioValido ]
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) { echo json_encode(['successo' => false, 'errore' => 'Email non valida.']); exit; }

if (empty($titolo) || empty($orario) || empty($posti) || empty($dataStr)) { echo json_encode(['successo' => false, 'errore' => 'Dati acquisto incompleti.']); exit; }

    // NON effettuo Controlli su ' $totale ' perchè potrebbe essere che il TOTALE è ' 0.00 ' in quanto sono stati applicati SCONTI

$codice = 'CM-' . strtoupper(substr(md5(uniqid($email, true)), 0, 8));

$locAssoluta = '';
if (!empty($locPath)) {
    $candidato = BASE_DIR . '/' . ltrim($locPath, '/');
    if (file_exists($candidato)) $locAssoluta = $candidato;
}

$tmpDir = BASE_DIR . '/tmp_biglietti';
if (!is_dir($tmpDir)) mkdir($tmpDir, 0750, true);
$pdfFile  = $tmpDir . '/' . $codice . '.pdf';
$nomeFile = 'Biglietto_' . preg_replace('/[^a-zA-Z0-9]/', '_', $titolo) . '.pdf';

// Salvo i DATI che andranno nel PDF Generato con Python
$jsonDati = json_encode([
    'titolo' => $titolo,
    'orario' => $orario,
    'sala' => $sala,
    'posti' => $posti,
    'totale' => $totale,
    'data' => $dataStr,
    'locandina_path' => $locAssoluta,
    'codice' => $codice,
], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);

$scriptPy = __DIR__ . '/genera_biglietto.py';

$pythonBin = $_ENV['PYTHON_BIN'] ?? 'python3';
$pythonPath = $_ENV['PYTHON_PATH'] ?? '';
$osType = $_ENV['OS_TYPE'] ?? 'linux';

$out = []; $exit = 0;
/* codice precedente
exec(
    'arch -x86_64 env PYTHONPATH=' . escapeshellarg($pythonPath)
    . ' ' . escapeshellarg($pythonBin)
    . ' ' . escapeshellarg($scriptPy)
    . ' ' . escapeshellarg($jsonDati)
    . ' ' . escapeshellarg($pdfFile)
    . ' 2>&1',
    $out, $exit
);
*/

$jsonFile = $tmpDir . '/dati_biglietto.json';
file_put_contents($jsonFile, $jsonDati);

if ($osType === 'windows') {
    $cmd = escapeshellarg($pythonBin)
         . ' ' . escapeshellarg($scriptPy)
         . ' ' . escapeshellarg($jsonFile)
         . ' ' . escapeshellarg($pdfFile)
         . ' 2>&1';
} else {
    $envPythonPath = !empty($pythonPath)
        ? 'PYTHONPATH=' . escapeshellarg($pythonPath) . ' '
        : '';
    $cmd = 'env ' . $envPythonPath
         . escapeshellarg($pythonBin)
         . ' ' . escapeshellarg($scriptPy)
         . ' ' . escapeshellarg($jsonDati)
         . ' ' . escapeshellarg($pdfFile)
         . ' 2>&1';
}

exec($cmd, $out, $exit);

file_put_contents(BASE_DIR . '/tmp_biglietti/debug.txt',
    "Exit: $exit\nOutput:\n" . implode("\n", $out)
);

if ($exit !== 0 || !file_exists($pdfFile)) {
    echo json_encode(['successo' => false, 'errore' => 'Errore PDF: ' . implode("\n", $out)]); exit;
}

// Credenziali GMail
$mailUser = $_ENV['MAIL_FROM'] ?? '';
$mailPass = $_ENV['MAIL_PASS'] ?? '';
$mailName = $_ENV['MAIL_NAME'] ?? 'Cinema Mood';
 
if (empty($mailUser) || empty($mailPass)) {
    @unlink($pdfFile);
    echo json_encode(['successo' => false, 'errore' => 'Credenziali email mancanti nel .env.']); exit;
}

// 8. Testi email
$oggetto  = "Il tuo biglietto - {$titolo} - {$orario}";
$postiStr = implode(', ', $posti);

$html = "
<html><body style='font-family:Georgia,serif;background:#0d0508;color:#faeef1;padding:30px;margin:0;'>
<div style='max-width:480px;margin:0 auto;background:#1a0810;border-radius:16px;
            border:1px solid rgba(128,0,32,0.35);overflow:hidden;'>
  <div style='background:linear-gradient(90deg,#3a000d,#800020,#3a000d);padding:26px;text-align:center;'>
    <h1 style='margin:0;color:white;font-size:22px;letter-spacing:3px;'>CINEMA MOOD</h1>
    <p style='margin:5px 0 0;color:rgba(250,238,241,0.55);font-size:11px;letter-spacing:2px;'>IL TUO BIGLIETTO</p>
  </div>
  <div style='padding:28px 32px;'>
    <h2 style='color:#bb2248;margin:0 0 20px;font-size:18px;'>" . htmlspecialchars($titolo) . "</h2>
    <table style='width:100%;border-collapse:collapse;font-size:14px;'>
      <tr><td style='color:rgba(250,238,241,0.45);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;padding:7px 0;width:90px;'>Data</td><td style='color:#faeef1;'>{$dataStr}</td></tr>
      <tr><td style='color:rgba(250,238,241,0.45);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;padding:7px 0;'>Orario</td><td style='color:#faeef1;'>{$orario}</td></tr>
      <tr><td style='color:rgba(250,238,241,0.45);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;padding:7px 0;'>Sala</td><td style='color:#faeef1;'>{$sala}</td></tr>
      <tr><td style='color:rgba(250,238,241,0.45);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;padding:7px 0;'>Posti</td><td style='color:#faeef1;'>{$postiStr}</td></tr>
      <tr><td style='color:rgba(250,238,241,0.45);font-size:10px;letter-spacing:1.5px;text-transform:uppercase;padding:7px 0;'>Totale</td><td style='color:#ff4d6d;font-size:20px;font-weight:bold;'>EUR {$totale}</td></tr>
</table>
    <div style='margin:22px 0 0;padding:14px 18px;background:rgba(128,0,32,0.12);border-radius:10px;border:1px solid rgba(128,0,32,0.3);text-align:center;'>
      <p style='margin:0 0 5px;color:rgba(250,238,241,0.4);font-size:10px;letter-spacing:2px;text-transform:uppercase;'>Codice prenotazione</p>
      <p style='margin:0;color:#bb2248;font-size:17px;font-weight:bold;letter-spacing:2px;font-family:monospace;'>{$codice}</p>
    </div>
    <p style='color:rgba(250,238,241,0.4);font-size:12px;margin-top:22px;text-align:center;line-height:1.7;'>
      Il biglietto PDF e allegato a questa email.<br>Mostralo all ingresso del cinema.</p>
  </div>
  <div style='padding:16px;text-align:center;border-top:1px solid rgba(128,0,32,0.2);'>
    <p style='color:rgba(250,238,241,0.2);font-size:10px;margin:0;'>2026 Cinema Mood - Buona visione!</p>
  </div>
</div></body></html>";

$testo = "Ciao,\n\nGrazie per aver acquistato su Cinema Mood!\n\n"
       . "FILM:   {$titolo}\nDATA:   {$dataStr}\nORARIO: {$orario}\n"
       . "SALA:   {$sala}\nPOSTI:  {$postiStr}\nTOTALE: EUR {$totale}\n"
       . "CODICE: {$codice}\n\nBiglietto PDF in allegato.\n\nBuona visione!\nCinema Mood";

// Invio Mail
try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $mailUser;
    $mail->Password   = $mailPass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->setFrom($mailUser, $mailName);
    $mail->addAddress($email);
    $mail->addReplyTo($mailUser, $mailName);
    $mail->isHTML(true);
    $mail->Subject = $oggetto;
    $mail->Body    = $html;
    $mail->AltBody = $testo;
    $mail->addAttachment($pdfFile, $nomeFile);
    $mail->send();
    @unlink($pdfFile);
    echo json_encode(['successo' => true, 'codice' => $codice]);
} catch (MailException $e) {
    @unlink($pdfFile);
    echo json_encode(['successo' => false, 'errore' => 'Errore invio email: ' . $mail->ErrorInfo]);
}