(function() {
    
    // LINK & CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'prezzi.css';
    document.head.appendChild(link);

    const overlay = document.createElement('div');
    overlay.id = 'prezzi-overlay';
    overlay.className = 'prezzi-overlay';
    overlay.innerHTML = `
        <div id="prezzi-popup" style="display: none">
            <button class="prezzi-chiudi" id="prezzi-chiudi">&times;</button>
                <div id="testo_promozioni">
                    <h1>🎬 Prezzi Cinema</h1>
                        
                    <p class="nota">Le seguenti promozioni sono valide solo per l'acquisto in biglietteria</p>

                    <div class="sezione">
                        <h2>🎟️ Biglietti</h2>
                            <ul>
                                <li><strong>Prezzo base:</strong> 8,50€ <span>(tutto l'anno)</span></li>
                                <li><strong>Under 5:</strong> 3€ <span>(tutto l'anno)</span></li>
                                <li><strong>Studenti:</strong> 6,50€ <span>(Lun - Gio)</span></li>
                                <li><strong>Over 70:</strong> 6€ <span>(tutto l'anno)</span></li>
                            </ul>
                    </div>

                    <div class="sezione highlight">
                        <h2>🔥 Offerte Speciali</h2>
                            <ul>
                                <li><strong>Primi Lun - Mar - Mer del mese:</strong> 5€</li>
                                <li><strong>San Valentino 💘:</strong> 15€ a coppia</li>
                                <li><strong>Compleanno 🎂:</strong> biglietto gratis</li>
                            </ul>
                    </div>

                    <div class="sezione abbonamenti">
                        <h2>💳 Abbonamenti</h2>
                            <ul>
                                <li><strong>Mensile:</strong> 19,90€</li>
                                <li><strong>Semestrale:</strong> 99€</li>
                                <li><strong>Annuale:</strong> 189€</li>
                            </ul>
                    </div>

                </div>
        </div>
    `;
    document.body.appendChild(overlay);

    function apriPU() {
        /* overlay.classList.add('aperto'); */
        overlay.style.display = 'flex';
        document.getElementById('prezzi-popup').style.display = 'block';
    }

    function chiudiPU() {
        /* overlay.classList.remove('aperto'); */
        overlay.style.display = 'none';
        document.getElementById('prezzi-popup').style.display = 'none';
    } document.getElementById('prezzi-chiudi').addEventListener('click', chiudiPU);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) chiudiPU();
    });

    const btnPrezzi = document.querySelector('a[href="prezzi.html"]');
    btnPrezzi.addEventListener('click', function(e) {
        e.preventDefault(); apriPU();
    });

}) ();