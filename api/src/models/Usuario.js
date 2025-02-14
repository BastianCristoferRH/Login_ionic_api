const conexion = require('../config/Conexion');
class Usuario {
    constructor(idUsuario, correo, password, ultimaConexion, fechaCreacion, idComuna, imagenPerfil, estadoCuenta) {
        this.idUsuario = idUsuario;
        this.correo = correo;
        this.password = password;
        this.ultimaConexion = ultimaConexion;
        this.fechaCreacion = fechaCreacion;
        this.idComuna = idComuna;
        this.imagenPerfil = imagenPerfil;
        this.estadoCuenta = estadoCuenta;

    }

    static async buscarPorCorreo(correo) {
        const [usuario] = await conexion.query('SELECT * FROM Usuarios WHERE correo = ?', [correo]);
        return usuario.length > 0 ? usuario[0] : null;
    }

    async registrar() {
        const query = 'INSERT INTO Usuarios (correo, password, fecha_creacion, id_comuna, imagen_perfil, estado_cuenta) VALUES (?, ?, ?, ?, ?, ?)';
        await conexion.query(query, [this.correo, this.password, this.fechaCreacion, this.idComuna, this.imagenPerfil || null, this.estadoCuenta || 'activo']);
    }
}

module.exports = Usuario;