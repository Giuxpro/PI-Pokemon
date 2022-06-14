const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const {getPokeByName, getPokemonById, getPokemonType ,createPokemon}= require("../controllers/control")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", getPokeByName)

router.get("/pokemons/:id", getPokemonById)

router.get("/types", getPokemonType)

router.post("/pokemons", createPokemon)



module.exports = router;
