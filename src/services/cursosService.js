const db = require('../config/db');

module.exports.getCursos = async () => {
    const [rows] = await db.query(`
        SELECT 
            c.id_curso,
            c.id_grado,
            g.grado,
            g.abreviacion,
            c.division,
            c.turno,
            c.ciclo_lectivo,
            CAST(
                CASE 
                    WHEN COUNT(ac.id_alumno) = 1 THEN '1 alumno/a'
                    ELSE CONCAT(COUNT(ac.id_alumno), ' alumnos/as')
                END AS CHAR
            ) AS cantidad_alumnos,
            CONCAT(d.nombre, " ", d.apellido) as docente
        FROM cursos c
        INNER JOIN grados g ON g.id_grado = c.id_grado
        LEFT JOIN alumnos_cursos ac ON ac.id_curso = c.id_curso
        LEFT JOIN docentes d ON d.id_docente = c.id_docente
        GROUP BY c.id_curso, c.id_grado, g.grado, g.abreviacion, c.division, c.turno, c.ciclo_lectivo;
    `);
    return rows;
};

module.exports.getCursosAlumno = async (id_alumno) => {
    try {
        const [rows] = await db.query(
            `SELECT
                ac.id_curso,
                ac.id_alumno,
                g.grado,
                g.abreviacion,
                c.division,
                c.turno,
                c.ciclo_lectivo
            FROM alumnos_cursos ac
            INNER JOIN cursos c ON c.id_curso = ac.id_curso
            INNER JOIN grados g ON g.id_grado = c.id_grado
            WHERE id_alumno = ?
            ORDER BY c.ciclo_lectivo DESC`, [id_alumno]
        );
        return rows.length > 0 ? rows : null;
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;  // Re-throw para que sea manejado en el controlador
    }
};