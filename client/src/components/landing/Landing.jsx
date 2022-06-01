import React from 'react'
import {Link} from "react-router-dom"
import styles from "../landing/Landing.module.css"
import img from "../../assets/pokeland2.jpg"

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <div>
      {/* <img className={styles.landingImg} src={img} alt="landinimg" /> */}
        <div className={styles.titleAndbtn}>

        <h1 className={styles.landingTitle}>Pokemon</h1>
        <Link to="/home">
          <button className={styles.landingBtn}>Enter</button>
        </Link>
        </div>
        </div>
    </div>
  )
}

export default Landing