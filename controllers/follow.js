//Acciones de prueba

const pruebaFollow = (req,res) => {
    return res.status(200).send({
        message: "Mensaje enviado desde: controller/follow.js"
    })
}

//Exportar Acciones
module.exports = {
    pruebaFollow
}