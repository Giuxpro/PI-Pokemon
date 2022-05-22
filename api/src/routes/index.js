const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const {allPokemos, getPokemonById, getPokemonType}= require("../controllers/controls")
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/pokemons", allPokemos)

router.get("/pokemons/:id", getPokemonById)

router.get("/types", getPokemonType)


module.exports = router;
