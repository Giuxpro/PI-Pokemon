import React from "react";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getPokemos, getTypes } from "../../redux/actions";
import { Link } from "react-router-dom"
import Card from "../card/Card";
import Paginado from "../pagination/Pagination";
import Types from "../filters/Types";
import SortByCreateOrApi from "../filters/SortByCreateOrApi";
import SortByStrength from "../filters/SortByStrength";
import SortAlphabeticaly from "../filters/SortAlphabeticaly";
import Search from "../search_bar/SeachBar";
import styles from "../home/Home.module.css"

export default function Home(){
    const dispatch = useDispatch();
    const allPokemons = useSelector(state => state.pokemons);
  
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const indexLastPoke = currentPage * pokemonsPerPage;
    const indexFirstPoke = indexLastPoke - pokemonsPerPage;
    const currentPoke = allPokemons.slice(indexFirstPoke, indexLastPoke);

    const [sortAlpha, setSortAlpha] = useState("")

    const paginado = (pageNum )=>{
        setCurrentPage(pageNum);
    }
    useEffect(() => {
        dispatch(getTypes())
    },[dispatch]);

    useEffect(()=> {
        dispatch(getPokemos());
    },[dispatch])

    function handleReload(e){
        e.preventDefault();
        dispatch(getPokemos())
    }


    return(
        <div className={styles.homeContainer}>
            <h1>Welcome To Pokemons Api</h1>

            <div className={styles.homeSearch}>
                <Search/>
            </div>

            <div className={styles.homePaginado}>
                <Paginado
                pokemonsPerPage={pokemonsPerPage}
                allPokemons={allPokemons.length}
                paginado={paginado}
                />
            </div>

           
            <div className={styles.homeReloadCreate}>
                <Link to="/pokemons">
                    <button>Create Pokemon</button>
                </Link>
                <button onClick={e => {handleReload(e)}}>Reload Pokemons</button>
            </div>
            

            <div className={styles.homeFiltersContainer}>
                <SortAlphabeticaly
                setCurrentPage={setCurrentPage}
                setSortAlpha={setSortAlpha}
                />
                
                <SortByCreateOrApi/>
                
                <SortByStrength
                setCurrentPage={setCurrentPage}
                setSortAlpha={setSortAlpha}
                />
               
                <Types
                setCurrentPage={setCurrentPage}
                />
            </div>
            <div className={styles.homeCardsRender}>
                {
                    currentPoke?.map( e =>{
                        return(
                            <div key={e.id}>
                                <Link to={"/pokemons/"+ e.id}>
                                    <Card image={e.image} name={e.name} type={e.types} attack={e.attack}/>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}