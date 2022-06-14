import axios from "axios";

export function getPokemos(){
    return async function(dispatch){
        const data = await axios.get(`/pokemons`)
        
        return dispatch({
            type:"GET_POKE",
            payload: data.data,
        })
    }
}


export function getTypes(){
    return async function(dispatch){
        const data = await axios.get(`/types`) 
        return dispatch({
            type: "GET_TYPES",
            payload: data.data,

        })
    }
}

export function filterPokeByTypes(payload){
    return{
        type: "POKE_BY_TYPES",
        payload: payload
    }
}

export function sortByCreatedOrApi(payload){
    return{
        type:"SORT_DB_API",
        payload: payload
    }
}

export function sortByStrength(payload){
    return{
        type:"SORT_BY_STRENGTH",
        payload: payload
    }
}

export function sortAlphabeticaly(payload){
    return{
        type: "SORT_ALPHA",
        payload: payload
    }
}

export function searchBar(name){
    return async function(dispatch){
        const data = await axios.get(`/pokemons?name=${name}`)
        return dispatch({
            type: "SEARCH",
            payload: data.data,
        })
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        const data = await axios.post(`/pokemons`,payload)
        return data
    }
}
export function cleanSearch(){
    return{
        type:"CLEAN_SEARCH"
    }
}

export function getPokeById(id){
    return async function(dispatch){
        const data = await axios.get(`/pokemons/${id}`)
        return dispatch({
            type:"POKE_ID",
            payload:data.data
        })
    }
}

export function cleanDetail(){
    return{
        type:"CLEAN"
    }
}




