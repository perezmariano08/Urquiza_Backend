const express = require('express');
const { getGradosController } = require('../controllers/gradosController');
const router = express.Router();

// A futuro: agregar middlewares de autenticación
router.get('/', getGradosController);

module.exports = router;
