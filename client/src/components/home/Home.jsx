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
            <div className={styles.homeTitleContainer}>
                <Link className={styles.homeTitleh1} to ="/">
                <h1 className={styles.homeTitle}>Welcome To Pokemons Api</h1>
                </Link>
            </div>

            <div className={styles.homeSearch}>
                <Search />
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
                    <button className={styles.homeBtn}>Create Pokemon</button>
                </Link>
                <button className={styles.homeBtn} onClick={e => {handleReload(e)}}>Reload Pokemons</button>
            </div>
            

            <div className={styles.homeFiltersContainer}>
                <SortAlphabeticaly
                setCurrentPage={setCurrentPage}
                setSortAlpha={setSortAlpha}
                />
                
                <SortByCreateOrApi />
                
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
                            <div className={styles.homeCardRender2} key={e.id}>
                                {/* <Link className={styles.homeLink} to={"/pokemons/"+ e.id}> */}
                                    <Card image={e.image} name={e.name} types={e.types} attack={e.attack} id={e.id}/>
                                {/* </Link> */}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}