const tutoresService = require('../services/tutoresService');

module.exports.getTutoresController = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const row = await tutoresService.getTutor(id);            
            if (row) {
                return res.status(200).json(row);
            } else {
                return res.status(404).json({ message: 'Tutor no encontrado' });
            }
        } else {
            const rows = await tutoresService.getTutores();            
            return res.status(200).json(rows);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los tutores', error });
    }
};

module.exports.getTutoresAlumnoController = async (req, res) => {
    const { id_alumno } = req.params;
    try {
        const rows = await tutoresService.getTutoresAlumno(id_alumno);            
        if (rows) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ message: 'Tutores del alumno no encontrados' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los tutores', error });
    }
};