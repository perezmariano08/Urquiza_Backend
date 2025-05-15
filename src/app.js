const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const alumnosRoutes = require('./routes/alumnosRoutes');
const gradosRoutes = require('./routes/gradosRoutes');
const cursosRoutes = require('./routes/cursosRoutes');
// Agregá más rutas...

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/alumnos', alumnosRoutes);
app.use('/api/grados', gradosRoutes);
app.use('/api/cursos', cursosRoutes);

module.exports = app;
