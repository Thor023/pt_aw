-- Insertar datos en Vendedor
USE TiendaAutos
GO
INSERT INTO Vendedor (Nombre) VALUES 
('Tony Stark'), 
('Steve Rogers'), 
('Natasha Romanoff'), 
('Bruce Banner'), 
('Clint Barton');

-- Insertar datos en Marca
INSERT INTO Marca (Nombre) VALUES 
('Toyota'), 
('Chevrolet'), 
('Nissan'), 
('Ford'), 
('Honda');

-- Insertar datos en Modelo
INSERT INTO Modelo (Nombre, MarcaId) VALUES 
('Corolla', 1), 
('Camry', 1), 
('Malibu', 2), 
('Impala', 2), 
('Altima', 3), 
('Sentra', 3), 
('Mustang', 4), 
('Focus', 4), 
('Civic', 5), 
('Accord', 5);


-- Insertar datos en Solicitudes // al no haber datos los he creado de manera aleatoria, generando otra query para siempre excluir a un modelo y asi poder cumplir con el SP de mostrar modelos no vendidos
-- Generar datos aleatorios

--exclusion de 1 modelo aleatorio para la tabla
-- Seleccionar un modelo aleatorio para excluir
SELECT TOP 1 Id INTO #ModeloExcluido
FROM Modelo
ORDER BY NEWID();

-- Crear la tabla temporal para almacenar las solicitudes aleatorias
IF OBJECT_ID('tempdb..#RandomSolicitudes') IS NOT NULL
    DROP TABLE #RandomSolicitudes;

CREATE TABLE #RandomSolicitudes (
    VendedorId INT,
    ModeloId INT,
    FechaSolicitud DATE,
    Monto DECIMAL(18, 2)
);

-- Generar datos aleatorios
DECLARE @Month INT = 1;
DECLARE @Year INT = 2024;
WHILE @Month <= 6
BEGIN
    DECLARE @Day INT = 1;
    WHILE @Day <= 10 -- Generar al menos 10 solicitudes por mes
    BEGIN
        INSERT INTO #RandomSolicitudes (VendedorId, ModeloId, FechaSolicitud, Monto)
        VALUES (
            (SELECT TOP 1 Id FROM Vendedor ORDER BY NEWID()), -- Vendedor aleatorio
            (SELECT TOP 1 Id FROM Modelo WHERE Id NOT IN (SELECT Id FROM #ModeloExcluido) ORDER BY NEWID()), -- Modelo aleatorio excluyendo el seleccionado
            DATEFROMPARTS(@Year, @Month, ABS(CHECKSUM(NEWID()) % 28) + 1), -- Fecha aleatoria dentro del mes
            ABS(CHECKSUM(NEWID()) % 1000000) + 10000.0 -- Monto aleatorio entre 10,000 y 1,010,000
        );
        SET @Day = @Day + 1;
    END
    SET @Month = @Month + 1;
END

-- Insertar los datos generados en la tabla Solicitudes
INSERT INTO Solicitudes (VendedorId, ModeloId, FechaSolicitud, Monto)
SELECT VendedorId, ModeloId, FechaSolicitud, Monto FROM #RandomSolicitudes;

-- Eliminar la tabla temporal
DROP TABLE #RandomSolicitudes;

-- Eliminar la tabla temporal del modelo excluido
DROP TABLE #ModeloExcluido;
