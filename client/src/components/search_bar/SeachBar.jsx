import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {searchBar} from "../../redux/actions"

export default function Search(){
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleinputChange(e){
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchBar(name))
        setName("")
    }

    return(
        <div>
            <input
            type="text"
            value={name} 
            placeholder="Search pokemon..."
            onChange={e => handleinputChange(e)}
            />
            <button type="submit" onClick={e => handleSubmit(e)}>Search</button>
        </div>
    )
}