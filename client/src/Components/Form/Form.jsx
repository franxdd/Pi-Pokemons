import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createPokemon,
  getAllPokemons,
  getPokeType,
} from "../../Redux/Actions";
import { Link, useHistory } from "react-router-dom";
import "./Form.css";

function validate(input) {
  let errors = {};
  let whitespacesParameter = /(?!^\s+$)^.*$/m;
  let alphabeticalPattern =
    /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  const urlvalidate =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=*]*)/gi;
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (input.name.length > 30) {
    errors.name = "No puede tener mas de 30 caracteres";
  } else if (
    !whitespacesParameter.test(input.name) ||
    !alphabeticalPattern.test(input.name)
  ) {
    errors.name =
      "No puede tener caracteres especiales o numeros y debe ser mayor a una letra";
  } else if (input.type.length === 0) {
    errors.type = "Debes poner un tipo";
  } else if (input.type.length > 3) {
    errors.type = "No puede tener mas de 3 tipos";
  } else if (!input.image) {
    errors.image = "Se requiere una imagen";
  } else if (!urlvalidate.test(input.image)) {
    errors.image = "Se debe poner una imagen por url";
  } else if (!input.hp) {
    errors.hp = "Se requiere poner vida";
  } else if (input.hp < 0 || input.hp > 1000) {
    errors.hp = "Se requiere un valor entre 0 y 1000 ";
  } else if (
    input.hp.includes("e") ||
    input.hp.includes(",") ||
    input.hp.includes(".")
  ) {
    errors.hp = "no poner caracteres especiales";
  } else if (!input.attack) {
    errors.attack = "Se requiere poner ataque";
  } else if (input.attack < 0 || input.attack > 1000) {
    errors.attack = "Se requiere un valor entre 0 y 1000 ";
  } else if (
    input.attack.includes("e") ||
    input.attack.includes(",") ||
    input.attack.includes(".")
  ) {
    errors.attack = "no poner caracteres especiales";
  } else if (!input.defense) {
    errors.defense = "Se requiere poner defensa";
  } else if (input.defense < 0 || input.defense > 1000) {
    errors.defense = "Se requiere un valor entre 0 y 1000 ";
  } else if (
    input.defense.includes("e") ||
    input.defense.includes(",") ||
    input.defense.includes(".")
  ) {
    errors.defense = "no poner caracteres especiales";
  } else if (!input.speed) {
    errors.speed = "Se requiere poner velocidad";
  } else if (input.speed < 0 || input.speed > 1000) {
    errors.speed = "Se requiere un valor entre 0 y 1000 ";
  } else if (
    input.speed.includes("e") ||
    input.speed.includes(",") ||
    input.speed.includes(".")
  ) {
    errors.speed = "no poner caracteres especiales";
  } else if (!input.height) {
    errors.height = "Se requiere poner altura";
  } else if (input.height < 0 || input.height > 400) {
    errors.height = "Se requiere un valor entre 0 y 400 ";
  } else if (
    input.height.includes("e") ||
    input.height.includes(",") ||
    input.height.includes(".")
  ) {
    errors.height = "no poner caracteres especiales";
  } else if (!input.weight) {
    errors.weight = "Se requiere poner peso";
  } else if (input.weight < 0 || input.weight > 500) {
    errors.weight = "Se requiere un valor entre 0 y 500";
  } else if (
    input.weight.includes("e") ||
    input.weight.includes(",") ||
    input.weight.includes(".")
  ) {
    errors.weight = "no poner caracteres especiales";
  }
  return errors;
}

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const tipo = useSelector((state) => state.type);
  const [errors, setErrors] = useState({
    name: "",
    type: [],
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });
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
    return () => dispatch(getAllPokemons());
  }, [dispatch]);

  function handdleReset(e) {
    e.preventDefault();
    setInput({
      ...input,
      type: [],
    });
    setErrors(
      validate({
        ...input,
        type: [],
      })
    );
  }

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
    if (!input.type.includes(e.target.value)) {
      setInput({
        ...input,
        type: [...input.type, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          type: [...input.type, e.target.value],
        })
      );
    } else alert("No se puede repetir tipos");
  }

  function handdleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
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
      history.push("/home");
    } else {
      alert("Hay errores");
    }
  }
  console.log(tipo);
  return (
    <div className="formF">
      <form className="form" onSubmit={(e) => handdleSubmit(e)}>
        <div className="divformulario">
          <Link className="acasita" to="/home">
            <button>home</button>{" "}
          </Link>
          <label className="labelform">Nombre: </label>

          <input
            autoComplete="off"
            className="inputform"
            type={"text"}
            value={input.name}
            name="name"
            onChange={handdleChange}
          />
          <span className="spanform"></span>
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div className="divformulario">
          <label className="labelform">Tipo: </label>
          <button type="button" onClick={handdleReset}>
            {" "}
            reset
          </button>
          <select onChange={handdleSelect}>
            {tipo.map((r) => {
              return (
                <option key={r.name} value={r.name}>
                  {r.name}
                </option>
              );
            })}
          </select>
          <ul>
            <li>{input.type.map((e) => e + " ")}</li>
          </ul>
          <p className="error">{errors.type}</p>
        </div>
        <div className="divformulario">
          <label className="labelform">Url de la imagen: </label>
          <input
            className="input-form"
            type={"text"}
            value={input.image}
            name="image"
            onChange={handdleChange}
          />
          <span className="spanform"></span>
          <p className="error">{errors.image}</p>
        </div>

        <div className="divformulario">
          <label className="labelform">Vida: </label>
          <input
            className="inputform"
            type={"number"}
            value={input.hp}
            name="hp"
            onChange={handdleChange}
          ></input>
          <span className="spanform"></span>
          {errors.hp && <p className="error">{errors.hp}</p>}
        </div>
        <div className="divformulario">
          <label className="labelform">Ataque: </label>
          <input
            className="inputform"
            type={"number"}
            value={input.attack}
            name="attack"
            onChange={handdleChange}
          />
          <span className="spanform"></span>
          {errors.attack && <p className="error">{errors.attack}</p>}
        </div>
        <div className="divformulario">
          <label className="labelform">Defensa: </label>
          <input
            className="inputform"
            type={"number"}
            value={input.defense}
            name="defense"
            onChange={handdleChange}
          />
          <span className="spanform"></span>
          {errors.defense && <p className="error">{errors.defense}</p>}
        </div>
        <div className="divformulario">
          <label className="labelform">Velocidad: </label>
          <input
            className="inputform"
            type={"number"}
            value={input.speed}
            name="speed"
            onChange={handdleChange}
          />
          <span className="spanform"></span>
          {errors.speed && <p className="error">{errors.speed}</p>}
        </div>
        <div className="divformulario">
          <label className="labelform">Altura:</label>
          <input
            className="inputform"
            type={"number"}
            value={input.height}
            name="height"
            onChange={handdleChange}
          />
          <span className="spanform"></span>
          {errors.height && <p className="error">{errors.height}</p>}
        </div>
        <div className="divformulario">
          <label className="labelform">Peso:</label>
          <input
            className="inputform"
            type={"number"}
            value={input.weight}
            name="weight"
            onChange={handdleChange}
          />
          <span className="spanform"></span>
          {errors.weight && <p className="error">{errors.weight}</p>}
        </div>

        <button type="submit" disabled={Object.values(errors).length}>
          {" "}
          <span className="spansubmit">Crear Personaje</span>
          <i className="iform"></i>
        </button>
      </form>
    </div>
  );
}

export default Form;
