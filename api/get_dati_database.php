<?php
require 'connessione.php'; 

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
$filmRows = $pdo->query("SELECT * FROM film WHERE attivo = 1 ORDER BY id")->fetchAll();

// PER OGNI FILM VEDO A QUALI MOOD APPARTIENE
$moodRows = $pdo->query("
    SELECT fm.film_id, m.nome
    FROM film_moods fm
    JOIN moods m ON fm.mood_id = m.id
    ORDER BY m.ordine
")->fetchAll();

// Raggruppa i MOOD per ' film_id '
$moodPerFilm = [];
foreach ($moodRows as $row) {
    $moodPerFilm[$row['film_id']][] = $row['nome'];
}

// PRENDO TUTTI GLI ORARI
$orariRows = $pdo->query("
    SELECT film_id, data, TIME_FORMAT(orario, '%H:%i') AS orario
    FROM orari
    ORDER BY data, orario
")->fetchAll();

// PER OGNI FILM MOSTRO I SUOI ORARI
$orariPerFilm = [];
foreach ($orariRows as $row) {
    $dataStr    = $row['data'];
    $nomeGiorno = $mappaGiorni[$dataStr] ?? null;
    if (!$nomeGiorno) continue;
    $orariPerFilm[$row['film_id']][$nomeGiorno][] = $row['orario'];
}

$output = [];
foreach ($filmRows as $f) {
    $id       = $f['id'];
    $output[] = [
        'titolo'    => $f['titolo'],
        'locandina' => $f['locandina'],
        'pagina'    => 'api/strutturaGenerale_film.php?id=' . $id,
        'rating'    => (float) $f['rating'],
        'etichetta' => $f['etichetta'],
        'genere'    => $f['genere'],
        'mood'      => $moodPerFilm[$id] ?? [],
        'orari'     => $orariPerFilm[$id] ?? (object)[],
    ];
}

echo json_encode($output, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);