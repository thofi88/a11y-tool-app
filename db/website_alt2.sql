-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Erstellungszeit: 23. Jun 2020 um 10:38
-- Server-Version: 5.7.30
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
  `website_id` int(255) NOT NULL,
  `url` text NOT NULL,
  `check_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `result` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `websites`
--

CREATE TABLE `websites` (
  `id` int(255) NOT NULL,
  `name` text NOT NULL,
  `home_url` text NOT NULL,
  `last_full_test` timestamp NULL DEFAULT NULL,
  `list_of_pages` text NOT NULL,
  `pages_checked` int(255) NOT NULL,
  `category_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `websites`
--

INSERT INTO `websites` (`id`, `name`, `home_url`, `last_full_test`, `list_of_pages`, `pages_checked`, `category_id`) VALUES
(10, 'HTWK', 'https://www.htwk-leipzig.de/startseite/', NULL, 'https://www.htwk-leipzig.de/studieren/,https://www.htwk-leipzig.de/kooperieren/mit-experten-netzwerken/,https://www.htwk-leipzig.de/intern/an-abmelden/?redirect_url=https%3A%2F%2Fwww.htwk-leipzig.de%2Fkooperieren%2Fmit-experten-netzwerken%2F', 0, '2,3');

--
-- Indizes der exportierten Tabellen
--

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
-- AUTO_INCREMENT für Tabelle `category`
--
ALTER TABLE `category`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `checks`
--
ALTER TABLE `checks`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `websites`
--
ALTER TABLE `websites`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
