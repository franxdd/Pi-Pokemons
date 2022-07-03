import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPokemons } from "../../Redux/Actions";
import Cards from "./Cards/Cards";
import "./Home.css"

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div className="PrincipalHome">
      <div>
        <h1 className="TituloHome">PokeApi</h1>
        <Cards />
      </div>
    </div>
  );
}
//con useEffect la pagina de carga
export default Home;
