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

CREATE TABLE experience (
	experience_id SMALLINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	experience_title VARCHAR (150) NOT NULL,
	experience_description TEXT NOT NULL,
	experience_is_deleted BOOLEAN NOT NULL DEFAULT 0,
	experience_price_child DECIMAL (6, 2) NOT NULL,  -- 9999.99
	experience_price_adult DECIMAL (6, 2) NOT NULL   -- 9999.99
);

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



CREATE TABLE hike (
hike_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
hike_description TEXT NOT NULL,
hike_distance DECIMAL(4, 2) NOT NULL, -- 99.99
hike_duration DECIMAL(4, 2) NOT NULL, -- 99.99
hike_intinerary TEXT NOT NULL,
hike_is_deleted BOOLEAN NOT NULL DEFAULT 0 
);

CREATE TABLE hike_pictures (
hike_pictures_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
hike_pictures_hike_id SMALLINT UNSIGNED NOT NULL,
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
CONSTRAINT fk_hike_1 FOREIGN KEY (hike_id)
	REFERENCES hike(hike_id) ON DELETE CASCADE ON UPDATE CASCADE
);

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
CONSTRAINT fk_hike_2 FOREIGN KEY (reservation_hike_id)
	REFERENCES hike(hike_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE category (
    category_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(150) UNIQUE NOT NULL
);

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

CREATE TABLE post_picture (
	post_picture_id MEDIUMINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
	post_picture_post_id MEDIUMINT UNSIGNED NOT NULL,
	post_picture_file VARCHAR(250),
	is_main BOOLEAN NOT NULL DEFAULT 0,
	CONSTRAINT fk_post_1 FOREIGN KEY (post_picture_post_id)
		REFERENCES post(post_id) ON DELETE CASCADE ON UPDATE CASCADE
);
