const express = require('express');
const { getObservacionesDocenteController, crearObservacionController } = require('../controllers/observacionesController');
const router = express.Router();

router.get('/docentes/:id_docente', getObservacionesDocenteController);    
router.post('/', crearObservacionController);


module.exports = router;
