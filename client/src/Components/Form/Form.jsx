import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getPokeType } from "../../Redux/Actions";
import { useHistory } from "react-router-dom";
import "./Form.css";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (input.name.length > 30) {
    errors.name = "No puede tener mas de 30 caracteres";
  } else if (input.type.length == 0) {
    errors.type = "Debes poner un tipo";
  } else if (input.type.length > 3) {
    errors.type = "No puede tener mas de 3 tipos";
  } else if (!input.image) {
    errors.image = "Se requiere una imagen";
  } else if (!input.hp) {
    errors.hp = "Se requiere poner vida";
  } else if (input.hp < 0 || input.hp > 1000) {
    errors.hp = "Se requiere un valor entre 0 y 1000 ";
  } else if (!input.attack) {
    errors.attack = "Se requiere poner ataque";
  } else if (input.attack < 0 || input.attack > 1000) {
    errors.attack = "Se requiere un valor entre 0 y 1000 ";
  } else if (!input.defense) {
    errors.defense = "Se requiere poner defensa";
  } else if (input.defense < 0 || input.defense > 1000) {
    errors.defense = "Se requiere un valor entre 0 y 1000 ";
  } else if (!input.speed) {
    errors.speed = "Se requiere poner velocidad";
  } else if (input.speed < 0 || input.speed > 1000) {
    errors.speed = "Se requiere un valor entre 0 y 1000 ";
  } else if (!input.height) {
    errors.height = "Se requiere poner altura";
  } else if (input.height < 0 || input.height > 400) {
    errors.height = "Se requiere un valor entre 0 y 400 ";
  } else if (!input.weight) {
    errors.weight = "Se requiere poner peso";
  } else if (input.weight < 0 || input.weight > 500) {
    errors.weight = "Se requiere un valor entre 0 y 1000 ";
  }
  return errors;
}

function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const tipo = useSelector((state) => state.type);
  const [errors, setErrors] = useState({});
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
      disabled: true,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handdleSelect(e) {
    e.preventDefault();
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
  console.log(errors, "soy el error tipo");
  console.log(Object.keys(errors).length, "Soy el objeto");
  console.log(input.type.length, "soy el  tipo ");
  return (
    <div className="formF">
      <form className="form" onSubmit={(e) => handdleSubmit(e)}>
        <div></div>
        <label>Nombre: </label>
        <input
          type={"text"}
          value={input.name}
          name="name"
          onChange={handdleChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <label>Tipo: </label>
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

        <label>Url de la imagen: </label>
        <input
          type={"text"}
          value={input.image}
          name="image"
          onChange={handdleChange}
        />
        {errors.image && <p className="error">{errors.image}</p>}

        <label>Estadisticas </label>

        <label>hp: </label>
        <input
          type={"number"}
          value={input.hp}
          name="hp"
          onChange={handdleChange}
        ></input>
        {errors.hp && <p className="error">{errors.hp}</p>}
        <label>attack: </label>
        <input
          type={"number"}
          value={input.attack}
          name="attack"
          onChange={handdleChange}
        />
        {errors.attack && <p className="error">{errors.attack}</p>}
        <label>defense: </label>
        <input
          type={"number"}
          value={input.defense}
          name="defense"
          onChange={handdleChange}
        />
        {errors.defense && <p className="error">{errors.defense}</p>}
        <label>speed: </label>
        <input
          type={"number"}
          value={input.speed}
          name="speed"
          onChange={handdleChange}
        />
        {errors.speed && <p className="error">{errors.speed}</p>}
        <label>height:</label>
        <input
          type={"number"}
          value={input.height}
          name="height"
          onChange={handdleChange}
        />
        {errors.height && <p className="error">{errors.height}</p>}
        <label>weight:</label>
        <input
          type={"number"}
          value={input.weight}
          name="weight"
          onChange={handdleChange}
        />
        {errors.weight && <p className="error">{errors.weight}</p>}

        <button type="submit" disabled={Object.values(errors).length}>
          {" "}
          Crear Personaje
        </button>
      </form>
    </div>
  );
}

export default Form;
