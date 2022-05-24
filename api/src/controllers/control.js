const { Sequelize } = require('sequelize');
const axios = require("axios");
const {Pokemon, Type} = require("../db");

const getAllPokemons = async ()=>{
    try{
        let pokeArr = [];
        const api = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=5`)
        const url = await api.data.results.map(e => {return axios.get(e.url)});
        const poki = await Promise.all(url).then(res =>{
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
                    type: e.data.types.map(e => e.type.name),
                    image: e.data.sprites.front_default
                })
            })
        })
        return pokeArr
     
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


const getPokeByName = async (name)=>{
    let e = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

        let pokemon ={

            id: e.data.id,
            name: e.data.name,
            life: e.data.stats[0].base_stat,
            attack: e.data.stats[1].base_stat,
            defense: e.data.stats[2].base_stat,
            speed: e.data.stats[5].base_stat,
            height: e.data.height,
            weight: e.data.weight,
            type: e.data.types.map(e => e.type.name),
            image: e.data.sprites.front_default

        }
    
        return pokemon;
}

const allPokemonsByName = async (req, res) =>{
    const {name} = req.query;
    const allPokem =[];
try{
    
    if(name){

        let pokeDb = await Pokemon.findAll({
            where:{name:name},
            include: {
                model: Type,
                attributes:["name"],
                through:{
                    attributes:[],
                }
            }
        })

    
        let pokeName = await getPokeByName(name.toLowerCase());
        if(pokeDb){

            allPokem.push(pokeDb,pokeName)

            allPokem
            ? res.status(200).send(allPokem)
            : res.status(404).send({error: "Pokemon Not Found"})
        }else{

            pokeName
            ? res.status(200).send(pokeName)
            : res.status(404).send({error: "Pokemon Not Found"})
        }
        
        
  
    }
    else{
        const allpoke = await allPokemonsInfo();
        res.status(200).json(allpoke)
    }
}catch(error){
    console.log("error en allPokemons"+ error)
}
}
//##################### End of poke by name ###########################

const getPokeById = async (id)=>{
    let e = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

        let pokemonId ={

            id: e.data.id,
            name: e.data.name,
            life: e.data.stats[0].base_stat,
            attack: e.data.stats[1].base_stat,
            defense: e.data.stats[2].base_stat,
            speed: e.data.stats[5].base_stat,
            height: e.data.height,
            weight: e.data.weight,
            type: e.data.types.map(e => e.type.name),
            image: e.data.sprites.front_default

        }
    
        return pokemonId;
}

const getPokemonById = async (req,res) =>{
    const {id} = req.params;
    
    if(id.length > 9){

        
        const pokeDb = await pokeDbInfo()
            const pokeId = await pokeDb.find(e => e.id == id)
            pokeId
            ?res.status(200).send(pokeId)
            :res.status(404).send({error: "Pokemon Not Found"})

        
    }else{
    
        let pokeName = await getPokeById(id);
        
            pokeName
            ? res.status(200).send(pokeName)
            : res.status(404).send({error: "Pokemon Not Found"})
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
    allPokemonsByName,
    getPokemonById,
    getPokemonType,
    createPokemon
}