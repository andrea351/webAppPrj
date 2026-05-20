<?php

// ===================== CONNESSIONE AL DATABASE =====================
// Questo file viene incluso dagli altri script PHP per connettersi al database MySQL.

require __DIR__ . '/../vendor/autoload.php'; // Carica Composer AutoLoad
use Dotenv\Dotenv;

// 1. carico le variabili d'ambiente
// Carico il file ' .env ' dalla ROOT del PROGETTO
$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->safeLoad(); // safeLoad evita errori se il file ' .env ' non esiste

// ===================== CONNESSIONE AL DATABASE =====================
// Legge le variabili dal ' .env '
$host   = $_ENV['DB_HOST'] ?? '127.0.0.1';
$dbname = $_ENV['DB_NAME'] ?? 'cinemood';
$user   = $_ENV['DB_USER'] ?? 'root';
$pass   = $_ENV['DB_PASS'] ?? '';

// 2. creo l'oggetto che rappresenta il db_cinemood 
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