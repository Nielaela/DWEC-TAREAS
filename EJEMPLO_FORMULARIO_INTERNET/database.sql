DROP DATABASE IF EXISTS twitch_insert_multiple;
CREATE DATABASE twitch_insert_multiple CHARACTER SET utf8mb4;
USE twitch_insert_multiple;

CREATE TABLE usuarios( 
    id int unsigned not null auto_increment primary key,
    nombre varchar(100) not null,
    apellido varchar(100) not null
);
