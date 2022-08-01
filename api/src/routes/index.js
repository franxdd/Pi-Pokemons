const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { todaInfo, todaType } = require("./service/service");
const { Pokemon, Type } = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", async (req, res) => {
  const name = req.query.name; // aqui agarro si viene por query
  //   if(!name) return res.status(404).send("Necesitas si o si un name")
  let pokemontotal = await todaInfo(); // traigo a todos los puchimones tanto d e la api como de la DB
  if (name) {
    let pokename = await pokemontotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    ); //filtro los puchimones si es que vienen por query
    pokename.length
      ? res.status(200).send(pokename)
      : res.status(404).send("No hay pokemon");
  } else {
    res.status(200).send(pokemontotal);
  }
});
router.get("/pokemons", (req, res) => {
  const name = req.query.name;
  fetch(todaInfo())
    .then((data) => data.json())
    .then((r) => {
      if (name) {
        let pokename = r.filter((e) =>
          e.name.toLowerCase().includes(name.toLowerCase())
        );
        pokename.length
          ? res.status(200).send(pokename)
          : res.status(404).send("No hay pokemon");
      } else {
        return res.status(200).send(r);
      }
    });
});

router.get("/types", async (req, res) => {
  let f = await todaType();
  res.send(f);
});

router.get("/pokemons/:id", async (req, res) => {
  const id = req.params.id;
  const total = await todaInfo();

  if (id) {
    let idFiltrado = total.filter((e) => e.id == id);
    idFiltrado.length
      ? res.status(200).json(idFiltrado)
      : res.status(404).send("No se encontró tu personaje");
  }
});

router.post("/pokemons", async (req, res) => {
  try {
    let { name, hp, attack, defense, speed, weight, height, image, type } =
      req.body;
    let CrearPokemon = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      weight,
      height,
      image,
    });
    let tipoEnDb = await Type.findAll({
      where: { name: type },
    });
    CrearPokemon.addType(tipoEnDb);
    res.status(201).send("Tu Puchimon fue creado");
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
