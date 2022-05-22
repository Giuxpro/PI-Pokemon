const { Sequelize } = require('sequelize');
const axios = require("axios");
const {Pokemon, Type} = require("../db");

const getAllPokemons = async ()=>{
    try{
        let pokeArr = [];
        const api = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=5`)
        const url = await api.data.results.map(e => {return axios.get(e.url)});
        const apiInfo = await Promise.all(url).then(res =>{
            res.map(e =>{
                pokeArr.push({
                    id: e.data.id,
                    name: e.data.name,
                    life: e.data.stats[0].base_stat,
                    attack: e.data.stats[1].base_stat,
                    defense: e.data.stats[2].base_stat,
                    speed: e.data.stats[5].base_stat,
                    height: e.data.height,
                    weight: e.data.weight,
                    type: e.data.types.map(e => e.type.name)
                })
            })
            return pokeArr
        })
        
         return apiInfo
        
    }catch(error){
        console.log("error en getAllPokemons" + error)
    }
    
}

const pokeDbInfo = async () =>{
    const dbInfo = await Pokemon.findAll({
        include:{
            model:Type,
            attributes:["name"],
            through:{
                attributes:[],
            }
        }
    })
    return dbInfo
}

const allPokemonsInfo = async () =>{
    const pokeApi = await getAllPokemons();
    const pokeDb = await pokeDbInfo();
    const totalInfo = [...pokeApi,...pokeDb];
    return totalInfo;
}
// ################ ends of calls all pokemons from api and DB ##########################


const allPokemos = async (req, res) =>{
    const {name} = req.query;
    const allpoke = await allPokemonsInfo()
    
    if(name){
       const result = allpoke.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
       result.length
       ? res.status(200).json(result)
       : res.status(404).send({error: "Pokemon Not Found"})
    }
    else{
        res.status(200).json(allpoke)
    }
}

const getPokemonById = async (req,res) =>{
    const {id} = req.params;
    const allPoke = await allPokemonsInfo();

    if(id){
        const pokeInfoId = allPoke.filter( e => e.id == id)
        pokeInfoId.length
        ? res.status(200).json(pokeInfoId)
        : res.status(404).send({error: "Pokemon By ID Not Found"})
    }
}

const getPokemonType = async (req,res) =>{
    const pokeType = await axios.get(`https://pokeapi.co/api/v2/type`)
    const {results} = pokeType.data

    for(let i = 0; i < results.length; i++){
       const {name} = results[i]
       
       await Type.findOrCreate({
           where: {name: name}
       })
       
    }
   
    const allTypes = await Type.findAll();
    res.status(200).json(allTypes)
        
}

const createPokemon = async (req,res)=>{
    const { name, type, image, life, attack, defense, speed, height, weight} = req.body;
try{
    const pokemonCreate = await Pokemon.create({
        
        name,
        image,
        life,
        attack,
        defense,
        speed,
        height,
        weight
    })

    const pokemonType = await Type.findAll({
        where:{name:type}
    });
    //console.log(pokemonCreate.__proto__)
    await pokemonCreate.addType(pokemonType)
    res.status(200).json(pokemonCreate)

}catch(error){
    console.log("error en createPokemon" + error)
}
}

module.exports={
    getAllPokemons,
    allPokemos,
    getPokemonById,
    getPokemonType,
    createPokemon
}