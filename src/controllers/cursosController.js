const cursosService = require('../services/cursosService');

module.exports.getCursosController = async (req, res) => {
    try {
        const rows = await cursosService.getCursos();            
        return res.status(200).json(rows);
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los cursos', error });
    }
};

module.exports.getCursosAlumnoController = async (req, res) => {
    const { id_alumno } = req.params;
    try {
        const rows = await cursosService.getCursosAlumno(id_alumno);            
        if (rows) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ message: 'Cursos del alumno no encontrados' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los cursos', error });
    }
};
