const docentesService= require('../services/docentesService');

module.exports.getDocentesController = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const row = await docentesService.getDocente(id);            
            if (row) {
                return res.status(200).json(row);
            } else {
                return res.status(404).json({ message: 'Docente no encontrado' });
            }
        } else {
            const rows = await docentesService.getDocentes();            
            return res.status(200).json(rows);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los docentes', error });
    }
};