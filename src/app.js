const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const alumnosRoutes = require('./routes/alumnosRoutes');
const gradosRoutes = require('./routes/gradosRoutes');
const cursosRoutes = require('./routes/cursosRoutes');
const authRoutes = require('./routes/authRoutes');
const docentesRoutes = require('./routes/docentesRoutes');
const tutoresRoutes = require('./routes/tutoresRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const observacionesRoutes = require('./routes/observacionesRoutes');
const archivosRoutes = require('./routes/archivosRoutes');

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
app.use('/api/auth', authRoutes);
app.use('/api/docentes', docentesRoutes);
app.use('/api/tutores', tutoresRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/observaciones', observacionesRoutes);
app.use('/api/archivos', archivosRoutes);

module.exports = app;
