const { Sequelize } = require('sequelize');
const axios = require("axios");
const {Pokemon, Type} = require("../db");

// const getAllPokemons = async ()=>{
//     try{
//         let pokeArr = [];
//         const api = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=5`)
//         const url = await api.data.results.map(e => {return axios.get(e.url)});
//         const poki = await Promise.all(url).then(res =>{
//             res.map(e =>{
//                 pokeArr.push({
//                     id: e.data.id,
//                     name: e.data.name,
//                     life: e.data.stats[0].base_stat,
//                     attack: e.data.stats[1].base_stat,
//                     defense: e.data.stats[2].base_stat,
//                     speed: e.data.stats[5].base_stat,
//                     height: e.data.height,
//                     weight: e.data.weight,
//                     type: e.data.types.map(e => e.type.name),
//                     image: e.data.sprites.front_default
//                 })
//             })
//         })
       
//         return pokeArr
     
//     }catch(error){
//         console.log("error en getAllPokemons" + error)
//     }
    
// }

const getAllPokemons = async () => {
    try{        
        let pokeUrl = await axios.get('https://pokeapi.co/api/v2/pokemon');// hago un request para los primeros 20 pokemons
        let pokeUrlNext = await axios.get(pokeUrl.data.next);// hago un request para los next 20 pokemons
        let resultPokemon = pokeUrl.data.results.concat(pokeUrlNext.data.results);//concateno para traer los 40 poke
        const pokemons = await Promise.all(
            resultPokemon.map(async (e) =>{
            const poke = await axios.get(e.url)//ingreso a las url de cada pokemon para retornar sus propiedades
            const el = poke.data;
            return{
                id: el.id,
                name: el.name,
                image: el.sprites.other.home.front_default,
                hp: el.stats[0].base_stat,
                attack: el.stats[1].base_stat,
                defense: el.stats[2].base_stat,
                defense: el.stats[5].base_stat,
                height: el.height,
                weight: el.weight,
                type: el.types.map(e => e.type.name)

                  }            
            }
         ))
         
          return pokemons; 

        }catch(error){
            console.log(error)
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



const getPokeByName = async (req,res)=>{
    const {name} = req.query;
try{    
    if(name){
        const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
        const arr = [pokeApi.data];

        let pokeName = arr.map(e =>{

            let pokeObj={
                id: e.id,
                name: e.name,
                life: e.stats[0].base_stat,
                attack: e.stats[1].base_stat,
                defense: e.stats[2].base_stat,
                speed: e.stats[5].base_stat,       
                height: e.height,
                weight: e.weight,
                type: e.types.map(e => e.type.name),
                image: e.sprites.front_default
            }
            return pokeObj;
            
        })
    

        const pokemonDb = await pokeDbInfo();
        const pokeDb = pokemonDb.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))

        const allPokeInfo = pokeName.concat(pokeDb)
        
       console.log(allPokeInfo)
        allPokeInfo
        ? res.status(200).send(allPokeInfo)
        : res.status(404).send(allPokeInfo)
    }
    else{
        const allPokeApiInfo = await allPokemonsInfo()
        res.status(200).send(allPokeApiInfo)
    }
}catch(error){
    console.log("Error en Name" + error)
}
}
//##################### End of poke by name ###########################

// const getPokeById = async (id)=>{
//     let e = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

//         let pokemonId ={

//             id: e.data.id,
//             name: e.data.name,
//             life: e.data.stats[0].base_stat,
//             attack: e.data.stats[1].base_stat,
//             defense: e.data.stats[2].base_stat,
//             speed: e.data.stats[5].base_stat,
//             height: e.data.height,
//             weight: e.data.weight,
//             type: e.data.types.map(e => e.type.name),
//             image: e.data.sprites.front_default

//         }
    
//         return pokemonId;
// }

// const getPokemonById = async (req,res) =>{
//     const {id} = req.params;
    
//     if(id.length > 10){

        
//         const pokeDb = await pokeDbInfo()
//             const pokeId = await pokeDb.find(e => e.id == id)
//             pokeId
//             ?res.status(200).send(pokeId)
//             :res.status(404).send({error: "Pokemon Not Found"})

        
//     }else{
    
//         let pokeName = await getPokeById(id);
        
//             pokeName
//             ? res.status(200).send(pokeName)
//             : res.status(404).send({error: "Pokemon Not Found"})
//         }
        
        
  
// }
const getPokemonById = async (req, res) =>{
    const {id} = req.params;
    try{    
        if(id.length > 10){
           
            const pokemonIdDb = await pokeDbInfo();
            const pokeIdDb = pokemonIdDb.filter(e => e.id == id)

            pokeIdDb
            ? res.status(200).send(pokeIdDb)
            : res.status(404).send({msg:"Pokemon Not Found in DB by ID"})
         
        }
        else{
            const pokeIdApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const arr = [pokeIdApi.data];
    
            const pokeId = arr.map(e =>{
    
                let pokeObj={
                    id: e.id,
                    name: e.name,
                    life: e.stats[0].base_stat,
                    attack: e.stats[1].base_stat,
                    defense: e.stats[2].base_stat,
                    speed: e.stats[5].base_stat,       
                    height: e.height,
                    weight: e.weight,
                    type: e.types.map(e => e.type.name),
                    image: e.sprites.front_default
                }
                return pokeObj;
                
            })
            pokeId.length > 0
            ? res.status(200).json(pokeId)
            :res.status(404).json({msg: "Pokemon not Found in Api by ID"})
        }
       
        
    }catch(error){
        console.log("Error en Id" + error)
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
    //allPokemonsByName,
    getPokemonById,
    getPokemonType,
    createPokemon,

    getPokeByName
}