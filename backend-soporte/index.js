const express = require('express');
const cors = require('cors');
const sql = require('mssql');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de conexión a SQL Server
const dbConfig = {
    user: 'sa', 
    password: 'alumnos',
    server: 'localhost', 
    port: 1433, 
    database: 'SoporteTecnico',
    options: {
        encrypt: true, 
        trustServerCertificate: true
    }
};

// Conexión y rutas de la API
sql.connect(dbConfig).then(pool => {
    console.log('✅ Conectado a SQL Server');

    // 1. GET: Obtener todos los tickets
    app.get('/api/tickets', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM Tickets ORDER BY id DESC');
            res.status(200).json(result.recordset);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al consultar los tickets' });
        }
    });

    // 2. GET por ID: Obtener un solo ticket
    app.get('/api/tickets/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Tickets WHERE id = @id');

            if (result.recordset.length === 0) {
                return res.status(404).json({ mensaje: 'Ticket no encontrado' });
            }
            res.status(200).json(result.recordset[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al consultar el ticket' });
        }
    });

    // 3. POST: Crear un nuevo ticket
    app.post('/api/tickets', async (req, res) => {
        try {
            const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;

            if (!asunto || !solicitante || !descripcion || !categoria || !prioridad || !estado) {
                return res.status(400).json({ mensaje: 'Complete todos los campos obligatorios' });
            }

            const result = await pool.request()
                .input('asunto', sql.NVarChar(150), asunto)
                .input('solicitante', sql.NVarChar(100), solicitante)
                .input('descripcion', sql.NVarChar(sql.MAX), descripcion)
                .input('categoria', sql.NVarChar(50), categoria)
                .input('prioridad', sql.NVarChar(50), prioridad)
                .input('estado', sql.NVarChar(50), estado)
                .query(`
                    INSERT INTO Tickets (asunto, solicitante, descripcion, categoria, prioridad, estado)
                    OUTPUT INSERTED.*
                    VALUES (@asunto, @solicitante, @descripcion, @categoria, @prioridad, @estado)
                `);

            res.status(201).json(result.recordset[0]);
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al registrar el ticket' });
        }
    });

    // 4. PUT: Actualizar un ticket existente
    app.put('/api/tickets/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const { asunto, solicitante, descripcion, categoria, prioridad, estado } = req.body;

            if (!asunto || !solicitante || !descripcion || !categoria || !prioridad || !estado) {
                return res.status(400).json({ mensaje: 'Complete todos los campos obligatorios' });
            }

            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('asunto', sql.NVarChar(150), asunto)
                .input('solicitante', sql.NVarChar(100), solicitante)
                .input('descripcion', sql.NVarChar(sql.MAX), descripcion)
                .input('categoria', sql.NVarChar(50), categoria)
                .input('prioridad', sql.NVarChar(50), prioridad)
                .input('estado', sql.NVarChar(50), estado)
                .query(`
                    UPDATE Tickets
                    SET asunto = @asunto,
                        solicitante = @solicitante,
                        descripcion = @descripcion,
                        categoria = @categoria,
                        prioridad = @prioridad,
                        estado = @estado
                    WHERE id = @id
                `);

            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ mensaje: 'Ticket no encontrado' });
            }

            res.status(200).json({ mensaje: 'Ticket actualizado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al actualizar el ticket' });
        }
    });

    // 5. DELETE: Eliminar un ticket
    app.delete('/api/tickets/:id', async (req, res) => {
        try {
            const { id } = req.params;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM Tickets WHERE id = @id');

            if (result.rowsAffected[0] === 0) {
                return res.status(404).json({ mensaje: 'Ticket no encontrado' });
            }

            res.status(200).json({ mensaje: 'Ticket eliminado correctamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ mensaje: 'Error al eliminar el ticket' });
        }
    });

    app.listen(PORT, () => {
        console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
    });

}).catch(err => {
    console.error('❌ Error conectando a la base de datos:', err);
});