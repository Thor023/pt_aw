--CREACION DE STORAGE PROCCEDURE
USE TiendaAutos
GO
PRINT 'CREANDO PROCEDIMIENTO ObtenerTop3MarcasMasSolicitadas'
DROP PROCEDURE IF EXISTS ObtenerTop3MarcasMasSolicitadas
GO
--top 3 mas solicitados
CREATE PROCEDURE ObtenerTop3MarcasMasSolicitadas
/***********************
----------------------------------------------------------------------
Nombre 		: dbo.ObtenerTop3MarcasMasSolicitadas
BD			: TiendaAutos
Esquema		: dbo
Descripcion : Obtiene la data de 3 marcas mas solicitadas
Autor		: fcastaneda
Test		: EXEC ObtenerTop3MarcasMasSolicitadas;
----------------------------------------------------------------------
fecha		|	Autor 		|	cambio
----------------------------------------------------------------------
2024            fcastaneda    Version 1.0.0
***********************/

AS
BEGIN
    SELECT TOP 3 Marca.Nombre, COUNT(Solicitudes.Id) AS CantidadSolicitudes
    FROM Solicitudes
    JOIN Modelo ON Solicitudes.ModeloId = Modelo.Id
    JOIN Marca ON Modelo.MarcaId = Marca.Id
    GROUP BY Marca.Nombre
    ORDER BY CantidadSolicitudes DESC;
END;

GO
PRINT ' PROCEDIMIENTO ObtenerTop3MarcasMasSolicitadas CREADO'

GO
PRINT 'CREANDO PROCEDIMIENTO ObtenerSolicitudesMesActual'
DROP PROCEDURE IF EXISTS ObtenerSolicitudesMesActual
GO
--solicitudes mes actual

CREATE PROCEDURE ObtenerSolicitudesMesActual
/***********************
----------------------------------------------------------------------
Nombre 		: dbo.ObtenerSolicitudesMesActual
BD			: TiendaAutos
Esquema		: dbo
Descripcion : Obtiene solicitudes del mes actual
Autor		: fcastaneda
Test		: EXEC ObtenerSolicitudesMesActual;
----------------------------------------------------------------------
fecha		|	Autor 		|	cambio
----------------------------------------------------------------------
2024            fcastaneda    Version 1.0.0
***********************/
AS
BEGIN
    SELECT *
    FROM Solicitudes
    WHERE MONTH(FechaSolicitud) = MONTH(GETDATE()) AND YEAR(FechaSolicitud) = YEAR(GETDATE());
END;
GO
PRINT ' PROCEDIMIENTO ObtenerSolicitudesMesActual CREADO'
--Vendedor con menos solicitudes 
GO
PRINT 'CREANDO PROCEDIMIENTO ObtenerVendedorMenosSolicitudesUltimos30Dias'
DROP PROCEDURE IF EXISTS ObtenerVendedorMenosSolicitudesUltimos30Dias
GO

CREATE PROCEDURE ObtenerVendedorMenosSolicitudesUltimos30Dias
/***********************
----------------------------------------------------------------------
Nombre 		: dbo.ObtenerVendedorMenosSolicitudesUltimos30Dias
BD			: TiendaAutos
Esquema		: dbo
Descripcion : Obtener vendedor con menos solicitudes
Autor		: fcastaneda
Test		: EXEC ObtenerVendedorMenosSolicitudesUltimos30Dias;
----------------------------------------------------------------------
fecha		|	Autor 		|	cambio
----------------------------------------------------------------------
2024            fcastaneda    Version 1.0.0
***********************/
AS
BEGIN
    SELECT TOP 1 Vendedor.Nombre, COUNT(Solicitudes.Id) AS CantidadSolicitudes
    FROM Solicitudes
    JOIN Vendedor ON Solicitudes.VendedorId = Vendedor.Id
    WHERE FechaSolicitud >= DATEADD(DAY, -30, GETDATE())
    GROUP BY Vendedor.Nombre
    ORDER BY CantidadSolicitudes ASC;
END;
GO
PRINT ' PROCEDIMIENTO ObtenerVendedorMenosSolicitudesUltimos30Dias CREADO'

--modelos que no tengan solicitudes
GO
GO
PRINT 'CREANDO PROCEDIMIENTO ObtenerModelosSinSolicitudes'
DROP PROCEDURE IF EXISTS ObtenerModelosSinSolicitudes
GO
CREATE PROCEDURE ObtenerModelosSinSolicitudes
/***********************
----------------------------------------------------------------------
Nombre 		: dbo.ObtenerModelosSinSolicitudes
BD			: TiendaAutos
Esquema		: dbo
Descripcion : Obtiene los modelos sin solicitudes 
Autor		: fcastaneda
Test		: EXEC ObtenerModelosSinSolicitudes;
----------------------------------------------------------------------
fecha		|	Autor 		|	cambio
----------------------------------------------------------------------
2024            fcastaneda    Version 1.0.0
***********************/
AS
BEGIN
    SELECT Modelo.Nombre
    FROM Modelo
    LEFT JOIN Solicitudes ON Modelo.Id = Solicitudes.ModeloId
    WHERE Solicitudes.Id IS NULL;
END;
GO
PRINT ' PROCEDIMIENTO ObtenerModelosSinSolicitudes CREADO'

-- 3 meses con mas dinero en ventas
GO
PRINT 'CREANDO PROCEDIMIENTO ObtenerTop3MesesConMasVentas'
DROP PROCEDURE IF EXISTS ObtenerTop3MesesConMasVentas
GO
CREATE PROCEDURE ObtenerTop3MesesConMasVentas
/***********************
----------------------------------------------------------------------
Nombre 		: dbo.ObtenerTop3MesesConMasVentas
BD			: TiendaAutos
Esquema		: dbo
Descripcion : Obtiene los 3 meses calendario con mayores ventas
Autor		: fcastaneda
Test		: EXEC ObtenerTop3MesesConMasVentas;
----------------------------------------------------------------------
fecha		|	Autor 		|	cambio
----------------------------------------------------------------------
2024            fcastaneda    Version 1.0.0
***********************/
AS
BEGIN
    SELECT TOP 3 
        FORMAT(FechaSolicitud, 'MMMM yyyy') AS Mes, 
        SUM(Monto) AS TotalVentas
    FROM Solicitudes
    GROUP BY YEAR(FechaSolicitud), MONTH(FechaSolicitud), FORMAT(FechaSolicitud, 'MMMM yyyy')
    ORDER BY TotalVentas DESC;
END;
GO
PRINT ' PROCEDIMIENTO ObtenerTop3MesesConMasVentas CREADO'

