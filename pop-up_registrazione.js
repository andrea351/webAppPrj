document.addEventListener("DOMContentLoaded", function () {

    const overlay = document.getElementById("overlay");
    const chiudi  = document.getElementById("chiudi");

    /* -------- Chiudi popup -------- */
    function closePopup() {
        // non la posso dichiarare dentro html, altrimenti si chiude subito
        overlay.classList.add("closing");
        setTimeout(() => window.location.href = "main.html", 300); // Se Premo ' X ' o Fuori dal popUp mi RIPORTA alla Pagina Principale [ ' main ' ]
    }
    chiudi.addEventListener("click", closePopup);
    overlay.addEventListener("click", (e) => { if (e.target === overlay) closePopup(); });

    /* -------- Tabs -------- */
    window.mostraTab = function (quale) {
        document.querySelectorAll(".pannello").forEach(p => p.classList.remove("attivo"));
        document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("attivo"));
        document.getElementById("pannello-" + quale).classList.add("attivo");
        document.getElementById("tab-" + quale).classList.add("attivo");
    };

    /* -------- Mostra / Nascondi password -------- */
    setupTogglePassword("toggle-login-pwd", "login-pwd", "icon-eye-login");
    setupTogglePassword("toggle-reg-pwd",   "reg-pwd",   "icon-eye-reg");

    function setupTogglePassword(toggleId, inputId, iconId) {
        const toggle = document.getElementById(toggleId);
        const input  = document.getElementById(inputId);
        const icon   = document.getElementById(iconId);
        if (!toggle || !input) return;
        toggle.addEventListener("click", function () {
            const isPassword = input.type === "password";
            input.type = isPassword ? "text" : "password";
            icon.innerHTML = isPassword
                ? `<path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.8 11.8 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>`
                : `<path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>`;
        });
    }

    /* ======================================================
       LOGIN
    ====================================================== */
    document.getElementById("btn-accedi").addEventListener("click", async function () {
        const email    = document.getElementById("login-email").value.trim();
        const password = document.getElementById("login-pwd").value;
        const erroreEl = document.getElementById("errore-login");

        erroreEl.textContent = "";

        // Validazione frontend (veloce, prima di chiamare il server)
        if (!email || !password) {
            erroreEl.textContent = "Compila tutti i campi.";
            return;
        }

        try {
            const risposta = await fetch("api/login.php", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ email, password })
            });

            const dati = await risposta.json();

            if (dati.successo) {
                // Login riuscito → chiudi popup e vai alla home
                closePopup();
                window.location.href = "main.html";
            } else {
                erroreEl.textContent = dati.errore;
            }
        } catch (err) {
            erroreEl.textContent = "Errore di connessione. Riprova.";
        }
    });

    /* ======================================================
       REGISTRAZIONE
    ====================================================== */
    document.getElementById("btn-crea-account").addEventListener("click", async function () {
        const nome     = document.getElementById("reg-nome").value.trim();
        const email    = document.getElementById("reg-email").value.trim();
        const password = document.getElementById("reg-pwd").value;
        const conferma = document.getElementById("reg-pwd-confirm").value;
        const erroreEl = document.getElementById("errore-registrazione");

        erroreEl.textContent = "";

        // Validazione frontend
        if (!nome || !email || !password || !conferma) {
            erroreEl.textContent = "Compila tutti i campi.";
            return;
        }

        if (password !== conferma) {
            erroreEl.textContent = "Le password non coincidono.";
            return;
        }

        const regexPW = /^(?=(?:.*[a-zA-Z]){6,})(?=.*[A-Z])(?=.*\d)(?=.*[.,;:!?\-]).+$/;
        if (!regexPW.test(password)) {
            erroreEl.textContent = "La password deve essere contenere: almeno 6 caratteri alfabetici, di cui almeno una maiuscola, almeno un numero e almeno un simbolo speciale (.,;:!?-).";
            return;
        }

        try {
            const risposta = await fetch("api/registrazione.php", {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify({ nome, email, password })
            });

            const dati = await risposta.json();

            if (dati.successo) {
                // Registrazione riuscita -> vai alla home
                window.location.href = "main.html";
            } else {
                erroreEl.textContent = dati.errore;
            }
        } catch (err) {
            erroreEl.textContent = "Errore di connessione. Riprova.";
        }
    });
});