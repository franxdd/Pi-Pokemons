import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Nav.css";
function Nav() {
  return (
    <nav className="nav">
      <div>
        <h3 className="tituloNav">¿Queres crear un Pokemon?</h3>
        <Link to="/create" className="LinkNav">
          <button className="buttonCrear">Crear</button>{" "}
        </Link>{" "}
        <br></br>
      </div>
      <div>
        <Link to="/">
          <button className="buttonInicio">
            <span className="SpanDelBoton">Landing</span>
          </button>{" "}
        </Link>
        <Link to="/home"><button className="buttonInicio">
          <span className="SpanDelBoton">Home</span></button></Link>
      </div>

      <div>
        <SearchBar />
      </div>
    </nav>
  );
}

export default Nav;
