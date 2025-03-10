CREATE TABLE `Usuarios` (
  `id_usuario` INT PRIMARY KEY AUTO_INCREMENT,
  `correo` VARCHAR(255) UNIQUE NOT NULL,
  `nombre_completo` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `ultima_conexion` DATETIME,
  `fecha_creacion` DATETIME NOT NULL,
  `id_comuna` INT,
  `imagen_perfil` VARCHAR(255),
  `estado_cuenta` ENUM('activo','inactivo') NOT NULL DEFAULT 'activo'
);

CREATE TABLE `Roles` (
  `id_rol` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_rol` VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE `Usuario_Roles` (
  `id_usuario` INT,
  `id_rol` INT,
  PRIMARY KEY (`id_usuario`, `id_rol`)
);

CREATE TABLE `Regiones` (
  `id_region` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_region` VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE `Comunas` (
  `id_comuna` INT PRIMARY KEY AUTO_INCREMENT,
  `nombre_comuna` VARCHAR(100) NOT NULL,
  `id_region` INT
);

ALTER TABLE `Usuarios` ADD FOREIGN KEY (`id_comuna`) REFERENCES `Comunas` (`id_comuna`);

ALTER TABLE `Usuario_Roles` ADD FOREIGN KEY (`id_usuario`) REFERENCES `Usuarios` (`id_usuario`);

ALTER TABLE `Usuario_Roles` ADD FOREIGN KEY (`id_rol`) REFERENCES `Roles` (`id_rol`);

ALTER TABLE `Comunas` ADD FOREIGN KEY (`id_region`) REFERENCES `Regiones` (`id_region`);
