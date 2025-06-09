const db = require('../config/db');

module.exports.getUsuarios = async () => {
    const [rows] = await db.query(`
        SELECT * 
        FROM usuarios 
    `);
    return rows;
};

module.exports.getUsuario = async (id) => {
    try {
        const [row] = await db.query(
            `SELECT * FROM usuarios WHERE id_usuario = ?`, [id]
        );
        return row.length > 0 ? row[0] : null;
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;  // Re-throw para que sea manejado en el controlador
    }
};