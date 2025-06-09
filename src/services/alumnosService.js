const db = require('../config/db');

module.exports.getAlumnos = async () => {
    const [rows] = await db.query(`
        SELECT * 
        FROM alumnos 
        ORDER BY apellido ASC
    `);
    return rows;
};

module.exports.getAlumno = async (id) => {
    try {
        const [row] = await db.query(
            `SELECT * FROM alumnos WHERE id_alumno = ?`, [id]
        );
        return row.length > 0 ? row[0] : null;
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;  // Re-throw para que sea manejado en el controlador
    }
};

module.exports.getAlumnosCurso = async (id_curso) => {
    try {
        const [rows] = await db.query(
            `SELECT
                a.id_alumno,
                a.dni,
                CONCAT(a.apellido, ', ', a.nombre) AS alumno
            FROM alumnos_cursos ac
            INNER JOIN alumnos a ON a.id_alumno = ac.id_alumno
            WHERE id_curso = ?
            ORDER BY a.apellido ASC`, [id_curso]
        );
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;  // Re-throw para que sea manejado en el controlador
    }
};

module.exports.getAlumnosObservaciones = async (id_alumno) => {
    try {
        const [rows] = await db.query(
            `SELECT
                *
            FROM alumnos_observaciones
            WHERE id_alumno = ?`, [id_alumno]
        );
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;  // Re-throw para que sea manejado en el controlador
    }
};

// ✅ Service
module.exports.updateAlumno = async (id_alumno, datos) => {
    const { dni, nombre, apellido, genero, fecha_nacimiento, direccion, telefono, retira_solo } = datos;
    const query = `
        UPDATE alumnos
        SET dni = ?, nombre = ?, apellido = ?, genero = ?, fecha_nacimiento = ?, direccion = ?, telefono = ?, retira_solo = ?
        WHERE id_alumno = ?
    `;

    const [result] = await db.query(query, [
        dni, nombre, apellido, genero, fecha_nacimiento, direccion, telefono, retira_solo, id_alumno,
    ]);

    return result;
};
