const express = require('express');
const { getTutoresController, getTutoresAlumnoController } = require('../controllers/tutoresController');
const router = express.Router();

router.get('/', getTutoresController);    
router.get('/alumnos/:id_alumno', getTutoresAlumnoController);    
router.get('/:id', getTutoresController);    


module.exports = router;
