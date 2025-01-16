-- drop database ecoagrocorral;
CREATE DATABASE ecoagrocorral;
USE ecoagrocorral;

CREATE TABLE user (
	user_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	user_name VARCHAR (50) NOT NULL,
	user_lastname VARCHAR (50) NOT NULL,
	user_email VARCHAR (100) UNIQUE NOT NULL,
	user_password VARCHAR (250) NOT NULL,
	user_type TINYINT UNSIGNED NOT NULL DEFAULT 0, -- 0 = cliente / 1 = admin
	user_address VARCHAR (250) NOT NULL,
	user_avatar VARCHAR (250),
	user_phone VARCHAR (25) NOT NULL,
	user_dni VARCHAR (25) NOT NULL,
	user_is_deleted BOOLEAN NOT NULL DEFAULT 0,
	user_is_verified BOOLEAN NOT NULL DEFAULT 0,
	user_is_disabled BOOLEAN NOT NULL DEFAULT 0
);

ALTER TABLE `ecoagrocorral`.`user` 
ADD COLUMN `user_birthdate` DATE NOT NULL AFTER `user_is_disabled`;

CREATE TABLE experience (
	experience_id SMALLINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	experience_title VARCHAR (150) NOT NULL,
	experience_description TEXT NOT NULL,
	experience_is_deleted BOOLEAN NOT NULL DEFAULT 0,
	experience_price_child DECIMAL (6, 2) NOT NULL,  -- 9999.99
	experience_price_adult DECIMAL (6, 2) NOT NULL   -- 9999.99
);

INSERT INTO experience (experience_title, experience_description, experience_price_child, experience_price_adult) VALUES 
	("Sabores y tradición",
    "Disfruta de un paseo autónomo siguiendo el camino que recorrían los pastores de ovejas hasta llegar a nuestros corrales, edificaciones de gran valor etnográfico. A tu llegada te habremos preparado un picnic para degustar nuestra gastronomía típica. Revive la tradición ganadera, parte importante del legado de nuestros antepasados. Admira estás edificaciones ligadas históricamente a la trashumancia, declarada Patrimonio Inmaterial de la Humanidad en 2023.",
    8.00,
    18.00);
    
INSERT INTO experience (experience_title, experience_description, experience_price_child, experience_price_adult) VALUES 
	("Sabores y naturaleza",
    "Disfruta de un paseo por el entorno rural y descubre parajes de gran belleza en contacto directo con la naturaleza. Observa la fauna y la flora autóctona. Disfruta de un picnic al aire libre sin prisas.",
    10.00,
    25.00),
    ("Sabores y rutas",
    "Disfruta de un paseo por el entorno cercano y descubre los parajes más destacados. Observa la fauna y la flora autóctona. Disfruta de un picnic al aire libre sin prisas.",
    12.00,
    30.00);
    
SELECT * FROM experience;
    


CREATE TABLE experience_pictures (
experience_pictures_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
experience_pictures_experience_id SMALLINT UNSIGNED NOT NULL,
experience_pictures_file VARCHAR(250),
is_main BOOLEAN NOT NULL DEFAULT 0,
CONSTRAINT fk_experience_1 FOREIGN KEY (experience_pictures_experience_id)
	REFERENCES experience(experience_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE feature (
feature_id SMALLINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
feature_experience_id SMALLINT UNSIGNED NOT NULL,
feature_name VARCHAR(100) NOT NULL,
feature_description VARCHAR(300),
feature_icon VARCHAR(250),
CONSTRAINT fk_experience_2 FOREIGN KEY (feature_experience_id)
	REFERENCES experience(experience_id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO feature (feature_experience_id, feature_name, feature_description) VALUES
	(1, "Cultura y tradición", "Aprende sobre las tradiciones y la historia de los pastores de ovejas, valorando la rica herencia de la cultura rural"),
    (1, "Gastronomía", "Disfruta de productos frescos y caseros, elaborados de forma casera, recién hecha con ingredientes de alta calidad, de proximidad, km 0 Recetas de nuestras abuelas recuperadas. Nuestras magdalenas, tortas de tajadas y longanizas,..."),
    (1, "Conexión", "Desconéctate del bullicio de la ciudad y reconecta con la tranquilidad del entorno rural"),
    (1, "Picnic", "Nos ocupamos de todo para que solo tengas que preocuparte de disfrutar del entorno y la compañía de familia y amigos."),
    (2, "Exploración autónoma", "Libertad para descubrir el entorno a tu propio ritmo, por parajes del pueblo de Barracas de gran belleza"),
    (2, "Gastronomía", "Disfruta de productos frescos y caseros, elaborados de forma casera, recién hecha con ingredientes de alta calidad, de proximidad, km 0 Recetas de nuestras abuelas recuperadas. Nuestras magdalenas, tortas de tajadas y longanizas,..."),
    (2, "Compartida", "Perfecto para crear recuerdos con seres queridos en un entorno natural"),
    (2, "Picnic", "Nos ocupamos de todo para que solo tengas que preocuparte de disfrutar del entorno y la compañía de familia y amigos."),
    (3, "Exploración autónoma", "Libertad para descubrir el entorno a tu propio ritmo, por parajes del pueblo de Barracas de gran belleza"),
    (3, "Gastronomía", "Disfruta de productos frescos y caseros, elaborados de forma casera, recién hecha con ingredientes de alta calidad, de proximidad, km 0 Recetas de nuestras abuelas recuperadas. Nuestras magdalenas, tortas de tajadas y longanizas,..."),
    (3, "Compartida", "Perfecto para crear recuerdos con seres queridos en un entorno natural"),
    (3, "Picnic", "Nos ocupamos de todo para que solo tengas que preocuparte de disfrutar del entorno y la compañía de familia y amigos.");

SELECT * FROM feature;

CREATE TABLE hike (
hike_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
hike_description TEXT NOT NULL,
hike_distance DECIMAL(4, 2) NOT NULL, -- 99.99
hike_duration DECIMAL(4, 2) NOT NULL, -- 99.99
hike_intinerary TEXT NOT NULL,
hike_is_deleted BOOLEAN NOT NULL DEFAULT 0 
);

ALTER TABLE `ecoagrocorral`.`hike` 
ADD COLUMN `hike_title` VARCHAR(100) NOT NULL AFTER `hike_is_deleted`;

INSERT INTO hike (hike_title, hike_description, hike_distance, hike_duration, hike_intinerary) VALUES 
	("Corral del Cura",
    "Corral que perteneció a nuestra familia. Nuestros abuelos eran pastores de ovejas, sin relevo generacional, dejaron sus huellas en los corrales. Edificaciones de gran valor etnográfico, construidas con materiales nobles como piedra, madera y cañizo. Situado en medio del altiplano de Barracas, paraje de gran belleza rodeado de campos de cereal.",
    10.5,
    3.00,
    "Una vez en el pueblo tomamos la calle principal hasta desviarnos por la calleja mayoral y tomar la via verde en dirección Sagunto. Iremos observando la estación del tren que quedará a la izquierda y continuaremos durante unos cuatro kilometros hasta desviarnos a la derecha para cruzar el camino de Liria y continuar por el camino rodeado de campos de cereal, hasta llegar al Corral del Cura."),
    ("Corral de la Jaquesa",
    "Corral situado en el paraje de la Jaquesa, situado al lado de la vía Verde Ojos Negros a su paso por Aragón, en el término de Albentosa en Teruel. Destacar de la Jaquesa su situación estratégica como antigua aduana entre el Reino de Valencia y el Reino de Aragón. Está situado en un paraje de gran belleza donde predominan las sabinas, carrascas y rebollos.",
    15.6,
    4,
    "Una vez en el pueblo tomamos la calle principal hasta desviarnos por la calleja mayoral y tomar la vía verde dirección Teruel. Continuaremos por la via verde hasta llegar a la Estación del Palancar a unos 3,5 km, allí podrás hacer un descanso. Continuaremos por la vía verde unos 4km más hasta llegar al corral de la Jaquesa."),
    ("Corral de Ferrer",
    "Corral situado en el paraje de la Jaquesa, situado al lado de la vía Verde Ojos Negros a su paso por Aragón, en el término de Albentosa en Teruel. Destacar de la Jaquesa su situación estratégica como antigua aduana entre el Reino de Valencia y el Reino de Aragón. Está situado en un paraje de gran belleza donde predominan las sabinas, carrascas y rebollos.",
    5.2,
    2,
    "Una vez en el pueblo tomamos la calle principal hasta desviarnos por la calleja mayoral y tomar el camino del Calvario. Seguimos hacia la Cañada. Una vez en el cruce de los tres caminos, tomamos el de la izquierda. Continuamos por el camino hasta llegar al corral que queda a la derecha del camino."),
    ("Paseo a La Rambla",
    "Paraje de gran belleza. Al ser una rambla lleva agua temporalmente. Durante  la temporada de lluvias, se llena de agua, mientras que el resto del año permanece seca. En invierno, cuando el frío es intenso, el agua se hiela. A veces, patos y ranas encuentran refugio aquí. Esta situada junto al pinar del Aliagar y rodeado por campos de cereales",
    3.6,
    1,
    "Una vez en el pueblo tomamos el paseo del Ventorrillo. Cruzamos la carretera y tomamos la via secundaria hacia la izquierda. Pasaremos junto al antiguo molino del siglo XIV. Continuamos hasta llegar a la rambla. Haremos la ruta circular continuando un tramo al lado de la rambla y volviendo por el camino de San Agustin. Al llegar a al a vía secundaria nos desviaremos hacia la derecha para volver por debajo de la autovía hasta el paseo del Ventorrillo."),
    ("Paseo a Gracian",
    "Monte de interés etnográfico local, utilizado comunitariamente por  la gente de Barracas. Antiguamente, se dividía en 'suertes' para hacer leña, un recurso vital para calentarse y cocinar. En el trayecto, destacan el Navajo y los restos de la Masía.",
    7,
    2.5,
    "Una vez en el pueblo tomamos el camino hacia el calvario. Seguimos hacia la Cañada. Una vez en el cruce de los tres caminos, tomamos el de la izquierda. Continuamos por el hasta tomar siguiente camino a la izquierda. El siguiente cruce tomamos el camino de la derecha. LLegaremos al Navajo de Gracian. Continuamos por los coscojos siguiendo el plano hasta llegar a la Masia Gracian."),
    ("Paseo al Chirimito",
    "Edificio de interés etnográfico local, con una arquitectura de piedra y forma cilíndrica. Originalmente, se utilizó como pozo para abastecer la antigua Vía Minera de Sagunto a Ojos Negros. Actual Vía Verde. En este paraje, destaca un abrevadero para que las ovejas beban agua.",
    5.2,
    2,
    "Partimos del paseo del Ventorrillo. Tomamos el camino a la izquierda hasta llegar a la Vía Verde. La cruzamos y continuamos por el camino. Seguimos por el camino durante toda la subida. Seguimos por el camino de la izquierda y tomamos a la derecha la senda de las vacas, empezamos la bajada. Cuando se acabe el descenso ya se ve el Chirimito a la derecha."),
    ("Paseo al Cerrito la judía",
    "La Judía es un cerrito que albergó un poblado ibero. Destacan los restos de ladrillos de adobe de barro, donde aún se pueden ver huellas de dedos y huecos que alguna vez tuvieron paja. Su ubicación, en lo alto de un cerro, le daba un carácter defensivo. Las vistas y las canteras que rodeaban el poblado son realmente espectaculares. En la base del cerro, se puede apreciar un pequeño corral con una pared de piedra en seco.",
    9.6,
    3,
    "Una vez en el pueblo tomamos el paseo del Ventorrillo. Cruzamos la carretera y tomamos la via secundaria hacia la derecha. Nos desviamos hacia la derecha por el camino de San Agustin. Continuamos hasta llegar a la rambla, la cruzamos y atravesamos el pinar del Aliagar. Tomamos el camino hacia las Lomas. Nos desviamos por el camino de la derecha. Atravesamos el pinar y a la derecha queda el cerrito de la Judia."),
	("Paseo al Alto Limbo",
    "Monte de interés etnográfico local con magnificas vistas panorámicas de Barracas y sus alrededores. Desde aquí, se puede apreciar el parque de energía eólica renovable. En mitad del trayecto, destaca el paraje del pozo del Cubico.",
    5.2,
    2,
    "Una vez en el pueblo tomamos el camino hacia el antiguo lavadero. Seguimos por la avenida de San Roque hasta cruzar la autovia por debajo. Seguimos por la via secundaria y tomamos el camino de la izquierda. Cuando se acabe el camino iniciamos el ascenso al Alto Limbo."),
	("Paseo a la Cañada",
    "Paraje tranquilo de gran belleza rodeado de campos de cereal, carrascas y monte bajo. Destacan sus restos de corrales de ganado y abrevaderos de ovejas.",
    6.2,
    2.5,
    "Una vez en el pueblo tomamos el camino hacia el calvario. Seguimos hacia la Cañada. Una vez en el cruce de los tres caminos, tomamos el de la izquierda. Continuamos por el camino hasta llegar a la cañada. Nos desviamos hacía la izquierda y llegaremos al pozo de Lecris con sus abrevaderos para las ovejas. Podremos caminar por el entorno de la Cañada y apreciar sus rincones más escondidos."),
    ("Ruta a Pradas",
    "El barrio de Pradas se encuentra en San Agustín en la provincia de Teruel, localidad cercana a Barracas. Se venera en su Ermita a la Virgen de Pradas el fin de semana próximo al 22 de mayo. Junto a la Ermita hay restos de un castillo que perteneció a la Baronía de Escriche. Destacan del trayecto, el río de Pradas y su puente romano. ",
    20,
    6,
    "Salimos caminando dirección San Agustin. Tomamos el camino de la Judia hacia San Agustin. Una vez pasado el pueblo tomamos el camino hacia el Barrio de Pradas. LLegamos al rio y cruzamos el puente romano. Seguimos el ascenso por el sendero hasta llegar a la Ermita de Pradas."),
    ("Ruta Cueva Cerdaña",
    "Cueva de gran valor geológico. Con una gran sala central. Donde se puede apreciar una gran ventana al exterior. Destaca en el centro de la sala una impresionante columna. Así como numerosas estalactitas y estalagmitas. En el exterior las vistas son fabulosas. Destacan del trayecto, el Pozo, las vistas al Alto de Santa Bárbara de Pina y las vistas al valle del Palancia.",
    16,
    2,
    "Nos dirigimos en nuestro coche hasta Pina, unos 5 km. Una vez pasamos el pueblo de Pina de Montalgrao, tomamos el camino de la ermita de la Virgen de Gracia. Seguimos la señalización hasta el pozo de Cerdaña. Dejamos alli el coche. Iniciamos la ruta hacia la Cueva de cerdaña siguiendo el sendero PR-V 62, con sus marcas en el suelo de color blancas y amarillas en paralelo."),
	("Ruta al Nacimiento del río Palancia",
    "Catalogado como uno de los 'paisajes mágicos de la Comunidad Valenciana'. El sendero va siguiendo el cauce del río y nos permite pasar de las zonas aprovechadas por el hombre, con sus numerosas masías y cultivos salpicados por muestras de arquitectura de la piedra en seco, a un entorno más salvaje cercano a los estrechos del río Palancia en el magnifico estrecho del Cascajar. Parada destacada en la aldea abandonada de El Molinar. Entorno de gran interés etnográfico, albergó un molino de agua harinero para satisfacer las necesidades del altiplano.",
    6.2,
    2,
    "Nos dirigimos en nuestro coche hasta los Cloticos en Bejis. Dejamos alli el coche. Iniciamos la ruta hacia el nacimiento del Río Palancia, siguiendo el sendero PR-V 275, con sus marcas en el suelo de color blancas y amarillas en paralelo.");

SELECT * FROM hike;

CREATE TABLE hike_pictures (
hike_pictures_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
hike_pictures_hike_id MEDIUMINT UNSIGNED NOT NULL,
hike_pictures_file VARCHAR(250),
is_main BOOLEAN NOT NULL DEFAULT 0,
CONSTRAINT fk_hike_1 FOREIGN KEY (hike_pictures_hike_id)
	REFERENCES hike(hike_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE hike_experience (
hike_experience_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
experience_id SMALLINT UNSIGNED NOT NULL,
hike_id MEDIUMINT UNSIGNED NOT NULL,
CONSTRAINT fk_experience_3 FOREIGN KEY (experience_id)
	REFERENCES experience(experience_id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_hike_2 FOREIGN KEY (hike_id)
	REFERENCES hike(hike_id) ON DELETE CASCADE ON UPDATE CASCADE
);


INSERT INTO hike_experience (experience_id, hike_id) VALUES
	(1, 1),
    (1, 2),
    (1, 3),
    (2, 4),
    (2, 5),
    (2, 6),
    (2, 7),
    (2, 8),
    (2, 9),
    (3, 10),
    (3, 11),
    (3, 12);
    

CREATE TABLE reservation (
reservation_id INT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
reservation_user_id INT UNSIGNED NOT NULL,
reservation_experience_id SMALLINT UNSIGNED NOT NULL,
reservation_hike_id MEDIUMINT UNSIGNED NOT NULL,
reservation_text TEXT,
reservation_date DATE NOT NULL UNIQUE,  -- error de que esa fecha ya existe -> no se puede hacer esa reserva
reservation_time TIME NOT NULL,
reservation_adult NUMERIC(2), -- 99
reservation_children NUMERIC(2), -- 99
CONSTRAINT fk_user_2 FOREIGN KEY (reservation_user_id) 
	REFERENCES user(user_id) ON DELETE CASCADE ON UPDATE CASCADE, 
CONSTRAINT fk_experience_4 FOREIGN KEY (reservation_experience_id)
	REFERENCES experience(experience_id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_hike_3 FOREIGN KEY (reservation_hike_id)
	REFERENCES hike(hike_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE category (
    category_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(150) UNIQUE NOT NULL
);

INSERT INTO category (category_name) VALUES 
('Ferias'), 
('Deporte'), 
('Fauna'), 
('Hongos'), 
('Agricultura'), 
('Ganadería');

CREATE TABLE post (
post_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
post_category_id MEDIUMINT UNSIGNED NOT NULL,
post_experience_id SMALLINT UNSIGNED,
post_description TEXT,
post_title VARCHAR (150) NOT NULL,
post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
CONSTRAINT fk_category_1 FOREIGN KEY (post_category_id) 
	REFERENCES category(category_id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT fk_experience_5 FOREIGN KEY (post_experience_id)
	REFERENCES experience(experience_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Primer post: Mi primer stand en la Carrera por montaña de Barracas
INSERT INTO post (
    post_category_id, 
    post_experience_id, 
    post_description, 
    post_title
) VALUES (
    1,  -- Ferias
    NULL, 
    'Con mi stand tuve la posibilidad de dar a conocer mis experiencias rurales. Hoy 28 de septiembre de 2024 quiero compartir con vosotros una experiencia única y enriquecedora que tuve el placer de organizar: Mi primera exposición de experiencias rurales, gastronómicas, visitas, paseos y picnics, en colaboración con la emocionante carrera por montaña de Barracas. La exposición fue una celebración de la riqueza y diversidad de nuestro pueblo...',
    'Mi primer stand en la Carrera por montaña de Barracas'
);

-- Segundo post: Feria Sostenible Alto Palancia
INSERT INTO post (
    post_category_id, 
    post_experience_id, 
    post_description, 
    post_title
) VALUES (
    1,  -- Ferias
    NULL, 
    'El sábado 19 de octubre de 2024 tuvimos la oportunidad de darnos a conocer en la Comarca con nuestro stand en la I Feria Sostenible del Alto Palancia. Ecoagrocorral apuesta por utilizar de manera sostenible los recursos naturales, patrimoniales y culturales de nuestra cultura rural. Así mismo busca contribuir a su conservación y divulgación. Fomenta el respeto por las tradiciones y la naturaleza...',
    'Feria Sostenible Alto Palancia'
);

-- Tercer post: Vía Verde Ojos Negros
INSERT INTO post (
    post_category_id, 
    post_experience_id, 
    post_description, 
    post_title
) VALUES (
    2,  -- Deporte
    NULL, 
    'Nuestra ubicación privilegiada al lado de la Vía Verde de Ojos Negros le facilita el acceso a los próximos alojamientos de agroturismo para descansar y continuar la ruta al día siguiente. Así como aprovechar la estancia para visitar la localidad de Barracas dada su proximidad. Con nuestra oferta de experiencias rurales, podrás degustar la gastronomía típica con nuestras elaboraciones en cualquier punto del trayecto de la Vía Verde, desde nuestro corral del Cura hasta nuestro corral de la Jaquesa, donde te podremos preparar un picnic.',
    'Vía Verde Ojos Negros'
);

-- Cuarto post: Corzos
INSERT INTO post (
    post_category_id, 
    post_experience_id, 
    post_description, 
    post_title
) VALUES (
    3,  -- Fauna
    NULL, 
    'Observa la fauna autóctona en tus paseos por la naturaleza. El corzo es denominado como "el duende del monte". En nuestros paseos por la naturaleza, es común encontrarnos con el elegante corzo (Capreolus capreolus). Este pequeño cérvido ha experimentado una expansión en su distribución y abundancia en las últimas décadas. ¿Qué factores han influido en su aumento? El abandono del medio rural y de las prácticas ganaderas han jugado un papel importante. Los corzos, con sus sentidos agudos, nos desafían a observarlos sin perturbar su tranquilidad. Su presencia en bosques y campos nos conecta con la biodiversidad y la belleza natural.',
    'Corzos'
);

-- Quinto post: Rebollón
INSERT INTO post (
    post_category_id, 
    post_experience_id, 
    post_description, 
    post_title
) VALUES (
    4,  -- Hongos
    NULL, 
    'En el corazón de los pinares que rodean el entorno cercano, nos adentramos para encontrar uno de los manjares más deliciosos del otoño: el rebollón. Desde su recolección hasta la cocina, acompáñanos en esta aventura micológica con este hongo tan especial.',
    'Rebollón'
);

-- Sexto post: Trigo
INSERT INTO post (
    post_category_id, 
    post_experience_id, 
    post_description, 
    post_title
) VALUES (
    5,  -- Agricultura
    NULL, 
    'Valor de la cultura rural. En el corazón del mundo rural, donde el sol se funde con los campos dorados, celebramos el valor del trabajo en el campo. Cada espiga de trigo cosechada es un testimonio del esfuerzo y la dedicación como agricultores, guardianes de una tradición milenaria que mantiene viva nuestra cultura rural. Valoramos y preservamos el conocimiento y las prácticas que han pasado de generación en generación, asegurando que la esencia del campo perdure y florezca. En cada jornada de trabajo, en cada atardecer, honramos la conexión profunda con la tierra y el compromiso con un futuro donde la cultura rural siga siendo el pilar de nuestras vidas.',
    'Trigo'
);

-- Séptimo post: Ovejas
INSERT INTO post (
    post_category_id, 
    post_experience_id, 
    post_description, 
    post_title
) VALUES (
    6,  -- Ganadería
    NULL, 
    'La trashumancia declarada patrimonio inmaterial de la humanidad en 2023. Fue la base de la economía de Barracas, junto con el cultivo de cereales, patatas y pipirigallo, que servía como heno para alimentar a las caballería y el ganado de ovejas y cabras de pequeños ganaderos que no iban a invernar. La actividad ganadera alcanzaba, una especial relevancia. Había dos dehesas, una para pasto de ganado de abasto y otra el de labor. Otro hecho para rememorar era el paso de los ganados de todo tipo, adquirido por los tratantes de Levante en la celebre feria de ganados de Cedrillas (Teruel), en los primeros días de Octubre, por la vereda general de Aragón. Era la alegría de la gente del pueblo quienes acompañaban largo trecho el paso, sobre todo, de toros; de igual modo, pasaba con los ganados trashumantes de Aragón que pasaban para ir a extremar (pasar el invierno) al reino de Valencia, con el tradicional sonar de sus esquilas. La ganadería tradicional en Barracas constaba de ovejas, cabras, vacas de labranza, vacas, machos, burros, caballos y vacas bravas. La existencia de más de cuarenta corrales de ganado, evidencia la gran actividad ganadera que antiguamente hubo en el pueblo de Barracas y su gran valor etnográfico para la cultura del pueblo de Barracas. En la actualidad no existe ningún pastor del pueblo, debido a las dificultades económicas para el relevo generacional. Siendo los pastores existentes de localidades cercanas.',
    'Ovejas'
);

CREATE TABLE post_picture (
	post_picture_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	post_picture_post_id MEDIUMINT UNSIGNED NOT NULL,
	post_picture_file VARCHAR(250),
	is_main BOOLEAN NOT NULL DEFAULT 0,
	CONSTRAINT fk_post_1 FOREIGN KEY (post_picture_post_id)
		REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);


