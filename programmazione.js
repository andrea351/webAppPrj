document.addEventListener("DOMContentLoaded", () => {

const film = [
    {
        titolo: "Billy Elliot",
        locandina: "locandine/billy_elliot.jpg",
        pagina: "",
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
        pagina: "",
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
        pagina: "",
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
        pagina: "",
        orari: {
            "MARTEDI 2 GIUGNO":   ["18:00", "21:00"],
            "MERCOLEDI 3 GIUGNO": ["17:00", "20:30"],
            "GIOVEDI 4 GIUGNO":   ["19:00", "22:00"],
            "VENERDI 5 GIUGNO":   ["18:30", "21:30"],
            "SABATO 6 GIUGNO":    ["17:00", "20:00"],
            "LUNEDI 8 GIUGNO":  ["16:00", "19:30"]
        }
    },
    {
        titolo: "Natale sul Nilo",
        locandina: "locandine/natale_sul_nilo.jpg",
        pagina: "",
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
        pagina: "",
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
        pagina: "",
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
        pagina: "",
        orari: {
            "LUNEDI 1 GIUGNO":    ["15:00", "19:00"],
            "MARTEDI 2 GIUGNO":   ["14:30", "18:30"],
            "MERCOLEDI 3 GIUGNO": ["15:00", "19:30"],
            "SABATO 6 GIUGNO":    ["11:30", "15:00", "18:30"],
            "MERCOLEDI 10 GIUGNO":  ["11:00", "14:30", "18:00"]
        }
    },
    {
        titolo: "Oppenheimer",
        locandina: "locandine/oppenheimer.jpg",
        pagina: "",
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
        pagina: "",
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
        pagina: "",
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
        pagina: "",
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
        pagina: "",
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
        pagina: "",
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
        pagina: "",
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
        pagina: "",
        orari: {
            "LUNEDI 1 GIUGNO":    ["19:00", "21:30"],
            "MARTEDI 2 GIUGNO":   ["18:30", "21:00"],
            "GIOVEDI 4 GIUGNO":   ["19:30", "22:00"],
            "VENERDI 5 GIUGNO":   ["19:00", "21:30"],
            "SABATO 6 GIUGNO":    ["20:00", "22:30"],
            "MERCOLEDI 10 GIUGNO":  ["16:00", "18:30", "22:00"]
        }
    },
    {
        titolo: "Conclave",
        locandina: "locandine/conclave.jpg",
        pagina: "",
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
        pagina: "",
        orari: {
            "LUNEDI 1 GIUGNO":    ["19:00", "21:00"],
            "MARTEDI 2 GIUGNO":   ["20:00", "22:30"],
            "MERCOLEDI 3 GIUGNO": ["19:30", "21:30"],
            "GIOVEDI 4 GIUGNO":   ["20:00", "22:30"],
            "VENERDI 5 GIUGNO":   ["19:00", "21:00", "23:00"],
            "SABATO 6 GIUGNO":    ["18:30", "20:30", "23:00"],
            "DOMENICA 7 GIUGNO":  ["18:00", "20:00"]
        }
    }
];

const contenitore = document.getElementById("contenitore-film"); // Indica dove METTERE le CARD dei FILM

// API di JS che evita l'utilizzo di Librerie Esterne. Questo SCRIPT rileva quando un oggetto entra nel campo visivo e fa partire un'ANIMAZIONE definita
// È un CODICE PREDEFINITO in quanto è un API di JS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else entry.target.classList.remove("visible");
    });
}, { threshold: 0.1 });

function mostraFilm(giornoSelezionato) {

    console.log("Giorno Selezionato: ", giornoSelezionato);

    contenitore.innerHTML = "";

    film.forEach(f => { // SCORRE l'ARRAY 'film' e PER OGNI FILM esegue il codice dentro le '{ }'. 'f' è il FILM CORRENTE [' for f in film ']
        
        const giorniFilm = Object.keys(f.orari); // Mette in un ARRAY, che chiamo 'giorniFilm', i GIORNI in cui è PRESENTE la PROGRAMMAZIONE del FILM 'f'
        
        if (giornoSelezionato !== "tutti" && !giorniFilm.includes(giornoSelezionato)) return; 

        let orari_html = ``;

        const orariDaMostrare = giornoSelezionato === "tutti" ? null : { [giornoSelezionato]: f.orari[giornoSelezionato] };

        if (orariDaMostrare !== null) {
            for (const [giorno, ore] of Object.entries(orariDaMostrare)) {
                // orari_html += `<p><strong>${giorno}:</strong></p>`;
                ore.forEach(ora => {
                    orari_html += `<button class="bottone-orario">${ora}</button>`;
                })
            }
        }

        // 'innerHTML' è un comando di JS che inserisce dentro 'contenitore-film' la CARD COMPLETA del film CORRENTE 'f', usando proprio i dati di 'f' appena strutturati

        contenitore.innerHTML +=
            `
                <div class="film-card">
                    <a href="${f.pagina}">
                        <img src="${f.locandina}" alt="${f.titolo}" width="400" height="600">
                    </a>

                    <div class="orari">
                        ${orari_html}
                    </div>
                </div> 
            `
            ;
    });

    document.querySelectorAll(".film-card").forEach(card => {
        observer.observe(card);
    });
}

// CALENDARIO

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
    const cal = document.getElementById("calendario");
    cal.innerHTML = ``;

    const titolo = document.createElement("div");
    titolo.className = "cal-titolo";
    titolo.textContent = "GIUGNO 2026";
    cal.appendChild(titolo);

    const intestazioni = ["LUN", "MAR", "MER", "GIO", "VEN", "SAB", "DOM"];
    intestazioni.forEach(g => {
        const cell = document.createElement("div");
        cell.className = "cal-intestazione";
        cell.textContent = g;
        cal.appendChild(cell);
    });

    for (let giorno = 1; giorno <= 30; giorno++) {
        const cell = document.createElement("div");
        const dataKey = `2026-06-${String(giorno).padStart(2, "0")}`;
        const nomeGiorno = mappaGiorni[dataKey];

        cell.textContent = giorno;
        cell.className = "cal-giorno";

        if (nomeGiorno && giorniConFilm.has(nomeGiorno)) {
            cell.classList.add("cal-attivo");
            cell.addEventListener("click", () => {
                document.querySelectorAll(".cal-giorno").forEach(c => c.classList.remove("cal-selezionato"));
                cell.classList.add("cal-selezionato");
                mostraFilm(nomeGiorno);
            });
        } else cell.classList.add("cal-disabilitato");
    
        cal.appendChild(cell);
    }

    const btnTutti = document.createElement("button");
    btnTutti.textContent = "🍿 Tutti i film";
    btnTutti.className = "cal-btn-tutti";
    btnTutti.addEventListener("click", () => {
        document.querySelectorAll(".cal-giorno").forEach(c => c.classList.remove("cal-selezionato"));
        mostraFilm("tutti");
    });
    document.getElementById("wrapper").appendChild(btnTutti);
}

// AVVIO
mostraFilm("tutti");
costruisciCalendario();
});