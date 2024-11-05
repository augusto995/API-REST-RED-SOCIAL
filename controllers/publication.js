//Acciones de prueba

const pruebaPublication = (req,res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controller/user.js"
    })
}

//Exportar Acciones
module.exports = {
    pruebaPublication
}