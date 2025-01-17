const mysql = require('mysql2/promise');
require('dotenv').config();

const conexion = mysql.createPool({
  host: process.env.DB_HOST || 'localhost', 
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'login',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

conexion.getConnection()
  .then(() => console.log('Conexión a la base de datos establecida correctamente'))
  .catch((err) => console.error('Error al conectar con la base de datos:', err.message));

module.exports = conexion;