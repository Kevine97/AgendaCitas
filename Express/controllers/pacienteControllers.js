import Paciente from "../models/Paciente.js";
import { validationResult } from "express-validator";

import dotenv from "dotenv";
dotenv.config({ path: "variables.env" });

//Agrega una cita al paciente
const nuevoCliente = async (req, res, next) => {
  const paciente = new Paciente(req.body);

  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "Not found",
        code: 400,
        mensaje: error.mapped(),
      });
    }

    const pacientes = await paciente.save();
    res.status(200).json({
      status: "OK",
      code: 200,
      mensaje: "Usuario Agregado",
      datos: pacientes,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: "Not found",
      code: 501,
      mensaje: "Hubo un error inesperadamente",
    });
    next();
  }
};

//Obtiene todos los clientes
const obtenerCliente = async (req, res, next) => {
  try {
    const paciente = await Paciente.find({});
    res.status(200).json({
      status: "OK",
      code: 200,
      mensaje: "Pacientes registrados",
      datos: paciente,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: "Not found",
      code: 501,
      mensaje: "Hubo un error inesperadamente",
    });
    next();
  }
};

//Obtiene un cliente especifico
const obtenerClienteId = async (req, res, next) => {
  try {
    const paciente = await Paciente.findById(req.params.id);

    res.status(200).json({
      status: "OK",
      code: 200,
      mensaje: "Excelente",
      datos: paciente,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: "Not found",
      code: 501,
      mensaje: "Hubo un error inesperadamente",
    });
    next();
  }
};

const updateCliente = async (req, res, next) => {
  try {
    const error = validationResult(req);

    if (!error.isEmpty()) {
      return res.status(400).json({
        status: "Not found",
        code: 400,
        mensaje: error.mapped(),
      });
    }

    const paciente = await Paciente.findOneAndUpdate(
      { _id: req.params.id},
      req.body,
      { new: true }
    );
    res.status(200).json({
      status: "OK",
      code: 200,
      mensaje: "Usuario actualizado",
      datos: paciente,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: "Not found",
      code: 501,
      mensaje: "Hubo un error inesperadamente",
    });
    next();
  }
};

const deleteCliente = async (req, res, next) => {
  try {
    const paciente = await Paciente.findOneAndDelete({
      _id: req.params.id,
    });
    res.status(200).json({
      status: "OK",
      code: 200,
      mensaje: "Usuario eliminado",
      datos: paciente,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      status: "Not found",
      code: 501,
      mensaje: "Hubo un error inesperadamente",
    });
    next();
  }
};

export {
  nuevoCliente,
  obtenerCliente,
  obtenerClienteId,
  updateCliente,
  deleteCliente,
};
