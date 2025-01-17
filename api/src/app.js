const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usuariosRoutes = require('./routes/UsuarioRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use('/api/usuarios', usuariosRoutes); 

module.exports = app;