import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cita from "./components/Cita";
import NuevaCita from "./components/NuevaCita";
import Pacientes from "./components/Pacientes";
import clienteAxios from "./config/axios";
import Error404 from "./components/error404";
import Spinner from "./components/Spinner";
function App() {
  //State de la aplicacion de

  const [citas, guardarCitas] = useState([]);
  const [consultar, guardarConsultar] = useState(true);
  useEffect(() => {
    if (consultar) {
      const consultarAPI = () => {
        clienteAxios
          .get("/pacientes")
          .then((response) => {
            guardarCitas(response.data);
            guardarConsultar(false);
          })
          .catch((error) => console.log(error));
      };
      consultarAPI();
    }
  }, [consultar]);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Pacientes citas={citas} />} />
          <Route
            exact
            path="/nuevaCita"
            component={() => <NuevaCita guardarConsultar={guardarConsultar} />}
          />
          <Route
            exact
            path="/Cita/:id"
            render={(props) => {
              if (citas.length === 0 || citas === []) return <Spinner />;
              const listaCitas = citas.datos.filter(
                (v) => v._id === props.match.params.id
              );
              return (
                <Cita
                  listaCitas={listaCitas[0]}
                  guardarConsultar={guardarConsultar}
                />
              );
            }}
          />
          <Route exact path="*" component={() => <Error404 />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
