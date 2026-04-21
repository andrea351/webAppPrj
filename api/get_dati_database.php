<?php
require 'configurazione.php';

header('Content-Type: application/json; charset=utf-8');

// Orari DB ->  Lo traduco IN ITALIANO
$mappaGiorni = [
    '2026-06-01' => 'LUNEDI 1 GIUGNO',
    '2026-06-02' => 'MARTEDI 2 GIUGNO',
    '2026-06-03' => 'MERCOLEDI 3 GIUGNO',
    '2026-06-04' => 'GIOVEDI 4 GIUGNO',
    '2026-06-05' => 'VENERDI 5 GIUGNO',
    '2026-06-06' => 'SABATO 6 GIUGNO',
    '2026-06-07' => 'DOMENICA 7 GIUGNO',
    '2026-06-08' => 'LUNEDI 8 GIUGNO',
    '2026-06-09' => 'MARTEDI 9 GIUGNO',
    '2026-06-10' => 'MERCOLEDI 10 GIUGNO',
];

// PRENDO TUTTI I FILM
$filmRows = $conn->query("SELECT * FROM film WHERE attivo = 1 ORDER BY id")->fetch_all(MYSQLI_ASSOC);

// PER OGNI FILM VEDO A QUALI MOOD APPARTIENE
$moodRows = $conn->query("
    SELECT fm.film_id, m.nome
    FROM film_moods fm
    JOIN moods m ON fm.mood_id = m.id
    ORDER BY m.ordine
")->fetch_all(MYSQLI_ASSOC);

// Raggruppa i MOOD per ' film_id '
$moodPerFilm = [];
foreach ($moodRows as $row) {
    $moodPerFilm[$row['film_id']][] = $row['nome'];
}

// PRENDO TUTTI GLI ORARI
$orariRows = $conn->query("
    SELECT film_id, data, TIME_FORMAT(orario, '%H:%i') AS orario
    FROM orari
    ORDER BY data, orario
")->fetch_all(MYSQLI_ASSOC);

// PER OGNI FILM MOSTRO I SUOI ORARI
$orariPerFilm = [];
foreach ($orariRows as $row) {
    $dataStr = $row['data'];                       // '2026-06-01'
    $nomeGiorno = $mappaGiorni[$dataStr] ?? null;
    if (!$nomeGiorno) continue;
    $orariPerFilm[$row['film_id']][$nomeGiorno][] = $row['orario'];
}

$output = []; // METTO TUTTE LE SCHEDE FINALI DEI FILM
foreach ($filmRows as $f) { // PER OGNI FILM PRESO DAL DATABASE, qui sto nel MAIN, quindi VEDRÒ solo queste INFORMAZIONI
    $id = $f['id'];
    $output[] = [
        'titolo'    => $f['titolo'],
        'locandina' => $f['locandina'],
        'pagina'    => 'api/strutturaGenerale_film.php?id=' . $id,  
        'rating'    => (float) $f['rating'],
        'etichetta' => $f['etichetta'],
        'mood'      => $moodPerFilm[$id] ?? [],
        'orari'     => $orariPerFilm[$id] ?? (object)[],
    ];
}

echo json_encode($output, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT); // Il mio ARRAY viene formattato in stringhe di testo, il SECONDO parametro si occupa dei caratteri speciali ( lingue diverse ),
                                                                      // mentre il TERZO stampa bene e utilizza gli giusti spazi