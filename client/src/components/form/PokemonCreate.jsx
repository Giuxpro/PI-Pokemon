import React,{useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postPokemon, getTypes} from "../../redux/actions"


export default function CreatePokemon(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector( state => state.types)

    const [input, setInput] = useState({
        name:"",
        image:"",
        life:"",
        attack:"",
        defense:"",
        speed:"",
        height:"",
        weight:"",
        types:[]
    })

    useEffect(()=>{
        dispatch(getTypes())
    },[dispatch])


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(postPokemon(input))
        alert("Pokemon Created!!")
        setInput({
            name:"",
            image:"",
            life:"",
            attack:"",
            defense:"",
            speed:"",
            height:"",
            weight:"",
            types:[]
        })
        navigate("/home")
    }

    return(
        <div>
            <Link to="/home"><button>Back</button></Link>
            <h1>Create a new Pokemon!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name: </label>
                    <input 
                    type="text" 
                    value={input.name}
                    name="name"
                    onChange={e => handleChange(e)}
                    />

                </div>
                {/* ############################## */}
                <div>
                    <label>Life: </label>
                    <input 
                    type="text" 
                    value={input.life}
                    name="life"
                    onChange={e => handleChange(e)}
                    />

                </div>
                {/* ############################## */}
                <div>
                    <label>Attack: </label>
                    <input 
                    type="text" 
                    value={input.attack}
                    name="attack"
                    onChange={e => handleChange(e)}
                    />

                </div>
                {/* ############################## */}
                <div>
                    <label>Defense: </label>
                    <input 
                    type="text" 
                    value={input.defense}
                    name="defense"
                    onChange={e => handleChange(e)}
                    />

                </div>
                {/* ############################## */}
                <div>
                    <label>Speed: </label>
                    <input 
                    type="text" 
                    value={input.speed}
                    name="speed"
                    onChange={e => handleChange(e)}
                    />

                </div>
                {/* ############################## */}
                <div>
                    <label>Height: </label>
                    <input 
                    type="text" 
                    value={input.height}
                    name="height"
                    onChange={e => handleChange(e)}
                    />

                </div>
                {/* ############################## */}
                <div>
                    <label>Weight: </label>
                    <input 
                    type="text" 
                    value={input.weight}
                    name="weight"
                    onChange={e => handleChange(e)}
                    />

                </div>
                {/* ############################## */}
                <div>
                    <label>Image: </label>
                    <input 
                    type="text" 
                    value={input.image}
                    name="image"
                    onChange={e => handleChange(e)}
                    />

                </div>
                {/* ############################## */}
                <div>
                    <select onChange={e => handleSelect(e)}>
                        {
                            types?.map(e =>{
                                return(
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                    <ul><li>{input.types.map(e => e +" ,")}</li></ul>
                    
                    <button type="submit">Create Pokemon</button>
                </div>
            </form>
        </div>
    )
}