const PREZZO_POSTO = 8.50;
const TIMER_DURATA = 15 * 60;

const stato = {
    orarioSelezionato: null, // Memorizza l'orario scelto
    salaSelezionata: 'Sala 1',
    postiSelezionati: new Set(), // Salva gli ID (NO duplicati) dei POSTI CLICCATI
    timerInterval: null,
    timerSecondi: TIMER_DURATA,
    timerAvviato: false,
    datiFilm: {},
};

const dxWrapper      = document.getElementById('dx-wrapper');
const orariLista     = document.getElementById('orari-lista');
const btnContinua    = document.getElementById('btn-continua');
const orarioBadge    = document.getElementById('orario-badge');
const grigliaPosti   = document.getElementById('griglia-posti');
const riepilogoRighe = document.getElementById('riepilogo-righe');
const totaleDisplay  = document.getElementById('totale-display');
const timerBox       = document.getElementById('timer-box');
const timerDisplay   = document.getElementById('timer-display');
const btnPaga        = document.getElementById('btn-paga');

orariLista.querySelectorAll('.btn-orario').forEach(btn => { // Ad ogni ' .btn-orario ' aggiunge un CLICK
    btn.addEventListener('click', () => {
        orariLista.querySelectorAll('.btn-orario').forEach(b => b.classList.remove('selezionato')); // Deseleziona tutti i pulsanti NON scelti
        btn.classList.add('selezionato'); 
        stato.orarioSelezionato = btn.dataset.orario;
        stato.salaSelezionata = btn.dataset.sala || 'Sala 1';
        btnContinua.classList.add('attivo');
        btnContinua.disabled = false;
    });
});

document.getElementById('btn-chiudi-booking').addEventListener('click', () => {
    dxWrapper.classList.remove('booking-attivo');
    resetTimer();

    stato.postiSelezionati.forEach(id => {
        const a = document.querySelector(`[data-id="${id}"]`);
        if (a) { 
            a.classList.remove('selezionato'); 
            a.classList.add('disponibile'); 
        }
    }); 
    stato.postiSelezionati.clear();
    aggiornaRiepilogo();
    
    const salaContainer = document.querySelector('.sala-container');
    if (salaContainer) salaContainer.classList.remove('acquisto-completato');
});

// CONTINUA 
btnContinua.addEventListener('click', () => {
    if (!stato.orarioSelezionato) return;

    stato.postiSelezionati.clear();
    aggiornaRiepilogo();

    document.querySelectorAll('.posto.selezionato').forEach(el => {
        el.classList.remove('selezionato');
        el.classList.add('disponibile');
    });

    orarioBadge.textContent = stato.orarioSelezionato;
    if (!grigliaPosti.hasChildNodes()) costruisciMappa();
    dxWrapper.classList.add('booking-attivo');
});

// Mappa Posti 
function costruisciMappa() {
    const righe = ['A','B','C','D','E','F','G','H'];
    const postiPerFila = 12;
    const occupati = new Set([
        'A3','A4','A9','B1','B2','B7','B8','C5','C6','C11',
        'D3','D4','D9','D10','E1','E2','E6','E7','F4','F5',
        'F10','G2','G3','G8','G9','H5','H6','H7'
    ]);

    righe.forEach(fila => {
        const rigaEl = document.createElement('div');
        rigaEl.className = 'fila-posti';

        const label = document.createElement('span');
        label.className = 'fila-label';
        label.textContent = fila;
        rigaEl.appendChild(label);

        for (let i = 1; i <= postiPerFila; i++) {
            if (i === 7) {
                const corridoio = document.createElement('div');
                corridoio.className = 'posto corridoio';
                rigaEl.appendChild(corridoio);
            }

            const id = `${fila}${i}`;
            const posto = document.createElement('div');
            posto.className = 'posto';
            posto.dataset.id = id;
            posto.title = `Fila ${fila} — Posto ${i}`;

            if (occupati.has(id)) {
                posto.classList.add('occupato');
            } else {
                posto.classList.add('disponibile');
                posto.addEventListener('click', () => selezionaPosto(posto, id));
            }

            rigaEl.appendChild(posto);
        }

        grigliaPosti.appendChild(rigaEl);
    });
}

// Selezione Posto
function selezionaPosto(el, id) {
    if (stato.postiSelezionati.has(id)) {
        stato.postiSelezionati.delete(id);
        el.classList.remove('selezionato');
        el.classList.add('disponibile');
        if (stato.postiSelezionati.size === 0) resetTimer();
    } else {
        stato.postiSelezionati.add(id);
        el.classList.remove('disponibile');
        el.classList.add('selezionato');
        if (!stato.timerAvviato) avviaTimer();
    }
    aggiornaRiepilogo();
}

// Riepilogo
function aggiornaRiepilogo() {
    const posti = Array.from(stato.postiSelezionati).sort();
    const totale = posti.length * PREZZO_POSTO;

    if (posti.length === 0) {
        riepilogoRighe.innerHTML = '<p class="nessun-posto">Seleziona i tuoi posti dalla mappa</p>';
        totaleDisplay.textContent = '€ 0.00';
        btnPaga.classList.remove('attivo');
        btnPaga.disabled = true;
        return;
    }

    riepilogoRighe.innerHTML = posti.map(p => `
        <div class="riga-posto">
            <span>Fila ${p[0]} · Posto ${p.slice(1)}</span>
            <span>€ ${PREZZO_POSTO.toFixed(2)}</span>
        </div>
    `).join('');

    totaleDisplay.textContent = `€ ${totale.toFixed(2)}`;
    btnPaga.classList.add('attivo');
    btnPaga.disabled = false;
}

// Timer
function avviaTimer() {
    stato.timerAvviato = true;
    stato.timerSecondi = TIMER_DURATA;
    timerBox.classList.add('visibile');
    aggiornaDisplayTimer();

    stato.timerInterval = setInterval(() => {
        stato.timerSecondi--;
        aggiornaDisplayTimer();
        if (stato.timerSecondi <= 120) timerBox.classList.add('urgente');
        if (stato.timerSecondi <= 0) {
            clearInterval(stato.timerInterval);
            timerExpired();
        }
    }, 1000);
}

function aggiornaDisplayTimer() {
    const m = Math.floor(stato.timerSecondi / 60).toString().padStart(2, '0');
    const s = (stato.timerSecondi % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${m}:${s}`;
}

function timerExpired() {
    timerDisplay.textContent = '00:00';
    timerBox.style.opacity = '0.4';
    stato.postiSelezionati.forEach(id => {
        const el = document.querySelector(`[data-id="${id}"]`);
        if (el) { el.classList.remove('selezionato'); el.classList.add('disponibile'); }
    });
    stato.postiSelezionati.clear();
    stato.timerAvviato = false;
    aggiornaRiepilogo();
    riepilogoRighe.innerHTML = '<p class="nessun-posto" style="color:rgba(188,65,67,0.7)">Sessione scaduta — riseleziona i posti</p>';
}

function resetTimer() {
    clearInterval(stato.timerInterval);
    stato.timerAvviato = false;
    stato.timerSecondi = TIMER_DURATA;
    timerBox.classList.remove('visibile', 'urgente');
    timerDisplay.textContent = '15:00';
}

// ── 7. Formato Numero Carta ──────────────────────────────────────
const inputCarta = document.getElementById('input-carta');
if (inputCarta) {
    inputCarta.addEventListener('input', e => {
        let val = e.target.value.replace(/\D/g, '').substring(0, 16);
        e.target.value = val.replace(/(.{4})/g, '$1 ').trim();
    });
}

// ACQUISTO ⤵️
btnPaga.addEventListener('click', async () => {
    if (btnPaga.disabled || !btnPaga.classList.contains('attivo')) return;

    const carta = document.getElementById('input-carta')?.value.replace(/\s/g, '') || '';
    if (carta.length < 16) {
        mostraMessaggioAcquisto('Inserisci un numero di carta valido (16 cifre).', 'errore');
        return;
    }

    try {
        const sessione = await (await fetch('/webAppPrj/api/sessione.php')).json();
        if (sessione.loggato) {
            // Utente loggato: usa direttamente la sua email
            await eseguiAcquisto(sessione.utente.email);
        } else {
            // Utente non loggato: mostra popup con solo il campo email
            apriPopupEmail();
        }
    } catch {
        mostraMessaggioAcquisto('Errore di connessione. Riprova.', 'errore');
    }
});

// ── Popup campo email (solo per utenti non loggati) ───────────────
function apriPopupEmail() {
    document.getElementById('cm-popup-email')?.remove();

    const overlay = document.createElement('div');
    overlay.id = 'cm-popup-email';
    overlay.style.cssText = `
        position:fixed;inset:0;background:rgba(5,0,3,0.85);
        backdrop-filter:blur(6px);display:flex;align-items:center;
        justify-content:center;z-index:99999;
        animation:cmFadeIn 0.3s ease both;`;

    overlay.innerHTML = `
        <style>
            @keyframes cmFadeIn  { from{opacity:0}to{opacity:1} }
            @keyframes cmSlideUp { from{opacity:0;transform:translateY(20px) scale(0.97)}
                                   to{opacity:1;transform:translateY(0) scale(1)} }
            #cm-popup-email .card {
                width:400px;max-width:95vw;
                background:linear-gradient(160deg,rgba(94,0,21,0.18) 0%,rgba(10,2,5,0.97) 40%);
                border:1px solid rgba(128,0,32,0.35);border-radius:20px;overflow:hidden;
                box-shadow:0 40px 80px rgba(0,0,0,0.85);
                animation:cmSlideUp 0.4s cubic-bezier(0.22,1,0.36,1) both; }
            #cm-popup-email .card-header {
                background:linear-gradient(90deg,#3a000d,#5e0015,#800020,#5e0015,#3a000d);
                padding:24px 28px 20px;text-align:center;position:relative; }
            #cm-popup-email .card-header::after {
                content:'';position:absolute;bottom:0;left:0;right:0;height:1px;
                background:linear-gradient(90deg,transparent,rgba(255,100,120,0.4),transparent); }
            #cm-popup-email .card-body { padding:28px 32px 32px; }
            #cm-popup-email .chiudi-x {
                position:absolute;top:12px;right:16px;font-size:20px;
                color:rgba(255,255,255,0.35);cursor:pointer;background:none;border:none;
                line-height:1;font-family:sans-serif;transition:color 0.2s,transform 0.25s; }
            #cm-popup-email .chiudi-x:hover { color:#ff4d6d;transform:rotate(90deg); }
            #cm-popup-email .campo-email { position:relative;margin-bottom:14px; }
            #cm-popup-email .campo-email input {
                width:100%;padding:14px 14px 14px 44px;
                background:rgba(128,0,32,0.08);border:1px solid rgba(128,0,32,0.35);
                border-radius:10px;font-family:'Georgia',serif;font-size:14px;
                color:#faeef1;outline:none;box-sizing:border-box;
                transition:border-color 0.2s,box-shadow 0.2s; }
            #cm-popup-email .campo-email input::placeholder { color:rgba(250,238,241,0.28); }
            #cm-popup-email .campo-email input:focus {
                border-color:#bb2248;box-shadow:0 0 0 3px rgba(128,0,32,0.15);
                background:rgba(128,0,32,0.13); }
            #cm-popup-email .campo-email .icona {
                position:absolute;left:14px;top:50%;transform:translateY(-50%);
                color:rgba(250,238,241,0.3);pointer-events:none;
                transition:color 0.2s; }
            #cm-popup-email .campo-email:focus-within .icona { color:#ff4d6d; }
            #cm-popup-email .msg-err {
                color:#ff4d6d;font-size:12px;text-align:center;
                margin-bottom:12px;min-height:16px;font-family:'Georgia',serif; }
            #cm-popup-email .btn-invia {
                width:100%;padding:13px;border:none;border-radius:10px;cursor:pointer;
                font-family:'Stronger-Thinker-Bold',sans-serif;font-size:11px;
                letter-spacing:2.5px;text-transform:uppercase;
                background:linear-gradient(135deg,#5e0015,#800020);color:white;
                position:relative;overflow:hidden;
                transition:transform 0.2s,box-shadow 0.2s; }
            #cm-popup-email .btn-invia::before {
                content:'';position:absolute;top:0;left:0;right:0;height:1px;
                background:linear-gradient(90deg,transparent,rgba(255,150,170,0.4),transparent); }
            #cm-popup-email .btn-invia:hover {
                transform:translateY(-2px);box-shadow:0 8px 24px rgba(128,0,32,0.4); }
            #cm-popup-email .btn-invia:active { transform:translateY(0); }
            #cm-popup-email .btn-invia:disabled { opacity:0.6;cursor:not-allowed;transform:none; }
        </style>

        <div class="card">
            <div class="card-header">
                <button class="chiudi-x" id="cm-chiudi">&times;</button>
                <p style="margin:0;color:white;font-family:'Stronger-Thinker-Bold',sans-serif;
                           font-size:13px;letter-spacing:3px;text-transform:uppercase;">
                    QUASI FATTO!</p>
                <p style="margin:6px 0 0;color:rgba(250,238,241,0.5);font-size:13px;">
                    Dove inviamo il tuo biglietto?</p>
            </div>

            <div class="card-body">
                <p style="font-family:'Stronger-Thinker-Bold',sans-serif;font-size:11px;
                           letter-spacing:3px;text-transform:uppercase;
                           color:rgba(250,238,241,0.45);text-align:center;margin-bottom:20px;">
                    Inserisci la tua email</p>

                <div class="campo-email">
                    <span class="icona">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16
                                     c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                    </span>
                    <input type="email" id="cm-email-input"
                           placeholder="tuamail@esempio.it" autocomplete="email">
                </div>

                <p class="msg-err" id="cm-msg-err"></p>

                <button class="btn-invia" id="cm-btn-invia">
                    Invia biglietto
                </button>
            </div>
        </div>`;

    document.body.appendChild(overlay);

    // Focus automatico sul campo email
    setTimeout(() => document.getElementById('cm-email-input')?.focus(), 80);

    // Listeners
    document.getElementById('cm-chiudi').addEventListener('click', chiudiPopupEmail);
    overlay.addEventListener('click', e => { if (e.target === overlay) chiudiPopupEmail(); });

    document.getElementById('cm-btn-invia').addEventListener('click', async () => {
        const emailInserita = document.getElementById('cm-email-input').value.trim();
        const msgErr        = document.getElementById('cm-msg-err');
        const btnInvia      = document.getElementById('cm-btn-invia');

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInserita)) {
            msgErr.textContent = 'Inserisci un indirizzo email valido.';
            return;
        }

        msgErr.textContent    = '';
        btnInvia.disabled     = true;
        btnInvia.textContent  = 'Invio in corso…';

        chiudiPopupEmail();
        await eseguiAcquisto(emailInserita);
    });

    // Invio con tasto Enter
    document.getElementById('cm-email-input').addEventListener('keydown', e => {
        if (e.key === 'Enter') document.getElementById('cm-btn-invia').click();
    });

    // Pulizia errore mentre si digita
    document.getElementById('cm-email-input').addEventListener('input', () => {
        document.getElementById('cm-msg-err').textContent = '';
    });
}

function chiudiPopupEmail() {
    document.getElementById('cm-popup-email')?.remove();
    btnPaga.textContent = 'ACQUISTA ORA';
    btnPaga.disabled    = false;
}

// ── Esegui acquisto ───────────────────────────────────────────────
async function eseguiAcquisto(email) {
    // Se stato.datiFilm è vuoto, aggiorna i dati film da window._cmDatiFilm
    if (window._cmDatiFilm && !stato.datiFilm.titolo) {
        stato.datiFilm = window._cmDatiFilm;
    }

    const posti  = Array.from(stato.postiSelezionati).sort();
    const totale = (posti.length * PREZZO_POSTO).toFixed(2);

    btnPaga.textContent = 'Elaborazione…';
    btnPaga.disabled    = true;

    try {
        const risposta = await fetch('/webAppPrj/api/acquisto.php', {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                titolo:    stato.datiFilm.titolo    || document.title.split(' - ')[0],
                orario:    stato.orarioSelezionato,
                sala:      stato.salaSelezionata,
                posti,
                totale,
                data:      stato.datiFilm.dataAttiva || '',
                locandina: stato.datiFilm.locandina  || '',
            }),
        });
        /* const testoGrezzo = await risposta.text();
                console.log('Risposta grezza acquisto.php:', testoGrezzo);
                    const dati = JSON.parse(testoGrezzo); */
        const dati = await risposta.json();

        if (dati.successo) {
            mostraSchermataConferma(email, dati.codice);
            resetTimer();
        } else {
            mostraMessaggioAcquisto(dati.errore || "Errore durante l'acquisto.", 'errore');
            btnPaga.textContent = 'ACQUISTA ORA';
            btnPaga.disabled    = false;
        }
    } catch {
        mostraMessaggioAcquisto('Errore di connessione. Riprova.', 'errore');
        btnPaga.textContent = 'ACQUISTA ORA';
        btnPaga.disabled    = false;
    }
}

// ── Schermata conferma nella sidebar ─────────────────────────────
function mostraSchermataConferma(email, codice) {
    const sidebar = document.querySelector('.booking-sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = `
        <div style="display:flex;flex-direction:column;align-items:center;
                    text-align:center;gap:16px;padding:20px 0;">
            <div style="width:64px;height:64px;border-radius:50%;
                        background:linear-gradient(135deg,#5e0015,#800020);
                        display:flex;align-items:center;justify-content:center;
                        box-shadow:0 0 30px rgba(128,0,32,0.5);">
                <svg viewBox="0 0 24 24" width="30" height="30" fill="white">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                </svg>
            </div>
            <p style="font-family:'Arial',sans-serif;font-size:10px;font-weight:700;
                      letter-spacing:3px;text-transform:uppercase;
                      color:rgba(255,255,255,0.35);margin:0;">ACQUISTO COMPLETATO</p>
            <p style="font-size:14px;color:rgba(255,255,255,0.6);line-height:1.6;margin:0;">
                Biglietto inviato a:<br>
                <strong style="color:#ff4d6d;">${email}</strong></p>
            <div style="background:rgba(128,0,32,0.15);border:1px solid rgba(128,0,32,0.3);
                        border-radius:8px;padding:12px 20px;width:100%;box-sizing:border-box;">
                <p style="margin:0 0 4px;font-size:9px;letter-spacing:2px;
                           text-transform:uppercase;color:rgba(255,255,255,0.3);
                           font-family:'Arial',sans-serif;">Codice prenotazione</p>
                <p style="margin:0;font-size:16px;font-weight:700;color:#bb2248;
                           letter-spacing:2px;font-family:'Arial',sans-serif;">${codice}</p>
            </div>
            <p style="font-size:11px;color:rgba(255,255,255,0.3);margin:0;line-height:1.6;">
                Mostra il biglietto PDF all'ingresso.<br>
                Controlla anche la cartella spam.</p>
        </div>`;

    btnPaga.style.display = 'none';
    resetTimer();
    const salaContainer = document.querySelector('.sala-container');
    if (salaContainer) salaContainer.classList.add('acquisto-completato');
}

// ── Messaggio errore sotto il bottone ─────────────────────────────
function mostraMessaggioAcquisto(testo, tipo) {
    document.getElementById('cm-msg-acquisto')?.remove();
    const p = document.createElement('p');
    p.id = 'cm-msg-acquisto';
    p.textContent = testo;
    p.style.cssText = `font-size:12px;text-align:center;margin-top:8px;
        color:${tipo === 'errore' ? '#ff4d6d' : '#2ecc71'};font-family:'Georgia',serif;`;
    btnPaga.insertAdjacentElement('afterend', p);
}