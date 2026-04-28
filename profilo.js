(function() { // IIFE | Isola completamente VARIABILI e FUNZIONI in questo FILE

    // Creo LINK e Collego CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'profilo.css';
    document.head.appendChild(link);

    // Creo PopUp
    const overlay = document.createElement('div'); // DIV CENTRALE | Copre TUTTA la Pagina
    overlay.id = 'profilo-overlay';
    overlay.className = 'profilo-overlay';
    overlay.innerHTML = `
        <div class="profilo-popup"> <!-- DIV del PopUp VERO e PROPRIO -->
            <button class="profilo-chiudi" id="profilo-chiudi">&times</button>

            <!-- UTENTE Loggato ⤵️-->
            <div id="vista-loggato" style="display: none;"> <!-- Metto inizialmente ' display: none; ' per renderlo NON VISIBILE. Successivamente, in base a se utenteLoggato o utenteNonLoggato, decido quale DIV rendere VISIBILE -->
                <div id="saluto-benvenuto" style="text-align: center;"></div>
                <div class="foto-container">
                    <input type="file" id="foto-profilo" accept="image/*" style="display:none">
                    <div id="riquadro-foto-profilo">
                        <img id="img-profilo" src="omino_f_p.png">
                    </div>
                    <div class="azioni-foto" style="text-align: center;">
                        <label for="foto-profilo">Carica immagine profilo</label>
                        <span id="rem-foto-profilo" style="cursor:pointer;">Rimuovi</span>
                    </div>
                </div>

                <hr style="width: 50%; margin: 0 auto;">
                
                <div class="griglia-dati">
                    <div class="campo-half">
                        <label for="nome-utente">Nome: </label> <input type="text" id="nome-utente" readonly>
                    </div>
                    <div class="campo-half">
                        <label for="cognome-utente">Cognome: </label> <input type="text" id="cognome-utente" readonly>
                    </div>
                    <div class="campo-full">
                        <label for="mail-utente">Mail: </label> <input type="text" id="mail-utente" readonly>
                    </div>
                    <div class="campo-full">
                        <label for="data-nascita-utente">Età: </label> <input type="date" 
                                                                            id="data-nascita-utente" 
                                                                                name="data-nascita-utente"
                                                                                    value = ""
                                                                                        min="1900-01-01"
                                                                                            max="">
                    </div>
                </div>

                <hr style="width: 50%; margin: 0 auto;">
                
                <!-- CRONOLOGIA Film Acquistati ⤵️ -->
                <div id="cronologia">
                </div>

                <button id="logout-btn">Logout</button>
            </div>
            
        </div>
    `;

    document.body.appendChild(overlay);

    let keyFoto = 'fotoProfilo';
    let keyEta = 'eta';
    let profiloCaricato = false; // Evita che OGNI VOLTA che l'UTENTE APRE il PopUp vengano rifatte nuovamente la CHIAMATA ad ' api/sessione.php ' e tutti gli addEventListener

    function apriPU() {
        overlay.classList.add('aperto'); caricaProfilo();
    }

    function chiudiPU() {
        overlay.classList.remove('aperto');
    } document.getElementById('profilo-chiudi').addEventListener('click', chiudiPU); // CHIUDO PopUp se CLICCO su ' X ' | ' X ' è IDENTIFICATA da divProfiloChiudi
    
    overlay.addEventListener('click', function(e) { // Se CLICCO sul DIV GENERALE dell'OVERLAY
        if (e.target === overlay) chiudiPU(); // CHIUDE PopUp se il TARGET del mio CLICK è l'OVERLAY GENERALE, cioè praticamente l'INTERA PAGINA [ Principalmente lo Spazio al di fuori del PopUp ]
    });

    /* document.addEventListener('DOMContentLoaded', function() {
        const btnProfilo = document.getElementById('btn-profilo');
        if (btnProfilo) btnProfilo.addEventListener('click', apriPU);
    }); */

    const btnProfilo = document.getElementById('btn-profilo');
    if (btnProfilo) btnProfilo.addEventListener('click', apriPU);

    async function caricaCronologia() {
        const rispostaDaCron = await fetch('api/cronologia.php');
        const datiJSON = await rispostaDaCron.json();

        datiJSON.forEach(loc => {
            var elem = document.createElement("img");
            elem.src = loc.locandina;
            document.getElementById('cronologia').appendChild(elem);
        });
    }

    async function caricaProfilo() {
        /* let keyFoto = 'fotoProfilo';
        let keyEta = 'eta'; */

        if (profiloCaricato) return;
        profiloCaricato = true;

        try {
            const rispostaDaServer = await fetch('api/sessione.php'); // ASPETTA Risposta da Server
            const datiInJSON = await rispostaDaServer.json(); // ASPETTA che i Dati vengano CONVERTITI in JSON | Compila ' json_encode ' di ' sessione.php ', sostituendo i campi della STRUCT con i Dati veri e propri dell'UTENTE

            if (datiInJSON.loggato) {
                document.getElementById('vista-loggato').style.display = 'block'; // Rendo VISIBILE questo DIV

                keyFoto = 'fotoProfilo_' + datiInJSON.utente.id;
                keyEta = 'eta_' + datiInJSON.utente.id;

                const nomeUtente = datiInJSON.utente.nome.trim().split(' ')[0];
                const cognomeUtente = datiInJSON.utente.nome.trim().split(' ').slice(1).join(' ');

                const msgBenvenuto = document.getElementById('saluto-benvenuto'); msgBenvenuto.innerHTML = `<strong>Ciao, ${nomeUtente}</strong>`;
                    /* Controllo: */ console.log(document.getElementById('saluto-benvenuto'));

                document.getElementById('nome-utente').value = nomeUtente;
                document.getElementById('cognome-utente').value = cognomeUtente;
                document.getElementById('mail-utente').value = datiInJSON.utente.email;

                caricaCronologia();
            } else /* document.getElementById('vista-non-loggato').style.display = 'block'; */ // Altrimenti rendo VISIBILE questo DIV
                    window.location.href = "pop-up_registrazione.html";
        } catch(err) { console.log("Errore in caricamento dati utente in Sezione Profilo: ", err); /* document.getElementById('vista-non-loggato').style.display = 'block'; */ window.location.href = "pop-up_registrazione.html"; }

        // Imposta ' max ' con la DATA CORRENTE ⤵️
        const dataAttuale = new Date();
        const giorno = String(dataAttuale.getDate()).padStart(2, '0');
        const mese = String(dataAttuale.getMonth() + 1).padStart(2, '0');
        const anno = dataAttuale.getFullYear();
        
        const dataNascitaUtente = document.getElementById('data-nascita-utente');
        dataNascitaUtente.max = `${anno}-${mese}-${giorno}`;

        // caricaEta e SALVALA ad OGNI REFRESH ⤵️
        document.getElementById('data-nascita-utente').addEventListener('change', function() {
            localStorage.setItem(keyEta, this.value);
        });

        const etaSalvata = localStorage.getItem(keyEta);
        if (etaSalvata) document.getElementById('data-nascita-utente').value = etaSalvata;

        // caricaImmagine e SALVALA ad OGNI REFRESH ⤵️
        document.getElementById("foto-profilo").addEventListener('change', function() { // Lavora sul FILE di INPUT che CARICO
            const fileSelezionato = this.files[0]; // ' this ' si riferisce all'elemento che ha scatenato EVENTO, ovvero il PROTAGONISTA della chiamata a ' getElementById ' ( FILE da CARICARE )
                                                // ' files ' è una PROPRIETÀ degli INPUT di TIPO FILE
            if (!fileSelezionato) return; // Accade se UTENTE NON SELEZIONA alcun FILE

            /* const urlTemporaneoImmSel = URL.createObjectURL(fileSelezionato); // URL temporaneo dell'IMMAGINE SELEZIONATA | Lo userò in ' src ' di ' img ' per poter caricare l'IMG nel DIV
            document.getElementById("img-profilo").src = urlTemporaneoImmSel;
            document.getElementById('img-profilo').style.display = 'block'; */

            const reader = new FileReader();
            reader.onload = function(e) {
                const base64 = e.target.result;
                localStorage.setItem(keyFoto, base64);
                document.getElementById('img-profilo').src = base64;
                document.getElementById('img-profilo').style.display = 'block';
            }
            reader.readAsDataURL(fileSelezionato);
        });

        const fotoSalvata = localStorage.getItem(keyFoto);
        if (fotoSalvata) { document.getElementById('img-profilo').src = fotoSalvata; document.getElementById('img-profilo').style.display = 'block'; }

        // rimuoviImmagine ⤵️
        document.getElementById('rem-foto-profilo').addEventListener('click', function() {
            document.getElementById('img-profilo').src = "omino_f_p.png";
            document.getElementById('img-profilo').style.display = 'block';
            document.getElementById('foto-profilo').value = "";
            localStorage.removeItem(keyFoto);
        });

        // LogOut ⤵️
        document.getElementById('logout-btn').addEventListener('click', async function() {
            try {
                const rispostaPerLO = await fetch('api/logout.php', { method: 'POST' }); // ' POST ' perchè STO MODIFICANDO QUALCOSA ( Lo Stato dell'UTENTE )
                const datiRicevutiPerLO = await rispostaPerLO.json();

                if (datiRicevutiPerLO.successo) {
                    window.location.href = 'main.html';
                }
            } catch(err) { console.log("Errore in logout: ", err); }
        });
    };

}) ();