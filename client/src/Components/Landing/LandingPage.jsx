import React from "react";
import { Link } from "react-router-dom";
import img from "../Multimedia/pokeball.png";
import img2 from "../Multimedia/fondo1.png";
import "./Landing.css";

function LandingPage() {
  return (
    <div className="landing">
      <div className="display-flex">

      <div className="contenedor">
        <div>
          <h1 className="titulo">Bienvenidos a la PokeApi</h1>
        </div>
        <p className="continuar">Haga click para continuar</p>
        <Link to="/home">
          <button className="button1">Vamos!</button>
        </Link>
      </div>
      </div>
    </div>
  );
}

export default LandingPage;
