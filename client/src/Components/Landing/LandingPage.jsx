import React from 'react'
import { Link } from 'react-router-dom'
import img from "../Multimedia/pokeball.png"

import "./Landing.css"



function LandingPage() {
  return (
    <div className='landing'>
        
        <div>
            <h1>Bienvenidos a la PokeApi</h1>
            <Link to="/loading"> 
            <img id="img" src={img} alt="main-img"/>
            </Link>
            <p>Haga click para continuar</p>
        </div>
    </div>
  )
}

export default LandingPage