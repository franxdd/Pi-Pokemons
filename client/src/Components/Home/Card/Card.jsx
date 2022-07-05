import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ id, name, image, type }) {
  return (
    <Link className="LinkCard" to={`/home/${id}`}>
      <div className="card">
        <div className="divtitulocard">
          <h3 className="TituloyType">{name.charAt(0).toUpperCase()+name.slice(1)}
        <br></br>
           Tipo: {type.join(" ")}</h3>
        </div>
        <div >
          <img className="imageCard" src={image} alt="main-image" />
        </div>
      </div>
    </Link>
  );
}

export default Card;
