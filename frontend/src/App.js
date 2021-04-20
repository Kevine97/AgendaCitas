import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Cita from "./components/Cita";
import NuevaCita from "./components/NuevaCita";
import Pacientes from "./components/Pacientes";
import clienteAxios from "./config/axios";
import Error404 from "./components/error404";
function App() {
  //State de la aplicacion de

  const [citas, guardarCitas] = useState([]);

  useEffect(() => {
    const consultarAPI = () => {
      clienteAxios
        .get("/pacientes")
        .then((response) => guardarCitas(response.data))
        .catch((error) => console.log(error));
    };
    consultarAPI();
  }, []);

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={() => <Pacientes citas={citas} />} />
          <Route exact path="/nuevaCita" component={NuevaCita} />
          <Route exact path="/Cita/:id" component={Cita} />
          <Route exact path="*" component={() => <Error404 />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
