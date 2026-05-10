<?php

require 'configurazione.php'; 
                              
$film = null;
$titolo_cercato = "";

if (isset($_GET['id']) && intval($_GET['id']) > 0) {
    $id = intval($_GET['id']);
    
    $stmt = $conn->prepare("SELECT * FROM film WHERE id = ? AND attivo = 1");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $film = $stmt->get_result()->fetch_assoc();
} 
// L'utente ha usato la barra di ricerca 
elseif (isset($_GET['titolo_film']) && !empty(trim($_GET['titolo_film']))) {
    $titolo_cercato = trim($_GET['titolo_film']);
    
    $stmt = $conn->prepare("SELECT * FROM film WHERE titolo = ? AND attivo = 1 LIMIT 1");
    // CORREZIONE: Usiamo $titolo_cercato, non $titoloFilm
    $stmt->bind_param("s", $titolo_cercato); 
    $stmt->execute();
    $film = $stmt->get_result()->fetch_assoc();
}

// SE IL FILM NON C'È
if (!$film) {
    echo '<!DOCTYPE html>
    <html lang="eng">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Film non in programma - Mood Cinema</title>
        <base href="/webAppPrj/">
        <link rel="stylesheet" href="main.css">
        <link rel="icon" href="logo.png">
    </head>
    <body>
        <header class="pannello-superiore">
            <nav class="menu-sx">
                <a href="main.html">HOME</a>
                <a href="contatti.html">CONTATTACI</a>
                <a href="servizi.html">SERVIZI</a>
            </nav>
            <div class="logo-centro">
                <a href="main.html">
                    <img src="logo.png" alt="Logo Cinema" class="img-logo">
                </a>
            </div>
            <div class="menu-destra">
                <button id="btn-profilo" class="bottone-profilo">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                </button>
            </div>
        </header>

        <hr>

        <div style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 55vh;
            gap: 20px;
        ">
            <h1 style="
                font-family: \'Georgia\', serif;
                font-size: 17px;
                font-weight: normal;
                color: rgba(250,238,241,0.5);
                letter-spacing: 2px;
                margin: 0;
                text-align: center;
            ">Questo film non è in programma</h1>

            <div style="width: 40px; height: 1px; background: rgba(187,34,72,0.35);"></div>

            <p style="
                font-family: \'Georgia\', serif;
                font-size: 11px;
                color: rgba(250,238,241,0.2);
                letter-spacing: 1px;
                margin: 0;
                font-style: italic;
            "></p>

        <script src="profilo.js"></script>
    </body>
    </html>';
    exit;
}

$id = $film['id']; 
$durata = $film['durata'];

// Cerco nel mio DB gli ORARI per il FILM in QUESTIONE ( ID precedentemente preso )

$mappaInversaGiorni = [
    'LUNEDI 1 GIUGNO'    => '2026-06-01',
    'MARTEDI 2 GIUGNO'   => '2026-06-02',
    'MERCOLEDI 3 GIUGNO' => '2026-06-03',
    'GIOVEDI 4 GIUGNO'   => '2026-06-04',
    'VENERDI 5 GIUGNO'   => '2026-06-05',
    'SABATO 6 GIUGNO'    => '2026-06-06',
    'DOMENICA 7 GIUGNO'  => '2026-06-07',
    'LUNEDI 8 GIUGNO'    => '2026-06-08',
    'MARTEDI 9 GIUGNO'   => '2026-06-09',
    'MERCOLEDI 10 GIUGNO'=> '2026-06-10',
];

$giornoRicevuto = $_GET['data'] ?? 'LUNEDI 1 GIUGNO';
$oggi = $mappaInversaGiorni[$giornoRicevuto] ?? '2026-06-01';

$stmtOrari = $conn->prepare(
    "SELECT orario, sala FROM orari WHERE film_id = ? AND data = ? ORDER BY orario ASC"
);
$stmtOrari->bind_param("is", $id, $oggi);
$stmtOrari->execute();
$orari = $stmtOrari->get_result()->fetch_all(MYSQLI_ASSOC); // ' fetch_all(MYSQLI_ASSOC) ' mi crea un ARRAY MULTIDIMENSIONALE, perchè posso avere più ORARI per un FILM

$durata = $film['durata'];


function e($str) { return htmlspecialchars($str ?? '', ENT_QUOTES, 'UTF-8'); }
?>
<!DOCTYPE html>
<html lang="eng">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= e($film['titolo']) ?> - Mood Cinema</title>

    <base href="/webAppPrj/">
    <link rel="stylesheet" href="main.css">
    <link rel="stylesheet" href="film_html/struttura_dati.css">
    <link rel="stylesheet" href="film_html/booking.css">
    <link rel="icon" href="logo.png">
</head>
<body>
    <header class="pannello-superiore">
        <nav class="menu-sx">
            <a href="main.html">TORNA ALLA HOME</a>
            <a href="contatti.html">CONTATTACI</a>
            <a href="servizi">SERVIZI</a>
        </nav>

        <div class="logo-centro">
            <a href="main.html">
                <img src="logo.png" alt="Logo Cinema" class="img-logo">
            </a>
        </div>

        <div class="menu-destra">
            <button id="btn-profilo" class="bottone-profilo">
                <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
            </button>
        </div>
    </header>

    <hr style="width: 70%;">

  
    <div class="contenitore-dettaglio">

        <!-- Locandina + Trailer -->
        <div class="dettaglio-sx">
            <div class="media-container" id="trailer-container">
                <img
                    src="<?= e($film['locandina']) ?>"
                    alt="Locandina <?= e($film['titolo']) ?>"
                    id="poster-img"
                >
                <video
                    id="trailer-video"
                    src="<?= e($film['trailer']) ?>"
                    muted loop preload="auto"
                ></video>
                <div class="play-overlay"></div>
            </div>
        </div>

        <!-- Info + Booking -->
        <div class="dx-wrapper" id="dx-wrapper">

            <div class="dettaglio-dx" id="dettaglio-dx">

                <h1 class="titolo-film-dettaglio"><?= e($film['titolo']) ?></h1>

                <div class="info-tecniche">
                    <span><?= e($film['anno']) ?></span>
                    <span class="pallino">•</span>
                    <span><?= e($film['genere']) ?></span>
                    <span class="pallino">•</span>
                    <span><?= e($durata) ?></span>
                </div>

                <p class="trama-film"><?= e($film['trama']) ?></p>

                <div class="cast-film">
                    <p><strong>Regia:</strong> <?= e($film['regia']) ?></p>
                    <p><strong>Cast:</strong> <?= e($film['cast_film']) ?></p>
                </div>

                <!-- Orari, presi direttamente dal mio DB -->
                <div class="orari-section">
                    <div class="orari-lista" id="orari-lista">

                        <?php if (empty($orari)): ?>
                            <p style="color: rgba(255,255,255,0.35); font-size: 13px;">
                                Nessuna proiezione oggi.
                            </p>
                        <?php else: ?>
                            <?php foreach ($orari as $o):
                                $orarioFormattato = substr($o['orario'], 0, 5); // Formatta l'orario [ Es. "14:30:00" -> "14:30" ]
                            ?>
                                <button
                                    class="btn-orario"
                                    data-orario="<?= e($orarioFormattato) ?>"
                                    data-sala="<?= e($o['sala']) ?>"
                                >
                                    <?= e($orarioFormattato) ?>
                                </button>
                            <?php endforeach; ?>
                        <?php endif; ?>

                    </div>

                    <button class="btn-continua" id="btn-continua" disabled>
                        CONTINUA <span class="freccia-continua">→</span>
                    </button>
                </div>

            </div>

            <!-- Booking Panel -->
            <div class="booking-panel" id="booking-panel">
                <div class="orario-badge" id="orario-badge"></div>
                <button class="btn-chiudi-booking" id="btn-chiudi-booking">✕</button>

                <div class="booking-inner">

                    <div class="sala-container">
                        <div class="schermo-label"><span>SCHERMO</span></div>
                        <div class="griglia-posti" id="griglia-posti"></div>
                        <div class="legenda-posti">
                            <span class="legenda-item">
                                <i class="posto-sample disponibile"></i> Disponibile
                            </span>
                            <span class="legenda-item">
                                <i class="posto-sample selezionato"></i> Selezionato
                            </span>
                            <span class="legenda-item">
                                <i class="posto-sample occupato"></i> Occupato
                            </span>
                        </div>
                    </div>

                    <div class="booking-sidebar">
                        <div class="sidebar-riepilogo">
                            <h3 class="sidebar-titolo">Riepilogo</h3>
                            <div class="riepilogo-righe" id="riepilogo-righe">
                                <p class="nessun-posto">Seleziona i tuoi posti dalla mappa</p>
                            </div>
                            <div class="riepilogo-totale">
                                <span>Totale</span>
                                <span id="totale-display">€ 0.00</span>
                            </div>
                        </div>

                        <div class="timer-box" id="timer-box">
                            <div class="timer-icona">⏱</div>
                            <div class="timer-testo">
                                <span class="timer-label">Tempo per completare</span>
                                <span class="timer-display" id="timer-display">15:00</span>
                            </div>
                        </div>

                        <div class="pagamento-form">
                            <p class="pagamento-titolo">Pagamento</p>
                            <input type="text" placeholder="Numero carta"
                                   class="input-carta" maxlength="19" id="input-carta"> <!-- INPUT - CARTA -->
                            <div class="input-row">
                                <input type="text" placeholder="MM / AA"
                                       class="input-carta half" maxlength="5" id="input-scadenza"> <!-- INPUT - SCADENZA -->
                                <input type="text" placeholder="CVV"
                                       class="input-carta half" maxlength="4" id="input-cvv"> <!-- INPUT - CVV -->
                            </div>
                            <input type="text" placeholder="Nome del titolare" class="input-carta" id="input-nome"> <!-- INPUT - NOME -->
                            <button class="btn-paga" id="btn-paga" disabled>ACQUISTA ORA</button>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    </div>

    <script>
        window._cmDatiFilm = {
            titolo:     <?= json_encode($film['titolo']) ?>,
            locandina:  <?= json_encode($film['locandina']) ?>,
            dataAttiva: '<?= $oggi ?>',
        };
    </script>
    <script defer src="film.js"></script>
    <script defer src="film_html/booking.js"></script>
    <script defer src="profilo.js"></script>
    <script>
        if (typeof stato !== 'undefined' && window._cmDatiFilm)
            stato.datiFilm = window._cmDatiFilm;
    </script>

</body>
</html>