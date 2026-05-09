document.addEventListener("DOMContentLoaded", async () => {
    
    let film = []; // Qui metterò i FILM caricati direttamente dal mio DataBase
    let generiFiltrati = {}; // {"Chiave_1": Valore_1, "Chiave_2": Valore_2, ...} | GENERI che Appaiono nella Cronologia dell'Utente
    let cronologiaArray = [];
    try {
        const res = await fetch('api/get_dati_database.php');
        film = await res.json();
    } catch (e) {
        console.error('Errore nel caricamento dei film: ', e);
    }

    const tuttiIMood = [
        "Fiato Sospeso",
        "Curioso",
        "Mind - Blowing",
        "Storie Vere",
        "Serata In Famiglia",
        "Solo Adrenalina",
        "Love",
        "All'Avventura",
        "Zero Pensieri",
        "Da Urlo",
        "Risate",
        "Lacrime In Arrivo"
    ];

    // JSON Ricevuto da ' suggeriti.php ' con [ Locandina, Rating, Genere, countGenere ] ⤵️
    try {
        const rispostaSuggPHP = await fetch('api/suggeriti.php');
        const datiRicevuti = await rispostaSuggPHP.json();

        if (!datiRicevuti.errore) {
            cronologiaArray = datiRicevuti;
            datiRicevuti.forEach(insiemeDati => {
                const generiSingoli = insiemeDati.GenUno.split("/");
                generiSingoli.forEach(genereSing => {
                    genereSing = genereSing.trim();
                    if (!(genereSing in generiFiltrati)) { generiFiltrati[genereSing] = 0; generiFiltrati[genereSing] += 1; }
                    else generiFiltrati[genereSing] += 1;
                });
            });
        }
    } catch(e) { console.error('Errore caricamento SUGGERITI: ', e); }

    const contenitore = document.getElementById("contenitore-film"); // Indica dove METTERE le CARD dei FILM

    // API di JS che evita l'utilizzo di Librerie Esterne. Questo SCRIPT rileva quando un oggetto entra nel campo visivo e fa partire un'ANIMAZIONE definita
    // È un CODICE PREDEFINITO in quanto è un API di JS
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("visible");
                }, index * 100); 
            } else entry.target.classList.remove("visible");
        });
    }, { 
        rootMargin: "150px", 
        threshold: 0        
    });

    let giornoAttivo = "LUNEDI 1 GIUGNO";

    function costruisciPag(){
        contenitore.innerHTML="";

        tuttiIMood.forEach(m=>{
            const film_appartiene_al_mood=film.filter(f=>{
                if(!f.mood.includes(m)) return false; // Se il Mood NON appartiene a quel Film, allora lo SCARTA
                return Object.keys(f.orari).includes(giornoAttivo);
            });

            if (film_appartiene_al_mood.length === 0) return;

            const sezione=document.createElement("div");
            sezione.className="mood-sezione";
            sezione.id="mood-"+m.replace(/[^a-zA-Z]/g, "").toLowerCase();

            sezione.innerHTML=`
                <div class="mood-sezione-header">
                    <span class="mood-sezione-label">${m}</span>
                </div>`;

            const riga = document.createElement("div");
            riga.className = "mood-riga-film"; // Creo una scatola orizzontale dove si allineano le Locandine
            film_appartiene_al_mood.forEach(f=>{
                const card=document.createElement("div");
                card.className="film-card"; 

                let orari_html = "";
                    
                    f.orari[giornoAttivo]?.forEach(ora => {
                        orari_html += `<button class="bottone-orario">${ora}</button>`;
                    });
                    
                    card.innerHTML = `
                        <!-- <a href="${f.pagina}"> -->
                        <a href="${f.pagina}&data=${encodeURIComponent(giornoAttivo)}">
                            <img src="${f.locandina}" alt="${f.titolo}">
                                <div class="etichette">${f.etichetta}</div>
                                    <div class="rating">${f.rating}☆</div>
                        </a>
                        <div class="orari">${orari_html}</div>
                    `;
                    riga.appendChild(card);
                    observer.observe(card); // Per ogni FILM appartenente al MOOD viene creata una filmCard con gli orari
                });

            sezione.appendChild(riga);
            contenitore.appendChild(sezione);
        }); mostraSuggeriti();
    }

    function mostraSuggeriti() {
        let filmDaMostrare = [];

        if (Object.keys(generiFiltrati).length === 0) { // NO Cronologia === NO Generi, perciò FILTRA per RATING | Sceglie i FILM con il Miglior RATING tra TUTTI QUELLI Presenti quel GIORNO, ovviamente Indipendentemente dal GENERE
            filmDaMostrare = film
                .filter(f => Object.keys(f.orari).includes(giornoAttivo))
                    .sort((a, b) => b.rating - a.rating)
                        .slice(0, 5);
        } else {
            filmDaMostrare = film
                .filter(f => Object.keys(f.orari).includes(giornoAttivo)) // FILM Disponibili OGGI
                .filter(f => !cronologiaArray.some(datoR => {
                    return (f.locandina === datoR.LocDue) 
                }))
                    .map(f => { // ... E tra quelli Disponibili Oggi effettua la seguente Operazione di MAPPING
                        let score = 0;
                        const genF = f.genere.split("/");
                        genF.forEach(genSingolo => {
                            genSingolo = genSingolo.trim();
                            if (genSingolo in generiFiltrati) score += generiFiltrati[genSingolo] * 2;
                        });

                        score += f.rating;

                        return { ... f, score};
                    })
                        .filter(f => f.score > 0) // Scarta FILM il cui GENERE NON è MAI stato ACQUISTATO
                            .sort((a, b) => b.score - a.score)
                                .slice(0, 5); // Viene resa VISIBILI SOLO la TOP 5 dei Suggeriti
        } if (filmDaMostrare.length === 0) return; 

        // Costruisco il DOM con l'HTML ⤵️
        const divSuggeriti = document.getElementById('suggeriti-per-te');
        divSuggeriti.innerHTML = '';

        filmDaMostrare.forEach(filmToShow => {
            const imgSpace = document.createElement('img'); const linkToGo = document.createElement('a');
            imgSpace.src = filmToShow.locandina; linkToGo.href = `${filmToShow.pagina}&data=${encodeURIComponent(giornoAttivo)}`;

            linkToGo.appendChild(imgSpace);
            divSuggeriti.appendChild(linkToGo);
            observer.observe(linkToGo);
        });
    }

    // Bottoni Mood -> Scroll alla SEZIONE CORRISPONDENTE
    document.querySelectorAll("#mood-btn button").forEach(btn => {
        btn.addEventListener("click", () => {
            const moodLabel = btn.textContent.trim();
            const idPulito = "mood-" + moodLabel.replace(/[^a-zA-Z]/g, "").toLowerCase();
                console.log("ID cercato: ", idPulito);
                console.log("Sezione trovata: ", document.getElementById(idPulito));
            const sezione = document.getElementById(idPulito);
            if (sezione) {
                sezione.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // CALENDARIO ⤵️

    // Mette in un Set TUTTI i giorni in cui c'è una Programmazione
    const giorniConFilm = new Set();
    film.forEach(f => {
        Object.keys(f.orari).forEach(giorno => giorniConFilm.add(giorno));
    });

    const mappaGiorni = {
        "2026-06-01": "LUNEDI 1 GIUGNO",
        "2026-06-02": "MARTEDI 2 GIUGNO",
        "2026-06-03": "MERCOLEDI 3 GIUGNO",
        "2026-06-04": "GIOVEDI 4 GIUGNO",
        "2026-06-05": "VENERDI 5 GIUGNO",
        "2026-06-06": "SABATO 6 GIUGNO",
        "2026-06-07": "DOMENICA 7 GIUGNO",
        "2026-06-08": "LUNEDI 8 GIUGNO",
        "2026-06-09": "MARTEDI 9 GIUGNO",
        "2026-06-10": "MERCOLEDI 10 GIUGNO"
    }

    function costruisciCalendario() {
        const cal = document.getElementById("wrapper"); // Sovra - DIV [ Contiene ' Calendario ' e anche ALTRE COSE ]
        const listaScorrevole = document.getElementById("calendario"); // Sotto - DIV [ Contiene SOLO ' Calendario ' ]
        listaScorrevole.innerHTML = ``;
        // cal.innerHTML = ``;

        const meseDiProgrammazione = "GIU";

        for (let giorno = 1; giorno <= 30; giorno++) {
            const cell = document.createElement("div");
            const dataKey = `2026-06-${String(giorno).padStart(2, "0")}`;
            const nomeGiorno = mappaGiorni[dataKey];

            cell.className = "cal-giorno";

            if (!nomeGiorno || !giorniConFilm.has(nomeGiorno)) continue; // Se un GIORNO NON ha FILM in PROGRAMMAZIONE, allora NON rappresentarlo nel CALENDARIO 

            cell.innerHTML += `
                <h1>${dataKey.split("-")[2]}</h1>
                    <h2>${meseDiProgrammazione}</h2>
                        <h3>${Object.entries(mappaGiorni).map(([dataNumerica]) => { // ' forEach ' viene usato per ESEGUIRE OPERAZIONI SUGLI ELEMENTI, pertanto NON ritorna niente che possa essere riutilizzato, poichè il suo valore di ritorno è ' undefined '. ' map ', invece, restituisce un ARRAY su cui poter LAVORARE
                                    if (dataNumerica === dataKey) return mappaGiorni[dataNumerica].slice(0, 3);
                                }).join("")
                            }
                        </h3>
            `
            cell.addEventListener("click", () => {
                document.querySelectorAll(".cal-giorno").forEach(c => c.classList.remove("cal-selezionato"));
                cell.classList.add("cal-selezionato");
                giornoAttivo = nomeGiorno;
                costruisciPag();
            });

            if (nomeGiorno === giornoAttivo) cell.classList.add("cal-selezionato");

            listaScorrevole.appendChild(cell);
        }
    }

    // AVVIO
    costruisciPag();
    costruisciCalendario();
});