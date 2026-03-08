const film = [
    {
        titolo: "Billy Elliot",
        locandina: "locandine/billy_elliot.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["15:00", "21:30"],
            "MERCOLEDÌ 3 GIUGNO": ["14:00", "19:00"],
            "SABATO 6 GIUGNO":    ["17:00", "22:30"],
            "DOMENICA 7 GIUGNO":  ["19:30"]
        }
    },
    {
        titolo: "La vita è bella",
        locandina: "locandine/la_vita_e_bella.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["17:00", "21:00"],
            "MARTEDÌ 2 GIUGNO":   ["15:00", "20:00"],
            "GIOVEDÌ 4 GIUGNO":   ["18:00", "21:30"],
            "VENERDÌ 5 GIUGNO":   ["16:00", "19:00", "22:00"],
            "SABATO 6 GIUGNO":    ["11:00", "15:30", "21:00"],
            "DOMENICA 7 GIUGNO":  ["14:00", "18:30"]
        }
    },
    {
        titolo: "Il re leone",
        locandina: "locandine/re_leone.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["10:00", "14:30"],
            "MARTEDÌ 2 GIUGNO":   ["10:00", "14:00", "17:30"],
            "MERCOLEDÌ 3 GIUGNO": ["10:00", "13:00", "16:00"],
            "SABATO 6 GIUGNO":    ["10:00", "13:00", "16:00", "19:00"],
            "DOMENICA 7 GIUGNO":  ["10:00", "13:00", "16:30"]
        }
    },
    {
        titolo: "Fantozzi",
        locandina: "locandine/fantozzi.jpg",
        pagina: "",
        orari: {
            "MARTEDÌ 2 GIUGNO":   ["18:00", "21:00"],
            "MERCOLEDÌ 3 GIUGNO": ["17:00", "20:30"],
            "GIOVEDÌ 4 GIUGNO":   ["19:00", "22:00"],
            "VENERDÌ 5 GIUGNO":   ["18:30", "21:30"],
            "SABATO 6 GIUGNO":    ["17:00", "20:00"],
            "DOMENICA 7 GIUGNO":  ["16:00", "19:30"]
        }
    },
    {
        titolo: "Natale sul Nilo",
        locandina: "locandine/natale_sul_nilo.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["20:30"],
            "MERCOLEDÌ 3 GIUGNO": ["18:00", "21:00"],
            "VENERDÌ 5 GIUGNO":   ["20:00", "22:30"],
            "SABATO 6 GIUGNO":    ["18:30", "21:30"],
            "DOMENICA 7 GIUGNO":  ["17:00", "20:00"]
        }
    },
    {
        titolo: "La ladra di libri",
        locandina: "locandine/ladra_libri.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["16:00", "20:00"],
            "MARTEDÌ 2 GIUGNO":   ["17:30", "21:00"],
            "MERCOLEDÌ 3 GIUGNO": ["16:00", "20:30"],
            "GIOVEDÌ 4 GIUGNO":   ["17:00", "21:00"],
            "DOMENICA 7 GIUGNO":  ["15:00", "19:00", "22:00"]
        }
    },
    {
        titolo: "C'è ancora domani",
        locandina: "locandine/ce_ancora_domani.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["18:30", "21:30"],
            "MARTEDÌ 2 GIUGNO":   ["19:00", "22:00"],
            "GIOVEDÌ 4 GIUGNO":   ["18:00", "21:00"],
            "VENERDÌ 5 GIUGNO":   ["17:30", "20:30"],
            "SABATO 6 GIUGNO":    ["16:00", "19:30", "22:30"],
            "DOMENICA 7 GIUGNO":  ["17:00", "21:00"]
        }
    },
    {
        titolo: "Wonder",
        locandina: "locandine/wonder.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["15:00", "19:00"],
            "MARTEDÌ 2 GIUGNO":   ["14:30", "18:30"],
            "MERCOLEDÌ 3 GIUGNO": ["15:00", "19:30"],
            "SABATO 6 GIUGNO":    ["11:30", "15:00", "18:30"],
            "DOMENICA 7 GIUGNO":  ["11:00", "14:30", "18:00"]
        }
    },
    {
        titolo: "Oppenheimer",
        locandina: "locandine/oppenheimer.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["17:00", "21:00"],
            "MARTEDÌ 2 GIUGNO":   ["17:00", "21:00"],
            "MERCOLEDÌ 3 GIUGNO": ["17:00", "21:00"],
            "GIOVEDÌ 4 GIUGNO":   ["17:00", "21:00"],
            "VENERDÌ 5 GIUGNO":   ["16:00", "20:00"],
            "SABATO 6 GIUGNO":    ["15:00", "19:30"],
            "DOMENICA 7 GIUGNO":  ["15:00", "19:30"]
        }
    },
    {
        titolo: "Una notte da leoni",
        locandina: "locandine/notte_leoni.jpg",
        pagina: "",
        orari: {
            "MARTEDÌ 2 GIUGNO":   ["21:30"],
            "GIOVEDÌ 4 GIUGNO":   ["21:00"],
            "VENERDÌ 5 GIUGNO":   ["21:00", "23:30"],
            "SABATO 6 GIUGNO":    ["21:00", "23:30"],
            "DOMENICA 7 GIUGNO":  ["20:30"]
        }
    },
    {
        titolo: "Orgoglio e pregiudizio",
        locandina: "locandine/org_pred.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["16:30", "20:00"],
            "MERCOLEDÌ 3 GIUGNO": ["15:00", "19:00"],
            "GIOVEDÌ 4 GIUGNO":   ["16:00", "20:00"],
            "SABATO 6 GIUGNO":    ["14:30", "18:00"],
            "DOMENICA 7 GIUGNO":  ["13:00", "17:00", "21:00"]
        }
    },
    {
        titolo: "La vita di Pi",
        locandina: "locandine/vita_pi.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["14:00", "18:00"],
            "MARTEDÌ 2 GIUGNO":   ["15:30", "20:00"],
            "VENERDÌ 5 GIUGNO":   ["15:00", "19:30"],
            "SABATO 6 GIUGNO":    ["13:30", "17:30", "21:30"],
            "DOMENICA 7 GIUGNO":  ["14:00", "18:30"]
        }
    },
    {
        titolo: "La ricerca della felicità",
        locandina: "locandine/ricerca_felicita.jpg",
        pagina: "",
        orari: {
            "MARTEDÌ 2 GIUGNO":   ["16:30", "20:30"],
            "MERCOLEDÌ 3 GIUGNO": ["17:00", "21:00"],
            "GIOVEDÌ 4 GIUGNO":   ["15:30", "19:30"],
            "VENERDÌ 5 GIUGNO":   ["16:00", "20:00"],
            "DOMENICA 7 GIUGNO":  ["16:00", "20:30"]
        }
    },
    {
        titolo: "Mamma ho perso l'aereo",
        locandina: "locandine/mamma_perso_aereo.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["10:30", "14:00"],
            "MARTEDÌ 2 GIUGNO":   ["10:00", "13:30"],
            "MERCOLEDÌ 3 GIUGNO": ["10:30", "14:00"],
            "SABATO 6 GIUGNO":    ["10:00", "12:30", "15:00"],
            "DOMENICA 7 GIUGNO":  ["10:00", "12:30", "15:00"]
        }
    },
    {
        titolo: "Toy Story",
        locandina: "locandine/toy_story.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["11:00", "14:30"],
            "MERCOLEDÌ 3 GIUGNO": ["11:00", "14:00"],
            "GIOVEDÌ 4 GIUGNO":   ["10:30", "13:30"],
            "SABATO 6 GIUGNO":    ["10:30", "13:00", "15:30"],
            "DOMENICA 7 GIUGNO":  ["10:30", "13:00", "15:30"]
        }
    },
    {
        titolo: "Il bambino con il pigiama a righe",
        locandina: "locandine/b_p_righe.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["19:00", "21:30"],
            "MARTEDÌ 2 GIUGNO":   ["18:30", "21:00"],
            "GIOVEDÌ 4 GIUGNO":   ["19:30", "22:00"],
            "VENERDÌ 5 GIUGNO":   ["19:00", "21:30"],
            "SABATO 6 GIUGNO":    ["20:00", "22:30"]
        }
    },
    {
        titolo: "Conclave",
        locandina: "locandine/conclave.jpg",
        pagina: "",
        orari: {
            "MARTEDÌ 2 GIUGNO":   ["19:30", "22:30"],
            "MERCOLEDÌ 3 GIUGNO": ["20:00", "22:30"],
            "GIOVEDÌ 4 GIUGNO":   ["20:00", "22:30"],
            "VENERDÌ 5 GIUGNO":   ["19:00", "22:00"],
            "SABATO 6 GIUGNO":    ["18:00", "21:00"],
            "DOMENICA 7 GIUGNO":  ["18:00", "21:00"]
        }
    },
    {
        titolo: "Snowden",
        locandina: "locandine/snowden.jpg",
        pagina: "",
        orari: {
            "LUNEDÌ 1 GIUGNO":    ["19:00", "21:00"],
            "MARTEDÌ 2 GIUGNO":   ["20:00", "22:30"],
            "MERCOLEDÌ 3 GIUGNO": ["19:30", "21:30"],
            "GIOVEDÌ 4 GIUGNO":   ["20:00", "22:30"],
            "VENERDÌ 5 GIUGNO":   ["19:00", "21:00", "23:00"],
            "SABATO 6 GIUGNO":    ["18:30", "20:30", "23:00"],
            "DOMENICA 7 GIUGNO":  ["18:00", "20:00"]
        }
    }
];

const contenitore = document.getElementById("contenitore-film"); // Indica dove METTERE le CARD dei FILM

film.forEach(f => { // SCORRE l'ARRAY 'film' e PER OGNI FILM esegue il codice dentro le '{ }'. 'f' è il FILM CORRENTE [' for f in film ']
    let orari_html = ``;
    for (const [giorno, ore] of Object.entries(f.orari)) {
        orari_html += `<p><strong>${giorno}:</strong></p>`;
        ore.forEach(ora => {
            orari_html += `<button class="bottone-orario">${ora}</button>`;
        })
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

// API di JS che evita l'utilizzo di Librerie Esterne. Questo SCRIPT rileva quando un oggetto entra nel campo visivo e fa partire un'ANIMAZIONE definita
// È un CODICE PREDEFINITO in quanto è un API di JS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        } else entry.target.classList.remove("visible");
    });
}, { threshold: 0.1 });

document.querySelectorAll(".film-card").forEach(card => {
    observer.observe(card);
});
