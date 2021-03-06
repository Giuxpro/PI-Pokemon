import React from "react";
import {useDispatch} from "react-redux";
import { sortByStrength } from "../../redux/actions";
import styles from "../filters/SortByStrength.module.css"

export default function SortByStrength({setSortAlpha, setCurrentPage}){
    const dispatch = useDispatch();

    function handleSortByStrength(e){
        dispatch(sortByStrength(e.target.value));
        setCurrentPage(1)
        setSortAlpha(`ordenStr ${e.target.value}`)
    }

    return(
        <select className={styles.sortStrenght} onChange={e => handleSortByStrength(e)}>
            <option value="str">Sort by Strength</option>
            <option value="low">Low Attack</option>
            <option value="hight">Hight Attack</option>
        </select>
    )
}