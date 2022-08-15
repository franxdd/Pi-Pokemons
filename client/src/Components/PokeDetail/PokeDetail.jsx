import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokeDetail, willunmont } from "../../Redux/Actions";
import { useEffect } from "react";
import "./PokeDetail.css";

function PokeDetail(props) {
  const { detail } = useSelector((state) => state);

  const dispatch = useDispatch();
  const { id } = props.match.params;

  useEffect(() => {
    dispatch(getPokeDetail(id));
    return () => dispatch(willunmont());
  }, [dispatch, id]);

  return (
    <div className="pokecardimage">
      {detail[0] ? (
        <div className="cardcover">
          <div className="card1">
            <h1 className="h1delDetalle">
              Nombre:{" "}
              {detail[0]?.name.charAt(0).toUpperCase() +
                detail[0].name.slice(1)}
            </h1>
            <h1 className="h1delDetalle">
              Tipo:{" "}
              {detail[0]?.createInDB
                ? detail[0]?.type?.map((e) => e + " ")
                : detail[0]?.type?.map((e) => e + " ")}
            </h1>
            <div >
              <img className="image" src={detail[0]?.image} alt="img" />
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
