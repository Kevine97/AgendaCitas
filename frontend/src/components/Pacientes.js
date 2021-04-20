import React from "react";
import { Link } from "react-router-dom";
import Spinner from "./Spinner";

const Pacientes = ({ citas }) => {
  if (citas.length === 0) return <Spinner />;

  const { code, datos, mensaje, status } = citas;

  if (code !== 200 && status !== "OK") {
    return;
  }
  return (
    <>
      <h1 className="my-5 ">{mensaje}</h1>

      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/nuevaCita"}
              className="btn btn-success text-uppercase mb-5 px-5 font-weight-bold"
            >
              Crear cita
            </Link>
          </div>

          <div className="col-md-8 mx-auto">
            <div className="list-group">
              {datos.map((cita) => (
                <Link
                  key={cita._id}
                  className="p-5 list-group-item list-group-item-action flex-column align-item-start"
                >
                  <div className="d-flex w-100 justify-content-between mb-4">
                    <h3 className="mb-3">{cita.nombre}</h3>
                    <small className="fecha-alta">
                      {cita.fecha} {"    "} {cita.hora}
                    </small>
                  </div>
                  <p className="mb-0 font-weight-bold">
                    <span className="font-weight-bold">Sintommas: </span>{" "}
                    {cita.sintomas}
                  </p>
                  <div className="contacto py-3 font-weight-bold">
                    <p>
                      <span className="font-weight-bold">Propietario: </span>
                      {cita.propetario}
                    </p>
                    <p>Telefono: {cita.telefono}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pacientes;
