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

SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE estadoobjeto;

SET FOREIGN_KEY_CHECKS = 1;



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

INSERT INTO objeto 
(idUsuario, Nombre, Descripcion, Autor, FechaRegistro, idCondicion, idEstado) VALUES
(3, 'La Mona Lisa', 'Retrato renacentista de Lisa Gherardini, famosa por su enigmática sonrisa.', 'Leonardo da Vinci', NOW(), 2, 1),
(4, 'La noche estrellada', 'Paisaje nocturno expresivo con cielo turbulento y estrellas brillantes.', 'Vincent van Gogh', NOW(), 1, 1),
(3, 'Guernica', 'Obra que representa el horror del bombardeo de Guernica durante la guerra civil española.', 'Pablo Picasso', NOW(), 3, 1),
(4, 'La última cena', 'Representación del momento en que Jesús anuncia la traición de uno de sus apóstoles.', 'Leonardo da Vinci', NOW(), 2, 1),
(3, 'El nacimiento de Venus', 'Escena mitológica que muestra a Venus emergiendo del mar.', 'Sandro Botticelli', NOW(), 1, 1),
(4, 'Los girasoles', 'Serie de naturalezas muertas con vibrantes girasoles en jarrón.', 'Vincent van Gogh', NOW(), 3, 1),
(3, 'El grito', 'Figura angustiada bajo un cielo rojo que simboliza ansiedad y desesperación.', 'Edvard Munch', NOW(), 1, 1),
(4, 'La persistencia de la memoria', 'Relojes derretidos en un paisaje surreal que representan el paso del tiempo.', 'Salvador Dalí', NOW(), 1, 1),
(3, 'Las dos Fridas', 'Autorretrato doble que refleja la identidad y el dolor emocional de la artista.', 'Frida Kahlo', NOW(), 1, 1),
(4, 'Las meninas', 'Compleja escena cortesana con la infanta Margarita y su séquito.', 'Diego Velázquez', NOW(), 1, 1),
(3, 'La libertad guiando al pueblo', 'Alegoría de la revolución francesa con figura femenina liderando al pueblo.', 'Eugène Delacroix', NOW(), 3, 1),
(4, 'Impresión, sol naciente', 'Paisaje portuario que dio origen al movimiento impresionista.', 'Claude Monet', NOW(), 1, 1),
(3, 'La gran ola de Kanagawa', 'Escena marítima japonesa con una enorme ola amenazante.', 'Katsushika Hokusai', NOW(), 3, 1),
(4, 'El beso', 'Obra simbólica que representa el amor envuelto en dorados decorativos.', 'Gustav Klimt', NOW(), 1, 1),
(3, 'La rendición de Breda', 'Escena histórica que muestra la entrega de llaves tras una batalla.', 'Diego Velázquez', NOW(), 1, 1),
(4, 'La joven de la perla', 'Retrato femenino conocido por su mirada y pendiente de perla.', 'Johannes Vermeer', NOW(), 1, 1),
(3, 'El jardín de las delicias', 'Compleja pintura con escenas simbólicas sobre el paraíso y el pecado.', 'Hieronymus Bosch', NOW(), 2, 1),
(4, 'Napoleón cruzando los Alpes', 'Representación heroica de Napoleón liderando su ejército.', 'Jacques-Louis David', NOW(), 1, 1),
(3, 'El caminante sobre el mar de nubes', 'Representación heroica de Napoleón liderando su ejército.', 'Caspar David Friedrich', NOW(), 1, 1),
(4, 'La creación de Adán', 'Escena bíblica que muestra el momento en que Dios da vida a Adán.', 'Michelangelo Buonarroti', NOW(), 2, 1);

Insert into imagen (idObjeto, imagen)
values ('1', 'LaMonaLisa.jpg'),
('2', 'LaNocheEstrellada.jpg'),
('3', 'Guernica.jpg'),
('4', 'LaUltimaCena.jpg'),
('5', 'ElNacimientoDeVenus.jpg'),
('6', 'LosGirasoles.jpg'),
('7', 'ElGrito.jpg'),
('8', 'LaPersistenciaDeLaMemoria.jpg'),
('9', 'LasDosFridas.jpg'),
('10', 'LasMeninas.jpg'),
('11', 'LaLibertadGuiandoAlPueblo.jpg'),
('12', 'ImpresionSolNaciente.jpg'),
('13', 'LaGranOlaDeKanagawajpg'),
('14', 'ElBeso.jpg'),
('15', 'LaRendicionDeBreda.jpg'),
('16', 'LaJovenDeLaPerla.jpg'),
('17', 'ElJardinDeLasDelicias.jpg'),
('18', 'NapoleonCruzandoLosAlpes.jpg'),
('19', 'ElCaminanteSobreElMarDeNubes.jpg'),
 ('20', 'LaCreacionDeAdan.jpg');

INSERT INTO objetocategoria (idObjeto, idCategoria) VALUES

-- 1 La Mona Lisa
(1, 1),  -- Retrato
(1, 4),  -- Figura humana
(1, 28), -- Cultura europea

-- 2 La noche estrellada
(2, 6),  -- Paisaje natural
(2, 8),  -- Paisaje nocturno
(2, 28), -- Cultura europea

-- 3 Guernica
(3, 18), -- Escena bélica
(3, 17), -- Escena política
(3, 24), -- Arte dramático
(3, 28), -- Cultura europea

-- 4 La última cena
(4, 13), -- Escena religiosa
(4, 14), -- Escena bíblica
(4, 4),  -- Figura humana
(4, 28), -- Cultura europea

-- 5 El nacimiento de Venus
(5, 15), -- Escena mitológica
(5, 5),  -- Desnudo artístico
(5, 28), -- Cultura europea

-- 6 Los girasoles
(6, 10), -- Naturaleza muerta
(6, 11), -- Flora
(6, 28), -- Cultura europea

-- 7 El grito
(7, 23), -- Arte emocional
(7, 27), -- Arte existencial
(7, 4),  -- Figura humana
(7, 28), -- Cultura europea

-- 8 La persistencia de la memoria
(8, 25), -- Arte surreal
(8, 21), -- Arte simbólico
(8, 28), -- Cultura europea

-- 9 Las dos Fridas
(9, 2),  -- Autorretrato
(9, 23), -- Arte emocional
(9, 29), -- Cultura latinoamericana

-- 10 Las meninas
(10, 3), -- Retrato colectivo
(10, 16),-- Escena histórica
(10, 28),-- Cultura europea

-- 11 La libertad guiando al pueblo
(11, 22),-- Arte alegórico
(11, 17),-- Escena política
(11, 16),-- Escena histórica
(11, 28),-- Cultura europea

-- 12 Impresión, sol naciente
(12, 7), -- Paisaje urbano
(12, 6), -- Paisaje natural
(12, 28),-- Cultura europea

-- 13 La gran ola de Kanagawa
(13, 9), -- Paisaje marino
(13, 30),-- Cultura asiática
(13, 26),-- Arte fantástico

-- 14 El beso
(14, 21),-- Arte simbólico
(14, 22),-- Arte alegórico
(14, 28),-- Cultura europea

-- 15 La rendición de Breda
(15, 16),-- Escena histórica
(15, 18),-- Escena bélica
(15, 28),-- Cultura europea

-- 16 La joven de la perla
(16, 1), -- Retrato
(16, 4), -- Figura humana
(16, 28),-- Cultura europea

-- 17 El jardín de las delicias
(17, 26),-- Arte fantástico
(17, 21),-- Arte simbólico
(17, 28),-- Cultura europea

-- 18 Napoleón cruzando los Alpes
(18, 16),-- Escena histórica
(18, 4), -- Figura humana
(18, 28),-- Cultura europea

-- 19 El caminante sobre el mar de nubes
(19, 6), -- Paisaje natural
(19, 4), -- Figura humana
(19, 28),-- Cultura europea

-- 20 La creación de Adán
(20, 14),-- Escena bíblica
(20, 13),-- Escena religiosa
(20, 4), -- Figura humana
(20, 28);-- Cultura europea

INSERT INTO subasta 
(idObjeto, PrecioInicial, Incremento, FechaHoraInicio, FechaHoraFinal, idEstadoSubasta) VALUES

-- 1 al 5 → cada 1 hora
(1, 5000000.00, 50000.00, '2026-03-01 08:00:00', '2026-03-01 09:00:00', 3),
(2, 3000000.00, 30000.00, '2026-03-01 10:00:00', '2026-03-01 11:00:00', 2),
(3, 8000000.00, 80000.00, '2026-03-01 12:00:00', '2026-03-01 13:00:00', 4),
(4, 6000000.00, 60000.00, '2026-03-01 14:00:00', '2026-03-01 15:00:00', 1),
(5, 2500000.00, 25000.00, '2026-03-01 16:00:00', '2026-03-01 17:00:00', 3),

-- 6 al 10 → cada 5 horas
(6, 1500000.00, 15000.00, '2026-03-02 08:00:00', '2026-03-02 13:00:00', 4),
(7, 2000000.00, 20000.00, '2026-03-02 14:00:00', '2026-03-02 19:00:00', 3),
(8, 3500000.00, 35000.00, '2026-03-02 20:00:00', '2026-03-03 01:00:00', 2),
(9, 1800000.00, 18000.00, '2026-03-03 02:00:00', '2026-03-03 07:00:00', 1),
(10, 4500000.00, 45000.00, '2026-03-03 08:00:00', '2026-03-03 13:00:00', 3),

-- 11 al 15 → cada 24 horas
(11, 3200000.00, 32000.00, '2026-03-04 08:00:00', '2026-03-05 08:00:00', 3),
(12, 2100000.00, 21000.00, '2026-03-06 08:00:00', '2026-03-07 08:00:00', 2),
(13, 4000000.00, 40000.00, '2026-03-08 08:00:00', '2026-03-09 08:00:00', 4),
(14, 2700000.00, 27000.00, '2026-03-10 08:00:00', '2026-03-11 08:00:00', 1),
(15, 3800000.00, 38000.00, '2026-03-12 08:00:00', '2026-03-13 08:00:00', 3),

-- 16 al 20 → cada semana
(16, 2900000.00, 29000.00, '2026-03-14 08:00:00', '2026-03-21 08:00:00', 2),
(17, 4100000.00, 41000.00, '2026-03-22 08:00:00', '2026-03-29 08:00:00', 3),
(18, 3600000.00, 36000.00, '2026-03-30 08:00:00', '2026-04-06 08:00:00', 4),
(19, 2300000.00, 23000.00, '2026-04-07 08:00:00', '2026-04-14 08:00:00', 1),
(20, 7000000.00, 70000.00, '2026-04-15 08:00:00', '2026-04-22 08:00:00', 3);


SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE pago;

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO pago 
(idSubasta, FechaPago, idEstadoPago) VALUES

(3,  '2026-03-01 13:00:00', 2),  -- Pagado
(6,  '2026-03-02 13:00:00', 1),  -- Pendiente
(13, '2026-03-09 08:00:00', 3),  -- Fallido
(18, '2026-04-06 08:00:00', 4);  -- Reembolsado

INSERT INTO resultadosubasta 
(idSubasta, idUsuario, MontoFinal) VALUES

-- Subasta 3 (Incremento 80000)
(3, 5, 8320000.00),  -- 8000000 + (80000 * 4)

-- Subasta 6 (Incremento 15000)
(6, 6, 1560000.00),  -- 1500000 + (15000 * 4)

-- Subasta 13 (Incremento 40000)
(13, 5, 4200000.00), -- 4000000 + (40000 * 5)

-- Subasta 18 (Incremento 36000)
(18, 6, 3744000.00); -- 3600000 + (36000 * 4)

INSERT INTO puja
(idSubasta, idUsuario, MontoOfertado, FechaHora) VALUES

-- 🔹 SUBASTA 3 (Incremento 80000) - Final 13:00
(3, 6, 8080000.00, '2026-03-01 12:40:00'),
(3, 5, 8160000.00, '2026-03-01 12:50:00'),
(3, 6, 8240000.00, '2026-03-01 12:55:00'),
(3, 5, 8320000.00, '2026-03-01 12:59:00'),

-- 🔹 SUBASTA 6 (Incremento 15000) - Final 13:00
(6, 5, 1515000.00, '2026-03-02 12:20:00'),
(6, 6, 1530000.00, '2026-03-02 12:35:00'),
(6, 5, 1545000.00, '2026-03-02 12:50:00'),
(6, 6, 1560000.00, '2026-03-02 12:58:00'),

-- 🔹 SUBASTA 13 (Incremento 40000) - Final 08:00
(13, 6, 4040000.00, '2026-03-09 07:30:00'),
(13, 5, 4080000.00, '2026-03-09 07:40:00'),
(13, 6, 4120000.00, '2026-03-09 07:50:00'),
(13, 5, 4200000.00, '2026-03-09 07:59:00'),

-- 🔹 SUBASTA 18 (Incremento 36000) - Final 08:00
(18, 5, 3636000.00, '2026-04-06 07:30:00'),
(18, 6, 3672000.00, '2026-04-06 07:40:00'),
(18, 5, 3708000.00, '2026-04-06 07:50:00'),
(18, 6, 3744000.00, '2026-04-06 07:59:00');