import React from "react";
const Pacientes = ({ citas }) => {
  if (citas.length === 0) return null;
  console.log(citas);
  const { code, datos, mensaje, status } = citas;
  return (
    <>
      <h1 className="my-5 ">{mensaje}</h1>

      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <a
              href="#"
              className="btn btn-success text-uppercase mb-5 px-5 font-weight-bold"
            >
              Crear cita
            </a>
            <div className="list-group">
              {datos.map((cita) => (
                <a
                  key={cita._id}
                  className="p-5 list-group-item list-group-item-action flex-column align-item-start"
                >
                  <div className="d-flex w-100 justify-content-between mb-4">
                    <h3 className="mb-3">{cita.nombre}</h3>
                    <small className="fecha-alta">
                      {cita.fecha} - {cita.hora}
                    </small>
                  </div>
                  <p className="mb-0">
                    <span className="font-weight-bold">Sintommas:</span>{" "}
                    {cita.sintomas}
                  </p>
                  <div className="contacto py-3">
                    <p><span className="font-weight-bold">Propietario: </span>{cita.propetario}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pacientes;
