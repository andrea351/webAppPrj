-- Schema del Database Cinema Mood
-- Carica questo file in phpMyAdmin per creare le tabelle necessarie

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------
-- Struttura della tabella `utenti`
-- --------------------------------------------------------

CREATE TABLE `utenti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `data_registrazione` datetime DEFAULT current_timestamp(),
  `eta` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Struttura della tabella `reset_password`
-- --------------------------------------------------------

CREATE TABLE `reset_password` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `utente_id` int(11) NOT NULL,
  `token` varchar(64) NOT NULL,
  `scadenza` datetime NOT NULL,
  `usato` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

COMMIT;