import express from "express";
import cors from "cors";
import router from "./routes/route.js";
import conectarDB from "./config/db.js";

//Crear el servidor
const app = express();


//Habilitar cors
app.use( cors() );


//conectar a la DBR
conectarDB();

const port = process.env.PORT || 4000;

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

//Agregar Router
app.use("/", router);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto: ${port}`);
});