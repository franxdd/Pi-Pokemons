import {
  GET_ALL_POKEMONS,
  GET_POKEMON_DETAIL,
  CREATE_POKEMON,
  GET_TYPE_POKEMON,
  FILTER_POKEMON_TYPE,
  FILTER_POKEMON_DB,
  ORDER_BY_NAME,
  ORDER_BY_ATTACK,
  GET_POKEMONS_NAME,
} from "../Actions/index.js";

const initialState = {
  allPokemons: [],
  detail: [],
  type: [],
  backup: [],
};

const rootRouter = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMONS:
      return {
        ...state,
        allPokemons: action.payload,
        backup: action.payload,
      };

    case GET_POKEMON_DETAIL:
      return {
        ...state,
        detail: action.payload,
      };

    case CREATE_POKEMON:
      return {
        ...state,
      };
    case GET_TYPE_POKEMON:
      return {
        ...state,
        type: action.payload,
      };
    case FILTER_POKEMON_TYPE:
      const todospoke = state.allPokemons;
      console.log(todospoke);
      if (action.payload === "All") {
        return {
          ...state,
          allPokemons: state.backup,
        };
      } else {
        const filterPokemons = todospoke.filter((t) =>
          t.type.includes(action.payload)
        );
        console.log(filterPokemons);
        return {
          ...state,
          allPokemons: filterPokemons,
        };
      }

    case FILTER_POKEMON_DB:
      if (action.payload === "Creado") {
        let created = state.backup.filter((e) => e.createInDB);
        return {
          ...state,
          allPokemons: created,
        };
      } else if (action.payload === "Existente") {
        let created = state.backup.filter((e) => !e.createInDB);
        return {
          ...state,
          allPokemons: created,
        };
      } else
        return {
          ...state,
          allPokemons: state.backup,
        };

    case ORDER_BY_NAME:
      let order =
        action.payload === "Ascendente"
          ? state.allPokemons.sort(function(a, b){
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allPokemons.sort(function(a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allPokemons: order,
      };
case GET_POKEMONS_NAME:
    return{
      ...state,
      allPokemons: action.payload
    }
case ORDER_BY_ATTACK:
  let attack =
        action.payload === "MIN"
          ? state.allPokemons.sort(function(a, b){
              if (a.stats[1].base > b.stats[1].base) {
                console.log(a.stats[1].base)
                return 1;
              }
              if (b.stats[1].base > a.stats[1].base) {
                return -1;
              }
              return 0;
            })
          : state.allPokemons.sort(function(a, b) {
              if (a.stats[1].base > b.stats[1].base) {
                return -1;
              }
              if (b.stats[1].base > a.stats[1].base) {
                return 1;
              }
              return 0;
            });
return{
    ...state,
    allPokemons: attack
  }

    default:
      return { ...state };
  }
};
export default rootRouter;
