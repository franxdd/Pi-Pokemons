import { React, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";

function Nav() {
  return (
    <div>
      <nav>
        <h3>¿Queres crear un Pokemon?</h3>
        <Link to="/home/create/create"> Has click aqui</Link> <br></br>
        <Link to="/home">
          <button>inicio</button>{" "}
        </Link>
        <SearchBar/>
      </nav>
    </div>
  );
}

export default Nav;
