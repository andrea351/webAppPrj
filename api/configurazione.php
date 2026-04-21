<?php

    // Lo scopo principale di questo FILE è quello di stabilire una connessione tra il Sito del Cinema e il mio DB SQL
    // Chiavi per entrare nel DB : quelle che avevo gia preimpostato in ' .env/XAMPP '

$host     = "localhost";
$user     = "root";       // Utente XAMPP Default
$password = "";           // PW vuota in XAMPP
$database = "cinemood";
 
$conn = new mysqli($host, $user, $password, $database); // Apre una connessione con il DB e la salva in ' $conn '
$conn->set_charset("utf8mb4"); // Usa la codifica universale
 
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}