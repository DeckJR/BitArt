CREATE DATABASE  IF NOT EXISTS `bitartdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `bitartdb`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: bitartdb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Retrato'),(2,'Autorretrato'),(3,'Retrato colectivo'),(4,'Figura humana'),(5,'Desnudo artístico'),(6,'Paisaje natural'),(7,'Paisaje urbano'),(8,'Paisaje nocturno'),(9,'Paisaje marino'),(10,'Naturaleza muerta'),(11,'Flora'),(12,'Animales'),(13,'Escena religiosa'),(14,'Escena bíblica'),(15,'Escena mitológica'),(16,'Escena histórica'),(17,'Escena política'),(18,'Escena bélica'),(19,'Vida cotidiana'),(20,'Escena cultural'),(21,'Arte simbólico'),(22,'Arte alegórico'),(23,'Arte emocional'),(24,'Arte dramático'),(25,'Arte surreal'),(26,'Arte fantástico'),(27,'Arte existencial'),(28,'Cultura europea'),(29,'Cultura latinoamericana'),(30,'Cultura asiática');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condicion`
--

DROP TABLE IF EXISTS `condicion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `condicion` (
  `idCondicion` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idCondicion`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condicion`
--

LOCK TABLES `condicion` WRITE;
/*!40000 ALTER TABLE `condicion` DISABLE KEYS */;
INSERT INTO `condicion` VALUES (1,'Nuevo'),(2,'Restaurado'),(3,'Dañado');
/*!40000 ALTER TABLE `condicion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadoobjeto`
--

DROP TABLE IF EXISTS `estadoobjeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadoobjeto` (
  `idEstadoObjeto` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstadoObjeto`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadoobjeto`
--

LOCK TABLES `estadoobjeto` WRITE;
/*!40000 ALTER TABLE `estadoobjeto` DISABLE KEYS */;
INSERT INTO `estadoobjeto` VALUES (1,'Activo'),(2,'Inactivo'),(3,'Pendiente');
/*!40000 ALTER TABLE `estadoobjeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadopago`
--

DROP TABLE IF EXISTS `estadopago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadopago` (
  `idEstadoPago` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstadoPago`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadopago`
--

LOCK TABLES `estadopago` WRITE;
/*!40000 ALTER TABLE `estadopago` DISABLE KEYS */;
INSERT INTO `estadopago` VALUES (1,'Pendiente'),(2,'Pagado'),(3,'Fallido'),(4,'Reembolsado');
/*!40000 ALTER TABLE `estadopago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadosubasta`
--

DROP TABLE IF EXISTS `estadosubasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadosubasta` (
  `idEstadoSubasta` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idEstadoSubasta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadosubasta`
--

LOCK TABLES `estadosubasta` WRITE;
/*!40000 ALTER TABLE `estadosubasta` DISABLE KEYS */;
INSERT INTO `estadosubasta` VALUES (1,'Programada'),(2,'Abierta'),(3,'Finalizada'),(4,'Cancenlada');
/*!40000 ALTER TABLE `estadosubasta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estadousuario`
--

DROP TABLE IF EXISTS `estadousuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadousuario` (
  `idEstadoUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`idEstadoUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadousuario`
--

LOCK TABLES `estadousuario` WRITE;
/*!40000 ALTER TABLE `estadousuario` DISABLE KEYS */;
INSERT INTO `estadousuario` VALUES (1,'Activo'),(2,'Inactivo');
/*!40000 ALTER TABLE `estadousuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen` (
  `idImagen` int(11) NOT NULL AUTO_INCREMENT,
  `idObjeto` int(11) NOT NULL,
  `imagen` varchar(100) NOT NULL,
  PRIMARY KEY (`idImagen`),
  KEY `fk_imagen_objeto_idx` (`idObjeto`),
  CONSTRAINT `fk_imagen_objeto` FOREIGN KEY (`idObjeto`) REFERENCES `objeto` (`idObjeto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen`
--

LOCK TABLES `imagen` WRITE;
/*!40000 ALTER TABLE `imagen` DISABLE KEYS */;
INSERT INTO `imagen` VALUES (1,1,'LaMonaLisa.jpg'),(2,2,'LaNocheEstrellada.jpg'),(3,3,'Guernica.jpg'),(4,4,'LaUltimaCena.jpg'),(5,5,'ElNacimientoDeVenus.jpg'),(6,6,'LosGirasoles.jpg'),(7,7,'ElGrito.jpg'),(8,8,'LaPersistenciaDeLaMemoria.jpg'),(9,9,'LasDosFridas.jpg'),(10,10,'LasMeninas.jpg'),(11,11,'LaLibertadGuiandoAlPueblo.jpg'),(12,12,'ImpresionSolNaciente.jpg'),(13,13,'LaGranOlaDeKanagawajpg'),(14,14,'ElBeso.jpg'),(15,15,'LaRendicionDeBreda.jpg'),(16,16,'LaJovenDeLaPerla.jpg'),(17,17,'ElJardinDeLasDelicias.jpg'),(18,18,'NapoleonCruzandoLosAlpes.jpg'),(19,19,'ElCaminanteSobreElMarDeNubes.jpg'),(20,20,'LaCreacionDeAdan.jpg');
/*!40000 ALTER TABLE `imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objeto`
--

DROP TABLE IF EXISTS `objeto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objeto` (
  `idObjeto` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Descripcion` varchar(999) NOT NULL,
  `Autor` varchar(100) NOT NULL,
  `FechaRegistro` datetime NOT NULL,
  `idCondicion` int(11) NOT NULL,
  `idEstado` int(11) NOT NULL,
  PRIMARY KEY (`idObjeto`),
  KEY `fk_objeto_estadoobjeto_idx` (`idEstado`),
  KEY `fk_objeto_usuario_idx` (`idUsuario`),
  KEY `fk_objeto_condicion_idx` (`idCondicion`),
  CONSTRAINT `fk_objeto_condicion` FOREIGN KEY (`idCondicion`) REFERENCES `condicion` (`idCondicion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_objeto_estadoobjeto` FOREIGN KEY (`idEstado`) REFERENCES `estadoobjeto` (`idEstadoObjeto`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_objeto_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objeto`
--

LOCK TABLES `objeto` WRITE;
/*!40000 ALTER TABLE `objeto` DISABLE KEYS */;
INSERT INTO `objeto` VALUES (1,3,'La Mona Lisa','Retrato renacentista de Lisa Gherardini, famosa por su enigmática sonrisa.','Leonardo da Vinci','2026-02-21 15:52:59',2,1),(2,4,'La noche estrellada','Paisaje nocturno expresivo con cielo turbulento y estrellas brillantes.','Vincent van Gogh','2026-02-21 15:52:59',1,1),(3,3,'Guernica','Obra que representa el horror del bombardeo de Guernica durante la guerra civil española.','Pablo Picasso','2026-02-21 15:52:59',3,1),(4,4,'La última cena','Representación del momento en que Jesús anuncia la traición de uno de sus apóstoles.','Leonardo da Vinci','2026-02-21 15:52:59',2,1),(5,3,'El nacimiento de Venus','Escena mitológica que muestra a Venus emergiendo del mar.','Sandro Botticelli','2026-02-21 15:52:59',1,1),(6,4,'Los girasoles','Serie de naturalezas muertas con vibrantes girasoles en jarrón.','Vincent van Gogh','2026-02-21 15:52:59',3,1),(7,3,'El grito','Figura angustiada bajo un cielo rojo que simboliza ansiedad y desesperación.','Edvard Munch','2026-02-21 15:52:59',1,1),(8,4,'La persistencia de la memoria','Relojes derretidos en un paisaje surreal que representan el paso del tiempo.','Salvador Dalí','2026-02-21 15:52:59',1,1),(9,3,'Las dos Fridas','Autorretrato doble que refleja la identidad y el dolor emocional de la artista.','Frida Kahlo','2026-02-21 15:52:59',1,1),(10,4,'Las meninas','Compleja escena cortesana con la infanta Margarita y su séquito.','Diego Velázquez','2026-02-21 15:52:59',1,1),(11,3,'La libertad guiando al pueblo','Alegoría de la revolución francesa con figura femenina liderando al pueblo.','Eugène Delacroix','2026-02-21 15:52:59',3,1),(12,4,'Impresión, sol naciente','Paisaje portuario que dio origen al movimiento impresionista.','Claude Monet','2026-02-21 15:52:59',1,1),(13,3,'La gran ola de Kanagawa','Escena marítima japonesa con una enorme ola amenazante.','Katsushika Hokusai','2026-02-21 15:52:59',3,1),(14,4,'El beso','Obra simbólica que representa el amor envuelto en dorados decorativos.','Gustav Klimt','2026-02-21 15:52:59',1,1),(15,3,'La rendición de Breda','Escena histórica que muestra la entrega de llaves tras una batalla.','Diego Velázquez','2026-02-21 15:52:59',1,1),(16,4,'La joven de la perla','Retrato femenino conocido por su mirada y pendiente de perla.','Johannes Vermeer','2026-02-21 15:52:59',1,1),(17,3,'El jardín de las delicias','Compleja pintura con escenas simbólicas sobre el paraíso y el pecado.','Hieronymus Bosch','2026-02-21 15:52:59',2,1),(18,4,'Napoleón cruzando los Alpes','Representación heroica de Napoleón liderando su ejército.','Jacques-Louis David','2026-02-21 15:52:59',1,1),(19,3,'El caminante sobre el mar de nubes','Representación heroica de Napoleón liderando su ejército.','Caspar David Friedrich','2026-02-21 15:52:59',1,1),(20,4,'La creación de Adán','Escena bíblica que muestra el momento en que Dios da vida a Adán.','Michelangelo Buonarroti','2026-02-21 15:52:59',2,1);
/*!40000 ALTER TABLE `objeto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objetocategoria`
--

DROP TABLE IF EXISTS `objetocategoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `objetocategoria` (
  `idObjeto` int(11) NOT NULL,
  `idCategoria` int(11) NOT NULL,
  PRIMARY KEY (`idObjeto`,`idCategoria`),
  KEY `fk_objetocategoria_categoria_idx` (`idCategoria`),
  CONSTRAINT `fk_objetocategoria_categoria` FOREIGN KEY (`idCategoria`) REFERENCES `categoria` (`idCategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_objetocategoria_objeto` FOREIGN KEY (`idObjeto`) REFERENCES `objeto` (`idObjeto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objetocategoria`
--

LOCK TABLES `objetocategoria` WRITE;
/*!40000 ALTER TABLE `objetocategoria` DISABLE KEYS */;
INSERT INTO `objetocategoria` VALUES (1,1),(1,4),(1,28),(2,6),(2,8),(2,28),(3,17),(3,18),(3,24),(3,28),(4,4),(4,13),(4,14),(4,28),(5,5),(5,15),(5,28),(6,10),(6,11),(6,28),(7,4),(7,23),(7,27),(7,28),(8,21),(8,25),(8,28),(9,2),(9,23),(9,29),(10,3),(10,16),(10,28),(11,16),(11,17),(11,22),(11,28),(12,6),(12,7),(12,28),(13,9),(13,26),(13,30),(14,21),(14,22),(14,28),(15,16),(15,18),(15,28),(16,1),(16,4),(16,28),(17,21),(17,26),(17,28),(18,4),(18,16),(18,28),(19,4),(19,6),(19,28),(20,4),(20,13),(20,14),(20,28);
/*!40000 ALTER TABLE `objetocategoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `idPago` int(11) NOT NULL AUTO_INCREMENT,
  `idSubasta` int(11) NOT NULL,
  `FechaPago` datetime NOT NULL,
  `idEstadoPago` int(11) NOT NULL,
  PRIMARY KEY (`idPago`),
  KEY `fk_pago_subasta_idx` (`idSubasta`),
  KEY `fk_pago_estadopago_idx` (`idEstadoPago`),
  CONSTRAINT `fk_pago_estadopago` FOREIGN KEY (`idEstadoPago`) REFERENCES `estadopago` (`idEstadoPago`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pago_subasta` FOREIGN KEY (`idSubasta`) REFERENCES `subasta` (`idSubasta`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (1,3,'2026-03-01 13:00:00',2),(2,6,'2026-03-02 13:00:00',1),(3,13,'2026-03-09 08:00:00',3),(4,18,'2026-04-06 08:00:00',4);
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `puja`
--

DROP TABLE IF EXISTS `puja`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `puja` (
  `idPuja` int(11) NOT NULL AUTO_INCREMENT,
  `idSubasta` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `MontoOfertado` decimal(10,2) NOT NULL,
  `FechaHora` datetime NOT NULL,
  PRIMARY KEY (`idPuja`),
  KEY `fk_puja_subasta_idx` (`idSubasta`),
  KEY `fk_puja_usuario_idx` (`idUsuario`),
  CONSTRAINT `fk_puja_subasta` FOREIGN KEY (`idSubasta`) REFERENCES `subasta` (`idSubasta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_puja_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `puja`
--

LOCK TABLES `puja` WRITE;
/*!40000 ALTER TABLE `puja` DISABLE KEYS */;
INSERT INTO `puja` VALUES (1,3,6,8080000.00,'2026-03-01 12:40:00'),(2,3,5,8160000.00,'2026-03-01 12:50:00'),(3,3,6,8240000.00,'2026-03-01 12:55:00'),(4,3,5,8320000.00,'2026-03-01 12:59:00'),(5,6,5,1515000.00,'2026-03-02 12:20:00'),(6,6,6,1530000.00,'2026-03-02 12:35:00'),(7,6,5,1545000.00,'2026-03-02 12:50:00'),(8,6,6,1560000.00,'2026-03-02 12:58:00'),(9,13,6,4040000.00,'2026-03-09 07:30:00'),(10,13,5,4080000.00,'2026-03-09 07:40:00'),(11,13,6,4120000.00,'2026-03-09 07:50:00'),(12,13,5,4200000.00,'2026-03-09 07:59:00'),(13,18,5,3636000.00,'2026-04-06 07:30:00'),(14,18,6,3672000.00,'2026-04-06 07:40:00'),(15,18,5,3708000.00,'2026-04-06 07:50:00'),(16,18,6,3744000.00,'2026-04-06 07:59:00');
/*!40000 ALTER TABLE `puja` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultadosubasta`
--

DROP TABLE IF EXISTS `resultadosubasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultadosubasta` (
  `idResultadoSubasta` int(11) NOT NULL AUTO_INCREMENT,
  `idSubasta` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `MontoFinal` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idResultadoSubasta`),
  KEY `fk_resultadosubasta_usuario_idx` (`idUsuario`),
  KEY `fk_usuariosubasta_subasta_idx` (`idSubasta`),
  CONSTRAINT `fk_resultadosubasta_usuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuariosubasta_subasta` FOREIGN KEY (`idSubasta`) REFERENCES `subasta` (`idSubasta`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultadosubasta`
--

LOCK TABLES `resultadosubasta` WRITE;
/*!40000 ALTER TABLE `resultadosubasta` DISABLE KEYS */;
INSERT INTO `resultadosubasta` VALUES (1,3,5,8320000.00),(2,6,6,1560000.00),(3,13,5,4200000.00),(4,18,6,3744000.00);
/*!40000 ALTER TABLE `resultadosubasta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `idRol` int(11) NOT NULL AUTO_INCREMENT,
  `Descripcion` varchar(45) NOT NULL,
  PRIMARY KEY (`idRol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador'),(2,'Vendedor'),(3,'Comprador');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subasta`
--

DROP TABLE IF EXISTS `subasta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subasta` (
  `idSubasta` int(11) NOT NULL AUTO_INCREMENT,
  `idObjeto` int(11) NOT NULL,
  `PrecioInicial` decimal(10,2) NOT NULL,
  `Incremento` decimal(10,2) NOT NULL,
  `FechaHoraInicio` datetime NOT NULL,
  `FechaHoraFinal` datetime NOT NULL,
  `idEstadoSubasta` int(11) NOT NULL,
  PRIMARY KEY (`idSubasta`),
  KEY `fk_subasta_estadosubasta_idx` (`idEstadoSubasta`),
  KEY `fk_subasta_objeto_idx` (`idObjeto`),
  CONSTRAINT `fk_subasta_estadosubasta` FOREIGN KEY (`idEstadoSubasta`) REFERENCES `estadosubasta` (`idEstadoSubasta`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_subasta_objeto` FOREIGN KEY (`idObjeto`) REFERENCES `objeto` (`idObjeto`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subasta`
--

LOCK TABLES `subasta` WRITE;
/*!40000 ALTER TABLE `subasta` DISABLE KEYS */;
INSERT INTO `subasta` VALUES (1,1,5000000.00,50000.00,'2026-03-01 08:00:00','2026-03-01 09:00:00',3),(2,2,3000000.00,30000.00,'2026-03-01 10:00:00','2026-03-01 11:00:00',2),(3,3,8000000.00,80000.00,'2026-03-01 12:00:00','2026-03-01 13:00:00',4),(4,4,6000000.00,60000.00,'2026-03-01 14:00:00','2026-03-01 15:00:00',1),(5,5,2500000.00,25000.00,'2026-03-01 16:00:00','2026-03-01 17:00:00',3),(6,6,1500000.00,15000.00,'2026-03-02 08:00:00','2026-03-02 13:00:00',4),(7,7,2000000.00,20000.00,'2026-03-02 14:00:00','2026-03-02 19:00:00',3),(8,8,3500000.00,35000.00,'2026-03-02 20:00:00','2026-03-03 01:00:00',2),(9,9,1800000.00,18000.00,'2026-03-03 02:00:00','2026-03-03 07:00:00',1),(10,10,4500000.00,45000.00,'2026-03-03 08:00:00','2026-03-03 13:00:00',3),(11,11,3200000.00,32000.00,'2026-03-04 08:00:00','2026-03-05 08:00:00',3),(12,12,2100000.00,21000.00,'2026-03-06 08:00:00','2026-03-07 08:00:00',2),(13,13,4000000.00,40000.00,'2026-03-08 08:00:00','2026-03-09 08:00:00',4),(14,14,2700000.00,27000.00,'2026-03-10 08:00:00','2026-03-11 08:00:00',1),(15,15,3800000.00,38000.00,'2026-03-12 08:00:00','2026-03-13 08:00:00',3),(16,16,2900000.00,29000.00,'2026-03-14 08:00:00','2026-03-21 08:00:00',2),(17,17,4100000.00,41000.00,'2026-03-22 08:00:00','2026-03-29 08:00:00',3),(18,18,3600000.00,36000.00,'2026-03-30 08:00:00','2026-04-06 08:00:00',4),(19,19,2300000.00,23000.00,'2026-04-07 08:00:00','2026-04-14 08:00:00',1),(20,20,7000000.00,70000.00,'2026-04-15 08:00:00','2026-04-22 08:00:00',3);
/*!40000 ALTER TABLE `subasta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Apellido1` varchar(45) NOT NULL,
  `Apellido2` varchar(45) NOT NULL,
  `Correo` varchar(45) NOT NULL,
  `Contrasenna` varchar(45) NOT NULL,
  `idRol` int(11) NOT NULL,
  `FechaRegistro` datetime NOT NULL,
  `idEstadoUsuario` int(11) NOT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `fk_usuario_estadousuario_idx` (`idEstadoUsuario`),
  KEY `fk_usuario_rol_idx` (`idRol`),
  CONSTRAINT `fk_usuario_estadousuario` FOREIGN KEY (`idEstadoUsuario`) REFERENCES `estadousuario` (`idEstadoUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`idRol`) REFERENCES `rol` (`idRol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Dereck','Jiménez','Rodríguez','dereckalonsoj.r@gmail.com','admin123',1,'2026-02-18 12:53:25',1),(2,'Abraham','Alvarez','Soto','aaas06072005@gmail.com','admin123',1,'2026-02-18 12:53:25',2),(3,'Jose María','Cubillo','Gutierrez','gutierrezjosem@gmail.com','vendedor123',2,'2026-02-18 12:53:25',1),(4,'María Angelica','Solis','Sibaja','nosequeponer11@gmail.com','vendedor123',2,'2026-02-18 12:53:25',2),(5,'Cristel','Meléndez','Jiménez','cristelm.j@gmail.com','comprador123',3,'2026-02-18 12:53:25',1),(6,'Axel','Orozco','Guzman','axelo.g@gmail.com','comprador123',3,'2026-02-18 12:53:25',2);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-22  0:23:29
