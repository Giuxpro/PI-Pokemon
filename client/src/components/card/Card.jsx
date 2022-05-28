import React from "react";


export default function Card({image, name, type}){
    return(
        <div>
            <h3>{name}</h3>
            <h5>{type}</h5>
            <img src={image} alt={name} />
        </div>
    )
}