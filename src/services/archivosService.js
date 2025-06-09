const db = require('../config/db');

module.exports.getArchivosAlumno = async (id_alumno) => {
    try {
        const [rows] = await db.query(
            `SELECT
                *
            FROM alumnos_archivos 
            WHERE id_alumno = ?`, [id_alumno]
        );
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;  // Re-throw para que sea manejado en el controlador
    }
};