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


const login = (req, res) =>{
    let params = req.body;

    if(!!params.email || !params.password){
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        }); 
    }
    User.findOne({email: params.email})
        .select({"password": 0})
        .exec((error, user) =>{
        if(error || !user) return res.status(404).json({
            status: "error",
            message: "No existe el usuario"
        });  

        return res.status(200).send({
            status: "succes",
            message: "Accion de login",
            user
        })
    })   
}

//Exportar Acciones
module.exports = {
    pruebaUser,
    register,
    login
}