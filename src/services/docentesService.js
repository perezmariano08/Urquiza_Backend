const db = require('../config/db');

module.exports.getDocentes = async () => {
    const [rows] = await db.query(`
        SELECT * 
        FROM docentes
    `);
    return rows;
};

module.exports.getDocente = async (id) => {
    try {
        const [row] = await db.query(
            `SELECT * FROM docentes WHERE id_docente = ?`, [id]
        );
        return row.length > 0 ? row[0] : null;
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;  // Re-throw para que sea manejado en el controlador
    }
};