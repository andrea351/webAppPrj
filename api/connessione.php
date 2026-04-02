<?php
// ===================== CONNESSIONE AL DATABASE =====================
// Questo file viene incluso dagli altri script PHP per connettersi a MySQL.
// Modifica le variabili in .env se cambi configurazione.

require __DIR__ . '/../vendor/autoload.php'; // Carica Composer autoload
use Dotenv\Dotenv;

// Carica il file .env dalla root del progetto
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad(); // safeLoad evita errori se il file .env non esiste

// ===================== CONNESSIONE AL DATABASE =====================
// Leggi le variabili dal .env
$host   = $_ENV['DB_HOST'] ?? '127.0.0.1';
$dbname = $_ENV['DB_NAME'] ?? 'cinemood';
$user   = $_ENV['DB_USER'] ?? 'root';
$pass   = $_ENV['DB_PASS'] ?? '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    // Risponde con un JSON di errore e blocca l'esecuzione
    header('Content-Type: application/json');
    die(json_encode(["successo" => false, "errore" => "Connessione al database fallita."]));
    // die(json_encode(["successo" => false, "errore" => $e -> getMessage()]));
}