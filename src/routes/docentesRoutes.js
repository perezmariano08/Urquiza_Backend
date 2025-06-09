const express = require('express');
const { getDocentesController, getAsistenciasDocenteController } = require('../controllers/docentesController');
const router = express.Router();

router.get('/asistencias/:id_docente', getAsistenciasDocenteController);       // Para obtener todos los docentes
router.get('/', getDocentesController);       // Para obtener todos los docentes
router.get('/:id', getDocentesController);    // Para obtener uno por ID


module.exports = router;
