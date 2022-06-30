import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getPokeType } from "../../Redux/Actions";
import { useHistory } from "react-router-dom";
import "./Form.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "name is required";
  } else if (/\S+@\S+\.\S+/.test(input.name)) {
    errors.name = "name is invalid";
  }
  return errors;
}

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const tipo = useSelector((state) => state.type);
  const [ errors, setErrors ] = useState({});
  const [input, setInput] = useState({
    name: "",
    type: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    dispatch(getPokeType());
  }, [dispatch]);

  function handdleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handdleSelect(e) {
    setInput({
      ...input,
      type: [...input.type, e.target.value],
    });
  }
  function handdleSubmit(e) {
    e.preventDefault();
    dispatch(createPokemon(input));
    alert("Puchimon creado");
    setInput({
      name: "",
      type: [],
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
    });
    history.push("/home")
  }

  console.log(input);
  return (
    <div>
      <div className="formF">
        <form className="form" onSubmit={(e) => handdleSubmit(e)}>
          <label>Nombre: </label>
          <input
            type={"text"}
            value={input.name}
            name="name"
            onChange={handdleChange}
          />
          {errors.name && (
            <p className="error">{errors.name}</p>
          )}
          <label>Tipo: </label>
          <select onChange={(e) => handdleSelect(e)}>
            {tipo.map((r) => {
              return <option value={r.name}>{r.name}</option>;
            })}
          </select>
          <ul>
            <li>{input.type.map((e) => e + " ")}</li>
          </ul>

          <label>Imagen: </label>
          <input
            type={"text"}
            value={input.image}
            name="image"
            onChange={handdleChange}
          />

          <label>Estadisticas </label>

          <label>hp: </label>
          <input
            type={"number"}
            value={input.hp}
            name="hp"
            onChange={handdleChange}
          ></input>
          <label>attack: </label>
          <input
            type={"number"}
            value={input.attack}
            name="attack"
            onChange={handdleChange}
          />
          <label>defense: </label>
          <input
            type={"number"}
            value={input.defense}
            name="defense"
            onChange={handdleChange}
          />
          <label>speed: </label>
          <input
            type={"number"}
            value={input.speed}
            name="speed"
            onChange={handdleChange}
          />
          <label>height:</label>
          <input
            type={"number"}
            value={input.height}
            name="height"
            onChange={handdleChange}
          />
          <label>weight:</label>
          <input
            type={"number"}
            value={input.weight}
            name="weight"
            onChange={handdleChange}
          />

          <button type="submit"> Crear Personaje</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
