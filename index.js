//Importar dependencias
const connection = require("./database/connection")
const express = require("express")
const cors = require("cors")

//Mensaje bienvenida

console.log("Api Node para red social arrancada")


//Conexion a la base de datos
connection();

//Crear servidor de node
const app = express();
const puerto = 3900;

//Configurar el corss
app.use(cors());

//Convertir datos del body a obj js
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Cargar configuracion de rutas
//Ruta de prueba
app.get("ruta-prueba", (req, res) =>{
    return res.status(200).json(
        {
            "id": 1,
            "nombre": "Augusto",
            "web": "augusto.es"
        }
    )
})

//Poner servidor a escuchar peticiones http

app.listen(puerto, () => {
    console.log("Servidor de node corriendo en el puerto: ", puerto);
});