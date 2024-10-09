-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 09 oct. 2024 à 10:55
-- Version du serveur : 5.7.39
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `5iw-controle`
--

-- --------------------------------------------------------

--
-- Structure de la table `bank_account`
--

CREATE TABLE `bank_account` (
  `id` int(11) NOT NULL,
  `accountNumber` varchar(16) NOT NULL,
  `type` enum('Courant','Pro','Livret A','Commun') NOT NULL,
  `balance` int(11) NOT NULL,
  `plafond` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `bank_account`
--

INSERT INTO `bank_account` (`id`, `accountNumber`, `type`, `balance`, `plafond`) VALUES
(1, '9876543210123456', 'Courant', -200, 0),
(3, '1234567812345679', 'Pro', 100, 0),
(4, '1234567812345679', 'Courant', 0, 0),
(5, '1234567812345679', 'Pro', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `credit_card`
--

CREATE TABLE `credit_card` (
  `id` int(11) NOT NULL,
  `cardNumber` varchar(255) NOT NULL,
  `pinCode` varchar(255) NOT NULL,
  `bankAccountId` int(11) DEFAULT NULL,
  `holderId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `credit_card`
--

INSERT INTO `credit_card` (`id`, `cardNumber`, `pinCode`, `bankAccountId`, `holderId`) VALUES
(1, '6234164660489430', '1234', 1, NULL),
(2, '3017947967627212', '1234', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sourceAccountId` int(11) DEFAULT NULL,
  `destinationAccountId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `transaction`
--

INSERT INTO `transaction` (`id`, `amount`, `date`, `createdAt`, `sourceAccountId`, `destinationAccountId`) VALUES
(1, 100, '2024-10-09 11:59:32', '2024-10-09 11:59:31', 1, NULL),
(2, 100, '2024-10-09 11:59:59', '2024-10-09 11:59:58', 1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(1, 'John Doe', 'john.doe@example.com', 'password123'),
(2, 'Johné Doe', 'john.doe@example.com', 'password123');

-- --------------------------------------------------------

--
-- Structure de la table `user_bank_accounts`
--

CREATE TABLE `user_bank_accounts` (
  `bank_account_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `user_bank_accounts`
--

INSERT INTO `user_bank_accounts` (`bank_account_id`, `user_id`) VALUES
(4, 1),
(5, 1);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `bank_account`
--
ALTER TABLE `bank_account`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `credit_card`
--
ALTER TABLE `credit_card`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_e15de3bae8371d94b4865e97405` (`bankAccountId`),
  ADD KEY `FK_fd6d52e6e25f8fc612ac3b0fd4a` (`holderId`);

--
-- Index pour la table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_6e328d7823e68db7cb5ac7abc67` (`destinationAccountId`),
  ADD KEY `FK_c83ba3ecd15481a4bae9a09f76b` (`sourceAccountId`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user_bank_accounts`
--
ALTER TABLE `user_bank_accounts`
  ADD PRIMARY KEY (`bank_account_id`,`user_id`),
  ADD KEY `IDX_6a3c1e418da089f4f659910c91` (`bank_account_id`),
  ADD KEY `IDX_9e19e984d14d4f857c1ed2dab6` (`user_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `bank_account`
--
ALTER TABLE `bank_account`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `credit_card`
--
ALTER TABLE `credit_card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `credit_card`
--
ALTER TABLE `credit_card`
  ADD CONSTRAINT `FK_e15de3bae8371d94b4865e97405` FOREIGN KEY (`bankAccountId`) REFERENCES `bank_account` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_fd6d52e6e25f8fc612ac3b0fd4a` FOREIGN KEY (`holderId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `FK_6e328d7823e68db7cb5ac7abc67` FOREIGN KEY (`destinationAccountId`) REFERENCES `bank_account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c83ba3ecd15481a4bae9a09f76b` FOREIGN KEY (`sourceAccountId`) REFERENCES `bank_account` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Contraintes pour la table `user_bank_accounts`
--
ALTER TABLE `user_bank_accounts`
  ADD CONSTRAINT `FK_6a3c1e418da089f4f659910c910` FOREIGN KEY (`bank_account_id`) REFERENCES `bank_account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_9e19e984d14d4f857c1ed2dab63` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
