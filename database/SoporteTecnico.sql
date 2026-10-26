-- Creamos la base de datos
CREATE DATABASE SoporteTecnico;
GO

USE SoporteTecnico;
GO

-- Creamos la tabla con los campos obligatorios
CREATE TABLE Tickets (
    id INT IDENTITY(1,1) PRIMARY KEY, 
    asunto NVARCHAR(150) NOT NULL, 
    solicitante NVARCHAR(100) NOT NULL, 
    descripcion NVARCHAR(MAX) NOT NULL, 
    categoria NVARCHAR(50) NOT NULL, 
    prioridad NVARCHAR(50) NOT NULL, 
    estado NVARCHAR(50) NOT NULL, 
    fechaRegistro DATETIME DEFAULT GETDATE() 
);
GO