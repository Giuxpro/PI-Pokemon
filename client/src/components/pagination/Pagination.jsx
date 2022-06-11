import React from "react";
import styles from "../pagination/Pagination.module.css"

export default function Paginado({paginado, allPokemons, pokemonsPerPage}){
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumber.push(i)
    }

    return(
        <nav>
            <ul className={styles.paginationContainer}>
                {
                  pageNumber?.map( num =>{
                      return(
                            <li className={styles.paginationList} key={num}>
                                <button className={styles.paginationBtn} onClick={() => paginado(num)}>{num}</button>
                            </li>
                        )   
                    })
                }
            </ul>
        </nav>
    )
  
}