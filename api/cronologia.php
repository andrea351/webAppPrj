<?php

session_start();
header('Content-Type: application/json');

if (!empty($_SESSION['utente_id'])) {
    $stmt = $pdo->prepare("SELECT locandina FROM acquisti WHERE utente_id = ?");
        // ' $stmt->execute() ' Restituisce un BOOL se la QUERY PREPARATA con ' $pdo->prepare ' è stata ESEGUITA CORRETTAMENTE
    if ($stmt->execute([$_SESSION['utente_id']])) {
        $risultatiQuerySQL = $stmt->fetchAll(PDO::FETCH_ASSOC); // ' risultatiQuerySQL ' è un ARRAY

        /* foreach ($risultatiQuerySQL as $locandina) {
            $file_locandine->$locandina
            $locandine_cronologia = json_encode($file_locandine);
            echo $loca
        } */

        /* $locandine_cronologia = json_encode($risultatiQuerySQL); echo $locandine_cronologia; */

        echo json_encode($risultatiQuerySQL);
    } else { echo json_encode(['errore' => 'Query fallita']); }
} else echo json_encode(['errore' => 'Utente NON autenticato']);