//Importar dependencias y modulos
const bcrypt = require('bcryptjs');
const User = require("../models/user");

//Acciones de prueba

const pruebaUser = (req,res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controller/user.js"
    })
}

//Registro de usuarios

const register = async (req, res) => {
    //Recoger datos de la peticion
    let params = req.body;
    //Comprobar que me llegan + validacion
    if(!params.name || !params.email || !params.password || !params.nick){
        return res.status(500).json({
            status: "error",
            message: "FALTAN DATOS POR ENVIAR"
            
        });
    }

    // Crear objeto de usuario
    let userToSave = new User(params);

    try {
        // Comprobar usuarios duplicados usando async/await en lugar de exec(callback)
        const users = await User.find({
            $or: [
                { email: userToSave.email.toLowerCase() },
                { nick: userToSave.nick.toLowerCase() },
            ]
        });

        if (users && users.length >= 1) {
            return res.status(200).json({
                status: "error",
                message: "El usuario ya existe en el sistema"
            });
        }

        // Generar la "sal" y cifrar la contraseña
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(userToSave.password, salt);
        userToSave.password = hashedPassword;

        // Guardar el usuario en la base de datos
        const savedUser = await userToSave.save();
        console.log(userToSave)

        return res.status(200).json({
            status: "success",
            message: "Usuario registrado exitosamente",
            user: savedUser
        });

    } catch (error) {
        console.error("Error en el proceso de registro:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el proceso de registro"
        });
    }
};


const login = async (req, res) => {
    let params = req.body;

    // Validar que los datos requeridos estén presentes
    if (!params.email || !params.password) {
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        });
    }

    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ email: params.email.toLowerCase() });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "No existe el usuario"
            });
        }

        // Comprobar la contraseña
        const isPasswordCorrect = bcrypt.compareSync(params.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                status: "error",
                message: "No te has identificado correctamente"
            });
        }

        // Aquí generaremos el token en el futuro, por ahora lo dejamos como `false`
        const token = false;

        // Enviar respuesta con el usuario y el token
        return res.status(200).json({
            status: "success",
            message: "Te has identificado correctamente",
            user: {
                id: user._id,
                name: user.name,
                nick: user.nick,
                email: user.email // Agregué el email por si necesitas mostrarlo en el frontend
            },
            token
        });

    } catch (error) {
        console.error("Error en el proceso de login:", error);
        return res.status(500).json({
            status: "error",
            message: "Error en el proceso de login"
        });
    }
};

//Exportar Acciones
module.exports = {
    pruebaUser,
    register,
    login
}