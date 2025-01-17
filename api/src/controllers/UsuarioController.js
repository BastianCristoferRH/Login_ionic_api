const conexion = require('../config/Conexion');
const bcrypt = require('bcrypt'); 
const { body, validationResult } = require('express-validator'); 
exports.registrarUsuario = [
    body('correo').isEmail().withMessage('El correo debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { correo, password, id_comuna, google_id } = req.body;
        const fecha_creacion = new Date();

        try {
            const hashPassword = await bcrypt.hash(password, 10);
            const [usuarioExistente] = await conexion.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
            if (usuarioExistente.length > 0) {
                return res.status(400).json({ message: 'El correo ya está registrado' });
            }
            const query = 'INSERT INTO Usuarios (correo, password, fecha_creacion, google_id, id_comuna) VALUES (?, ?, ?, ?, ?)';
            await conexion.query(query, [correo, hashPassword, fecha_creacion, google_id, id_comuna]);
            return res.status(201).json({ message: 'Usuario registrado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al registrar el usuario' });
        }
    }
];