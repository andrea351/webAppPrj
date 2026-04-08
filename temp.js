<script>
                    // caricaImmagine e SALVALA ad OGNI REFRESH ⤵️
                    document.getElementById("foto-profilo").addEventListener('change', function() { // Lavora sul FILE di INPUT che CARICO
                        const fileSelezionato = this.files[0]; // ' this ' si riferisce all'elemento che ha scatenato EVENTO, ovvero il PROTAGONISTA della chiamata a ' getElementById ' ( FILE da CARICARE )
                                                            // ' files ' è una PROPRIETÀ degli INPUT di TIPO FILE
                        if (!fileSelezionato) return; // Accade se UTENTE NON SELEZIONA alcun FILE

                        /* const urlTemporaneoImmSel = URL.createObjectURL(fileSelezionato); // URL temporaneo dell'IMMAGINE SELEZIONATA | Lo userò in ' src ' di ' img ' per poter caricare l'IMG nel DIV
                        document.getElementById("img-profilo").src = urlTemporaneoImmSel;
                        document.getElementById('img-profilo').style.display = 'block'; */

                        const reader = new FileReader();
                        reader.onload = function(e) {
                            const base64 = e.target.result;
                            localStorage.setItem('fotoProfilo', base64);
                            document.getElementById('img-profilo').src = base64;
                            document.getElementById('img-profilo').style.display = 'block';
                        }
                        reader.readAsDataURL(fileSelezionato);
                    });

                    const fotoSalvata = localStorage.getItem('fotoProfilo');
                    if (fotoSalvata) { document.getElementById('img-profilo').src = fotoSalvata; document.getElementById('img-profilo').style.display = 'block'; }

                    // rimuoviImmagine ⤵️
                    document.getElementById('rem-foto-profilo').addEventListener('click', function() {
                        document.getElementById('img-profilo').src = "omino_f_p.png";
                        document.getElementById('img-profilo').style.display = 'block';
                        document.getElementById('foto-profilo').value = "";
                        localStorage.removeItem('fotoProfilo');
                    });
                </script>