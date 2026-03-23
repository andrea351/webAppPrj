document.addEventListener("DOMContentLoaded", () => {

const film = [
    {
        titolo: "Billy Elliot",
        locandina: "locandine/billy_elliot.jpg",
        pagina: "film_html/billy_elliot.html",
        mood: ["Per tutta la famiglia", "Intrattenimento"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["15:00", "21:30"],
            "MERCOLEDI 3 GIUGNO": ["14:00", "19:00"],
            "SABATO 6 GIUGNO":    ["17:00", "22:30"],
            "DOMENICA 7 GIUGNO":  ["19:30"]
        }
    },
    {
        titolo: "La vita è bella",
        locandina: "locandine/la_vita_e_bella.jpg",
        pagina: "film_html/la_vita_e_bella.html",
        mood: ["Emotivo", "Basato su una storia vera"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["17:00", "21:00"],
            "MARTEDI 2 GIUGNO":   ["15:00", "20:00"],
            "GIOVEDI 4 GIUGNO":   ["18:00", "21:30"],
            "VENERDI 5 GIUGNO":   ["16:00", "19:00", "22:00"],
            "SABATO 6 GIUGNO":    ["11:00", "15:30", "21:00"],
            "DOMENICA 7 GIUGNO":  ["14:00", "18:30"]
        }
    },
    {
        titolo: "Il re leone",
        locandina: "locandine/re_leone.jpg",
        pagina: "film_html/re_leone.html",
        mood: ["Per tutta la famiglia"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["10:00", "14:30"],
            "MARTEDI 2 GIUGNO":   ["10:00", "14:00", "17:30"],
            "MERCOLEDI 3 GIUGNO": ["10:00", "13:00", "16:00"],
            "SABATO 6 GIUGNO":    ["10:00", "13:00", "16:00", "19:00"],
            "DOMENICA 7 GIUGNO":  ["10:00", "13:00", "16:30"]
        }
    },
    {
        titolo: "Fantozzi",
        locandina: "locandine/fantozzi.jpg",
        pagina: "film_html/fantozzi.html",
        mood: ["Leggerezza", "Intrattenimento"],
        orari: {
            "MARTEDI 2 GIUGNO":   ["18:00", "21:00"],
            "MERCOLEDI 3 GIUGNO": ["17:00", "20:30"],
            "GIOVEDI 4 GIUGNO":   ["19:00", "22:00"],
            "VENERDI 5 GIUGNO":   ["18:30", "21:30"],
            "SABATO 6 GIUGNO":    ["17:00", "20:00"],
            "LUNEDI 8 GIUGNO":    ["16:00", "19:30"]
        }
    },
    {
        titolo: "Natale sul Nilo",
        locandina: "locandine/natale_sul_nilo.jpg",
        pagina: "film_html/natale_sul_nilo.html",
        mood: ["Leggerezza"],
        orari: {
            "MERCOLEDI 3 GIUGNO": ["18:00", "21:00"],
            "VENERDI 5 GIUGNO":   ["20:00", "22:30"],
            "SABATO 6 GIUGNO":    ["18:30", "21:30"],
            "DOMENICA 7 GIUGNO":  ["17:00", "20:00"],
            "MARTEDI 9 GIUGNO":   ["19:30", "22:00"]
        }
    },
    {
        titolo: "La ladra di libri",
        locandina: "locandine/ladra_libri.jpg",
        pagina: "film_html/ladra_libri.html",
        mood: ["Emotivo", "Intrigante"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["16:00", "20:00"],
            "MARTEDI 2 GIUGNO":   ["17:30", "21:00"],
            "MERCOLEDI 3 GIUGNO": ["16:00", "20:30"],
            "GIOVEDI 4 GIUGNO":   ["17:00", "21:00"],
            "DOMENICA 7 GIUGNO":  ["15:00", "19:00", "22:00"]
        }
    },
    {
        titolo: "C'è ancora domani",
        locandina: "locandine/ce_ancora_domani.jpg",
        pagina: "film_html/ancora_domani.html",
        mood: ["Basato su una storia vera"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["18:30", "21:30"],
            "MARTEDI 2 GIUGNO":   ["19:00", "22:00"],
            "GIOVEDI 4 GIUGNO":   ["18:00", "21:00"],
            "VENERDI 5 GIUGNO":   ["17:30", "20:30"],
            "SABATO 6 GIUGNO":    ["16:00", "19:30", "22:30"],
            "DOMENICA 7 GIUGNO":  ["17:00", "21:00"]
        }
    },
    {
        titolo: "Wonder",
        locandina: "locandine/wonder.jpg",
        pagina: "film_html/wonder.html",
        mood: ["Per tutta la famiglia"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["15:00", "19:00"],
            "MARTEDI 2 GIUGNO":   ["14:30", "18:30"],
            "MERCOLEDI 3 GIUGNO": ["15:00", "19:30"],
            "SABATO 6 GIUGNO":    ["11:30", "15:00", "18:30"],
            "MERCOLEDI 10 GIUGNO":["11:00", "14:30", "18:00"]
        }
    },
    {
        titolo: "Oppenheimer",
        locandina: "locandine/oppenheimer.jpg",
        pagina: "film_html/oppenheimer.html",
        mood: ["Tensione", "Basato su una storia vera"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["17:00", "21:00"],
            "MARTEDI 2 GIUGNO":   ["17:00", "21:00"],
            "MERCOLEDI 3 GIUGNO": ["17:00", "21:00"],
            "GIOVEDI 4 GIUGNO":   ["17:00", "21:00"],
            "VENERDI 5 GIUGNO":   ["16:00", "20:00"],
            "SABATO 6 GIUGNO":    ["15:00", "19:30"],
            "DOMENICA 7 GIUGNO":  ["15:00", "19:30"]
        }
    },
    {
        titolo: "Una notte da leoni",
        locandina: "locandine/notte_leoni.jpg",
        pagina: "film_html/una_notte_da_leoni.html",
        mood: ["Leggerezza", "Intrattenimento"],
        orari: {
            "GIOVEDI 4 GIUGNO":   ["21:00"],
            "VENERDI 5 GIUGNO":   ["21:00", "23:30"],
            "SABATO 6 GIUGNO":    ["21:00", "23:30"],
            "DOMENICA 7 GIUGNO":  ["20:30"],
            "MARTEDI 9 GIUGNO":   ["21:30"]
        }
    },
    {
        titolo: "Orgoglio e pregiudizio",
        locandina: "locandine/org_pred.jpg",
        pagina: "film_html/orgoglio_p.html",
        mood: ["Romantico"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["16:30", "20:00"],
            "MERCOLEDI 3 GIUGNO": ["15:00", "19:00"],
            "GIOVEDI 4 GIUGNO":   ["16:00", "20:00"],
            "SABATO 6 GIUGNO":    ["14:30", "18:00"],
            "DOMENICA 7 GIUGNO":  ["13:00", "17:00", "21:00"]
        }
    },
    {
        titolo: "La vita di Pi",
        locandina: "locandine/vita_pi.jpg",
        pagina: "film_html/lavitadipi.html",
        mood: ["Avventura", "Sorprendente"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["14:00", "18:00"],
            "MARTEDI 2 GIUGNO":   ["15:30", "20:00"],
            "VENERDI 5 GIUGNO":   ["15:00", "19:30"],
            "SABATO 6 GIUGNO":    ["13:30", "17:30", "21:30"],
            "DOMENICA 7 GIUGNO":  ["14:00", "18:30"]
        }
    },
    {
        titolo: "La ricerca della felicità",
        locandina: "locandine/ricerca_felicita.jpg",
        pagina: "film_html/ricerca_felicita.html",
        mood: ["Emotivo", "Basato su una storia vera"],
        orari: {
            "MARTEDI 2 GIUGNO":   ["16:30", "20:30"],
            "MERCOLEDI 3 GIUGNO": ["17:00", "21:00"],
            "GIOVEDI 4 GIUGNO":   ["15:30", "19:30"],
            "VENERDI 5 GIUGNO":   ["16:00", "20:00"],
            "DOMENICA 7 GIUGNO":  ["16:00", "20:30"]
        }
    },
    {
        titolo: "Mamma ho perso l'aereo",
        locandina: "locandine/mamma_perso_aereo.jpg",
        pagina: "film_html/aereo.html",
        mood: ["Leggerezza", "Per tutta la famiglia"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["10:30", "14:00"],
            "MARTEDI 2 GIUGNO":   ["10:00", "13:30"],
            "MERCOLEDI 3 GIUGNO": ["10:30", "14:00"],
            "SABATO 6 GIUGNO":    ["10:00", "12:30", "15:00"],
            "DOMENICA 7 GIUGNO":  ["10:00", "12:30", "15:00"]
        }
    },
    {
        titolo: "Toy Story",
        locandina: "locandine/toy_story.jpg",
        pagina: "film_html/toyStory.html",
        mood: ["Per tutta la famiglia", "Intrattenimento"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["11:00", "14:30"],
            "MERCOLEDI 3 GIUGNO": ["11:00", "14:00"],
            "GIOVEDI 4 GIUGNO":   ["10:30", "13:30"],
            "SABATO 6 GIUGNO":    ["10:30", "13:00", "15:30"],
            "DOMENICA 7 GIUGNO":  ["10:30", "13:00", "15:30"]
        }
    },
    {
        titolo: "Il bambino con il pigiama a righe",
        locandina: "locandine/b_p_righe.jpg",
        pagina: "film_html/bambino_righe.html",
        mood: ["Emotivo", "Basato su una storia vera"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["19:00", "21:30"],
            "MARTEDI 2 GIUGNO":   ["18:30", "21:00"],
            "GIOVEDI 4 GIUGNO":   ["19:30", "22:00"],
            "VENERDI 5 GIUGNO":   ["19:00", "21:30"],
            "SABATO 6 GIUGNO":    ["20:00", "22:30"],
            "MERCOLEDI 10 GIUGNO":["16:00", "18:30", "22:00"]
        }
    },
    {
        titolo: "Conclave",
        locandina: "locandine/conclave.jpg",
        pagina: "film_html/conclave.html",
        mood: ["Tensione", "Sorprendente"],
        orari: {
            "MARTEDI 2 GIUGNO":   ["19:30", "22:30"],
            "MERCOLEDI 3 GIUGNO": ["20:00", "22:30"],
            "GIOVEDI 4 GIUGNO":   ["20:00", "22:30"],
            "VENERDI 5 GIUGNO":   ["19:00", "22:00"],
            "SABATO 6 GIUGNO":    ["18:00", "21:00"],
            "DOMENICA 7 GIUGNO":  ["18:00", "21:00"]
        }
    },
    {
        titolo: "Snowden",
        locandina: "locandine/snowden.jpg",
        pagina: "film_html/snowden.html",
        mood: ["Intrigante", "Basato su una storia vera", "Adrenalina"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["19:00", "21:00"],
            "MARTEDI 2 GIUGNO":   ["20:00", "22:30"],
            "MERCOLEDI 3 GIUGNO": ["19:30", "21:30"],
            "GIOVEDI 4 GIUGNO":   ["20:00", "22:30"],
            "VENERDI 5 GIUGNO":   ["19:00", "21:00", "23:00"],
            "SABATO 6 GIUGNO":    ["18:30", "20:30", "23:00"],
            "DOMENICA 7 GIUGNO":  ["18:00", "20:00"]
        }
    },
    {
        titolo: "The Conjuring",
        locandina: "locandine/t_c.jpg",
        pagina: "film_html/the_conjuring.html",
        mood: ["Horror", "Tensione"],
        orari: {
            "MARTEDI 2 GIUGNO":   ["21:00", "23:00"],
            "GIOVEDI 4 GIUGNO":   ["21:30", "23:30"],
            "VENERDI 5 GIUGNO":   ["21:00", "23:00"],
            "SABATO 6 GIUGNO":    ["22:00"],
            "DOMENICA 7 GIUGNO":  ["21:30"]
        }
    },
    {
        titolo: "Cena con delitto",
        locandina: "locandine/c_c_d.jpg",
        pagina: "film_html/cena_con_delitto.html",
        mood: ["Tensione", "Intrigante", "Leggerezza"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["20:00"],
            "MERCOLEDI 3 GIUGNO": ["20:30"],
            "GIOVEDI 4 GIUGNO":   ["19:00", "21:30"],
            "SABATO 6 GIUGNO":    ["19:30", "22:00"],
            "DOMENICA 7 GIUGNO":  ["19:00", "21:30"],
            "LUNEDI 8 GIUGNO":    ["20:00", "22:30"]
        }
    },
    {
        titolo: "Avatar",
        locandina: "locandine/avatar.jpg",
        pagina: "film_html/avatar.html",
        mood: ["Avventura", "Adrenalina", "Sorprendente"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["16:00", "20:30"],
            "MARTEDI 2 GIUGNO":   ["16:00", "20:30"],
            "MERCOLEDI 3 GIUGNO": ["15:30", "20:00"],
            "SABATO 6 GIUGNO":    ["14:00", "18:30"],
            "DOMENICA 7 GIUGNO":  ["14:00", "18:30"],
            "MARTEDI 9 GIUGNO":   ["17:00", "21:00"]
        }
    },
    {
        titolo: "Interstellar",
        locandina: "locandine/interstellar.jpg",
        pagina: "film_html/interstellar.html",
        mood: ["Avventura", "Sorprendente", "Tensione"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["17:30", "21:30"],
            "MARTEDI 2 GIUGNO":   ["17:30", "21:30"],
            "MERCOLEDI 3 GIUGNO": ["17:00", "21:00"],
            "GIOVEDI 4 GIUGNO":   ["17:00", "21:30"],
            "VENERDI 5 GIUGNO":   ["17:00", "21:00"],
            "MERCOLEDI 10 GIUGNO":["17:00", "21:00"]
        }
    },
    {
        titolo: "Top Gun - Maverick",
        locandina: "locandine/t_g_m.jpg",
        pagina: "film_html/top_gun.html",
        mood: ["Adrenalina", "Avventura", "Intrattenimento"],
        orari: {
            "MARTEDI 2 GIUGNO":   ["16:00", "20:00"],
            "MERCOLEDI 3 GIUGNO": ["16:30", "20:30"],
            "GIOVEDI 4 GIUGNO":   ["16:00", "20:00"],
            "VENERDI 5 GIUGNO":   ["15:30", "19:30"],
            "SABATO 6 GIUGNO":    ["15:00", "19:00"],
            "MARTEDI 9 GIUGNO":   ["16:00", "20:00"]
        }
    },
    {
        titolo: "Le pagine della nostra vita",
        locandina: "locandine/le_pag_vita.jpg",
        pagina: "film_html/pagine_vita.html",
        mood: ["Romantico", "Emotivo"],
        orari: {
            "LUNEDI 1 GIUGNO":    ["15:30", "19:30"],
            "MERCOLEDI 3 GIUGNO": ["15:30", "19:30"],
            "GIOVEDI 4 GIUGNO":   ["15:00", "19:00"],
            "SABATO 6 GIUGNO":    ["13:00", "17:00"],
            "DOMENICA 7 GIUGNO":  ["13:00", "17:00"],
            "LUNEDI 8 GIUGNO":    ["15:00", "19:00"]
        }
    }
];

const tuttiIMood = [
    "Tensione",
    "Leggerezza",
    "Intrigante",
    "Emotivo",
    "Romantico",
    "Sorprendente",
    "Per tutta la famiglia",
    "Adrenalina",
    "Basato su una storia vera",
    "Avventura",
    "Intrattenimento",
    "Horror"
];

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

// GESTIONE FILM - MOOD ⤵️

let giornoAttivo = "tutti";

function costruisciPag(){
    contenitore.innerHTML="";

    tuttiIMood.forEach(m=>{
        const film_appartiene_al_mood=film.filter(f=>{
            if(!f.mood.includes(m)) return false; // Se il Mood NON appartiene a quel Film, allora lo SCARTA
            if(giornoAttivo === "tutti") return true;
            return Object.keys(f.orari).includes(giornoAttivo);
        });

        if (film_appartiene_al_mood.length === 0) return;

        const sezione=document.createElement("div");
        sezione.className="mood-sezione";
        sezione.id="mood-"+m.replace(/[^a-zA-Z]/g, "");

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
                if (giornoAttivo !== "tutti") {
                    f.orari[giornoAttivo]?.forEach(ora => {
                        orari_html += `<button class="bottone-orario">${ora}</button>`;
                    });
                }

                card.innerHTML = `
                    <a href="${f.pagina}">
                        <img src="${f.locandina}" alt="${f.titolo}">
                    </a>
                    <div class="orari">${orari_html}</div>
                `;
                riga.appendChild(card);
                observer.observe(card); // Per ogni FILM appartenente al MOOD viene creata una filmCard con gli orari
            });

        sezione.appendChild(riga);
        contenitore.appendChild(sezione);
    });
}

// Bottoni Mood → Scroll alla SEZIONE CORRISPONDENTE
document.querySelectorAll("#mood-btn button").forEach(btn => {
    btn.addEventListener("click", () => {
        const moodLabel = btn.textContent.trim();
        const idPulito = "mood-" + moodLabel.replace(/[^a-zA-Z]/g, "");
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

        listaScorrevole.appendChild(cell);
    }

    const btnTutti = document.createElement("button");
    btnTutti.textContent = "🍿 Tutti i film";
    btnTutti.className = "cal-btn-tutti";
    btnTutti.addEventListener("click", () => {
        document.querySelectorAll(".cal-giorno").forEach(c => c.classList.remove("cal-selezionato"));
        giornoAttivo = "tutti";
        costruisciPag();
    });
    cal.appendChild(btnTutti);
}

// AVVIO
costruisciPag();
costruisciCalendario();
});