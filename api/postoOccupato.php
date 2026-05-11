<?php
require 'connessione.php';
header('Content-Type: application/json');

$film_id=intval($_GET['film_id'] ?? 0);
$data=trim($_GET['data']      ?? '');
$orario=trim($_GET['orario']    ?? '');
if (strlen($orario) === 5) $orario .= ':00'; 

if (!$film_id || !$data || !$orario) {
    echo json_encode(['posti' =>[]]);
    exit;
}

$stmt = $pdo->prepare("
    SELECT posto FROM postiOccupati
    WHERE film_id=? AND data=? AND orario=?");

$stmt->execute([$film_id, $data, $orario]);
$righe = $stmt->fetchAll(PDO::FETCH_COLUMN);

echo json_encode(['posti' => $righe]);