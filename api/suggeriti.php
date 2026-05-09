<?php

session_start();
require __DIR__ . '/../api/connessione.php';
header('Content-Type: application/json');

if (!empty($_SESSION['utente_id'])) {
    $stmt = $pdo->prepare("WITH queryUno AS (
                                                SELECT /* DISTINCT A.locandina, */ F.genere AS GenUno, /* F.rating, */ COUNT(F.genere) AS contoGenUno -- SUBSTRING (A.locandina FROM 9)
                                                    FROM acquisti A JOIN film F ON A.locandina = F.locandina
                                                        WHERE A.utente_id = ?
                                                            GROUP BY F.genere),
                            queryDue AS (
                                            SELECT A.locandina AS LocDue, F.genere AS GenDue, F.rating AS RatDue
                                                FROM acquisti A JOIN film F ON A.locandina = F.locandina
                                                    WHERE A.utente_id = ?
                            )

                            SELECT queryDue.LocDue, queryDue.RatDue, queryUno.GenUno, queryUno.contoGenUno
                                FROM queryUno JOIN queryDue ON queryUno.GenUno = queryDue.GenDue
                        ");
    
    if ($stmt->execute([$_SESSION['utente_id'], $_SESSION['utente_id']])) {
        $resQuerySQL = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($resQuerySQL);
    } else echo json_encode(['errore' => 'Query fallita']);
} else echo json_encode(['errore' => 'Utente NON autenticato']);