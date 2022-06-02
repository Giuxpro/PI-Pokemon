import React from "react";
import img from "../../assets/pokenotfound1.png"
import styles from "../card/Card.module.css"

export default function Card({image, name, type, attack}){
    var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
    return(
        <div className={styles.cardContainer}>
            <img className={styles.cardImg} src={regexUrl.test(image)? image : img} alt="poke_card" />
            <h3 className={styles.cardName}>{name}</h3>
            <h5 className={styles.cardTypes}>{type?.map(e =><div key={e.name}>{e.name}</div> )}</h5>
            <h5 className={styles.cardAttack}>{attack}</h5>
        </div>
    )
}