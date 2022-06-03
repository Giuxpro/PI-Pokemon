import React from "react";
import { Link } from "react-router-dom";
import img from "../../assets/q2.gif"
import styles from "../card/Card.module.css"

export default function Card({image, name, types, attack, id}){
    var regexUrl = /[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/;
    return(
        <div className={styles.cardContainer}>
            <div className={styles.cardImgContainer}>
                <img className={styles.cardImg} src={regexUrl.test(image)? image : img} alt="poke_card" />
            </div>
             <Link className={styles.cardLink} to={"/pokemons/"+id}>
            <h3 className={styles.cardName}>{name}</h3>
            </Link>
        <div className={styles.cardAttackAndTitleContainer}>
            <div className={styles.cardAttakTitle}>Attack</div>
            <div className={styles.cardTypesTitle}>Types</div> 
        </div>
        <div className={styles.cardTypesAndAttackContainer}>

            <h5 className={styles.cardAttack}>{attack}</h5>
            <h5 className={styles.cardTypes}><div className={styles.cardTypes2}>{types?.map(e =><span key={e.name}>{e.name}</span> )}</div></h5>
        </div>
        </div>
    )
}