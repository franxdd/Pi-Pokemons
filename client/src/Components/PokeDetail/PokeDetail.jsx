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
    <div className="card1">
      <h1>Id: {detail[0]?.id}</h1>
      <h1>Nombre: {detail[0]?.name}</h1>
      <h2>
        Tipos:{" "}
        {detail[0]?.createInDB
          ? detail[0]?.type?.map((e) => e + " ")
          : detail[0]?.type?.map((e) => e + " ")}
      </h2>
      <div className="image">
        <img src={detail[0]?.image} />
      </div>
      <div>
        <h3>Estadisticas: </h3>
        {!detail[0]?.createInDB ? (
          detail[0]?.stats?.map((r) => {
            return (
              <div>
                <h5>
                  {r.nombre} {r.base}{" "}
                </h5>
              </div>
            );
          })
        ) : (
          <div className="detail1">
            <h5>hp: {detail[0]?.hp}</h5>
            <h5>attack: {detail[0]?.attack}</h5>
            <h5>defense: {detail[0]?.defense}</h5>
            <h5>speed: {detail[0]?.speed}</h5>
          </div>
        )}
        <div>
          <h5>Altura: {detail[0]?.height}</h5>
          <h5> Peso: {detail[0]?.weight}</h5>
        </div>
      </div>
    </div>
  );
}

export default PokeDetail;
