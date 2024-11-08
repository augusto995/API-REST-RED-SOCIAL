//Importar dependencias y modulos
const User = require("../models/user");

//Acciones de prueba

const pruebaUser = (req,res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controller/user.js"
    })
}

//Registro de usuarios

const register = (req, res) => {
    //Recoger datos de la peticion
    let params = req.body;
    //Comprobar que me llegan + validacion
    if(!params.name || !params.email || !params.password || !params.nick){
        return res.status(500).json({
            status: "error",
            message: "FALTAN DATOS POR ENVIAR"
            
        });
    }

    //Crear objeto de usuario
    let userToSave = new User(params)
    //Comprobar usuarios dup!licados
    User.find({$or: [
        {email: userToSave.email.toLowerCase()},
        {nick: userToSave.nick.toLowerCase()},
    ]}).exec((error, users) => {
        if(error) return res.status(500).json({status: "error", message:"Error en la consulta de usuarios "});

        if(users && users.length >=1){
            return res.status(200).json({
                status: "succes",
                message: "Accion de registro de usuarios"
            })
        }
        //Cifrar la contraseña
        //Guardar usuario en la bdd
        //Devolver resultado
        return res.status(200).json({
            status: "succes",
            message: "Accion de registro de usuarios",
            params,
            userToSave
        });
        
    }) 
}

//Exportar Acciones
module.exports = {
    pruebaUser,
    register
}