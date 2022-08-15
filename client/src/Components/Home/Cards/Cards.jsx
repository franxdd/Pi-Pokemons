import { React, useState, useEffect } from "react";
import Card from "../Card/Card";
import { useDispatch, useSelector } from "react-redux";
import Paginacion from "../Paginacion/Paginacion";
import {
  getAllPokemons,
  getPokeType,
  filterPokemonType,
  CreateinDB,
  orderByAttack,
  orderByName,
  ordernumber,
} from "../../../Redux/Actions";
import "./Cards.css";

function Cards() {
  const dispatch = useDispatch();

  let { allPokemons } = useSelector((state) => state);
  const [pagina, setPagina] = useState(1);
  const porPagina = 12;
  const ultPag = pagina * porPagina;
  const priPag = ultPag - porPagina;
  let allpoke = allPokemons?.slice(priPag, ultPag);

  const maximo = allPokemons?.length / porPagina;
  const [attackorder, setAttackorder] = useState();

  useEffect(() => {
    dispatch(getPokeType());
  }, [dispatch]);
  const filter = useSelector((state) => state.type);

  function handlleFilterType(e) {
    setPagina(1);
    dispatch(filterPokemonType(e.target.value));
  }
  function handlleFilterExist(e) {
    setPagina(1);
    dispatch(CreateinDB(e.target.value));
  }
  function handlleOrder(e) {
    if (e.target.value === "Ascendente" || e.target.value === "Descendente") {
      e.preventDefault();
      dispatch(orderByName(e.target.value));
      console.log(e.target.value);
      setPagina(1);
    } else {
      e.preventDefault();
      dispatch(orderByAttack(e.target.value));
      setPagina(1);
    }
  }

  function handlleAll(e) {
    e.preventDefault();
    dispatch(getAllPokemons());
    setPagina(1);
  }
  function handleinputattack(e) {
    e.preventDefault();
    setAttackorder(e.target.value);
  }

  function handleordernumbersubmit(e) {
    e.preventDefault();
    dispatch(ordernumber(attackorder));
    setPagina(1);
  }

  return (
    <div>
      <div className="Filtros">
        <button onClick={handlleAll}>reset</button>
        <div>
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
        </div>
        <div>
          <select onChange={(e) => handlleFilterExist(e)}>
            <option value={"Todos"}>Todos</option>
            <option value={"Existente"}>Existente</option>
            <option value={"Creado"}>Creados</option>
          </select>
        </div>
        <div>
          <select onChange={(e) => handlleOrder(e)}>
            <option value={"Ascendente"}>A-Z</option>
            <option value={"Descendente"}>Z-A</option>
            <option value={"MAX"}>Max attack</option>
            <option value={"MIN"}>Min attack</option>
          </select>
        </div>
        {/* <div>
          <input
            placeholder="filtro por ataque"
            type="number"
            value={attackorder}
            name="number"
            onChange={handleinputattack}
          ></input>
          <button onClick={handleordernumbersubmit}>filtrar</button>
        </div> */}
      </div>
      <div className="paginacion1">
        <Paginacion pagina={pagina} setPagina={setPagina} maximo={maximo} />
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
