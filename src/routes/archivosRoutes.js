const express = require('express');
const { getArchivosAlumnoController } = require('../controllers/archivosController');
const router = express.Router();

router.get('/alumnos/:id_alumno', getArchivosAlumnoController);    


module.exports = router;
