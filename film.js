const colonnaSx = document.querySelector('.dettaglio-sx');
const container = document.getElementById('trailer-container');
const video = document.getElementById('trailer-video');

if (colonnaSx && container && video) { 
    
    // 1. MOUSE ENTRA: Aggiunge la classe che trasforma in video 16:9
    colonnaSx.addEventListener('mouseenter', () => {
        if (!container.classList.contains('video-ingrandito')) {
            colonnaSx.classList.add('in-preview'); // ⬅️ Attiva l'anteprima
            video.currentTime = 0;
            video.muted = true;
            video.play();
        }
    });

    // 2. MOUSE ESCE: Toglie la classe, torna locandina
    colonnaSx.addEventListener('mouseleave', () => {
        if (!container.classList.contains('video-ingrandito')) {
            colonnaSx.classList.remove('in-preview'); // ⬅️ Disattiva l'anteprima
            video.pause();
        }
    });

    // 3. LA LOGICA DI APERTURA E CHIUSURA
    function azionaVideo() {
        if (container.classList.contains('video-ingrandito')) {
            // SE E' GRANDE -> Lo chiude e lo forza a tornare locandina!
            container.classList.remove('video-ingrandito');
            colonnaSx.classList.remove('in-preview'); // ⬅️ MAGIA 2: Spegne l'anteprima istantaneamente!
            video.muted = true;  
            video.pause();       
        } else {
            // SE E' PICCOLO -> Lo ingrandisce
            container.classList.add('video-ingrandito');
            video.currentTime = 0; 
            video.muted = false;   
            video.play();
        }
    }

    // 4. IL CLICK SUL VIDEO (Zoom IN e Zoom OUT)
    container.addEventListener('click', () => {
        if (document.startViewTransition) {
            document.startViewTransition(() => azionaVideo());
        } else {
            azionaVideo();
        }
    });
}