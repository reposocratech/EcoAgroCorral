CREATE DATABASE  IF NOT EXISTS `ecoagrocorral` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `ecoagrocorral`;
-- MySQL dump 10.13  Distrib 8.0.38, for macos14 (x86_64)
--
-- Host: localhost    Database: ecoagrocorral
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `category_name` varchar(150) NOT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_name` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (5,'Agricultura'),(2,'Deporte'),(3,'Fauna'),(1,'Ferias'),(6,'Ganadería'),(4,'Hongos');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `experience_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `experience_title` varchar(150) NOT NULL,
  `experience_description` text NOT NULL,
  `experience_is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `experience_price_child` decimal(6,2) NOT NULL,
  `experience_price_adult` decimal(6,2) NOT NULL,
  PRIMARY KEY (`experience_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES (1,'Sabores y tradición','Disfruta de un paseo autónomo siguiendo el camino que recorrían los pastores de ovejas hasta llegar a nuestros corrales, edificaciones de gran valor etnográfico. A tu llegada te habremos preparado un picnic para degustar nuestra gastronomía típica. Revive la tradición ganadera, parte importante del legado de nuestros antepasados. Admira estás edificaciones ligadas históricamente a la trashumancia, declarada Patrimonio Inmaterial de la Humanidad en 2023.',0,8.00,18.00),(2,'Sabores y naturaleza','Disfruta de un paseo por el entorno rural y descubre parajes de gran belleza en contacto directo con la naturaleza. Observa la fauna y la flora autóctona. Disfruta de un picnic al aire libre sin prisas.',0,10.00,25.00),(3,'Sabores y rutas','Disfruta de un paseo por el entorno cercano y descubre los parajes más destacados. Observa la fauna y la flora autóctona. Disfruta de un picnic al aire libre sin prisas.',0,12.00,30.00);
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experience_pictures`
--

DROP TABLE IF EXISTS `experience_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience_pictures` (
  `experience_pictures_id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `experience_pictures_experience_id` smallint unsigned NOT NULL,
  `experience_pictures_file` varchar(250) DEFAULT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`experience_pictures_id`),
  KEY `fk_experience_1` (`experience_pictures_experience_id`),
  CONSTRAINT `fk_experience_1` FOREIGN KEY (`experience_pictures_experience_id`) REFERENCES `experience` (`experience_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience_pictures`
--

LOCK TABLES `experience_pictures` WRITE;
/*!40000 ALTER TABLE `experience_pictures` DISABLE KEYS */;
INSERT INTO `experience_pictures` VALUES (5,2,'Id-1738061851191-vistas_panoramicas_del_altiplano_de_barracas_desde_el_alto_limbo_paseo.png',1),(6,3,'Id-1738061971630-vistas_paseo_a_pradas.png',1),(10,1,'Id-1738062616628-177c4d23-f317-40d1-ab55-495220a9bca4.jpg',1),(11,1,'Id-1738062676891-experiencia1.jpg',0),(12,1,'Id-1738062676896-picnic_en_balas_de_paja_corral_del_cura.jpg',0),(13,1,'Id-1738062897913-cestas_gastronomia_.jpg',0),(14,1,'Id-1738063097620-picnic_limonada_casera.jpg',0);
/*!40000 ALTER TABLE `experience_pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feature`
--

DROP TABLE IF EXISTS `feature`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feature` (
  `feature_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `feature_experience_id` smallint unsigned NOT NULL,
  `feature_name` varchar(100) NOT NULL,
  `feature_description` varchar(300) DEFAULT NULL,
  `feature_icon` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`feature_id`),
  KEY `fk_experience_2` (`feature_experience_id`),
  CONSTRAINT `fk_experience_2` FOREIGN KEY (`feature_experience_id`) REFERENCES `experience` (`experience_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feature`
--

LOCK TABLES `feature` WRITE;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
INSERT INTO `feature` VALUES (1,1,'Cultura y tradición','Aprende sobre las tradiciones y la historia de los pastores de ovejas, valorando la rica herencia de la cultura rural','Id-1738061053116-hat.png'),(2,1,'Gastronomía','Disfruta de productos frescos y caseros, elaborados de forma casera, recién hecha con ingredientes de alta calidad, de proximidad, km 0 Recetas de nuestras abuelas recuperadas. Nuestras magdalenas, tortas de tajadas y longanizas,...','Id-1738061090976-restaurant.png'),(3,1,'Conexión','Desconéctate del bullicio de la ciudad y reconecta con la tranquilidad del entorno rural','Id-1738061104796-heart.png'),(4,1,'Picnic','Nos ocupamos de todo para que solo tengas que preocuparte de disfrutar del entorno y la compañía de familia y amigos.','Id-1738061124169-picnic.png'),(5,2,'Exploración autónoma','Libertad para descubrir el entorno a tu propio ritmo, por parajes del pueblo de Barracas de gran belleza','Id-1738061196517-hat.png'),(6,2,'Gastronomía','Disfruta de productos frescos y caseros, elaborados de forma casera, recién hecha con ingredientes de alta calidad, de proximidad, km 0 Recetas de nuestras abuelas recuperadas. Nuestras magdalenas, tortas de tajadas y longanizas,...','Id-1738061215526-restaurant.png'),(7,2,'Compartida','Perfecto para crear recuerdos con seres queridos en un entorno natural','Id-1738061245747-heart.png'),(8,2,'Picnic','Nos ocupamos de todo para que solo tengas que preocuparte de disfrutar del entorno y la compañía de familia y amigos.','Id-1738061270215-picnic.png'),(9,3,'Exploración autónoma','Libertad para descubrir el entorno a tu propio ritmo, por parajes del pueblo de Barracas de gran belleza','Id-1738061352154-hat.png'),(10,3,'Gastronomía','Disfruta de productos frescos y caseros, elaborados de forma casera, recién hecha con ingredientes de alta calidad, de proximidad, km 0 Recetas de nuestras abuelas recuperadas. Nuestras magdalenas, tortas de tajadas y longanizas,...','Id-1738061362414-restaurant.png'),(11,3,'Compartida','Perfecto para crear recuerdos con seres queridos en un entorno natural','Id-1738061376796-heart.png'),(12,3,'Picnic','Nos ocupamos de todo para que solo tengas que preocuparte de disfrutar del entorno y la compañía de familia y amigos.','Id-1738061393821-picnic.png');
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hike`
--

DROP TABLE IF EXISTS `hike`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hike` (
  `hike_id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `hike_title` varchar(100) NOT NULL,
  `hike_description` text NOT NULL,
  `hike_distance` decimal(4,2) NOT NULL,
  `hike_duration` decimal(4,2) NOT NULL,
  `hike_itinerary` text NOT NULL,
  `hike_is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`hike_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hike`
--

LOCK TABLES `hike` WRITE;
/*!40000 ALTER TABLE `hike` DISABLE KEYS */;
INSERT INTO `hike` VALUES (1,'Corral del Cura','Corral que perteneció a nuestra familia. Nuestros abuelos eran pastores de ovejas, sin relevo generacional, dejaron sus huellas en los corrales. Edificaciones de gran valor etnográfico, construidas con materiales nobles como piedra, madera y cañizo. Situado en medio del altiplano de Barracas, paraje de gran belleza rodeado de campos de cereal.',10.50,3.00,'Una vez en el pueblo tomamos la calle principal hasta desviarnos por la calleja mayoral y tomar la via verde en dirección Sagunto. Iremos observando la estación del tren que quedará a la izquierda y continuaremos durante unos cuatro kilometros hasta desviarnos a la derecha para cruzar el camino de Liria y continuar por el camino rodeado de campos de cereal, hasta llegar al Corral del Cura.',0),(2,'Corral de la Jaquesa','Corral situado en el paraje de la Jaquesa, situado al lado de la vía Verde Ojos Negros a su paso por Aragón, en el término de Albentosa en Teruel. Destacar de la Jaquesa su situación estratégica como antigua aduana entre el Reino de Valencia y el Reino de Aragón. Está situado en un paraje de gran belleza donde predominan las sabinas, carrascas y rebollos.',15.60,4.00,'Una vez en el pueblo tomamos la calle principal hasta desviarnos por la calleja mayoral y tomar la vía verde dirección Teruel. Continuaremos por la via verde hasta llegar a la Estación del Palancar a unos 3,5 km, allí podrás hacer un descanso. Continuaremos por la vía verde unos 4km más hasta llegar al corral de la Jaquesa.',0),(3,'Corral de Ferrer','Corral situado en el paraje de la Jaquesa, situado al lado de la vía Verde Ojos Negros a su paso por Aragón, en el término de Albentosa en Teruel. Destacar de la Jaquesa su situación estratégica como antigua aduana entre el Reino de Valencia y el Reino de Aragón. Está situado en un paraje de gran belleza donde predominan las sabinas, carrascas y rebollos.',5.20,2.00,'Una vez en el pueblo tomamos la calle principal hasta desviarnos por la calleja mayoral y tomar el camino del Calvario. Seguimos hacia la Cañada. Una vez en el cruce de los tres caminos, tomamos el de la izquierda. Continuamos por el camino hasta llegar al corral que queda a la derecha del camino.',0),(4,'Paseo a La Rambla','Paraje de gran belleza. Al ser una rambla lleva agua temporalmente. Durante  la temporada de lluvias, se llena de agua, mientras que el resto del año permanece seca. En invierno, cuando el frío es intenso, el agua se hiela. A veces, patos y ranas encuentran refugio aquí. Esta situada junto al pinar del Aliagar y rodeado por campos de cereales',3.60,1.00,'Una vez en el pueblo tomamos el paseo del Ventorrillo. Cruzamos la carretera y tomamos la via secundaria hacia la izquierda. Pasaremos junto al antiguo molino del siglo XIV. Continuamos hasta llegar a la rambla. Haremos la ruta circular continuando un tramo al lado de la rambla y volviendo por el camino de San Agustin. Al llegar a al a vía secundaria nos desviaremos hacia la derecha para volver por debajo de la autovía hasta el paseo del Ventorrillo.',0),(5,'Paseo a Gracian','Monte de interés etnográfico local, utilizado comunitariamente por  la gente de Barracas. Antiguamente, se dividía en \'suertes\' para hacer leña, un recurso vital para calentarse y cocinar. En el trayecto, destacan el Navajo y los restos de la Masía.',7.00,2.50,'Una vez en el pueblo tomamos el camino hacia el calvario. Seguimos hacia la Cañada. Una vez en el cruce de los tres caminos, tomamos el de la izquierda. Continuamos por el hasta tomar siguiente camino a la izquierda. El siguiente cruce tomamos el camino de la derecha. LLegaremos al Navajo de Gracian. Continuamos por los coscojos siguiendo el plano hasta llegar a la Masia Gracian.',0),(6,'Paseo al Chirimito','Edificio de interés etnográfico local, con una arquitectura de piedra y forma cilíndrica. Originalmente, se utilizó como pozo para abastecer la antigua Vía Minera de Sagunto a Ojos Negros. Actual Vía Verde. En este paraje, destaca un abrevadero para que las ovejas beban agua.',5.20,2.00,'Partimos del paseo del Ventorrillo. Tomamos el camino a la izquierda hasta llegar a la Vía Verde. La cruzamos y continuamos por el camino. Seguimos por el camino durante toda la subida. Seguimos por el camino de la izquierda y tomamos a la derecha la senda de las vacas, empezamos la bajada. Cuando se acabe el descenso ya se ve el Chirimito a la derecha.',0),(7,'Paseo al Cerrito la judía','La Judía es un cerrito que albergó un poblado ibero. Destacan los restos de ladrillos de adobe de barro, donde aún se pueden ver huellas de dedos y huecos que alguna vez tuvieron paja. Su ubicación, en lo alto de un cerro, le daba un carácter defensivo. Las vistas y las canteras que rodeaban el poblado son realmente espectaculares. En la base del cerro, se puede apreciar un pequeño corral con una pared de piedra en seco.',9.60,3.00,'Una vez en el pueblo tomamos el paseo del Ventorrillo. Cruzamos la carretera y tomamos la via secundaria hacia la derecha. Nos desviamos hacia la derecha por el camino de San Agustin. Continuamos hasta llegar a la rambla, la cruzamos y atravesamos el pinar del Aliagar. Tomamos el camino hacia las Lomas. Nos desviamos por el camino de la derecha. Atravesamos el pinar y a la derecha queda el cerrito de la Judia.',0),(8,'Paseo al Alto Limbo','Monte de interés etnográfico local con magnificas vistas panorámicas de Barracas y sus alrededores. Desde aquí, se puede apreciar el parque de energía eólica renovable. En mitad del trayecto, destaca el paraje del pozo del Cubico.',5.20,2.00,'Una vez en el pueblo tomamos el camino hacia el antiguo lavadero. Seguimos por la avenida de San Roque hasta cruzar la autovia por debajo. Seguimos por la via secundaria y tomamos el camino de la izquierda. Cuando se acabe el camino iniciamos el ascenso al Alto Limbo.',0),(9,'Paseo a la Cañada','Paraje tranquilo de gran belleza rodeado de campos de cereal, carrascas y monte bajo. Destacan sus restos de corrales de ganado y abrevaderos de ovejas.',6.20,2.50,'Una vez en el pueblo tomamos el camino hacia el calvario. Seguimos hacia la Cañada. Una vez en el cruce de los tres caminos, tomamos el de la izquierda. Continuamos por el camino hasta llegar a la cañada. Nos desviamos hacía la izquierda y llegaremos al pozo de Lecris con sus abrevaderos para las ovejas. Podremos caminar por el entorno de la Cañada y apreciar sus rincones más escondidos.',0),(10,'Ruta a Pradas','El barrio de Pradas se encuentra en San Agustín en la provincia de Teruel, localidad cercana a Barracas. Se venera en su Ermita a la Virgen de Pradas el fin de semana próximo al 22 de mayo. Junto a la Ermita hay restos de un castillo que perteneció a la Baronía de Escriche. Destacan del trayecto, el río de Pradas y su puente romano. ',20.00,6.00,'Salimos caminando dirección San Agustin. Tomamos el camino de la Judia hacia San Agustin. Una vez pasado el pueblo tomamos el camino hacia el Barrio de Pradas. LLegamos al rio y cruzamos el puente romano. Seguimos el ascenso por el sendero hasta llegar a la Ermita de Pradas.',0),(11,'Ruta Cueva Cerdaña','Cueva de gran valor geológico. Con una gran sala central. Donde se puede apreciar una gran ventana al exterior. Destaca en el centro de la sala una impresionante columna. Así como numerosas estalactitas y estalagmitas. En el exterior las vistas son fabulosas. Destacan del trayecto, el Pozo, las vistas al Alto de Santa Bárbara de Pina y las vistas al valle del Palancia.',16.00,2.00,'Nos dirigimos en nuestro coche hasta Pina, unos 5 km. Una vez pasamos el pueblo de Pina de Montalgrao, tomamos el camino de la ermita de la Virgen de Gracia. Seguimos la señalización hasta el pozo de Cerdaña. Dejamos alli el coche. Iniciamos la ruta hacia la Cueva de cerdaña siguiendo el sendero PR-V 62, con sus marcas en el suelo de color blancas y amarillas en paralelo.',0),(12,'Ruta al Nacimiento del río Palancia','Catalogado como uno de los \'paisajes mágicos de la Comunidad Valenciana\'. El sendero va siguiendo el cauce del río y nos permite pasar de las zonas aprovechadas por el hombre, con sus numerosas masías y cultivos salpicados por muestras de arquitectura de la piedra en seco, a un entorno más salvaje cercano a los estrechos del río Palancia en el magnifico estrecho del Cascajar. Parada destacada en la aldea abandonada de El Molinar. Entorno de gran interés etnográfico, albergó un molino de agua harinero para satisfacer las necesidades del altiplano.',6.20,2.00,'Nos dirigimos en nuestro coche hasta los Cloticos en Bejis. Dejamos alli el coche. Iniciamos la ruta hacia el nacimiento del Río Palancia, siguiendo el sendero PR-V 275, con sus marcas en el suelo de color blancas y amarillas en paralelo.',0);
/*!40000 ALTER TABLE `hike` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hike_experience`
--

DROP TABLE IF EXISTS `hike_experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hike_experience` (
  `hike_experience_id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `experience_id` smallint unsigned NOT NULL,
  `hike_id` mediumint unsigned NOT NULL,
  PRIMARY KEY (`hike_experience_id`),
  KEY `fk_experience_3` (`experience_id`),
  KEY `fk_hike_2` (`hike_id`),
  CONSTRAINT `fk_experience_3` FOREIGN KEY (`experience_id`) REFERENCES `experience` (`experience_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_hike_2` FOREIGN KEY (`hike_id`) REFERENCES `hike` (`hike_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hike_experience`
--

LOCK TABLES `hike_experience` WRITE;
/*!40000 ALTER TABLE `hike_experience` DISABLE KEYS */;
INSERT INTO `hike_experience` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,4),(5,2,5),(6,2,6),(7,2,7),(8,2,8),(9,2,9),(10,3,10),(11,3,11),(12,3,12);
/*!40000 ALTER TABLE `hike_experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hike_pictures`
--

DROP TABLE IF EXISTS `hike_pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hike_pictures` (
  `hike_pictures_id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `hike_pictures_hike_id` mediumint unsigned NOT NULL,
  `hike_pictures_file` varchar(250) DEFAULT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`hike_pictures_id`),
  KEY `fk_hike_1` (`hike_pictures_hike_id`),
  CONSTRAINT `fk_hike_1` FOREIGN KEY (`hike_pictures_hike_id`) REFERENCES `hike` (`hike_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hike_pictures`
--

LOCK TABLES `hike_pictures` WRITE;
/*!40000 ALTER TABLE `hike_pictures` DISABLE KEYS */;
INSERT INTO `hike_pictures` VALUES (1,1,'Id-1738063336858-mis_perros_en_el_corral_del_cura_proximo_alojamiento_a_rehabilitar.jpg',1),(2,1,'Id-1738063347197-vistas_molinos_energia_eolica_desde_el_corral_del_cura.png',0),(3,1,'Id-1738063347250-picnic_paseo_corral_del_cura.jpg',0),(4,1,'Id-1738063422528-via_verde_a_su_paso_proxima_al_corral_del_cura_proximo_alojamiento_960.png',0),(5,2,'Id-1738063645594-ganado_de_ovejas_trashumante_a_su_paso_por_el_corral_de_la_jaquesa_960.png',1),(6,2,'Id-1738063661678-yo_labrando_en_la_jaquesa_960.png',0),(7,2,'Id-1738063758030-cerecicas_de_pastor__flora_autoctona_paseos.jpg',0),(8,3,'Id-1738063927594-paseo_al_corral_de_ferrer_vistas_960.png',1),(9,4,'Id-1738064040472-vistas_molino_antiguo_paseo_a_la_rambla_960.png',1),(10,5,'Id-1738064257460-coscojos_flora_autoctona_paseo_gracian_960.jpg',1),(11,6,'Id-1738064345638-el_chirimito_paseo.jpg',1),(12,7,'Id-1738064417465-camino_paseo_cerrito_la_judia.png',1),(13,8,'Id-1738064475780-camino_paseo_hacia_el_alto_limbo.png',1),(14,9,'Id-1738064565821-paseo_can__ada.png',1),(15,10,'Id-1738064945752-vistas_paseo_a_pradas.png',1),(16,11,'Id-1738064998345-interio_cueva_cerdan__a_paseo.png',1),(17,12,'Id-1738065056613-paseo_nacimiento_rio_palancia_rocas.jpg',1);
/*!40000 ALTER TABLE `hike_pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `post_category_id` mediumint unsigned NOT NULL,
  `post_experience_id` smallint unsigned DEFAULT NULL,
  `post_description` text,
  `post_title` varchar(150) NOT NULL,
  `post_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  KEY `fk_category_1` (`post_category_id`),
  KEY `fk_experience_5` (`post_experience_id`),
  CONSTRAINT `fk_category_1` FOREIGN KEY (`post_category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_experience_5` FOREIGN KEY (`post_experience_id`) REFERENCES `experience` (`experience_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,NULL,'Con mi stand tuve la posibilidad de dar a conocer mis experiencias rurales. Hoy 28 de septiembre de 2024 quiero compartir con vosotros una experiencia única y enriquecedora que tuve el placer de organizar: \n\n	Mi primera exposición de experiencias rurales, gastronómicas, visitas, paseos y picnics, en colaboración con la emocionante carrera por montaña de Barracas.Un encuentro con la Naturaleza y la Gastronomía Local.\n\n	La exposición fue una celebración de la riqueza y diversidad de nuestro pueblo. Los visitantes pudieron disfrutar de una variedad de actividades diseñadas para conectar con la naturaleza y la cultura local.\n\n	Desde paseos tranquilos por senderos pintorescos hasta una vivencia in situ de cómo serán los picnics, mostrando las diferentes opciones de decoración, totalmente personalizables e imaginar como serían en el monte, rodeados de naturaleza.\n\n	Cada momento estuvo lleno de descubrimientos y aprendizajes.\n\n	Sabores auténticos y tradicionales que les transportaron a los sabores de la infancia donde sus abuelas les preparaban con tanto cariño esta gastronomía casera.\n\n	Uno de los puntos destacados fue, sin duda, la oferta gastronómica. Los asistentes tuvieron la oportunidad de degustar productos caseros, recién hechos y deliciosos, preparados con recetas tradicionales.\n\n	Los picnics al aire libre fueron una delicia, una puesta en escena que despertó los sentidos de todos los que mostraron interés por descubrir nuestras experienicias.\n\n	!Una verdadera fiesta para los sentidos!\n\n	Aventura y paseos inolvidables. \n\n	Además tuvieron la posibilidad de conocer nuestra gastronomía, el entorno donde organizaremos los paseos y una puesta en escena de las diferentes tipologías de picnics totalmente personalizados que permitirán a los participantes explorar la belleza natural de Barracas y su cultura rural.\n\n	Durante el trayecto de la carrera los senderos de montaña ofrecieron vistas espectaculares y momentos de paz y reflexión. La carrera por montaña añadió un toque de adrenalina y emoción, atrayendo a corredores de todas partes que vinieron a desafiarse a sí mismos en este entorno impresionante.\n\n	Agradecimientos y reflexiones\n\n	Quiero agradecer a todos los que participaron y apoyaron esta iniciativa. Vuestro entusiasmo y energía hicieron de esta exposición un evento memorable. Espero que las personas que mostraron interés por conocernos pudieran disfrutar tanto como yo al organizarlo.\n\n	Os invito a seguir acompañándome en futuras experiencias y poder mostraros los rincones más maravillosos de nuestro entorno rural. Hasta la próxima! Muchas gracias.','Mi primer stand en la Carrera por montaña de Barracas','2025-01-27 14:39:42'),(2,1,NULL,'El sábado 19 de octubre de 2024 tuvimos la oportunidad de darnos a conocer en la Comarca con nuestro stand en la I Feria Sostenible del Alto Palancia. \n\n	Ecoagrocorral apuesta por utilizar de manera sostenible los recursos naturales, patrimoniales y culturales de nuestra cultura rural. Así mismo busca contribuir a su conservación y divulgación. \n\n	Fomenta el respeto por las tradiciones y la naturaleza, preservando la historia y dándole un nuevo propósito. Evitando así que la cultura rural caiga en el olvido.\n\n	Cabe destacar la calidad y proximidad de los productos de todos los stands que acudieron a la feria desde pueblos de la Comarca y alrededores de la Sierra de Espadán. \n\n	Así como destacar la charla \"La nueva vida para los pueblos\" protagonizada por Jaime Izquierdo (autor de los libros sobre temáticas rurales y de desarrollo territorial en entornos con dificultades estructurales). \n\n	Fue super interesante y enriquecedora. Entre sus comentarios puedo mencionar: \"Para saber a donde se va, hay que saber de donde se viene\" En referencia a nuestros orígenes rurales. \n\n	Destacar que la relación entre el campo y la ciudad históricamente siempre fue estable hasta los años 50 del pasado siglo que todo cambió. Nombró la necesidad que tienen las ciudades de que exista el campo para poder subsistir. El objetivo de que volvamos a la situación que hubo antes de los años 50 y que siempre fue así durante miles de años. Sin campo no hay ciudad. \n\n	La mención que hizo a una anécdota de uno de sus libros: \"En un pueblo había un cartel que ponía: Se vende BINO. Planteó la pregunta: ¿Quién crees que es más inculto el que no sabe escribir vino con V, o el que no sabe hacer vino? En referencia a la importancia de la cultura rural que no se conoce porque no está escrita, pero cuyo valor es incalculable...\n\n	En definitiva, la primera feria Sostenible del Alto Palancia fue una iniciativa con gran éxito, esperamos que sea el inicio de muchas más. Agradecer a los organizadores y colaboradores todo su esfuerzo por hacerla posible.','Feria Sostenible Alto Palancia','2025-01-27 14:39:42'),(3,2,NULL,'Nuestra ubicación privilegiada al lado de la Vía Verde de Ojos Negros le facilita el acceso a los próximos alojamientos de agroturismo para descansar y continuar la ruta al día siguiente. Así como aprovechar la estancia para visitar la localidad de Barracas dada su proximidad. Con nuestra oferta de experiencias rurales, podrás degustar la gastronomía típica con nuestras elaboraciones en cualquier punto del trayecto de la Vía Verde, desde nuestro corral del Cura hasta nuestro corral de la Jaquesa, donde te podremos preparar un picnic.','Vía Verde Ojos Negros','2025-01-27 14:39:42'),(4,3,NULL,'Observa la fauna autóctona en tus paseos por la naturaleza. El corzo es denominado como \"el duende del monte\". En nuestros paseos por la naturaleza, es común encontrarnos con el elegante corzo (Capreolus capreolus). Este pequeño cérvido ha experimentado una expansión en su distribución y abundancia en las últimas décadas. ¿Qué factores han influido en su aumento? El abandono del medio rural y de las prácticas ganaderas han jugado un papel importante. Los corzos, con sus sentidos agudos, nos desafían a observarlos sin perturbar su tranquilidad. Su presencia en bosques y campos nos conecta con la biodiversidad y la belleza natural.','Corzos','2025-01-27 14:39:42'),(5,4,NULL,'En el corazón de los pinares que rodean el entorno cercano, nos adentramos para encontrar uno de los manjares más deliciosos del otoño: el rebollón. Desde su recolección hasta la cocina, acompáñanos en esta aventura micológica con este hongo tan especial.','Rebollón','2025-01-27 14:39:42'),(6,5,NULL,'Valor de la cultura rural. En el corazón del mundo rural, donde el sol se funde con los campos dorados, celebramos el valor del trabajo en el campo. Cada espiga de trigo cosechada es un testimonio del esfuerzo y la dedicación como agricultores, guardianes de una tradición milenaria que mantiene viva nuestra cultura rural. Valoramos y preservamos el conocimiento y las prácticas que han pasado de generación en generación, asegurando que la esencia del campo perdure y florezca. En cada jornada de trabajo, en cada atardecer, honramos la conexión profunda con la tierra y el compromiso con un futuro donde la cultura rural siga siendo el pilar de nuestras vidas.','Trigo','2025-01-27 14:39:42'),(7,6,NULL,'La trashumancia declarada patrimonio inmaterial de la humanidad en 2023. Fue la base de la economía de Barracas, junto con el cultivo de cereales, patatas y pipirigallo, que servía como heno para alimentar a las caballería y el ganado de ovejas y cabras de pequeños ganaderos que no iban a invernar. La actividad ganadera alcanzaba, una especial relevancia. Había dos dehesas, una para pasto de ganado de abasto y otra el de labor. Otro hecho para rememorar era el paso de los ganados de todo tipo, adquirido por los tratantes de Levante en la celebre feria de ganados de Cedrillas (Teruel), en los primeros días de Octubre, por la vereda general de Aragón. Era la alegría de la gente del pueblo quienes acompañaban largo trecho el paso, sobre todo, de toros; de igual modo, pasaba con los ganados trashumantes de Aragón que pasaban para ir a extremar (pasar el invierno) al reino de Valencia, con el tradicional sonar de sus esquilas. La ganadería tradicional en Barracas constaba de ovejas, cabras, vacas de labranza, vacas, machos, burros, caballos y vacas bravas. La existencia de más de cuarenta corrales de ganado, evidencia la gran actividad ganadera que antiguamente hubo en el pueblo de Barracas y su gran valor etnográfico para la cultura del pueblo de Barracas. En la actualidad no existe ningún pastor del pueblo, debido a las dificultades económicas para el relevo generacional. Siendo los pastores existentes de localidades cercanas.','Ovejas','2025-01-27 14:39:42');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_picture`
--

DROP TABLE IF EXISTS `post_picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_picture` (
  `post_picture_id` mediumint unsigned NOT NULL AUTO_INCREMENT,
  `post_picture_post_id` mediumint unsigned NOT NULL,
  `post_picture_file` varchar(250) DEFAULT NULL,
  `is_main` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`post_picture_id`),
  KEY `fk_post_1` (`post_picture_post_id`),
  CONSTRAINT `fk_post_1` FOREIGN KEY (`post_picture_post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_picture`
--

LOCK TABLES `post_picture` WRITE;
/*!40000 ALTER TABLE `post_picture` DISABLE KEYS */;
INSERT INTO `post_picture` VALUES (1,1,'feria.jpeg',1),(2,1,'feria1.jpg',0),(3,1,'feria2.jpg',0),(4,1,'feria3.jpg',0),(5,1,'feria4.jpg',0),(6,1,'feria5.jpg',0),(7,1,'feria6.jpg',0),(8,1,'feria7.jpg',0),(9,1,'feria8.jpg',0),(10,1,'feria9.jpg',0),(11,1,'feria10.jpg',0),(12,1,'feria11.jpg',0),(13,1,'feria12.jpg',0),(14,1,'feria13.jpg',0),(15,2,'otraferia.jpg',1),(16,2,'otraferia1.jpg',0),(17,2,'otraferia2.jpg',0),(18,2,'otraferia3.jpg',0),(19,3,'deporte.jpeg',1),(20,4,'corzos.jpg',1),(21,5,'rebollon.jpg',1),(22,6,'trigo.jpeg',1),(23,7,'ovejas.jpg',1);
/*!40000 ALTER TABLE `post_picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `reservation_id` int unsigned NOT NULL AUTO_INCREMENT,
  `reservation_user_id` int unsigned NOT NULL,
  `reservation_experience_id` smallint unsigned NOT NULL,
  `reservation_hike_id` mediumint unsigned NOT NULL,
  `reservation_text` text,
  `reservation_date` date NOT NULL,
  `reservation_time` time NOT NULL,
  `reservation_adult` decimal(2,0) DEFAULT NULL,
  `reservation_children` decimal(2,0) DEFAULT NULL,
  `reservation_total_price` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  UNIQUE KEY `reservation_date` (`reservation_date`),
  KEY `fk_user_2` (`reservation_user_id`),
  KEY `fk_experience_4` (`reservation_experience_id`),
  KEY `fk_hike_3` (`reservation_hike_id`),
  CONSTRAINT `fk_experience_4` FOREIGN KEY (`reservation_experience_id`) REFERENCES `experience` (`experience_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_hike_3` FOREIGN KEY (`reservation_hike_id`) REFERENCES `hike` (`hike_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_2` FOREIGN KEY (`reservation_user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation_day`
--

DROP TABLE IF EXISTS `reservation_day`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation_day` (
  `reservation_day_id` smallint unsigned NOT NULL AUTO_INCREMENT,
  `reservation_day_name` varchar(250) NOT NULL,
  `reservation_day_value` decimal(1,0) NOT NULL,
  `reservation_day_is_active` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`reservation_day_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation_day`
--

LOCK TABLES `reservation_day` WRITE;
/*!40000 ALTER TABLE `reservation_day` DISABLE KEYS */;
INSERT INTO `reservation_day` VALUES (1,'domingo',0,0),(2,'lunes',1,0),(3,'martes',2,0),(4,'miércoles',3,0),(5,'jueves',4,0),(6,'viernes',5,0),(7,'sábado',6,0);
/*!40000 ALTER TABLE `reservation_day` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `user_lastname` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(250) NOT NULL,
  `user_type` tinyint unsigned NOT NULL DEFAULT '0',
  `user_address` varchar(250) NOT NULL,
  `user_avatar` varchar(250) DEFAULT NULL,
  `user_phone` varchar(25) NOT NULL,
  `user_dni` varchar(25) NOT NULL,
  `user_birthdate` date NOT NULL,
  `user_is_deleted` tinyint(1) NOT NULL DEFAULT '0',
  `user_is_verified` tinyint(1) NOT NULL DEFAULT '0',
  `user_is_disabled` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Angeles','Fernandez','angelesfesr97@gmail.com','$2b$10$erPAS4aU5Ovgkp1NymAgKet6u6tYMi6F/Lme5nB0S54sB7ujRrLu2',1,'Juan Gil Albert 9c- 7B',NULL,'691560150','1234123','2005-02-04',0,1,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-28 13:47:00
