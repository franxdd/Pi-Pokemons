import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPokemons } from "../../Redux/Actions";
import { Link } from "react-router-dom";
import Cards from "./Cards/Cards";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div>
      <div>
        <h1>Pokemon</h1>
        <Cards />
      </div>
    </div>
  );
}
//con useEffect la pagina de carga
export default Home;
