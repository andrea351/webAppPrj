const PREZZO_POSTO = 8.50;
const TIMER_DURATA = 15 * 60;

const stato = {
    orarioSelezionato: null, // Memorizza l'orario scelto
    postiSelezionati: new Set(), // Salva gli ID (NO duplicati) dei POSTI CLICCATI
    timerInterval: null,
    timerSecondi: TIMER_DURATA,
    timerAvviato: false,
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
        btnContinua.classList.add('attivo');
        btnContinua.disabled = false;
    });
});

document.getElementById('btn-chiudi-booking').addEventListener('click', () => {
    dxWrapper.classList.remove('booking-attivo');
    resetTimer();
});

// CONTINUA 
btnContinua.addEventListener('click', () => {
    if (!stato.orarioSelezionato) return;

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