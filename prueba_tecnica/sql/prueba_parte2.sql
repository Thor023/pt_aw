--CREACION DE DB, TABLES
--Creacion de la BDD

CREATE DATABASE TiendaAutos;
GO
USE TiendaAutos;
GO
--CREACION TABLAS
USE TiendaAutos;
GO
DROP TABLE IF EXISTS Solicitudes;
DROP TABLE IF EXISTS Modelo;
DROP TABLE IF EXISTS Marca;
DROP TABLE IF EXISTS Vendedor;
-- Tabla Vendedor
CREATE TABLE Vendedor (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL
);
PRINT ' Tabla Vendedor CREADO'


-- Tabla Marca
CREATE TABLE Marca (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL
);
PRINT ' Tabla Marca CREADO'


-- Tabla Modelo
CREATE TABLE Modelo (
    Id INT PRIMARY KEY IDENTITY,
    Nombre NVARCHAR(100) NOT NULL,
    MarcaId INT FOREIGN KEY REFERENCES Marca(Id)
);
PRINT ' Tabla Modelo CREADO'


-- Tabla Solicitudes
CREATE TABLE Solicitudes (
    Id INT PRIMARY KEY IDENTITY,
    VendedorId INT FOREIGN KEY REFERENCES Vendedor(Id),
    ModeloId INT FOREIGN KEY REFERENCES Modelo(Id),
    FechaSolicitud DATE NOT NULL,
    Monto DECIMAL(18, 2) NOT NULL
);
PRINT ' Tabla Solicitudes CREADO'


