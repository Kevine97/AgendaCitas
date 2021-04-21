import React, {useState} from "react";
import { Link, withRouter } from "react-router-dom";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";
import $ from 'jquery';
const Cita = (props) => {





  const {
    listaCitas: { _id, nombre, propetario, fecha, hora, sintomas, telefono },
  } = props;

  const [actualizar, guardarActualizar] = useState({
    nombre: "",
    propetario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
  });

  const actualizarState = (e) => {
    guardarActualizar({
      ...actualizar,
      [e.target.name]: e.target.value,
    });
  };

  const eliminarCita = (id) => {
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Eliminar una cita",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminar",
          text: "Cita eliminada con exito",
          icon: "success",
          confirmButtonText: "OK",
          timer: 1500,
        });

        clienteAxios
          .delete(`/pacientes/${id}`)
          .then((response) => {
            console.log(response);
            props.guardarConsultar(true);
            //setTimeout(() => {
            props.history.push("/");
            //}, 2000);
          })
          .catch((error) => console.log(error.response));
      }
    });
  };

  const actualizarCita = (id) => {
    
    Swal.fire({
      title: "¿Estas seguro?",
      text: "Actualizar una cita",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, actualizar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Actualizar",
          text: "Cita actualizada con exito",
          icon: "success",
          confirmButtonText: "OK",
          timer: 1500,
        });

        clienteAxios
          .put(`/pacientes/${id}`,actualizar)
          .then((response) => {
            
            props.guardarConsultar(true);         
            document.querySelector("#formularioActualizar").reset();
            $("#actualizarModal").modal("hide");
   
          })
          .catch((error) => console.log(error.response));
      }
    });
  };

  return (
    <div>
     <div className="container">
     <h1 className="mt-5">Detalle de la cita: {propetario}</h1>
     </div>

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
            <div className="list-group">
              <div className="p-5 list-group-item list-group-item-action flex-column align-item-start">
                <div className="d-flex w-100 justify-content-between mb-4">
                  <h3 className="mb-3">{nombre}</h3>
                  <small className="fecha-alta">
                    {fecha} {"    "} {hora}
                  </small>
                </div>
                <p className="mb-0 font-weight-bold">
                  <span className="font-weight-bold">Sintomas: </span>{" "}
                  {sintomas}
                </p>
                <div className="contacto py-3 font-weight-bold">
                  <p>
                    <span className="font-weight-bold">Propietario: </span>
                    {propetario}
                  </p>
                  <p>Telefono: {telefono}</p>
                </div>
                <div className="col text-center ">
                <button
                    type="button"
                    className="btn btn-primary py-3 pl-5 pr-5  mt-4"
                    data-toggle="modal" data-target="#actualizarModal"
                    //
                  >
                    Actualizar
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary py-3 pl-5 pr-5 mt-4 margen"
                    onClick={() => eliminarCita(_id)}
                  >
                    Eliminar &times;
                  </button>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        
        <div className="modal fade" id="actualizarModal" tabIndex="-1" role="dialog" aria-labelledby="progessDialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Actualizar cita</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="modal-body">
        <form className="bg-white p-5 bordered" id="formularioActualizar">
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

              {/*<input
                type="submit"
                className="btn btn-primary btn-lg btn-block mt-3 w-100 p-3 text-uppercase font-weight-bold"
                value="Crear Cita"
              />*/}
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Cerrar</button>
            <button type="button" className="btn btn-primary" onClick={() => actualizarCita(_id)}>Guardar cambios</button>
        </div>
        </div>
    </div>
    </div>


    </div>
  );
};

export default withRouter(Cita);
