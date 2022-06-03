import React,{useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {postPokemon, getTypes} from "../../redux/actions";
import styles from "../form/PokemonCreate.module.css";


export default function CreatePokemon(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const types = useSelector( state => state.types)
    const [errors, setErrors] = useState({})
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
        dispatch(getTypes());
        
    },[dispatch])


    function validation(input){
    let regexNum = /^[1-9]$|^[1-9][0-9]$|^(100)$/; // regex for number only between 1 to 600
    let RegexName = new RegExp(/^\b[A-Za-z\s]+$/g)
    // let regexRating =/[+-]?([0-9]*[.])?\b[0-5]{1,1}\b/; //regex 1-5 decimal inclusive
    // let expReg = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9]+$/; //regex letters and numbers without especial chart
        const error = {};

        if(!input.name){
           error.name = 'Enter Pokemon name';
        }else if(!RegexName.test(input.name)){
            error.name = 'The name must only have letters or numbers'
        }else if(!regexNum.test(input.life)){
            error.life = 'Enter a Hp points ';
        }else if(!regexNum.test(input.attack)){
            error.attack = 'Pokemon must have attack points';
        }else if(!regexNum.test(input.defense)){
            error.defense = 'Pokemon must have defense points';
        }else if(!regexNum.test(input.speed)){
            error.speed = 'Pokemon must have speed points';
        }else if(!regexNum.test(input.height)){
            error.height = 'Pokemon must have height points';
        }else if(!regexNum.test(input.weight)){
            error.weight = 'Pokemon must have weight points';
        }else if(!input.types.length){
            error.types = 'Enter a Type Pokemon';
        }

        return error;
    }


    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        })
        setErrors(validation({
            ...input,
            [e.target.name]:e.target.value
        }))
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...new Set([...input.types, e.target.value])]
        })
    }

    function handleDelete(e){
        setInput({
            ...input,
            types: input.types.filter( type => type !== e),
           
        })
    }

    let regexRating =/[+-]?([0-9]*[.])?\b[0-5]{1,1}\b/; //regex 1-5 decimal inclusive
    let expReg = /^\b[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s0-9]+$/;
    function handleSubmit(e){
        e.preventDefault()


        // if(!input.name){
        //     return alert('Enter Pokemon name');
        // }else if(!expReg.test(input.name)){
        //     return alert('The name must only have letters or numbers')
        // }else if(!regexRating.test(input.life)){
        //     return alert('Enter a Hp points ');
        // }else if(!regexRating.test(input.attack)){
        //     return alert('Pokemon must have attack points');
        // }else if(!regexRating.test(input.defense)){
        //     return alert('Pokemon must have defense points');
        // }else if(!regexRating.test(input.speed)){
        //     return alert('Pokemon must have speed points');
        // }else if(!regexRating.test(input.height)){
        //     return alert('Pokemon must have height points');
        // }else if(!regexRating.test(input.weight)){
        //     return alert('Pokemon must have weight points');
        // }else if(!input.types.length){
        //     return alert('Enter a Type Pokemon');
        // }

        if(Object.keys(errors).length===0){
            dispatch(postPokemon(input))
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
            alert('Pokemon created successfully')
            navigate("/home")
        }else{
            alert('Complete the form correctly')
        }
        // dispatch(postPokemon(input))
        // alert("Pokemon Created!!")
        // setInput({
        //     name:"",
        //     image:"",
        //     life:"",
        //     attack:"",
        //     defense:"",
        //     speed:"",
        //     height:"",
        //     weight:"",
        //     types:[]
        // })
        // navigate("/home")
    }

    return(
        <div className={styles.createContainer}>
        
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
                    {errors.name || !expReg.test(errors.name)? <h4>{"Enter a Valid Name"}</h4>: false}

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
                    {errors.life || !expReg.test(errors.life)? <h4 >{"Enter a Valid life"}</h4>: false}
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
                    {errors.attack || !expReg.test(errors.attack)? <h4 >{"Enter a Valid attack"}</h4>: false}
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
                    {errors.defense || !expReg.test(errors.defense)? <h4 >{"Enter a Valid defense"}</h4>: false}
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
                    {errors.speed || !expReg.test(errors.speed)? <h4 >{"Enter a Valid Speed"}</h4>: false}
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
                    {errors.height || !expReg.test(errors.height)? <h4 >{"Enter a Valid Height"}</h4>: false}
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
                    {errors.weight || !expReg.test(errors.weight)? <h4 >{"Enter a Valid Weight"}</h4>: false}
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
                    {/* {!input.image || !expReg.test(input.image)? <h4 >{"Enter a Valid Name"}</h4>: false} */}
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
                    {/* <ul><li>{input.types.map(e => e +" ,")}</li></ul> */}
                    
                    <Link to="/home"><button>Back</button></Link>
                    <button type="submit">Create Pokemon</button>
                </div>
            </form>
                <div>
                    {
                        input.types.map(e =>
                            
                            <div key={e}>
                                <button onClick={()=> handleDelete(e)}>{e}</button>
                                
                            </div>
                            
                        )
                    }
                </div>
        </div>
    )
}