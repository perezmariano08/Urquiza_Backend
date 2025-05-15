const gradosService = require('../services/gradosService');

module.exports.getGradosController = async (req, res) => {
    try {
        const rows = await gradosService.getGrados();            
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los grados', error });
    }
};