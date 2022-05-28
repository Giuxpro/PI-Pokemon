import React from "react";
import { useDispatch } from "react-redux";
import { sortByCreatedOrApi } from "../../redux/actions";

export default function SortByCreateOrApi(){
    const dispatch = useDispatch()

function handleSortByCreate(e){
    dispatch(sortByCreatedOrApi(e.target.value))
}

    return(
        <select onChange={e => handleSortByCreate(e)}>
            <option value="all">All</option>
            <option value="db">Created</option>
            <option value="api">Api</option>
        </select>
    )
}