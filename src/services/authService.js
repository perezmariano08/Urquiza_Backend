const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { capitalizarTexto } = require('../utils/utils');

module.exports.loginUser = async (dni, password) => {
    try {
        const [results] = await db.query('SELECT * FROM usuarios WHERE dni = ?', [dni]);

        if (results.length === 0) {
            return { success: false, message: 'El DNI o la contraseña no son correctas. Por favor, inténtalo de nuevo.' };
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return { success: false, message: 'El usuario o la contraseña no son correctas. Por favor, inténtalo de nuevo.' };
        }

        // ✅ Generar el token
        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                dni: user.dni,
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // ✅ Si es docente, buscar su curso
        let id_curso = null;
        if (user.id_docente) {
            const [cursoResult] = await db.query('SELECT id_curso FROM cursos WHERE id_docente = ?', [user.id_docente]);
            if (cursoResult.length > 0) {
                id_curso = cursoResult[0].id_curso;
            }
        }

        // ✅ Retornar todo
        return {
            success: true, 
            message: 'Inicio sesión EXITOSO',
            token,
            nombre: user.nombre,
            apellido: user.apellido,
            id_usuario: user.id_usuario,
            id_rol: user.id_rol,
            id_docente: user.id_docente || null,
            id_curso: id_curso || null
        };
    } catch (error) {
        return { success: false, message: 'Hubo un error con el servidor' };
    }
};


module.exports.registerUser = async (datos) => {
    try {
        const { dni, password, nombre, apellido } = datos;

        if (!dni) {
            throw { status: 400, message: 'El DNI es obligatorio' };
        }

        if (isNaN(dni)) {
            throw { status: 400, message: 'El DNI debe ser un número válido' };
        }

        if (!password) {
            throw { status: 400, message: 'La contraseña es obligatoria' };
        }

        // Verificar si ya existe el DNI
        const [existing] = await db.query('SELECT id_usuario FROM usuarios WHERE dni = ?', [dni]);
        if (existing.length > 0) {
            throw { status: 400, message: 'El DNI ya está registrado' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const nombreCapitalizado = capitalizarTexto(nombre);
        const apellidoCapitalizado = capitalizarTexto(apellido);

        const query = `
            INSERT INTO usuarios (dni, password, nombre, apellido)
            VALUES (?, ?, ?, ?)
        `;
        const [result] = await db.query(query, [dni, hashedPassword, nombreCapitalizado, apellidoCapitalizado]);

        console.log('Usuario insertado con ID:', result.insertId);

        return {
            userId: result.insertId,
            message: 'Usuario registrado exitosamente'
        };

    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw {
            status: error.status || 500,
            message: error.message || 'Error al registrar el usuario',
        };
    }
};