const conexion = require('../config/Conexion');
class Usuario {
    constructor(idUsuario, correo, password, ultimaConexion, fechaCreacion, googleId, idComuna) {
        this.idUsuario = idUsuario;
        this.correo = correo;
        this.password = password;
        this.ultimaConexion = ultimaConexion;
        this.fechaCreacion = fechaCreacion;
        this.googleId = googleId;
        this.idComuna = idComuna;
    }

    static async buscarPorCorreo(correo) {
        const [usuario] = await conexion.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
        return usuario.length > 0 ? usuario[0] : null; 
    }

    async registrar() {
        const query = 'INSERT INTO Usuarios (correo, password, fecha_creacion, google_id, id_comuna) VALUES (?, ?, ?, ?, ?)';
        await conexion.query(query, [this.correo, this.password, this.fechaCreacion, this.googleId, this.idComuna]);
    }
}

module.exports = Usuario;