const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user")

//Definir rutas

router.get("/prueba-usuario", UserController.pruebaUser);
router.post("/register", UserController.register);
router.post("/login", UserController.login);

//Exportar el router

module.exports = router;