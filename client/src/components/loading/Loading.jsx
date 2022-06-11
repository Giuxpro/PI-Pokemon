import React from "react";
import img from "../../assets/load3.gif"
import styles from "../loading/Loading.module.css"

export default function Loading(){
    return(
        <div className={styles.loadingContainer}>
            <img className={styles.loadingImg} src={img} alt="spinnerImg" />
        </div>
    )
}