-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Apr 21, 2026 alle 11:53
-- Versione del server: 10.4.32-MariaDB
-- Versione PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cinemood`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `film`
--

CREATE TABLE `film` (
  `id` int(11) NOT NULL,
  `titolo` varchar(255) NOT NULL,
  `trama` text DEFAULT NULL,
  `genere` varchar(100) DEFAULT NULL,
  `anno` int(11) DEFAULT NULL,
  `durata` varchar(7) DEFAULT NULL,
  `regia` varchar(255) DEFAULT NULL,
  `cast_film` text DEFAULT NULL,
  `locandina` varchar(255) DEFAULT NULL,
  `trailer` varchar(255) DEFAULT NULL,
  `rating` decimal(3,1) DEFAULT NULL,
  `etichetta` varchar(10) DEFAULT NULL,
  `attivo` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `film`
--

INSERT INTO `film` (`id`, `titolo`, `trama`, `genere`, `anno`, `durata`, `regia`, `cast_film`, `locandina`, `trailer`, `rating`, `etichetta`, `attivo`) VALUES
(1, 'Billy Elliot', 'Billy ha dodici anni, sua madre è morta, suo padre e suo fratello sono impegnati in un durissimo sciopero. Il papà vorrebbe che Billy facesse pugilato, che imparasse a badare a se stesso, perché è quello che devono fare gli uomini della loro famiglia: tenere duro e combattere. Ma Billy ha un altro sogno: vuole diventare un ballerino, perché solo quando balla è davvero se stesso.', 'Drammatico/Commedia', 2000, '1h 50m', 'Stephen Daldry', 'Jamie Bell, Julie Walters, Gary Lewis', 'locandine/billy_elliot.jpg', 'trailers/videoplayback.mp4', 3.2, 'T', 1),
(2, 'La vita è bella', 'Guido è un uomo ebreo italiano pieno di fantasia e ottimismo, che si innamora di Dora e costruisce con lei una famiglia felice. La loro vita viene sconvolta dalle leggi razziali e dalla deportazione in un campo di concentramento nazista. Per proteggere il figlio Giosuè dall’orrore che li circonda, Guido trasforma la terribile realtà in un gioco, usando immaginazione e amore per salvare l’innocenza del bambino.', 'Drammatico/Commedia', 1997, '1h 56m', 'Roberto Benigni', 'Roberto Benigni, Nicoletta Braschi, Giorgio Cantarini', 'locandine/la_vita_e_bella.jpg', 'trailers/lavitaèbella.mp4', 4.3, 'T', 1),
(3, 'Il re leone', 'Simba è un giovane leone destinato a diventare re della savana, ma dopo la morte del padre Mufasa, orchestrata dal perfido zio Scar, è costretto a fuggire. Lontano dalla sua terra, cresce insieme a Timon e Pumbaa vivendo senza responsabilità, finché il passato non torna a chiamarlo. Simba dovrà trovare il coraggio di affrontare il suo destino e ristabilire l’equilibrio nel regno.', 'Animazione/Family', 1994, '1h 58m', 'Roger Allers', 'Matthew Broderick, Jeremy Irons, James Earl Jones', 'locandine/re_leone.jpg', 'trailers/re_leone.mp4', 4.2, 'T', 1),
(4, 'Fantozzi', 'Ugo Fantozzi è un impiegato sfortunato, goffo e costantemente vessato dai suoi superiori e dalla vita stessa. Tra umiliazioni quotidiane, situazioni paradossali e disavventure tragicomiche, Fantozzi cerca di sopravvivere in un mondo lavorativo assurdo e spietato, diventando il simbolo dell’uomo medio oppresso dalla società.', 'Commedia', 1975, '1h 40m', 'Luciano Salce', 'Paolo Villaggio, Anna Mazzamauro, Gigi Reder', 'locandine/fantozzi.jpg', 'trailers/fantozzi.mp4', 3.5, 'T', 1),
(5, 'Natale sul Nilo', 'Durante una vacanza in Egitto, le vicende di diversi personaggi si intrecciano tra equivoci, inseguimenti e situazioni comiche. Un generale dei carabinieri cerca di proteggere la figlia da un fidanzato poco raccomandabile, mentre altri italiani si ritrovano coinvolti in avventure esilaranti tra piramidi, crociere sul Nilo e imprevisti di ogni tipo.', 'Commedia', 2002, '1h 50m', 'Neri Parenti', 'Christian De Sica, Massimo Boldi, Angela Finocchiaro', 'locandine/natale_sul_nilo.jpg', 'trailers/n_s_n.mp4', 2.4, 'T', 1),
(6, 'La ladra di libri', 'Durante la Germania nazista, la giovane Liesel Meminger viene affidata a una famiglia adottiva e scopre il potere delle parole grazie ai libri che inizia a rubare e condividere. Mentre il mondo intorno a lei è segnato dalla guerra e dalla persecuzione, Liesel trova conforto nella lettura e nell’amicizia, stringendo un legame speciale con un ragazzo ebreo nascosto nella sua casa.', 'Drammatico/Guerra', 2013, '2h 11m', 'Brian Percival', 'Sophie Nelisse, Geoffrey Rush, Emily Watson', 'locandine/ladra_libri.jpg', 'trailers/ll.mp4', 4.4, 'T', 1),
(7, 'Ce ancora domani', 'Nella Roma del dopoguerra, Delia è una donna che vive una vita segnata da difficoltà, doveri familiari e un marito autoritario. Nonostante tutto, trova piccoli momenti di libertà e speranza. L\'arrivo di una misteriosa lettera accende in lei il desiderio di cambiare il proprio destino e costruire un futuro diverso, per sé e per sua figlia.', 'Drammatico', 2023, '1h 58m', 'Paola Cortellesi', 'Paola Cortellesi, Valerio Mastandrea, Romana Maggiora Vergano', 'locandine/ce_ancora_domani.jpg', 'trailers/ancora_domani.mp4', 3.5, 'T', 1),
(8, 'Wonder', 'Auggie Pullman è un bambino nato con una rara malformazione facciale che, dopo anni di istruzione a casa, affronta per la prima volta la scuola. Tra difficoltà, pregiudizi e nuove amicizie, Auggie e la sua famiglia intraprendono un percorso fatto di coraggio, accettazione e gentilezza, dimostrando che la vera bellezza viene da dentro.', 'Drammatico/Family', 2017, '1h 53m', 'Stephen Chbosky', 'Jacob Tremblay, Julia Roberts, Owen Wilson', 'locandine/wonder.jpg', 'trailers/wonder.mp4', 4.2, 'T', 1),
(9, 'Oppenheimer', 'Il film racconta la vita del fisico J. Robert Oppenheimer, uno dei principali artefici del Progetto Manhattan durante la Seconda guerra mondiale. Tra ambizioni scientifiche, dilemmi morali e conseguenze devastanti, Oppenheimer si confronta con il peso delle sue scoperte e con l’impatto della bomba atomica sul mondo.', 'Biografico/Storico', 2023, '3h 00m', 'Christopher Nolan', 'Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.', 'locandine/oppenheimer.jpg', 'trailers/oppenheimer.mp4', 5.0, 'VM14', 1),
(10, 'Una notte da leoni', 'Quattro amici partono per Las Vegas per festeggiare l’addio al celibato di uno di loro, ma dopo una notte folle si risvegliano senza alcun ricordo di ciò che è accaduto. Lo sposo è scomparso e la stanza d’albergo è nel caos totale. Tra situazioni assurde e indizi improbabili, i tre amici dovranno ricostruire gli eventi della notte per ritrovarlo prima del matrimonio.', 'Commedia', 2009, '1h 40m', 'Todd Phillips', 'Bradley Cooper, Ed Helms, Zach Galifianakis', 'locandine/notte_leoni.jpg', 'trailers/n_l.mp4', 3.5, 'VM14', 1),
(11, 'Orgoglio e pregiudizio', 'Nella campagna inglese del XIX secolo, Elizabeth Bennet, una giovane donna intelligente e indipendente, deve confrontarsi con le rigide convenzioni sociali e con l’orgoglio del ricco e riservato Mr. Darcy. Tra equivoci, malintesi e incontri romantici, Elizabeth e Darcy scopriranno l’importanza di superare i pregiudizi per trovare l’amore e la felicità.', 'Romantico', 2005, '2h 9m', 'Joe Wright', 'Keira Knightley, Matthew Macfadyen, Judi Dench', 'locandine/org_pred.jpg', 'trailers/org_pred.mp4', 4.0, 'T', 1),
(12, 'La vita di Pi', 'Pi Patel è un giovane ragazzo indiano che sopravvive a un naufragio in mezzo all’oceano Pacifico. Intrappolato su una scialuppa con una tigre del Bengala di nome Richard Parker, Pi affronta sfide estreme di sopravvivenza, fede e resilienza. Attraverso incredibili avventure e riflessioni spirituali, il viaggio di Pi diventa un racconto sul coraggio, la speranza e la forza dello spirito umano.', 'Avventura', 2012, '2h 7m', 'Ang Lee', 'Suraj Sharma, Irrfan Khan, Rafe Spall', 'locandine/vita_pi.jpg', 'trailers/vita_pi.mp4', 4.2, 'T', 1),
(13, 'La ricerca della felicita', 'Chris Gardner è un uomo determinato che lotta per costruirsi una vita migliore per sé e per suo figlio, nonostante la povertà, le difficoltà e le avversità. Attraverso sacrifici, resilienza e incredibile perseveranza, Chris cerca di trasformare i propri sogni in realtà, dimostrando che la speranza e la determinazione possono portare alla felicità.', 'Drammatico/Biografico', 2006, '1h 57m', 'Gabriele Muccino', 'Will Smith, Jaden Smith, Thandiwe Newton', 'locandine/ricerca_felicita.jpg', 'trailers/ricerca_felicita.mp4', 5.0, 'T', 1),
(14, 'Mamma ho perso laereo', 'Kevin McCallister, un bambino di otto anni, viene accidentalmente lasciato a casa da solo quando la sua famiglia parte per le vacanze di Natale. Inizialmente felice di avere la casa tutta per sé, Kevin deve presto difendersi da due ladri goffi che cercano di svaligiare la casa, usando astuzia e trappole ingegnose per proteggere la propria dimora.', 'Commedia/Family', 1990, '1h 43m', 'Chris Columbus', 'Macaulay Culkin, Joe Pesci, Daniel Stern', 'locandine/mamma_perso_aereo.jpg', 'trailers/aereo.mp4', 4.2, 'T', 1),
(15, 'Toy Story', 'Woody, un cowboy giocattolo, è il leader dei giocattoli di Andy e gode della sua posizione privilegiata. Ma l’arrivo di Buzz Lightyear, un nuovo giocattolo spaziale, mette a rischio il suo ruolo. Tra rivalità e malintesi, Woody e Buzz dovranno imparare a collaborare, affrontare avventure pericolose e scoprire il valore dell’amicizia e della lealtà.', 'Animazione/Avventura/Commedia', 1995, '1h 21m', 'John Lasseter', 'Tom Hanks, Tim Allen, Don Rickles', 'locandine/toy_story.jpg', 'trailers/ts.mp4', 4.5, 'T', 1),
(16, 'Il bambino con il pigiama a righe', 'Bruno, un bambino di otto anni figlio di un ufficiale nazista, si trasferisce con la famiglia vicino a un campo di concentramento. Ignaro della realtà che lo circonda, stringe amicizia con Shmuel, un ragazzo ebreo prigioniero. La loro innocente amicizia porterà a conseguenze tragiche, mostrando l’orrore della guerra attraverso gli occhi di un bambino.', 'Drammatico/Guerra', 2008, '1h 34m', 'Mark Herman', 'Asa Butterfield, Jack Scanlon, David Thewlis', 'locandine/b_p_righe.jpg', 'trailers/B_righe.mp4', 4.7, 'VM14', 1),
(17, 'Conclave', 'Dopo la morte improvvisa del Papa, il cardinale Thomas Lawrence viene incaricato di supervisionare il conclave per eleggere il suo successore. Mentre i cardinali si riuniscono nel cuore del Vaticano, emergono intrighi, alleanze segrete e scandali che mettono alla prova la fede, la lealtà e il potere all’interno della Chiesa, rivelando oscure verità che potrebbero cambiare per sempre la sua istituzione.', 'Thriller', 2024, '2h 00m', 'Edward Berger', 'Ralph Fiennes, Stanley Tucci, John Lithgow', 'locandine/conclave.jpg', 'trailers/conclave.mp4', 4.3, 'VM14', 1),
(18, 'Snowden', 'Edward Snowden, un ex tecnico della CIA e collaboratore della NSA decide di rivelare al mondo i programmi di sorveglianza di massa del governo statunitense. Tra tensioni morali, segreti e rischi personali, Snowden compie una scelta destinata a cambiare per sempre il dibattito globale sulla privacy e la sicurezza.', 'Thriller/Biografico', 2016, '2h 14m', 'Oliver Stone', 'Joseph Gordon-Levitt, Shailene Woodley, Melissa Leo', 'locandine/snowden.jpg', 'trailers/snowden.mp4', 3.7, 'VM14', 1),
(19, 'The Conjuring', 'I demonologi Ed e Lorraine Warren vengono chiamati ad aiutare una famiglia terrorizzata da presenze oscure nella loro fattoria isolata. Mentre gli eventi paranormali si intensificano, i Warren scoprono una storia inquietante legata alla casa e si trovano ad affrontare una delle entità più pericolose della loro carriera.', 'Horror/Thriller', 2013, '1h 52m', 'James Wan', 'Patrick Wilson, Vera Farmiga, Ron Livingston', 'locandine/t_c.jpg', 'trailers/t_c.mp4', 4.0, 'VM14', 1),
(20, 'Cena con delitto', 'Dopo la morte del celebre scrittore di romanzi gialli Harlan Thrombey, il detective Benoit Blanc viene incaricato di indagare sul caso. Tra familiari sospetti, segreti nascosti e colpi di scena, ogni membro della famiglia sembra avere un motivo per mentire. L’indagine si trasforma in un intricato gioco di inganni dove nulla è come appare.', 'Thriller', 2019, '2h 10m', 'Rian Johnson', 'Daniel Craig, Chris Evans, Ana de Armas', 'locandine/c_c_d.jpg', 'trailers/cena.mp4', 4.2, 'VM12', 1),
(21, 'Avatar', 'Jake Sully, un ex marine costretto su una sedia a rotelle, viene inviato sul pianeta Pandora nell’ambito di un programma che gli permette di controllare un corpo avatar. Qui entra in contatto con i Na’vi, una popolazione indigena, e si trova diviso tra il dovere verso gli umani e il legame sempre più forte con il nuovo mondo e la sua gente.', 'Fantascienza/Avventura/Azione', 2009, '2h 42m', 'James Cameron', 'Sam Worthington, Zoe Saldana, Sigourney Weaver', 'locandine/avatar.jpg', 'trailers/avatar.mp4', 4.4, 'T', 1),
(22, 'Interstellar', 'In un futuro in cui la Terra sta diventando inabitabile, un gruppo di astronauti intraprende una missione attraverso un wormhole alla ricerca di un nuovo pianeta per salvare l’umanità. Cooper, un ex pilota e ingegnere, deve lasciare la sua famiglia affrontando un viaggio straordinario tra spazio, tempo e dimensioni sconosciute, dove l’amore e il sacrificio diventano fondamentali.', 'Fantascienza/Drammatico/Avventura', 2014, '2h 49m', 'Christopher Nolan', 'Matthew McConaughey, Anne Hathaway, Jessica Chastain', 'locandine/interstellar.jpg', 'trailers/interstellar.mp4', 4.3, 'VM12', 1),
(23, 'Top Gun Maverick', 'Dopo oltre trent’anni di servizio, Pete “Maverick” Mitchell è ancora uno dei migliori piloti della Marina, evitando le promozioni per continuare a volare. Quando viene incaricato di addestrare un gruppo di giovani aviatori per una missione estremamente pericolosa, Maverick dovrà confrontarsi con il proprio passato e con il figlio di un suo vecchio amico, affrontando sfide che metteranno alla prova coraggio e sacrificio.', 'Azione', 2022, '2h 11m', 'Joseph Kosinski', 'Tom Cruise, Miles Teller, Jennifer Connelly', 'locandine/t_g_m.jpg', 'trailers/topgun.mp4', 4.4, 'VM12', 1),
(24, 'Le pagine della nostra vita', 'La storia racconta l’intenso amore tra Noah e Allie, due giovani provenienti da mondi sociali diversi che si innamorano durante un’estate indimenticabile. Nonostante le difficoltà, le separazioni e il passare degli anni, il loro legame rimane vivo. Attraverso i ricordi letti da un diario, emerge una storia d’amore profonda e senza tempo.', 'Romantico', 2004, '2h 4m', 'Nick Cassavetes', 'Ryan Gosling, Rachel McAdams, James Garner', 'locandine/le_pag_vita.jpg', 'trailers/pag_vita.mp4', 4.1, 'VM14', 1);

-- --------------------------------------------------------

--
-- Struttura della tabella `film_moods`
--

CREATE TABLE `film_moods` (
  `film_id` int(11) NOT NULL,
  `mood_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `film_moods`
--

INSERT INTO `film_moods` (`film_id`, `mood_id`) VALUES
(1, 3),
(1, 8),
(2, 5),
(2, 9),
(3, 7),
(4, 3),
(4, 12),
(5, 12),
(6, 5),
(6, 9),
(7, 9),
(8, 3),
(9, 2),
(9, 5),
(10, 8),
(10, 12),
(11, 10),
(12, 7),
(12, 9),
(13, 5),
(13, 11),
(14, 8),
(14, 12),
(15, 7),
(15, 9),
(16, 5),
(16, 11),
(17, 1),
(17, 2),
(18, 1),
(18, 2),
(19, 6),
(20, 1),
(20, 12),
(21, 1),
(21, 4),
(21, 7),
(22, 1),
(22, 7),
(23, 4),
(24, 10);

-- --------------------------------------------------------

--
-- Struttura della tabella `moods`
--

CREATE TABLE `moods` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `ordine` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `moods`
--

INSERT INTO `moods` (`id`, `nome`, `ordine`) VALUES
(1, 'Fiato sospeso', 1),
(2, 'Mind-blowing', 2),
(3, 'Serata in famiglia', 3),
(4, 'Solo adrenalina', 4),
(5, 'Storie vere', 5),
(6, 'Da urlo', 6),
(7, 'All\'avventura', 7),
(8, 'Zero pensieri', 8),
(9, 'Curioso', 9),
(10, 'Love', 10),
(11, 'Lacrime in arrivo', 11),
(12, 'Risate', 12);

-- --------------------------------------------------------

--
-- Struttura della tabella `orari`
--

CREATE TABLE `orari` (
  `id` int(11) NOT NULL,
  `film_id` int(11) NOT NULL,
  `data` date NOT NULL,
  `orario` time NOT NULL,
  `sala` varchar(50) DEFAULT 'Sala 1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dump dei dati per la tabella `orari`
--

INSERT INTO `orari` (`id`, `film_id`, `data`, `orario`, `sala`) VALUES
(1, 1, '2026-06-01', '15:00:00', 'Sala 1'),
(2, 1, '2026-06-01', '21:30:00', 'Sala 1'),
(3, 1, '2026-06-03', '14:00:00', 'Sala 1'),
(4, 1, '2026-06-03', '19:00:00', 'Sala 1'),
(5, 1, '2026-06-06', '17:00:00', 'Sala 1'),
(6, 1, '2026-06-06', '22:30:00', 'Sala 1'),
(7, 1, '2026-06-07', '19:30:00', 'Sala 1'),
(8, 2, '2026-06-01', '17:00:00', 'Sala 1'),
(9, 2, '2026-06-01', '21:00:00', 'Sala 1'),
(10, 2, '2026-06-02', '15:00:00', 'Sala 1'),
(11, 2, '2026-06-02', '20:00:00', 'Sala 1'),
(12, 2, '2026-06-04', '18:00:00', 'Sala 1'),
(13, 2, '2026-06-04', '21:30:00', 'Sala 1'),
(14, 2, '2026-06-05', '16:00:00', 'Sala 1'),
(15, 2, '2026-06-05', '19:00:00', 'Sala 1'),
(16, 2, '2026-06-05', '22:00:00', 'Sala 1'),
(17, 2, '2026-06-06', '11:00:00', 'Sala 1'),
(18, 2, '2026-06-06', '15:30:00', 'Sala 1'),
(19, 2, '2026-06-06', '21:00:00', 'Sala 1'),
(20, 2, '2026-06-07', '14:00:00', 'Sala 1'),
(21, 2, '2026-06-07', '18:30:00', 'Sala 1'),
(22, 3, '2026-06-01', '10:00:00', 'Sala 1'),
(23, 3, '2026-06-01', '14:30:00', 'Sala 1'),
(24, 3, '2026-06-02', '10:00:00', 'Sala 1'),
(25, 3, '2026-06-02', '14:00:00', 'Sala 1'),
(26, 3, '2026-06-02', '17:30:00', 'Sala 1'),
(27, 3, '2026-06-03', '10:00:00', 'Sala 1'),
(28, 3, '2026-06-03', '13:00:00', 'Sala 1'),
(29, 3, '2026-06-03', '16:00:00', 'Sala 1'),
(30, 3, '2026-06-06', '10:00:00', 'Sala 1'),
(31, 3, '2026-06-06', '13:00:00', 'Sala 1'),
(32, 3, '2026-06-06', '16:00:00', 'Sala 1'),
(33, 3, '2026-06-06', '19:00:00', 'Sala 1'),
(34, 3, '2026-06-07', '10:00:00', 'Sala 1'),
(35, 3, '2026-06-07', '13:00:00', 'Sala 1'),
(36, 3, '2026-06-07', '16:30:00', 'Sala 1'),
(37, 4, '2026-06-02', '18:00:00', 'Sala 1'),
(38, 4, '2026-06-02', '21:00:00', 'Sala 1'),
(39, 4, '2026-06-03', '17:00:00', 'Sala 1'),
(40, 4, '2026-06-03', '20:30:00', 'Sala 1'),
(41, 4, '2026-06-04', '19:00:00', 'Sala 1'),
(42, 4, '2026-06-04', '22:00:00', 'Sala 1'),
(43, 4, '2026-06-05', '18:30:00', 'Sala 1'),
(44, 4, '2026-06-05', '21:30:00', 'Sala 1'),
(45, 4, '2026-06-06', '17:00:00', 'Sala 1'),
(46, 4, '2026-06-06', '20:00:00', 'Sala 1'),
(47, 4, '2026-06-08', '16:00:00', 'Sala 1'),
(48, 4, '2026-06-08', '19:30:00', 'Sala 1'),
(49, 5, '2026-06-03', '18:00:00', 'Sala 1'),
(50, 5, '2026-06-03', '21:00:00', 'Sala 1'),
(51, 5, '2026-06-05', '20:00:00', 'Sala 1'),
(52, 5, '2026-06-05', '22:30:00', 'Sala 1'),
(53, 5, '2026-06-06', '18:30:00', 'Sala 1'),
(54, 5, '2026-06-06', '21:30:00', 'Sala 1'),
(55, 5, '2026-06-07', '17:00:00', 'Sala 1'),
(56, 5, '2026-06-07', '20:00:00', 'Sala 1'),
(57, 5, '2026-06-09', '19:30:00', 'Sala 1'),
(58, 5, '2026-06-09', '22:00:00', 'Sala 1'),
(59, 6, '2026-06-01', '16:00:00', 'Sala 1'),
(60, 6, '2026-06-01', '20:00:00', 'Sala 1'),
(61, 6, '2026-06-02', '17:30:00', 'Sala 1'),
(62, 6, '2026-06-02', '21:00:00', 'Sala 1'),
(63, 6, '2026-06-03', '16:00:00', 'Sala 1'),
(64, 6, '2026-06-03', '20:30:00', 'Sala 1'),
(65, 6, '2026-06-04', '17:00:00', 'Sala 1'),
(66, 6, '2026-06-04', '21:00:00', 'Sala 1'),
(67, 6, '2026-06-07', '15:00:00', 'Sala 1'),
(68, 6, '2026-06-07', '19:00:00', 'Sala 1'),
(69, 6, '2026-06-07', '22:00:00', 'Sala 1'),
(70, 7, '2026-06-01', '18:30:00', 'Sala 1'),
(71, 7, '2026-06-01', '21:30:00', 'Sala 1'),
(72, 7, '2026-06-02', '19:00:00', 'Sala 1'),
(73, 7, '2026-06-02', '22:00:00', 'Sala 1'),
(74, 7, '2026-06-04', '18:00:00', 'Sala 1'),
(75, 7, '2026-06-04', '21:00:00', 'Sala 1'),
(76, 7, '2026-06-05', '17:30:00', 'Sala 1'),
(77, 7, '2026-06-05', '20:30:00', 'Sala 1'),
(78, 7, '2026-06-06', '16:00:00', 'Sala 1'),
(79, 7, '2026-06-06', '19:30:00', 'Sala 1'),
(80, 7, '2026-06-06', '22:30:00', 'Sala 1'),
(81, 7, '2026-06-07', '17:00:00', 'Sala 1'),
(82, 7, '2026-06-07', '21:00:00', 'Sala 1'),
(83, 8, '2026-06-01', '15:00:00', 'Sala 1'),
(84, 8, '2026-06-01', '19:00:00', 'Sala 1'),
(85, 8, '2026-06-02', '14:30:00', 'Sala 1'),
(86, 8, '2026-06-02', '18:30:00', 'Sala 1'),
(87, 8, '2026-06-03', '15:00:00', 'Sala 1'),
(88, 8, '2026-06-03', '19:30:00', 'Sala 1'),
(89, 8, '2026-06-06', '11:30:00', 'Sala 1'),
(90, 8, '2026-06-06', '15:00:00', 'Sala 1'),
(91, 8, '2026-06-06', '18:30:00', 'Sala 1'),
(92, 8, '2026-06-10', '11:00:00', 'Sala 1'),
(93, 8, '2026-06-10', '14:30:00', 'Sala 1'),
(94, 8, '2026-06-10', '18:00:00', 'Sala 1'),
(95, 9, '2026-06-01', '17:00:00', 'Sala 1'),
(96, 9, '2026-06-01', '21:00:00', 'Sala 1'),
(97, 9, '2026-06-02', '17:00:00', 'Sala 1'),
(98, 9, '2026-06-02', '21:00:00', 'Sala 1'),
(99, 9, '2026-06-03', '17:00:00', 'Sala 1'),
(100, 9, '2026-06-03', '21:00:00', 'Sala 1'),
(101, 9, '2026-06-04', '17:00:00', 'Sala 1'),
(102, 9, '2026-06-04', '21:00:00', 'Sala 1'),
(103, 9, '2026-06-05', '16:00:00', 'Sala 1'),
(104, 9, '2026-06-05', '20:00:00', 'Sala 1'),
(105, 9, '2026-06-06', '15:00:00', 'Sala 1'),
(106, 9, '2026-06-06', '19:30:00', 'Sala 1'),
(107, 9, '2026-06-07', '15:00:00', 'Sala 1'),
(108, 9, '2026-06-07', '19:30:00', 'Sala 1'),
(109, 10, '2026-06-04', '21:00:00', 'Sala 1'),
(110, 10, '2026-06-05', '21:00:00', 'Sala 1'),
(111, 10, '2026-06-05', '23:30:00', 'Sala 1'),
(112, 10, '2026-06-06', '21:00:00', 'Sala 1'),
(113, 10, '2026-06-06', '23:30:00', 'Sala 1'),
(114, 10, '2026-06-07', '20:30:00', 'Sala 1'),
(115, 10, '2026-06-09', '21:30:00', 'Sala 1'),
(116, 11, '2026-06-01', '16:30:00', 'Sala 1'),
(117, 11, '2026-06-01', '20:00:00', 'Sala 1'),
(118, 11, '2026-06-03', '15:00:00', 'Sala 1'),
(119, 11, '2026-06-03', '19:00:00', 'Sala 1'),
(120, 11, '2026-06-04', '16:00:00', 'Sala 1'),
(121, 11, '2026-06-04', '20:00:00', 'Sala 1'),
(122, 11, '2026-06-06', '14:30:00', 'Sala 1'),
(123, 11, '2026-06-06', '18:00:00', 'Sala 1'),
(124, 11, '2026-06-07', '13:00:00', 'Sala 1'),
(125, 11, '2026-06-07', '17:00:00', 'Sala 1'),
(126, 11, '2026-06-07', '21:00:00', 'Sala 1'),
(127, 12, '2026-06-01', '14:00:00', 'Sala 1'),
(128, 12, '2026-06-01', '18:00:00', 'Sala 1'),
(129, 12, '2026-06-02', '15:30:00', 'Sala 1'),
(130, 12, '2026-06-02', '20:00:00', 'Sala 1'),
(131, 12, '2026-06-05', '15:00:00', 'Sala 1'),
(132, 12, '2026-06-05', '19:30:00', 'Sala 1'),
(133, 12, '2026-06-06', '13:30:00', 'Sala 1'),
(134, 12, '2026-06-06', '17:30:00', 'Sala 1'),
(135, 12, '2026-06-06', '21:30:00', 'Sala 1'),
(136, 12, '2026-06-07', '14:00:00', 'Sala 1'),
(137, 12, '2026-06-07', '18:30:00', 'Sala 1'),
(138, 13, '2026-06-02', '16:30:00', 'Sala 1'),
(139, 13, '2026-06-02', '20:30:00', 'Sala 1'),
(140, 13, '2026-06-03', '17:00:00', 'Sala 1'),
(141, 13, '2026-06-03', '21:00:00', 'Sala 1'),
(142, 13, '2026-06-04', '15:30:00', 'Sala 1'),
(143, 13, '2026-06-04', '19:30:00', 'Sala 1'),
(144, 13, '2026-06-05', '16:00:00', 'Sala 1'),
(145, 13, '2026-06-05', '20:00:00', 'Sala 1'),
(146, 13, '2026-06-07', '16:00:00', 'Sala 1'),
(147, 13, '2026-06-07', '20:30:00', 'Sala 1'),
(148, 14, '2026-06-01', '10:30:00', 'Sala 1'),
(149, 14, '2026-06-01', '14:00:00', 'Sala 1'),
(150, 14, '2026-06-02', '10:00:00', 'Sala 1'),
(151, 14, '2026-06-02', '13:30:00', 'Sala 1'),
(152, 14, '2026-06-03', '10:30:00', 'Sala 1'),
(153, 14, '2026-06-03', '14:00:00', 'Sala 1'),
(154, 14, '2026-06-06', '10:00:00', 'Sala 1'),
(155, 14, '2026-06-06', '12:30:00', 'Sala 1'),
(156, 14, '2026-06-06', '15:00:00', 'Sala 1'),
(157, 14, '2026-06-07', '10:00:00', 'Sala 1'),
(158, 14, '2026-06-07', '12:30:00', 'Sala 1'),
(159, 14, '2026-06-07', '15:00:00', 'Sala 1'),
(160, 15, '2026-06-01', '11:00:00', 'Sala 1'),
(161, 15, '2026-06-01', '14:30:00', 'Sala 1'),
(162, 15, '2026-06-03', '11:00:00', 'Sala 1'),
(163, 15, '2026-06-03', '14:00:00', 'Sala 1'),
(164, 15, '2026-06-04', '10:30:00', 'Sala 1'),
(165, 15, '2026-06-04', '13:30:00', 'Sala 1'),
(166, 15, '2026-06-06', '10:30:00', 'Sala 1'),
(167, 15, '2026-06-06', '13:00:00', 'Sala 1'),
(168, 15, '2026-06-06', '15:30:00', 'Sala 1'),
(169, 15, '2026-06-07', '10:30:00', 'Sala 1'),
(170, 15, '2026-06-07', '13:00:00', 'Sala 1'),
(171, 15, '2026-06-07', '15:30:00', 'Sala 1'),
(172, 16, '2026-06-01', '19:00:00', 'Sala 1'),
(173, 16, '2026-06-01', '21:30:00', 'Sala 1'),
(174, 16, '2026-06-02', '18:30:00', 'Sala 1'),
(175, 16, '2026-06-02', '21:00:00', 'Sala 1'),
(176, 16, '2026-06-04', '19:30:00', 'Sala 1'),
(177, 16, '2026-06-04', '22:00:00', 'Sala 1'),
(178, 16, '2026-06-05', '19:00:00', 'Sala 1'),
(179, 16, '2026-06-05', '21:30:00', 'Sala 1'),
(180, 16, '2026-06-06', '20:00:00', 'Sala 1'),
(181, 16, '2026-06-06', '22:30:00', 'Sala 1'),
(182, 16, '2026-06-10', '16:00:00', 'Sala 1'),
(183, 16, '2026-06-10', '18:30:00', 'Sala 1'),
(184, 16, '2026-06-10', '22:00:00', 'Sala 1'),
(185, 17, '2026-06-02', '19:30:00', 'Sala 1'),
(186, 17, '2026-06-02', '22:30:00', 'Sala 1'),
(187, 17, '2026-06-03', '20:00:00', 'Sala 1'),
(188, 17, '2026-06-03', '22:30:00', 'Sala 1'),
(189, 17, '2026-06-04', '20:00:00', 'Sala 1'),
(190, 17, '2026-06-04', '22:30:00', 'Sala 1'),
(191, 17, '2026-06-05', '19:00:00', 'Sala 1'),
(192, 17, '2026-06-05', '22:00:00', 'Sala 1'),
(193, 17, '2026-06-06', '18:00:00', 'Sala 1'),
(194, 17, '2026-06-06', '21:00:00', 'Sala 1'),
(195, 17, '2026-06-07', '18:00:00', 'Sala 1'),
(196, 17, '2026-06-07', '21:00:00', 'Sala 1'),
(197, 18, '2026-06-01', '19:00:00', 'Sala 1'),
(198, 18, '2026-06-01', '21:00:00', 'Sala 1'),
(199, 18, '2026-06-02', '20:00:00', 'Sala 1'),
(200, 18, '2026-06-02', '22:30:00', 'Sala 1'),
(201, 18, '2026-06-03', '19:30:00', 'Sala 1'),
(202, 18, '2026-06-03', '21:30:00', 'Sala 1'),
(203, 18, '2026-06-04', '20:00:00', 'Sala 1'),
(204, 18, '2026-06-04', '22:30:00', 'Sala 1'),
(205, 18, '2026-06-05', '19:00:00', 'Sala 1'),
(206, 18, '2026-06-05', '21:00:00', 'Sala 1'),
(207, 18, '2026-06-05', '23:00:00', 'Sala 1'),
(208, 18, '2026-06-06', '18:30:00', 'Sala 1'),
(209, 18, '2026-06-06', '20:30:00', 'Sala 1'),
(210, 18, '2026-06-06', '23:00:00', 'Sala 1'),
(211, 18, '2026-06-07', '18:00:00', 'Sala 1'),
(212, 18, '2026-06-07', '20:00:00', 'Sala 1'),
(213, 19, '2026-06-02', '21:00:00', 'Sala 1'),
(214, 19, '2026-06-02', '23:00:00', 'Sala 1'),
(215, 19, '2026-06-04', '21:30:00', 'Sala 1'),
(216, 19, '2026-06-04', '23:30:00', 'Sala 1'),
(217, 19, '2026-06-05', '21:00:00', 'Sala 1'),
(218, 19, '2026-06-05', '23:00:00', 'Sala 1'),
(219, 19, '2026-06-06', '22:00:00', 'Sala 1'),
(220, 19, '2026-06-07', '21:30:00', 'Sala 1'),
(221, 20, '2026-06-01', '20:00:00', 'Sala 1'),
(222, 20, '2026-06-03', '20:30:00', 'Sala 1'),
(223, 20, '2026-06-04', '19:00:00', 'Sala 1'),
(224, 20, '2026-06-04', '21:30:00', 'Sala 1'),
(225, 20, '2026-06-06', '19:30:00', 'Sala 1'),
(226, 20, '2026-06-06', '22:00:00', 'Sala 1'),
(227, 20, '2026-06-07', '19:00:00', 'Sala 1'),
(228, 20, '2026-06-07', '21:30:00', 'Sala 1'),
(229, 20, '2026-06-08', '20:00:00', 'Sala 1'),
(230, 20, '2026-06-08', '22:30:00', 'Sala 1'),
(231, 21, '2026-06-01', '16:00:00', 'Sala 1'),
(232, 21, '2026-06-01', '20:30:00', 'Sala 1'),
(233, 21, '2026-06-02', '16:00:00', 'Sala 1'),
(234, 21, '2026-06-02', '20:30:00', 'Sala 1'),
(235, 21, '2026-06-03', '15:30:00', 'Sala 1'),
(236, 21, '2026-06-03', '20:00:00', 'Sala 1'),
(237, 21, '2026-06-06', '14:00:00', 'Sala 1'),
(238, 21, '2026-06-06', '18:30:00', 'Sala 1'),
(239, 21, '2026-06-07', '14:00:00', 'Sala 1'),
(240, 21, '2026-06-07', '18:30:00', 'Sala 1'),
(241, 21, '2026-06-09', '17:00:00', 'Sala 1'),
(242, 21, '2026-06-09', '21:00:00', 'Sala 1'),
(243, 22, '2026-06-01', '17:30:00', 'Sala 1'),
(244, 22, '2026-06-01', '21:30:00', 'Sala 1'),
(245, 22, '2026-06-02', '17:30:00', 'Sala 1'),
(246, 22, '2026-06-02', '21:30:00', 'Sala 1'),
(247, 22, '2026-06-03', '17:00:00', 'Sala 1'),
(248, 22, '2026-06-03', '21:00:00', 'Sala 1'),
(249, 22, '2026-06-04', '17:00:00', 'Sala 1'),
(250, 22, '2026-06-04', '21:30:00', 'Sala 1'),
(251, 22, '2026-06-05', '17:00:00', 'Sala 1'),
(252, 22, '2026-06-05', '21:00:00', 'Sala 1'),
(253, 22, '2026-06-10', '17:00:00', 'Sala 1'),
(254, 22, '2026-06-10', '21:00:00', 'Sala 1'),
(255, 23, '2026-06-02', '16:00:00', 'Sala 1'),
(256, 23, '2026-06-02', '20:00:00', 'Sala 1'),
(257, 23, '2026-06-03', '16:30:00', 'Sala 1'),
(258, 23, '2026-06-03', '20:30:00', 'Sala 1'),
(259, 23, '2026-06-04', '16:00:00', 'Sala 1'),
(260, 23, '2026-06-04', '20:00:00', 'Sala 1'),
(261, 23, '2026-06-05', '15:30:00', 'Sala 1'),
(262, 23, '2026-06-05', '19:30:00', 'Sala 1'),
(263, 23, '2026-06-06', '15:00:00', 'Sala 1'),
(264, 23, '2026-06-06', '19:00:00', 'Sala 1'),
(265, 23, '2026-06-09', '16:00:00', 'Sala 1'),
(266, 23, '2026-06-09', '20:00:00', 'Sala 1'),
(267, 24, '2026-06-01', '15:30:00', 'Sala 1'),
(268, 24, '2026-06-01', '19:30:00', 'Sala 1'),
(269, 24, '2026-06-03', '15:30:00', 'Sala 1'),
(270, 24, '2026-06-03', '19:30:00', 'Sala 1'),
(271, 24, '2026-06-04', '15:00:00', 'Sala 1'),
(272, 24, '2026-06-04', '19:00:00', 'Sala 1'),
(273, 24, '2026-06-06', '13:00:00', 'Sala 1'),
(274, 24, '2026-06-06', '17:00:00', 'Sala 1'),
(275, 24, '2026-06-07', '13:00:00', 'Sala 1'),
(276, 24, '2026-06-07', '17:00:00', 'Sala 1'),
(277, 24, '2026-06-08', '15:00:00', 'Sala 1'),
(278, 24, '2026-06-08', '19:00:00', 'Sala 1');

-- --------------------------------------------------------

--
-- Struttura della tabella `reset_password`
--

CREATE TABLE `reset_password` (
  `id` int(11) NOT NULL,
  `utente_id` int(11) NOT NULL,
  `token` varchar(64) NOT NULL,
  `scadenza` datetime NOT NULL,
  `usato` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `data_registrazione` datetime DEFAULT current_timestamp(),
  `eta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`id`, `email`, `password`, `nome`, `data_registrazione`, `eta`) VALUES
(1, 'laurademichelisvilu@gmail.com', '$2y$10$BQXx1jVzapD1ES3me4DFW.iI2Mp6.egIUtJPl3N2t5PZwBLs1zvji', 'Laura De Michelis', '2026-04-01 14:28:46', 0);

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `film`
--
ALTER TABLE `film`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `film_moods`
--
ALTER TABLE `film_moods`
  ADD PRIMARY KEY (`film_id`,`mood_id`),
  ADD KEY `mood_id` (`mood_id`);

--
-- Indici per le tabelle `moods`
--
ALTER TABLE `moods`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nome` (`nome`);

--
-- Indici per le tabelle `orari`
--
ALTER TABLE `orari`
  ADD PRIMARY KEY (`id`),
  ADD KEY `film_id` (`film_id`);

--
-- Indici per le tabelle `reset_password`
--
ALTER TABLE `reset_password`
  ADD PRIMARY KEY (`id`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `film`
--
ALTER TABLE `film`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT per la tabella `moods`
--
ALTER TABLE `moods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `orari`
--
ALTER TABLE `orari`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=279;

--
-- AUTO_INCREMENT per la tabella `reset_password`
--
ALTER TABLE `reset_password`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `film_moods`
--
ALTER TABLE `film_moods`
  ADD CONSTRAINT `film_moods_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `film_moods_ibfk_2` FOREIGN KEY (`mood_id`) REFERENCES `moods` (`id`) ON DELETE CASCADE;

--
-- Limiti per la tabella `orari`
--
ALTER TABLE `orari`
  ADD CONSTRAINT `orari_ibfk_1` FOREIGN KEY (`film_id`) REFERENCES `film` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- Tabella ACQUISTI
CREATE TABLE `acquisti` (
  `id`            int(11)      NOT NULL AUTO_INCREMENT,
  `utente_id`     int(11)      NOT NULL,
  `locandina`     varchar(255) NOT NULL,
  `data_acquisto` datetime     NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `utente_id` (`utente_id`),
  CONSTRAINT `acquisti_ibfk_1`
    FOREIGN KEY (`utente_id`) REFERENCES `utenti` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--tabella posti occupati
CREATE TABLE `postiOccupati` (
  `id`       int(11) NOT NULL AUTO_INCREMENT,
  `film_id`  int(11) NOT NULL,
  `data`     date    NOT NULL,
  `orario`   time    NOT NULL,
  `posto`    varchar(5) NOT NULL,   
  PRIMARY KEY (`id`),
  UNIQUE KEY `unico_posto` (`film_id`, `data`, `orario`, `posto`),
  FOREIGN KEY (`film_id`) REFERENCES `film`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;