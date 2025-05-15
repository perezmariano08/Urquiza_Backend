const express = require('express');
const { getCursosController, getCursosAlumnoController } = require('../controllers/cursosController');
const router = express.Router();

// A futuro: agregar middlewares de autenticación
router.get('/', getCursosController);
router.get('/alumnos/:id_alumno', getCursosAlumnoController);

module.exports = router;
