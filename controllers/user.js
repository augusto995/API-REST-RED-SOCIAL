//Acciones de prueba

const pruebaUser = (req,res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controller/user.js"
    })
}

//Registro de usuarios

const register = (req, res) => {
    //Recoger datos de la peticion
    //Comprobar que me llegan + validacion
    //Comprobar usuarios duplicados
    //Cifrar la contraseña
    //Guardar usuario en la bdd
    //Devolver resultado
    return res.status(200).json({
        message: "Accion de registro de usuarios"
    });
}

//Exportar Acciones
module.exports = {
    pruebaUser,
    register
}