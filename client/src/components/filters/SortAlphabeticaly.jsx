import React from "react";
import {useDispatch} from "react-redux";
import { sortAlphabeticaly } from "../../redux/actions";
import styles from "../filters/SortAlphabeticaly.module.css"


export default function SortAlphabeticaly({setCurrentPage, setSortAlpha}){
    const dispatch = useDispatch();
    

    function handleSortAlpha(e){
        e.preventDefault()
        dispatch(sortAlphabeticaly(e.target.value));
        setCurrentPage(1);
        setSortAlpha(`ordenAlpha ${e.target.value}`)
    }

    return(
        <select className={styles.alphaSelect}  onChange={e => handleSortAlpha(e)}>
            <option value="asc">Sort A-Z</option>
            <option value="des">Sort Z-A</option>
        </select>
    )
}