import React from 'react'
import { Link } from 'react-router-dom'
import "./Card.css"

function Card({id ,name , image, type}) {
  return (
      <Link to={`/home/${id}`}>
    <div className='card'>
        <h3>{name}</h3>
        <h5>{type.join(" ")}</h5>
        <img src={image} alt="main-image"/>
    </div>
      </Link>
  )
}

export default Card