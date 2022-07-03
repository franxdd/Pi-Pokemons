import { React, useState, useEffect } from "react";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import Paginacion from "../Paginacion";
import {
  getPokeType,
  filterPokemonType,
  CreateinDB,
  orderByAttack,
  orderByName,
} from "../../../Redux/Actions";
import Gif from "../../Multimedia/pokespera.gif";
import "./Cards.css";

function Cards() {
  const dispatch = useDispatch();

  let { allPokemons } = useSelector((state) => state);
  const [pagina, setPagina] = useState(1);
  const [porPagina, setPorPagina] = useState(12);
  const [orden, setOrden] = useState("");
  const ultPag = pagina * porPagina;
  const priPag = ultPag - porPagina;
  let allpoke = allPokemons?.slice(priPag, ultPag);
  const maximo = allPokemons?.length / porPagina;

  useEffect(() => {
    dispatch(getPokeType());
  }, [dispatch]);

  const filter = useSelector((state) => state.type);

  const paginado = (pages) => {
    setPagina(pages);
  };

  function handlleFilterType(e) {
    dispatch(filterPokemonType(e.target.value));
  }
  function handlleFilterExist(e) {
    dispatch(CreateinDB(e.target.value));
  }
  function handlleOrder(e) {
    if(e.target.value === "Ascendente" || e.target.value === "Descendente"){
      e.preventDefault();
      dispatch(orderByName(e.target.value));
      console.log(e.target.value);
      setPagina(1);
      setOrden(`Ordenado${e.target.value}`);

    }
    else {e.preventDefault();
    dispatch(orderByAttack(e.target.value));
    setPagina(1);
    setOrden(`Ordenado${e.target.value}`);
  }}

  // function handlleOrderAttack(e) {
  //   e.preventDefault();
  //   dispatch(orderByAttack(e.target.value));
  //   setPagina(1);
  //   setOrden(`Ordenado${e.target.value}`);
  // }
  console.log(allpoke);
  return (
    <div>
      <div className="Filtros">
        <select onChange={(e) => handlleFilterType(e)}>
          <option value={"All"}>All</option>
          {filter?.map((r) => {
            return (
              <option key={r.name} value={r.name}>
                {r.name}
              </option>
            );
          })}
        </select>
        <select onChange={(e) => handlleFilterExist(e)}>
          <option value={"Todos"}>Todos</option>
          <option value={"Existente"}>Existente</option>
          <option value={"Creado"}>Creados</option>
        </select>
        <select onChange={(e) => handlleOrder(e)}>
          <option value={"Ascendente"}>A-Z</option>
          <option value={"Descendente"}>Z-A</option>
          <option value={"MAX"}>Max attack</option>
          <option value={"MIN"}>Min attack</option>
        </select>
        
      </div>
      <div className="paginacion1">
        <Paginacion
          pagina={pagina}
          setPagina={setPagina}
          paginado={paginado}
          maximo={maximo}
          porPagina={porPagina}
        />
      </div>
     {allpoke.length === 0 ? (
        <div className="contain">
          <div className="loader">
            <div className="face">
              <div className="circle"></div>
            </div>
            <div className="face">
              <div className="circle"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="PokemonPrincipal">
          {allpoke?.map((e) => {
            return (
              <Card
                key={e.id}
                id={e.id}
                name={e.name}
                type={e.type}
                image={e.image}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Cards;
