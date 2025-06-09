const observacionesService = require('../services/observacionesService');

module.exports.getObservaciones = async (req, res) => {
    const { id } = req.params;
    try {
        if (id) {
            const row = await observacionesService.getTutor(id);            
            if (row) {
                return res.status(200).json(row);
            } else {
                return res.status(404).json({ message: 'Observacion no encontrado' });
            }
        } else {
            const rows = await observacionesService.getTutores();            
            return res.status(200).json(rows);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las observaciones', error });
    }
};

module.exports.getObservacionesDocenteController = async (req, res) => {
    const { id_docente } = req.params;
    try {
        const rows = await observacionesService.getObservacionesDocente(id_docente);            
        if (rows) {
            return res.status(200).json(rows);
        } else {
            return res.status(404).json({ message: 'Observaciones del docente no encontradas' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error al obtener las observaciones', error });
    }
};

module.exports.crearObservacionController = async (req, res) => {
    const { fecha, id_alumno, id_docente, observacion } = req.body;

    if (!fecha || !id_alumno || !id_docente || !observacion) {
        return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    try {
        const idInsertado = await observacionesService.crearObservacion({
            fecha,
            id_alumno,
            id_docente,
            observacion
        });

        return res.status(201).json({ message: 'Observación creada', id: idInsertado });
    } catch (error) {
        return res.status(500).json({ message: 'Error al crear observación', error });
    }
};
