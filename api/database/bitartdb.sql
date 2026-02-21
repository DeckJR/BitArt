INSERT INTO rol (Descripcion)
VALUES ('Administrador'), ('Vendedor'), ('Comprador');
Insert into estadousuario (Descripcion)
Values ('Activo'), ('Inactivo');
Insert into usuario (Nombre, Apellido1, Apellido2, Correo, Contrasenna, idRol, FechaRegistro, idEstadoUsuario)
VALUES 
('Dereck', 'Jiménez', 'Rodríguez', 'dereckalonsoj.r@gmail.com','admin123','1', now(), '1'),
('Abraham', 'Alvarez', 'Soto', 'aaas06072005@gmail.com','admin123','1', now(), '2'),
('Jose María', 'Cubillo', 'Gutierrez', 'gutierrezjosem@gmail.com','vendedor123','2', now(), '1'),
('María Angelica', 'Solis', 'Sibaja', 'nosequeponer11@gmail.com','vendedor123','2', now(), '2'),
('Cristel', 'Meléndez', 'Jiménez', 'cristelm.j@gmail.com','comprador123','3', now(), '1'),
('Axel', 'Orozco', 'Guzman', 'axelo.g@gmail.com','comprador123','3', now(), '2');
INSERT INTO estadoobjeto (Descripcion)
VALUES 
('Disponible'),
('Subastado');
Insert into condicion (descripcion)
VALUES
('Nuevo'),('Restaurado'),('Dañado');

INSERT INTO categoria (Descripcion) VALUES
('Retrato'),
('Autorretrato'),
('Retrato colectivo'),
('Figura humana'),
('Desnudo artístico'),
('Paisaje natural'),
('Paisaje urbano'),
('Paisaje nocturno'),
('Paisaje marino'),
('Naturaleza muerta'),
('Flora'),
('Animales'),
('Escena religiosa'),
('Escena bíblica'),
('Escena mitológica'),
('Escena histórica'),
('Escena política'),
('Escena bélica'),
('Vida cotidiana'),
('Escena cultural'),
('Arte simbólico'),
('Arte alegórico'),
('Arte emocional'),
('Arte dramático'),
('Arte surreal'),
('Arte fantástico'),
('Arte existencial'),
('Cultura europea'),
('Cultura latinoamericana'),
('Cultura asiática');


INSERT INTO estadoobjeto (Descripcion) VALUES
('Activo'),
('Inactivo'),
('Pendiente');

INSERT INTO estadosubasta (Descripcion) VALUES
('Cancenlada'),
('Programada'),
('Abierta'),
('Finalizada');

INSERT INTO estadopago (Descripcion) VALUES
('Pendiente'),
('Pagado'),
('Fallido'),
('Reembolsado');
