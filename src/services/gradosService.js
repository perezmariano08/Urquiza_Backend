const db = require('../config/db');

module.exports.getGrados = async () => {
    const [rows] = await db.query('SELECT * FROM grados');
    return rows;
};

// module.exports.getAlumno = async (id) => {
//     try {
//         const [row] = await db.query(
//             `SELECT * FROM alumnos WHERE id_alumno = ?`, [id]
//         );
//         return row.length > 0 ? row[0] : null;
//     } catch (error) {
//         console.error('Error en la consulta', error);
//         throw error;  // Re-throw para que sea manejado en el controlador
//     }
// };