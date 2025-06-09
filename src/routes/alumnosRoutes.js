const express = require('express');
const { getAlumnosController, getAlumnosCursoController, getAlumnosObservacionesController, updateAlumnoController } = require('../controllers/alumnosController');
const router = express.Router();

// A futuro: agregar middlewares de autenticación
router.put('/update/:id_alumno', updateAlumnoController);
router.get('/', getAlumnosController); // ✅ para /alumnos (todos)
router.get('/:id_alumno/observaciones', getAlumnosObservacionesController);
router.get('/curso/:id_curso', getAlumnosCursoController);
router.get('/:id', getAlumnosController);


module.exports = router;
