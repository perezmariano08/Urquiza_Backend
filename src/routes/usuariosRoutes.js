const express = require('express');
const { getUsuariosController } = require('../controllers/usuariosController');
const router = express.Router();

router.get('/', getUsuariosController);    
router.get('/:id', getUsuariosController);    


module.exports = router;
