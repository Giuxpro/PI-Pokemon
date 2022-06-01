import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { getPokeById } from "../../redux/actions";
import { Link, useParams } from "react-router-dom";
import img from "../../assets/pokenotfound1.png"



export default function PokemonDetail(){
    const dispatch = useDispatch();
    const {id} = useParams()

 useEffect(() => {
    dispatch(getPokeById(id));
 },[dispatch, id])

 const pokeDetail = useSelector(state => state.detail)
 var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
    return(
        <div>
            {
                pokeDetail.length > 0?
                <div>
                    <img src={regexUrl.test(pokeDetail[0].image)?pokeDetail[0].image: img} alt="pokemon_img" />
                    <h1>{pokeDetail[0].name}</h1>
                    <h1>{pokeDetail[0].id}</h1>
                    <h4>{pokeDetail[0].life}</h4>
                    <h4>{pokeDetail[0].defense}</h4>
                    <h4>{pokeDetail[0].attack}</h4>
                    <h4>{pokeDetail[0].speed}</h4>
                    <h4>{pokeDetail[0].height}</h4>
                    <h4>{pokeDetail[0].weight}</h4>
                    <h4>{pokeDetail[0].types?.map(e =><div key={e}>{e.name}</div> )}</h4>
                </div>
                : <div><h4>Not Found</h4></div>
            }

            <Link to="/home">
                <button>Back</button>
            </Link>
        </div>
    )

}