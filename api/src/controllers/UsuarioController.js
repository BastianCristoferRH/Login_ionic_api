const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

exports.registrarUsuario = [
    body('correo').isEmail().withMessage('El correo debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { correo, nombre_completo, password, id_comuna, imagen_perfil } = req.body;
        const fecha_creacion = new Date();
        const estado_cuenta = 'activo';
        try {
            const usuarioExistente = await Usuario.buscarPorCorreo(correo);
            if (usuarioExistente) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const nuevoUsuario = new Usuario(null, correo,nombre_completo ,hashPassword, null, fecha_creacion, id_comuna, imagen_perfil || null, estado_cuenta);
            await nuevoUsuario.registrar();
            return res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al registrar el usuario' });
        }
    }
];
