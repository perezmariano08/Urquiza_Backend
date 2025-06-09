const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 10000 // <-- esto evita cuelgues largos
});

// Probar conexión al iniciar
(async () => {
    try {
        const conn = await pool.getConnection();
        console.log('✅ Conexión a la base de datos exitosa');
        conn.release();
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error.message);
    }
})();

module.exports = pool;
