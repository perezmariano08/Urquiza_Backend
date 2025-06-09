const authService = require('../services/authService');

module.exports.registerUserController = async (req, res) => {
    const datosUsuario = req.body;
    console.log('Cuerpo de la solicitud:', datosUsuario);

    try {
        const user = await authService.registerUser(datosUsuario);
        console.log('Resultado de registerUser:', user);

        if (!user || !user.message || !user.userId) {
            return res.status(500).json({ message: 'Error al procesar la respuesta del servicio' });
        }

        res.status(200).json({
            message: user.message,
            success: true,
            user: { id_usuario: user.userId }, // devolvés lo que envió el frontend
        });

    } catch (error) {
        console.error('Error en el controller:', error);
        res.status(error.status || 500).json({ message: error.message || 'Error desconocido' });
    }
};

module.exports.loginUserController = async (req, res) => {
    const { dni, password } = req.body;
    try {
        // Llamamos al servicio para validar las credenciales
        const user = await authService.loginUser(dni, password)
        // Desestructuramos message y success del objeto user
        const { message, success, ...userData } = user;
        // Si el inicio de sesión es exitoso, devolvemos la información del usuario
        res.status(200).json({
            message,
            success,
            user: userData,  // Devuelve el resto de la información del usuario
        });
    } catch (error) {
        // Si hay un error (por ejemplo, credenciales incorrectas), lo manejamos aquí
        res.status(error.status || 500).json({ message: error.message || 'Error desconocido' });
    }
};