const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/UsuarioController');  

router.post('/registro', usuariosController.registrarUsuario); 

module.exports = router;
