const usuariosService = require('../services/usuariosService');

module.exports.getUsuariosController = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const row = await usuariosService.getUsuario(id);            
            if (row) {
                return res.status(200).json(row);
            } else {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }
        } else {
            const rows = await usuariosService.getUsuarios();            
            return res.status(200).json(rows);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los usuarios', error });
    }
};