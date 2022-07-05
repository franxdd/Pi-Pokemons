import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokeDetail } from "../../Redux/Actions";
import { useEffect } from "react";
import "./PokeDetail.css";

function PokeDetail(props) {
  console.log(props);
  const dispatch = useDispatch();
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getPokeDetail(id));
  }, []);

  const { detail } = useSelector((state) => state);
  console.log();
  return (
    <div className="pokecardimage">
      {detail[0] ? (
        <div className="cardcover">
          <div className="card1">
            <h1 className="h1delDetalle">Id: {detail[0]?.id}</h1>
            <h1 className="h1delDetalle">Nombre: {detail[0]?.name.charAt(0).toUpperCase()+detail[0].name.slice(1)}</h1>
            <h1 className="h1delDetalle">
              Tipos:{" "}
              {detail[0]?.createInDB
                ? detail[0]?.type?.map((e) => e + " ")
                : detail[0]?.type?.map((e) => e + " ")}
            </h1>
            <div className="image">
              <img src={detail[0]?.image} />
            </div>

            <h1 className="h1delDetalle">Estadisticas: </h1>
            <div className="detail1">
              <h3 className="h5delDetalle">hp: {detail[0]?.hp}</h3>
              <h3 className="h5delDetalle">attack: {detail[0]?.attack}</h3>
              <h3 className="h5delDetalle">defense: {detail[0]?.defense}</h3>
              <h3 className="h5delDetalle">speed: {detail[0]?.speed}</h3>
              <h3 className="h5delDetalle">Altura: {detail[0]?.height}</h3>
              <h3 className="h5delDetalle"> Peso: {detail[0]?.weight}</h3>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </div>
  );
}

export default PokeDetail;
