import axios from "axios";
export const GET_ALL_POKEMONS = "GET_ALL_POKEMONS";
export const CREATE_POKEMON = "CREATE_POKEMON";
export const GET_POKEMON_DETAIL = "GET_POKEMON_DETAIL";
export const GET_TYPE_POKEMON = "GET_TYPE_POKEMON";
export const FILTER_POKEMON_TYPE = "FILTER_POKEMON_TYPE";
export const FILTER_POKEMON_DB = "FILTER_POKEMON_DB";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_ATTACK = "ORDER_BY_ATTACK";
export const GET_POKEMONS_NAME = "GET_POKEMONS_NAME";

export const createPokemon = (payload) => {
  return async (dispatch) => {
    const response = await axios.post(
      "http://localhost:3001/pokemons",
      payload
    );
    return response;
  };
};

export const getAllPokemons = () => {
  return async (dispatch) => {
    return await fetch("http://localhost:3001/pokemons")
      .then((r) => r.json())
      .then((pokemones) => {
        dispatch({
          type: GET_ALL_POKEMONS,
          payload: pokemones,
        });
      });
  };
};
export const getPokeDetail = (id) => {
  return async (dispatch) => {
    return await fetch(`http://localhost:3001/pokemons/${id}`)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: GET_POKEMON_DETAIL,
          payload: data,
        });
      });
  };
};
export const getPokeType = () => {
  return async (dispatch) => {
    return await fetch(`http://localhost:3001/types`)
      .then((r) => r.json())
      .then((data) => {
        dispatch({
          type: GET_TYPE_POKEMON,
          payload: data,
        });
      });
  };
};
export const filterPokemonType = (payload) => {
  return (dispatch) =>
    dispatch({
      type: FILTER_POKEMON_TYPE,
      payload: payload,
    });
};
export const CreateinDB = (payload) => {
  return (dispatch) =>
    dispatch({
      type: FILTER_POKEMON_DB,
      payload: payload,
    });
};
export const orderByName = (payload) => {
  return (dispatch) =>
    dispatch({
      type: ORDER_BY_NAME,
      payload: payload,
    });
};
export const orderByAttack = (payload) => {
  return (dispatch) =>
    dispatch({
      type: ORDER_BY_ATTACK,
      payload: payload,
    });
};
export const getname = (name) => {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/pokemons?name=" + name);
      return dispatch({
        type: GET_POKEMONS_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
