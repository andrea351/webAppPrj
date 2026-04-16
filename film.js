const colonnaSx = document.querySelector('.dettaglio-sx');
const container = document.getElementById('trailer-container');
const video = document.getElementById('trailer-video');

if (colonnaSx && container && video) { 
    
    // 1. diventa locandina -> video
    colonnaSx.addEventListener('mouseenter', () => { //la locandina entra in ascolto
        if (!container.classList.contains('video-ingrandito')) { //se il video è gia partito, l'effetto preview scompare
            colonnaSx.classList.add('in-preview'); //  Attiva l'anteprima
            video.currentTime = 0;
            video.muted = true;
            video.play();
        }
    });

    // 2. torna a locandina
    colonnaSx.addEventListener('mouseleave', () => {
        if (!container.classList.contains('video-ingrandito')) {
            colonnaSx.classList.remove('in-preview'); // Disattiva l'anteprima
            video.pause();
        }
    });

    function azionaVideo() {
        if (container.classList.contains('video-ingrandito')) {
            //se il video è in play, lo fa tornare locandina
            container.classList.remove('video-ingrandito');
            colonnaSx.classList.remove('in-preview'); // Spegne l'anteprima 
            video.muted = true;  
            video.pause();       
        } else {
            //se è locandina e ci si clicca sopra parte il video
            container.classList.add('video-ingrandito');
            video.currentTime = 0; 
            video.muted = false;   
            video.play();
        }
    }

    // zoom in - zoom out
    container.addEventListener('click', () => {
        if (document.startViewTransition) { //solo transition fluida (se supportato la transition)
            document.startViewTransition(() => azionaVideo());
        } else { //se la transition non è supportata fa partire comunque il video
            azionaVideo();
        }
    });
}