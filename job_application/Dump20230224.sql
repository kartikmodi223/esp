-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: job_form
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `LanguagesKnown`
--

DROP TABLE IF EXISTS `LanguagesKnown`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `LanguagesKnown` (
  `l_id` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `Language` varchar(45) DEFAULT NULL,
  `read` varchar(45) DEFAULT NULL,
  `write` varchar(45) DEFAULT NULL,
  `speak` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`l_id`),
  KEY `fk_LanguagesKnown_1_idx` (`id`),
  CONSTRAINT `fk_LanguagesKnown_1` FOREIGN KEY (`id`) REFERENCES `basic_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LanguagesKnown`
--

LOCK TABLES `LanguagesKnown` WRITE;
/*!40000 ALTER TABLE `LanguagesKnown` DISABLE KEYS */;
INSERT INTO `LanguagesKnown` VALUES (13,12,'hindi','yes','no','no'),(14,12,'english','no','no','yes'),(15,13,'hindi','no','no','yes'),(16,13,'english','no','no','yes'),(17,13,'gujarati','no','yes','no'),(18,14,'hindi','yes','yes','yes'),(19,14,'english','no','no','yes'),(20,14,'gujarati','no','yes','no'),(21,15,'hindi','yes','yes','no'),(22,15,'english','no','no','yes'),(23,15,'gujarati','no','no','yes'),(24,16,'hindi','no','yes','no'),(25,16,'english','no','no','yes'),(26,16,'gujarati','no','yes','no'),(27,17,'hindi','no','yes','no'),(28,17,'english','no','no','yes'),(29,17,'gujarati','no','yes','no'),(30,19,'hindi','no','no','yes'),(31,19,'english','no','yes','no'),(32,19,'gujarati','yes','no','no'),(33,20,'hindi','no','no','yes'),(34,20,'english','no','yes','no'),(35,20,'gujarati','yes','no','no'),(36,22,'hindi','no','no','yes'),(37,22,'gujarati','no','yes','no'),(38,27,'hindi','yes','no','no'),(39,27,'english','yes','no','yes'),(40,27,'gujarati','yes','no','yes'),(41,28,'hindi','no','yes','no'),(42,28,'english','no','no','yes'),(43,28,'gujarati','no','yes','no'),(44,29,'hindi','no','yes','no'),(45,29,'english','yes','no','no'),(46,29,'gujarati','yes','no','yes'),(47,35,'hindi','no','no','yes'),(48,35,'english','yes','no','no'),(49,35,'gujarati','no','yes','no'),(50,60,'hindi','no','yes','no'),(51,60,'english','no','no','yes'),(52,60,'gujarati','no','no','yes'),(68,10,'hindi','yes','no','no'),(69,10,'english','no','yes','no'),(70,10,'gujarati','no','no','yes');
/*!40000 ALTER TABLE `LanguagesKnown` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acadamics`
--

DROP TABLE IF EXISTS `acadamics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acadamics` (
  `a_id` int NOT NULL AUTO_INCREMENT,
  `id` int DEFAULT NULL,
  `course` varchar(45) DEFAULT NULL,
  `board` varchar(45) DEFAULT NULL,
  `passingyear` varchar(45) DEFAULT NULL,
  `percentage` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`a_id`),
  KEY `fk_acadamics_1_idx` (`id`),
  CONSTRAINT `fk_acadamics_1` FOREIGN KEY (`id`) REFERENCES `basic_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=74 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acadamics`
--

LOCK TABLES `acadamics` WRITE;
/*!40000 ALTER TABLE `acadamics` DISABLE KEYS */;
INSERT INTO `acadamics` VALUES (13,10,'diploma','     hngu','     2017','      79'),(14,10,'diploma','     hngu','     2017','      79'),(15,11,'be','    gtu','    2019','    45'),(16,12,'be','   gtu','   2020','   45'),(17,12,'be','   gtu','   2020','   45'),(18,13,'mba',' GSEB',' 2019',' 78'),(19,13,'mba',' GSEB',' 2019',' 78'),(20,14,'mca',' GSEB',' 2020',' 45'),(21,14,'mca',' GSEB',' 2020',' 45'),(22,15,'mca','GSEB','2019','67'),(23,15,'diploma','gtu','2017','68'),(24,16,'hsc','GSEB','2017','69'),(25,16,'be','gtu','2019','89'),(26,17,'hsc','GSEB','2017','69'),(27,17,'be','gtu','2019','89'),(28,18,'bca','','',''),(29,19,'bca','  gtu','  2019','  67'),(30,20,'bca','gtu','2020','67'),(31,21,'bca','','',''),(32,22,'bca','gtu','2017','67'),(33,23,'bca','','',''),(34,24,'bca','gtu','2017','67'),(35,25,'bca','gtu','2017','67'),(36,26,'bca','','',''),(37,27,'bca','GSEB','2017','ff'),(38,28,'diploma','gtu','2017','67'),(39,29,'mba','GSEB','2017','67'),(40,29,'bca','cbse','2017',''),(41,30,'bca','','',''),(42,31,'bca','','',''),(43,32,'bca','','',''),(44,33,'bca','','',''),(45,34,'bca','','',''),(46,35,'bca','gtu','2019','69'),(47,38,'bca','','',''),(48,39,'bca','','',''),(49,40,'bca','','',''),(50,41,'bca','','',''),(51,42,'bca','','',''),(52,43,'bca','','',''),(53,44,'bca','','',''),(54,45,'bca','','',''),(55,46,'bca','','',''),(56,47,'bca','','',''),(57,48,'bca','','',''),(58,49,'bca','','',''),(59,50,'bca','','',''),(60,51,'bca','','',''),(61,52,'bca','','',''),(62,53,'bca','','',''),(63,54,'bca','','',''),(64,55,'bca','','',''),(65,56,'bca','','',''),(66,57,'bca','','',''),(67,58,'bca','','',''),(68,59,'bca','','',''),(69,60,'ssc','GSEB','2017','67'),(70,60,'hsc','GSEB','2019','98'),(71,61,'bca','','',''),(72,62,'bca','','',''),(73,63,'bca','','','');
/*!40000 ALTER TABLE `acadamics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `basic_info`
--

DROP TABLE IF EXISTS `basic_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `basic_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `job_designation` varchar(45) DEFAULT NULL,
  `address1` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `state` varchar(45) DEFAULT NULL,
  `zip` varchar(45) DEFAULT NULL,
  `relation_status` varchar(45) DEFAULT NULL,
  `is_deleted` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `basic_info`
--

LOCK TABLES `basic_info` WRITE;
/*!40000 ALTER TABLE `basic_info` DISABLE KEYS */;
INSERT INTO `basic_info` VALUES (10,'        anika','        modi','male','2023-02-19','        sdl','        etc','        kartik.modi.023@gmail.com','        9106738378','patan','gujarat','        384265','single','0'),(11,'         manthan','         patel','male','2023-02-14','         qa','         etc','         manthan@gmail.com','         9106731234','surat','gujarat','         345678','merried','0'),(12,'   vijay','   rathod','male','2023-02-28','   devloper','   etc','   vijay@gmail.com','   12345678','bhavnagar','gujarat','   348754','merried','0'),(13,'  jay','  modi','male','2023-02-14','  devloper','  etc','  jay@gmail.com','  9106731212','bhavnagar','gujarat','  345678','merried','0'),(14,'  dhruv','  patel','male','2023-02-28','  devloper','  etc','  druv@gmail.com','  87654390','surat','chennai','  348754','single','0'),(15,' pooja',' dave','male','2023-02-21',' qa',' etc',' pooja@gmsil.com',' 9106731234','patan','gujarat',' 384265','single','0'),(16,' gaurang',' desani','female','2023-02-14',' data scintist',' etc',' desani@gmail.com',' 98765412','rajkot','gujarat',' 542367','single','0'),(17,'harmil','desani','male','2023-02-14','data scintist','etc','harmili@gmail.com','9876545412','rajkot','gujarat','542367','single','0'),(18,'harsh','rathod','male','2023-09-1','qa','etc','harsh@gmail.com','9876543212','patan','gujarat','384265','single','0'),(19,'  kartika','  modi','female','2023-02-14','  devloper','  etc','  kartika.modi.023@gmail.com','  9106731276','rajkot','gujarat','  348754','single','0'),(20,'kishan','patel','male','2023-02-24','devloper','etc','kartika.modi.023@gmail.com','9106731276','rajkot','gujarat','348754','merried','0'),(21,'om','arayan','male','2023-01-23','qa','etc','ka@gmail.com','5678904312','aanand','gujarat','384265','single','0'),(22,'kartik','modi','male','2023-02-15','devloper','etc','kartik.modi.023@gmail.com','9106731234','patan','panjab','348754','merried','0'),(23,'komal','thakkar','female','2023-09-12','desiner','etc','komal@gmial.com','6789065342','surat','gujarat','345678','single','0'),(24,'naresh','modi','male','2023-02-15','devloper','etc','naresh@gmail.com','9106731276','surat','gujarat','542367','merried','0'),(25,'naresh','modi','male','2023-02-15','devloper','etc','naresh@gmail.com','9106731276','surat','gujarat','542367','merried','0'),(26,'narayan','parjapati','male','2023-12-21','qa','etc','n@gmail.com','9087123456','annand','gujarat','678954','single','0'),(27,'naresh','patel','male','2023-01-31','data scintist','etc','naresh@gmail.com','9106738378','patan','gujarat','542367','single','0'),(28,'manav','thaakakr','male','2023-02-14','devloper','etc','kartik.modi.023@gmail.com','9106731276','surat','gujarat','384265','merried','0'),(29,'priyanka','chopra','male','2023-03-14','data scintist','etc','p@gmail.com','9106738378','surat','up','384265','merried','0'),(30,'kummar','sar',NULL,'2023-03-14','designer','etc','a@gmail.com','8776544322','5','7','567890','single','0'),(31,'ayyar','harvi',NULL,'2023-03-14','qa','etc','ab@gmail.com','9876543221','1','1','345678','single','0'),(32,'sahil','manvi',NULL,'2023-03-14','qa','etc','bbna@gmail.com','9876534321','1','1','345677','single','0'),(33,'aunny','naresh',NULL,'2023-03-14','qa','etc','reea@gmail.com','9876543321','1','1','234566','single','0'),(34,'vivek','patel',NULL,'2023-03-14','designer','etc','agtf@gmail.com','0988765433','1','1','345678','single','0'),(35,'kartik','modi','male','2023-02-18','devloper','etc','ewa@gmail.com','9106738378','1','1','348754','merried','0'),(38,'','',NULL,'','','','','','','','','single',NULL),(39,'','',NULL,'','','','','','','','','single',NULL),(40,'','',NULL,'','','','','','','','','single',NULL),(41,'','',NULL,'','','','','','','','','single',NULL),(42,'','',NULL,'','','','','','','','','single',NULL),(43,'','',NULL,'','','','','','','','','single',NULL),(44,'','',NULL,'','','','','','','','','single',NULL),(45,'','',NULL,'','','','','','','','','single',NULL),(46,'','',NULL,'','','','','','','','','single',NULL),(47,'','',NULL,'','','','','','','','','single',NULL),(48,'','',NULL,'','','','','','','','','single',NULL),(49,'','',NULL,'','','','','','','','','single',NULL),(50,'','',NULL,'','','','','','','','','single',NULL),(51,'','',NULL,'','','','','','','','','single',NULL),(52,'','',NULL,'','','','','','','','','single',NULL),(53,'','',NULL,'','','','','','','','','single',NULL),(54,'','',NULL,'','','','','','','','','single',NULL),(55,'','',NULL,'','','','','','','','','single',NULL),(56,'','',NULL,'','','','','','','','','single',NULL),(57,'','',NULL,'','','','','','','','','single',NULL),(58,'','',NULL,'','','','','','','','','single',NULL),(59,'','',NULL,'','','','','','','','','single',NULL),(60,'manav','desani','male','2023-02-08','devloper','etc','naresh@gmail.com','9106731276','5','7','348754','merried',NULL),(61,'','',NULL,'','','','','','','','','single',NULL),(62,'','',NULL,'','','','','','','','','single',NULL),(63,'','',NULL,'','','','','','','','','single',NULL);
/*!40000 ALTER TABLE `basic_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `city_master`
--

DROP TABLE IF EXISTS `city_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city_master`
--

LOCK TABLES `city_master` WRITE;
/*!40000 ALTER TABLE `city_master` DISABLE KEYS */;
INSERT INTO `city_master` VALUES (1,'ahmedabad',1),(2,'patan',1),(3,'surat',1),(4,'rajkot',1),(5,'mohali',7),(6,'ludhiana',7),(7,'patiala',7),(8,'amritsar',7),(9,'jalandhar',7),(10,'Guwahati',4),(11,'Silchar',4),(12,'Dibrugarh',4),(13,'Patna',5),(14,'Muzaffarpur',5),(15,'Gaya',5),(29,'Shimla',2),(30,'Dharamsala',2),(31,'Solan',2),(32,'Mandi',2),(33,'seppa',3),(34,'wakro',3),(35,'rupa',3),(36,'bombey',6),(37,'pune',6),(38,'jaipur',8),(39,'jhodhpur',8),(40,'udaypur',8),(41,'Chennai.',9),(42,'Madurai',9),(43,'Tiruppur.',9),(44,'Tirunelveli.',9);
/*!40000 ALTER TABLE `city_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `option_master`
--

DROP TABLE IF EXISTS `option_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `option_master` (
  `option_id` int NOT NULL AUTO_INCREMENT,
  `option_name` varchar(45) DEFAULT NULL,
  `select_id` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`option_id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `option_master`
--

LOCK TABLES `option_master` WRITE;
/*!40000 ALTER TABLE `option_master` DISABLE KEYS */;
INSERT INTO `option_master` VALUES (1,'gujarat','1'),(2,'mp','1'),(3,'patan','2'),(4,'surat','2'),(5,'bca','3'),(6,'be','3'),(7,'hindi','4'),(8,'english','4'),(9,'php','5'),(10,'nodejs','5'),(11,'single','6'),(12,'merried','6'),(13,'qa','7'),(14,'sdl','7'),(15,'designer','7'),(16,'devops','7'),(17,'oracle','5'),(18,'java','5'),(19,'gujarati','4'),(20,'j&k','1'),(21,'up','1'),(22,'kolkata','1'),(23,'panjab','1'),(24,'chennai','1'),(25,'bhavanagar','2'),(26,'ahmedabad','2'),(27,'rajkot','2'),(28,'ghandhinagar','2'),(29,'porbandar','2'),(30,'anand','2'),(31,'modasa','2'),(32,'bhuj','2'),(33,'hsc','3'),(34,'ssc','3'),(35,'mca','3'),(36,'bcom','3'),(37,'mba','3'),(38,'diploma','3'),(39,'male','8'),(40,'female','8'),(41,'other','8'),(42,'gtu','9'),(43,'ldrp','9'),(44,'nirma','9');
/*!40000 ALTER TABLE `option_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `preference`
--

DROP TABLE IF EXISTS `preference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `preference` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `id` int DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `notice` varchar(45) DEFAULT NULL,
  `expected_ctc` varchar(45) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `preference`
--

LOCK TABLES `preference` WRITE;
/*!40000 ALTER TABLE `preference` DISABLE KEYS */;
INSERT INTO `preference` VALUES (5,10,'surat','90','1 cr','sdl'),(6,11,'patan','30','123456','sdl'),(7,12,'patan','30','30 lakh','qa'),(8,13,'ghandhinagar','30','12 lakh','devops'),(9,14,'porbandar','30','2 lakh','sdl'),(10,15,'porbandar','30','6 lakh','devops'),(11,16,'ahmedabad','30','6 lakh','designer'),(12,17,'ahmedabad','30','6 lakh','designer'),(13,19,'porbandar','30','2 lakh','sdl'),(14,20,'porbandar','30','2 lakh','sdl'),(15,22,'patan','30','30 lakh','designer'),(16,27,'patan','30','1 cr','sdl'),(17,28,'patan','30','30 lakh','qa'),(18,29,'porbandar','30','2 lakh','devops'),(19,35,'ghandhinagar','30','30 lakh','sdl'),(20,60,'ghandhinagar','30','2 lakh','devops');
/*!40000 ALTER TABLE `preference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reference`
--

DROP TABLE IF EXISTS `reference`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reference` (
  `r_id` int NOT NULL AUTO_INCREMENT,
  `id` int DEFAULT NULL,
  `rname` varchar(45) DEFAULT NULL,
  `rcontact` varchar(45) DEFAULT NULL,
  `relation` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`r_id`),
  KEY `fk_reference_1_idx` (`id`),
  CONSTRAINT `fk_reference_1` FOREIGN KEY (`id`) REFERENCES `basic_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reference`
--

LOCK TABLES `reference` WRITE;
/*!40000 ALTER TABLE `reference` DISABLE KEYS */;
INSERT INTO `reference` VALUES (9,10,'karanlal','9876543212','father'),(10,10,'karanlal','9876543212','father'),(11,11,'om','90876534','father}}}}}}}}}'),(12,11,'om','90876534','father}}}}}}}}}'),(13,12,'pooja','90876534','sister'),(14,12,'omi','90876534','father}'),(15,13,'harmil','90876543','brother'),(16,13,'salini','89076543','sister'),(17,14,'pooja',' 6542789012','sister}'),(18,14,'pooja',' 6542789012','sister}'),(19,15,'vivek','98234567','brother'),(20,15,'milan','98765433','brother'),(21,16,'ankit','87654321','brother'),(22,16,'aNKITA','89765412','sister'),(23,17,'ankit','87654321','brother'),(24,17,'aNKITA','89765412','sister'),(25,19,'viveka','90876543','brother}}'),(26,19,'viveka','90876543','brother}}'),(27,20,'manvi','23456789','sister'),(28,20,'viveka','90876543','brother'),(29,22,'man','23456789','father'),(30,22,'harmil','90876534','brother'),(31,27,'pooja','90876534','brother'),(32,27,'ankit','9012345612','brother'),(33,28,'manvi','90876534','father'),(34,28,'pooja','9012345612','sister'),(35,29,'manvi','23456789','brother'),(36,29,'om','87654321','father'),(37,35,'man','23456789','father'),(38,35,'manvi','90876534','brother'),(39,60,'pooja',' 6542789012','sister'),(40,60,'ankit','87654321','brother');
/*!40000 ALTER TABLE `reference` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `select_master`
--

DROP TABLE IF EXISTS `select_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `select_master` (
  `select_id` int NOT NULL,
  `select_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`select_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `select_master`
--

LOCK TABLES `select_master` WRITE;
/*!40000 ALTER TABLE `select_master` DISABLE KEYS */;
INSERT INTO `select_master` VALUES (1,'state'),(2,'location'),(3,'courses'),(4,'languages'),(5,'technologies'),(6,'relation'),(7,'department'),(8,'gender'),(9,'university');
/*!40000 ALTER TABLE `select_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skills`
--

DROP TABLE IF EXISTS `skills`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skills` (
  `s_id` int NOT NULL AUTO_INCREMENT,
  `id` int DEFAULT NULL,
  `technology` varchar(45) DEFAULT NULL,
  `lavel` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`s_id`),
  KEY `fk_skills_1_idx` (`id`),
  CONSTRAINT `fk_skills_1` FOREIGN KEY (`id`) REFERENCES `basic_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skills`
--

LOCK TABLES `skills` WRITE;
/*!40000 ALTER TABLE `skills` DISABLE KEYS */;
INSERT INTO `skills` VALUES (13,12,'php','Expert'),(14,12,'nodejs','Intermediate'),(15,13,'php','Expert'),(16,13,'nodejs','Intermediate'),(17,13,'oracle','beginner'),(18,13,'java','Expert'),(19,14,'php','Expert'),(20,14,'nodejs','Intermediate'),(21,14,'oracle','beginner'),(22,14,'java','Expert'),(23,15,'php','Expert'),(24,15,'nodejs','Intermediate'),(25,15,'oracle','Intermediate'),(26,15,'java','beginner'),(27,16,'php','beginner'),(28,16,'nodejs','Intermediate'),(29,16,'oracle','Expert'),(30,16,'java','beginner'),(31,17,'php','beginner'),(32,17,'nodejs','Intermediate'),(33,17,'oracle','Expert'),(34,17,'java','beginner'),(35,19,'php','Intermediate'),(36,19,'nodejs','beginner'),(37,19,'oracle','Intermediate'),(38,19,'java','beginner'),(39,20,'php','Intermediate'),(40,20,'nodejs','beginner'),(41,20,'oracle','Intermediate'),(42,20,'java','beginner'),(43,22,'php','beginner'),(44,22,'nodejs','Intermediate'),(45,22,'oracle','Expert'),(46,22,'java','beginner'),(47,27,'php','Intermediate'),(48,27,'nodejs','Expert'),(49,27,'oracle','beginner'),(50,27,'java','Expert'),(51,28,'php','beginner'),(52,28,'nodejs','Intermediate'),(53,28,'oracle','beginner'),(54,28,'java','Expert'),(55,29,'php','beginner'),(56,29,'nodejs','Intermediate'),(57,29,'oracle','Expert'),(58,29,'java','beginner'),(59,35,'php','beginner'),(60,35,'nodejs','Expert'),(61,35,'oracle','Intermediate'),(62,35,'java','beginner'),(63,60,'php','Expert'),(64,60,'nodejs','Expert'),(65,60,'oracle','Expert'),(66,60,'java','Expert'),(67,NULL,'php',NULL),(68,NULL,'nodejs',NULL),(69,NULL,'php','beginner'),(70,NULL,'nodejs','Intermediate'),(71,NULL,'php','Expert'),(72,NULL,'nodejs','Expert'),(73,NULL,'oracle','Expert'),(74,NULL,'php','Expert'),(75,NULL,'nodejs','Expert'),(76,NULL,'oracle','Expert'),(77,NULL,'java','Expert'),(78,NULL,'php','beginner'),(79,NULL,'nodejs','Intermediate'),(80,NULL,'oracle','Expert'),(81,NULL,'java','Intermediate'),(82,NULL,'php','Expert'),(83,NULL,'nodejs','Expert'),(84,NULL,'oracle','Expert'),(85,NULL,'java','Expert'),(86,NULL,'php','Expert'),(87,NULL,'nodejs','Expert'),(88,NULL,'oracle','Expert'),(89,NULL,'java','Expert'),(90,NULL,'php','Expert'),(91,NULL,'nodejs','Expert'),(92,NULL,'oracle','Expert'),(93,NULL,'java','Expert'),(94,NULL,'php','Intermediate'),(95,NULL,'nodejs','Expert'),(96,NULL,'oracle','Intermediate'),(97,NULL,'java','beginner');
/*!40000 ALTER TABLE `skills` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state_master`
--

DROP TABLE IF EXISTS `state_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state_master`
--

LOCK TABLES `state_master` WRITE;
/*!40000 ALTER TABLE `state_master` DISABLE KEYS */;
INSERT INTO `state_master` VALUES (1,'gujarat'),(2,'himachal pradesh'),(3,'arunachal pradesh'),(4,'assam'),(5,'bihar'),(6,'maharashtra'),(7,'punjab'),(8,'rajasthan'),(9,'tamilnadu');
/*!40000 ALTER TABLE `state_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `work_experience`
--

DROP TABLE IF EXISTS `work_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work_experience` (
  `e_id` int NOT NULL AUTO_INCREMENT,
  `id` int NOT NULL,
  `company_name` varchar(45) DEFAULT NULL,
  `jobtitle` varchar(45) DEFAULT NULL,
  `start_date` varchar(45) DEFAULT NULL,
  `end_date` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`e_id`),
  KEY `fk_work_experience_1_idx` (`id`),
  CONSTRAINT `fk_work_experience_1` FOREIGN KEY (`id`) REFERENCES `basic_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `work_experience`
--

LOCK TABLES `work_experience` WRITE;
/*!40000 ALTER TABLE `work_experience` DISABLE KEYS */;
INSERT INTO `work_experience` VALUES (8,10,'esp','d','2023-02-21','2023-02-20'),(9,10,'esp','d','2023-02-21','2023-02-20'),(10,11,'esp','a','2023-02-06','2023-02-20'),(11,11,'esp','a','2023-02-06','2023-02-20'),(12,12,'esp','d','2023-02-14','2023-02-13'),(13,12,'esp','d','2023-02-14','2023-02-13'),(14,13,'moon','devops','2023-02-14','2023-02-20'),(15,13,'moon','devops','2023-02-14','2023-02-20'),(16,14,'esp','undefined','2023-02-20','2023-02-20'),(17,14,'esp','undefined','2023-02-20','2023-02-20'),(18,14,'esp','undefined','2023-02-20','2023-02-20'),(19,15,'esp','sdl','2023-01-30','2023-02-20'),(20,16,'esp','d','2023-02-22','2023-02-21'),(21,16,'moon','e','2023-02-20','2023-02-14'),(22,17,'esparkbiz','d','2023-02-22','2023-02-21'),(23,17,'moon','e','2023-02-20','2023-02-14'),(24,19,'esp','sdl','2023-02-07','2023-02-21'),(25,20,'esp','sdl','2023-02-25','2023-02-16'),(26,22,'esp','sdl','',''),(27,27,'esp','sdl','',''),(28,28,'esp','sdl','2023-02-22','2023-02-21'),(29,29,'esp','q','2023-02-17','2023-02-20'),(30,29,'esp','a','2023-01-31','2023-02-20'),(31,35,'esp','sdl','2023-02-17','2023-02-19'),(32,60,'moon','s','2023-02-21','2023-02-14'),(33,60,'moon','d','2023-02-13','2023-02-19');
/*!40000 ALTER TABLE `work_experience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-24 18:55:43
