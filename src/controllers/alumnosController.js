const alumnosService = require('../services/alumnosService');

module.exports.getAlumnosController = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const row = await alumnosService.getAlumno(id);            
            if (row) {
                return res.status(200).json(row);
            } else {
                return res.status(404).json({ message: 'Alumno no encontrado' });
            }
        } else {
            const rows = await alumnosService.getAlumnos();            
            return res.status(200).json(rows);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los alumnos', error });
    }
};

module.exports.getAlumnosCursoController = async (req, res) => {
    const { id_curso } = req.params;
    try {
        const rows = await alumnosService.getAlumnosCurso(id_curso);            
        if (rows) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ message: 'Alumnos del curso no encontrados' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener los alumnos', error });
    }
};

module.exports.getAlumnosObservacionesController = async (req, res) => {
    const { id_alumno } = req.params;
    try {
        const rows = await alumnosService.getAlumnosObservaciones(id_alumno);            
        if (rows) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ message: 'Observaciones del alumno no encontrados' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las observaciones', error });
    }
};

// ✅ Controller
module.exports.updateAlumnoController = async (req, res) => {
    const { id_alumno } = req.params;
    const datos = req.body;

    try {
        const resultado = await alumnosService.updateAlumno(id_alumno, datos);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Alumno no encontrado' });
        }

        return res.status(200).json({ message: 'Alumno actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar alumno:', error);
        return res.status(500).json({ message: 'Error al actualizar el alumno' });
    }
};
