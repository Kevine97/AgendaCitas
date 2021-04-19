import express from "express";
import {
  nuevoCliente,
  obtenerCliente,
  obtenerClienteId,
  updateCliente,
  deleteCliente,
} from "../controllers/pacienteControllers.js";
import { check } from "express-validator";

const router = express.Router();

//Agregar una cita
router.post(
  "/pacientes",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("propetario", "El propetario es obligatorio").not().isEmpty(),
    check("fecha", "La fecha es obligatorio").not().isEmpty(),
    check("hora", "La hora es obligatorio").not().isEmpty(),
    check("sintomas", "Los sintomas es obligatorio").not().isEmpty(),
  ],
  nuevoCliente
);
//Obetener todos clientes registrados
router.get("/pacientes", obtenerCliente);
//Obetener un cliente en especifico
router.get("/pacientes/:id", obtenerClienteId);
//Actualizamos un regsitro
router.put(
  "/pacientes/:id",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("propetario", "El propetario es obligatorio").not().isEmpty(),
    check("fecha", "La fecha es obligatorio").not().isEmpty(),
    check("hora", "La hora es obligatorio").not().isEmpty(),
    check("sintomas", "Los sintomas es obligatorio").not().isEmpty(),
  ],
  updateCliente
);
//Eliminamos un regsitro
router.delete("/pacientes/:id", deleteCliente);


export default router;
