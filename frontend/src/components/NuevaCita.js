import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
const NuevaCita = (props) => {
  const [citas, guardarCitas] = useState({
    nombre: "",
    propetario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const actualizarState = (e) => {
    guardarCitas({
      ...citas,
      [e.target.name]: e.target.value,
    });
  };

  const crearCita = (e) => {
    e.preventDefault();
    clienteAxios
      .post("/pacientes", citas)
      .then((response) => {
        Swal.fire({
          title: "Success",
          text: response.data.mensaje,
          icon: "success",
          confirmButtonText: "OK",
          timer: 1500,
        });
        props.guardarConsultar(true);
        setTimeout(() => {
          props.history.push("/");
        }, 2000);
      })
      .catch((error) => {
        const mensaje = [];
        console.log(error.response);
        mensaje.push(error.response.data.mensaje);
        if (mensaje.length > 0) {
          Swal.fire({
            title: "Error",
            text: "No pueden quedar campos vacios",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };
  return (
    <>
      <h1 className="my-5 ">Nueva cita</h1>
      <div className="container mt-5 py-5">
        <div className="row">
          <div className="col-12 mb-5 d-flex justify-content-center">
            <Link
              to={"/"}
              className="btn btn-success text-uppercase px-5 font-weight-bold"
            >
              {" "}
              Volver a citas
            </Link>
          </div>

          <div className="col-md-8 mx-auto">
            <form className="bg-white p-5 bordered" onSubmit={crearCita}>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Mascota</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre Mascota"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="propietario">Nombre Propietario</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  id="propietario"
                  name="propetario"
                  placeholder="Nombre Propietario"
                  onChange={actualizarState}                 
                />
              </div>

              <div className="form-group">
                <label htmlFor="telefono">Teléfono</label>
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  id="telefono"
                  name="telefono"
                  placeholder="Teléfono"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="fecha">Fecha Alta</label>
                <input
                  type="date"
                  className="form-control form-control-lg"
                  id="fecha"
                  name="fecha"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="hora">Hora Alta</label>
                <input
                  type="time"
                  className="form-control form-control-lg"
                  id="hora"
                  name="hora"
                  onChange={actualizarState}
                />
              </div>

              <div className="form-group">
                <label htmlFor="sintomas">Síntomas</label>
                <textarea
                  className="form-control"
                  name="sintomas"
                  rows="6"
                  onChange={actualizarState}
                ></textarea>
              </div>

              <input
                type="submit"
                className="btn btn-primary btn-lg btn-block mt-3 w-100 p-3 text-uppercase font-weight-bold"
                value="Crear Cita"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(NuevaCita);
