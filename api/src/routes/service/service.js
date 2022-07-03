const axios = require("axios");
const { Pokemon, Type } = require("../../db");

const infoApi = async () => {
  try {
    const Url = await axios.get("https://pokeapi.co/api/v2/pokemon"); //https://pokeapi.co/api/v2/pokemon?limit=40 asi no se llama al finalfinalisima
    const datos = Url.data.results;
    const nt = Url.data.next;
    const next = await axios.get(nt);
    const isdmnf = next.data.results;

    const datos2 = datos.concat(isdmnf);
    const DatosFinalFinalisima = datos2.map((g) => axios.get(g.url));

    const datos3 = await axios.all(DatosFinalFinalisima);
    const datos4 = datos3.map((f) => f.data);
    var obj = {};
    const final = datos4.map((c) => {
      var stats = c.stats
        .map((b) => {
          return {
            [b.stat.name]: b.base_stat,
          };
        })
        .filter(
          (r) =>
            !r.hasOwnProperty("special-attack") &&
            !r.hasOwnProperty("special-defense")
        );
      for (let i = 0; i < stats.length; i++) {
        for (const props in stats[i]) {
          obj[props] = stats[i][props];
        }
      }
      return {
        id: c.id,
        name: c.name,
        type: c.types.map((a) => a.type.name),
        image:
          c.sprites.versions["generation-v"]["black-white"].animated
            .front_default,
        hp: obj.hp,
        attack: obj.attack,
        defense: obj.defense,
        speed: obj.speed,
        height: c.height,
        weight: c.weight,
      };
    });
    console.log(final);
    return final;
  } catch (error) {
    return { error };
  }
};
const dbInfo = async () => {
  let puchimones = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  let pokepeso = puchimones.map((e) => {
    return {
      id: e.id,
      name: e.name,
      hp: e.hp,
      attack: e.attack,
      defense: e.defense,
      speed: e.speed,
      weight: e.weight,
      height: e.height,
      image: e.image,
      createInDB: e.createInDB,
      type: e.types.map((r) => r.name),
    };
  });
  return pokepeso;
};

const todaInfo = async () => {
  const apipoke = await infoApi();
  const dbpoke = await dbInfo();
  const allpokes = dbpoke.concat(apipoke);
  return allpokes;
};
const todaType = async () => {
  const q = await axios.get("https://pokeapi.co/api/v2/type");
  const w = q.data.results.map((e) => e.name);
  console.log(w);

  w.forEach((r) => {
    Type.findOrCreate({
      where: { name: r },
    });
  });
  const allType = await Type.findAll();
  return allType;
};
// const porId = async (req, res) =>{
//  const id = req.params.id
//  const total = await todaInfo()

//  if(id){
//     let idFiltrado = total.filter(e => e.id === id)
//     if(idFiltrado.length)
//    return idFiltrado
//  }
// }

module.exports = {
  todaInfo,
  todaType,
};
