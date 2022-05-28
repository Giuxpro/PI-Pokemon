import React from 'react'
import {Link} from "react-router-dom"

const Landing = () => {
  return (
    <div>
      <h1>Pokemon</h1>
      <Link to="/home">
        <button>Enter</button>
      </Link>
    </div>
  )
}

export default Landing