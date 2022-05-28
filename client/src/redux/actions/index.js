import axios from "axios";

export function getPokemos(){
    return async function(dispatch){
        const data = await axios.get(`http://localhost:3001/pokemons`)
        return dispatch({
            type:"GET_POKE",
            payload: data.data
        })
    }
}


export function getTypes(){
    return async function(dispatch){
        const data = await axios.get(`http://localhost:3001/types`) 
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