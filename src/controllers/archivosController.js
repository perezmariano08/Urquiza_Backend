const archivosService = require('../services/archivosService');

module.exports.getArchivosAlumnoController = async (req, res) => {
    const { id_alumno } = req.params;
    try {
        const rows = await archivosService.getArchivosAlumno(id_alumno);            
        if (rows) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ message: 'Tutores del alumno no encontrados' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los tutores', error });
    }
};