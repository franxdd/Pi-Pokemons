import {React, useState} from 'react'
import {useDispatch} from "react-redux"
import {getname} from "../../Redux/Actions/index.js"
function SearchBar() {
const dispatch = useDispatch()
const [name, setName] = useState("")
function handleName (e){
  e.preventDefault()
 setName(e.target.value)
}
function handleSubmit(e){
  e.preventDefault()
  dispatch(getname(name))
}

  return (
    <div >
        <input onChange={e => handleName(e)} type={"text"} placeholder="Buscar..."></input>
        <button type='submit' onClick={e => handleSubmit(e)}>Buscar</button>
    </div>
  )
}

export default SearchBar