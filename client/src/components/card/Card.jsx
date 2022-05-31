import React from "react";
import img from "../../assets/pokenotfound1.png"

export default function Card({image, name, type, attack}){
    var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
    return(
        <div>
            <h3>{name}</h3>
            <h5>{type}</h5>
            <h5>{attack}</h5>
            <img src={regexUrl.test(image)? image : img} alt="poke_card" />
        </div>
    )
}