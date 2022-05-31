const { Sequelize } = require("sequelize");
const axios = require("axios");
const { Pokemon, Type } = require("../db");

const getAllPokemons = async () => {
  try {
    let pokeUrl = await axios.get("https://pokeapi.co/api/v2/pokemon"); // hago un request para los primeros 20 pokemons
    let pokeUrlNext = await axios.get(pokeUrl.data.next); // hago un request para los next 20 pokemons
    let resultPokemon = pokeUrl.data.results.concat(pokeUrlNext.data.results); //concateno para traer los 40 poke
    const pokemons = await Promise.all(
      resultPokemon.map(async (e) => {
        const poke = await axios.get(e.url); //ingreso a las url de cada pokemon para retornar sus propiedades
        const el = poke.data;
        return {
          id: el.id,
          name: el.name,
          image: el.sprites.other.home.front_default,
          hp: el.stats[0].base_stat,
          attack: el.stats[1].base_stat,
          defense: el.stats[2].base_stat,
          defense: el.stats[5].base_stat,
          height: el.height,
          weight: el.weight,
          type: el.types.map((e) => e.type.name),
        };
      })
    );

    return pokemons;
  } catch (error) {
    console.log(error);
  }
};

const pokeDbInfo = async () => {
  const dbInfo = await Pokemon.findAll({
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return dbInfo;
};

const allPokemonsInfo = async () => {
  const pokeApi = await getAllPokemons();
  const pokeDb = await pokeDbInfo();
  const totalInfo = [...pokeApi, ...pokeDb];
  return totalInfo;
};
// ################ ends of calls all pokemons from api and DB 👈 ##########################

const showAllPokemon = async (name) => {
  try {
    const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    const arr = [pokeApi.data];
    let pokeName = arr.map((p) => {
      let pokeObj = {
        id: p.id,
        name: p.name,
        image: p.sprites.other.home.front_default,
        hp: p.stats[0].base_stat,
        attack: p.stats[1].base_stat,
        defense: p.stats[2].base_stat,
        defense: p.stats[5].base_stat,
        height: p.height,
        weight: p.weight,
        type: p.types.map((t) => t.type.name),
      };
      return pokeObj;
    });
    
    return pokeName;
  } catch (error) {
    return [];
  }
};
const getPokeByName = async (req, res) => {
  const { name } = req.query;

  try {
    if (name) {
      const pokemonDb = await pokeDbInfo();
      const pokeByApi = await showAllPokemon(name);

      const pokeDb = pokemonDb.filter((e) => e.name.toLowerCase() === name.toLowerCase());

      if (pokeDb.length > 0 && pokeByApi.length > 0){
        const allPoke = pokeDb.concat(pokeByApi);
        return res.send(allPoke);
      } else if (pokeDb.length > 0) {
        return res.status(200).send(pokeDb);
      } else if (pokeByApi.length > 0){
        return res.status(200).send(pokeByApi);
      } else {
        return res.status(404).send({ msg: "Pokemon Not Found", status: false });
      }
    } 
    else {
      const allPoke = await allPokemonsInfo();
      return res.status(200).send(allPoke);
    }
  } catch (error) {
    res.status(404).send({ msg: "Pokemon Not Found" });
  }
};

//##################### End of poke by name ###########################

const getPokemonById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.length > 20) {
      const pokemonIdDb = await pokeDbInfo();
      const pokeIdDb = pokemonIdDb.filter((e) => e.id == id);

      pokeIdDb
        ? res.status(200).send(pokeIdDb)
        : res.status(404).send({ msg: "Pokemon Not Found in DB by ID" });
    } else {
      const pokeIdApi = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const arr = [pokeIdApi.data];

      const pokeId = arr.map((e) => {
        let pokeObj = {
          id: e.id,
          name: e.name,
          life: e.stats[0].base_stat,
          attack: e.stats[1].base_stat,
          defense: e.stats[2].base_stat,
          speed: e.stats[5].base_stat,
          height: e.height,
          weight: e.weight,
          type: e.types.map((e) => e.type.name),
          image: e.sprites.other.home.front_default,
        };
        return pokeObj;
      });
      pokeId.length > 0
        ? res.status(200).json(pokeId)
        : res.status(404).json({ msg: "Pokemon not Found in Api by ID" });
    }
  } catch (error) {
    res.status(404).send({ msg: "Pokemon Not Found by Name", status: false });
  }
};

const getPokemonType = async (req, res) => {
  const pokeType = await axios.get(`https://pokeapi.co/api/v2/type`);
  const { results } = pokeType.data;

  for (let i = 0; i < results.length; i++) {
    const { name } = results[i];

    await Type.findOrCreate({
      where: { name: name },
    });
  }

  const allTypes = await Type.findAll();
  res.status(200).json(allTypes);
};

const createPokemon = async (req, res) => {
  const { name, type, image, life, attack, defense, speed, height, weight } =
    req.body;
  try {
    const pokemonCreate = await Pokemon.create({
      name,
      image,
      life,
      attack,
      defense,
      speed,
      height,
      weight,
    });

    const pokemonType = await Type.findAll({
      where: { name: type },
    });
   
    pokemonCreate.addType(pokemonType);
    
    res.status(200).send(pokemonCreate);
  } catch (error) {
    console.log("error en createPokemon" + error);
  }
};

module.exports = {
  getAllPokemons,
  getPokemonById,
  getPokemonType,
  createPokemon,
  getPokeByName,
};
