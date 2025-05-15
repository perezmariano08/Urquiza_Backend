const express = require('express');
const { getDocentesController } = require('../controllers/docentesController');
const router = express.Router();

router.get('/:id', getDocentesController);

module.exports = router;
