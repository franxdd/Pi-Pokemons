import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../Redux/Actions";
import Cards from "./Cards/Cards";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();

  let { allPokemons } = useSelector((state) => state);

  useEffect(() => {
    if (!allPokemons.length) dispatch(getAllPokemons());
  }, [dispatch, allPokemons.length]);

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
