import Paciente from "../models/Paciente.js";

const nuevoCliente = async (req, res, next) => {
  const paciente = new Paciente(req.body);

  try {
    const { nombre, propetario, fecha, hora, sintomas } = paciente;

    if (
      nombre.trim() === "" ||
      propetario.trim() === "" ||
      fecha.trim() === "" ||
      hora.trim() === "" ||
      sintomas.trim() === ""
    ) {
      res.json({ mensaje: "No pueden quedar datos vacios" });
      return;
    }
    await paciente.save();
    res.json({ mensaje: "El cliente se agrego correctamente" });
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error inesperadamente" });
    next();
  }
};
export { nuevoCliente };
