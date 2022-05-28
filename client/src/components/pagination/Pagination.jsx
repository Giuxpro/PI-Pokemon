import React from "react";

export default function Paginado({paginado, allPokemons, pokemonsPerPage}){
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
        pageNumber.push(i)
    }

    return(
        <nav>
            <ul>
                {
                  pageNumber?.map( num =>{
                      return(
                            <li key={num}>
                                <button onClick={() => paginado(num)}>{num}</button>
                            </li>
                        )   
                    })
                }
            </ul>
        </nav>
    )
}