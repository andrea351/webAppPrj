<?php
//lo scopo principale di questo file è quello di stabolore una connessione tra il sito del cinema e il mio DB sql
//chiavi per entrare nel database - quelle che avevo gia preimpostato io in .env/XAMPP
$host     = "localhost";
$user     = "root";       // utente XAMPP default
$password = "";           // password vuota in XAMPP
$database = "cinemood";
 
$conn = new mysqli($host, $user, $password, $database); //apre una connessione con il databse e lo salva in "conn"
$conn->set_charset("utf8mb4"); //usa la codificca universale che mi permette di usare .jpg, video, emoji ecc
 
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error); //in caso di errore di connessione mi stampa a schermo l'errore
}