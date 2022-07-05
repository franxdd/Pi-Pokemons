/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Pokemon, conn } = require("../../src/db.js");

const agent = session(app);
const pokemon = {
  name: "Pikachu",
};
const rodri = {
  name: "rodri",
  hp: "99",
  attack: "200",
  defense: "200",
  speed: "99",
  weight: "99",
  height: "99",
  image:
    "https://media-exp1.licdn.com/dms/image/D4D35AQGTIKySsYzJ3A/profile-framedphoto-shrink_200_200/0/1652569710679?e=1656874800&v=beta&t=tJniAeCZn5rO-TB6ceGkA6MNRmTjN_vfKcHKlLPHJBI",
  type: ["bug"],
};
describe("Pokemon routes", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  beforeEach(() =>
    Pokemon.sync({ force: true }).then(() => Pokemon.create(pokemon))
  );
  describe("GET /pokemons", () => {
    it("should get 200", () => agent.get("/pokemons").expect(200));
  });
});

describe("POST /pokemons", () => {
  it("200 status", (done) => {
    agent
      .post("/pokemons")
      .send(rodri)
      .then((res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.text).to.equal("Tu Puchimon fue creado");
        done();
      });
  });
});
