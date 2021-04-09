import express from "express";
import {nuevoCliente} from "../controllers/pacienteControllers.js";

const router = express.Router();

router.post('/pacientes',nuevoCliente)

export default router;
