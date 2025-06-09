const db = require('../config/db');

module.exports.getTutores = async () => {
    const [rows] = await db.query(`
        SELECT 
            t.apellido,
            t.nombre,
            t.dni,
            t.parentesco,
            t.id_alumno,
            t.id_tutor,
            t.telefono,
            t.email,
            CONCAT(a.nombre, " ", a.apellido) as alumno
        FROM tutores t
        LEFT JOIN alumnos a ON a.id_alumno = t.id_alumno
        ORDER BY t.apellido ASC
    `);
    return rows;
};

module.exports.getTutor = async (id) => {
    try {
        const [row] = await db.query(
            `SELECT * FROM tutores WHERE id_tutor = ?`, [id]
        );
        return row.length > 0 ? row[0] : null;
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;  // Re-throw para que sea manejado en el controlador
    }
};

module.exports.getTutoresAlumno = async (id_alumno) => {
    try {
        const [rows] = await db.query(
            `SELECT
                *
            FROM tutores 
            WHERE id_alumno = ?
            ORDER BY apellido ASC`, [id_alumno]
        );
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;  // Re-throw para que sea manejado en el controlador
    }
};

