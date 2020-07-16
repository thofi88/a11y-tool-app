-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Erstellungszeit: 16. Jul 2020 um 14:52
-- Server-Version: 5.7.31
-- PHP-Version: 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `website_db`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `auto`
--

CREATE TABLE `auto` (
  `id` int(11) NOT NULL,
  `automated` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `auto`
--

INSERT INTO `auto` (`id`, `automated`) VALUES
(0, 0);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `category`
--

CREATE TABLE `category` (
  `id` int(255) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(1, 'Vereine'),
(2, 'Städte'),
(3, 'Universitäten');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `checks`
--

CREATE TABLE `checks` (
  `id` int(255) NOT NULL,
  `website_name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `website_id` int(255) NOT NULL,
  `url` text NOT NULL,
  `check_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `result` longtext CHARACTER SET utf8,
  `checked` tinyint(1) NOT NULL DEFAULT '0',
  `ranking` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Daten für Tabelle `checks`
--

INSERT INTO `checks` (`id`, `website_name`, `website_id`, `url`, `check_time`, `result`, `checked`, `ranking`) VALUES
(1, 'Studieren an der HTWK Leipzig', 10, 'https://www.htwk-leipzig.de/studieren/', '2020-07-16 14:51:35', '{\r\n  \"inapplicable\": [],\r\n  \"passes\": [],\r\n  \"testEngine\": {},\r\n  \"testEnvironment\": {},\r\n  \"testRunner\": {},\r\n  \"timestamp\": \"\",\r\n  \"toolOptions\": {},\r\n  \"url\": \"\",\r\n  \"violations\": []\r\n}', 0, NULL),
(2, 'Studienangebot', 10, 'https://www.htwk-leipzig.de/studieren/studiengaenge/', '2020-07-16 14:51:35', '{\r\n  \"inapplicable\": [],\r\n  \"passes\": [],\r\n  \"testEngine\": {},\r\n  \"testEnvironment\": {},\r\n  \"testRunner\": {},\r\n  \"timestamp\": \"\",\r\n  \"toolOptions\": {},\r\n  \"url\": \"\",\r\n  \"violations\": []\r\n}', 0, NULL),
(3, 'Startseite', 11, 'https://www.dzblesen.de/', '2020-07-16 14:51:35', '{\r\n  \"inapplicable\": [],\r\n  \"passes\": [],\r\n  \"testEngine\": {},\r\n  \"testEnvironment\": {},\r\n  \"testRunner\": {},\r\n  \"timestamp\": \"\",\r\n  \"toolOptions\": {},\r\n  \"url\": \"\",\r\n  \"violations\": []\r\n}', 0, NULL),
(4, 'Bibliothek', 11, 'https://www.dzblesen.de/index.php?site_id=2', '2020-07-16 14:51:35', '{\r\n  \"inapplicable\": [],\r\n  \"passes\": [],\r\n  \"testEngine\": {},\r\n  \"testEnvironment\": {},\r\n  \"testRunner\": {},\r\n  \"timestamp\": \"\",\r\n  \"toolOptions\": {},\r\n  \"url\": \"\",\r\n  \"violations\": []\r\n}', 0, NULL),
(5, 'Startseite', 12, 'https://digiboard.htwk-leipzig.de/digiboard/start/index.php', '2020-07-16 14:51:35', '{\r\n  \"inapplicable\": [],\r\n  \"passes\": [],\r\n  \"testEngine\": {},\r\n  \"testEnvironment\": {},\r\n  \"testRunner\": {},\r\n  \"timestamp\": \"\",\r\n  \"toolOptions\": {},\r\n  \"url\": \"\",\r\n  \"violations\": []\r\n}', 0, NULL),
(6, 'Impressum', 12, 'https://digiboard.htwk-leipzig.de/digiboard/start/index.php?seite=impressum', '2020-07-16 14:51:35', '{\r\n  \"inapplicable\": [],\r\n  \"passes\": [],\r\n  \"testEngine\": {},\r\n  \"testEnvironment\": {},\r\n  \"testRunner\": {},\r\n  \"timestamp\": \"\",\r\n  \"toolOptions\": {},\r\n  \"url\": \"\",\r\n  \"violations\": []\r\n}', 0, NULL);

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `websites`
--

CREATE TABLE `websites` (
  `id` int(255) NOT NULL,
  `name` text NOT NULL,
  `home_url` text NOT NULL,
  `last_full_test` timestamp NULL DEFAULT NULL,
  `category_id` varchar(255) NOT NULL,
  `ranking` int(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `websites`
--

INSERT INTO `websites` (`id`, `name`, `home_url`, `last_full_test`, `category_id`, `ranking`) VALUES
(10, 'HTWK', 'https://www.htwk-leipzig.de/startseite/', NULL, '2,3', NULL),
(11, 'dzb lesen', 'https://www.dzblesen.de/', NULL, '2', NULL),
(12, 'Digiboard HTWK', 'https://digiboard.htwk-leipzig.de/digiboard/start/index.php', NULL, '3', NULL);

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `checks`
--
ALTER TABLE `checks`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `websites`
--
ALTER TABLE `websites`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `auto`
--
ALTER TABLE `auto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `category`
--
ALTER TABLE `category`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `checks`
--
ALTER TABLE `checks`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT für Tabelle `websites`
--
ALTER TABLE `websites`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
