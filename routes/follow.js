const express = require("express");
const router = express.Router();
const FollowController = require("../controllers/follow")

//Definir rutas

router.get("/prueba-follow", FollowController.pruebaFollow);

//Exportar el router

module.exports = router;