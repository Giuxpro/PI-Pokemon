import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {cleanSearch, searchBar} from "../../redux/actions"
import styles from "../search_bar/SearchBar.module.css"

export default function Search({setCurrentPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleinputChange(e){
        setName(e.target.value)   
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(cleanSearch())
        dispatch(searchBar(name))
        setName("")
        setCurrentPage(1)
    }

    return(
        <div className={styles.searchContainer}>
            <input
            className={styles.searchInput}
            type="text"
            value={name} 
            placeholder="Search pokemon..."
            onChange={e => handleinputChange(e)}
            />
            <button className={styles.searchButtom} type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}