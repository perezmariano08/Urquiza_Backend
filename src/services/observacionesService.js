const db = require('../config/db');

module.exports.getObservaciones = async () => {
    const [rows] = await db.query(`
        SELECT * 
        FROM alumnos_observaciones
    `);
    return rows;
};

module.exports.getObservacionesDocente = async (id_docente) => {
    try {
        const [rows] = await db.query(
            `SELECT 
                ad.fecha,
                ad.id_alumno,
                ad.id_docente,
                ad.observacion,
                CONCAT(a.nombre, " ", a.apellido) as alumno
            FROM alumnos_observaciones ad
            LEFT JOIN alumnos a ON a.id_alumno = ad.id_alumno
            WHERE id_docente = ?
            ORDER BY fecha DESC`, [id_docente]
        );
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;  // Re-throw para que sea manejado en el controlador
    }
};

module.exports.crearObservacion = async ({ fecha, id_alumno, id_docente, observacion }) => {
    try {
        const [result] = await db.query(`
            INSERT INTO alumnos_observaciones (fecha, id_alumno, id_docente, observacion)
            VALUES (?, ?, ?, ?)
        `, [fecha, id_alumno, id_docente, observacion]);

        return result.insertId; // Devuelve el ID generado
    } catch (error) {
        console.error('Error al crear observación:', error);
        throw error;
    }
};
