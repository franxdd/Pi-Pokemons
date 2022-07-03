import {React, useState} from 'react'
import {useDispatch} from "react-redux"
import {getname} from "../../Redux/Actions/index.js"
import "./SearchBar.css"
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
    <div className='SearchButton'>
        <input onChange={e => handleName(e)} type={"text"} placeholder="Buscar..." className='inputSearch'></input>
        <button type='submit' className='buttonSearchBar1' onClick={e => handleSubmit(e)}><span className='spanSearch'></span>
  <span className='spanSearch'></span>
  <span className='spanSearch'></span>
  <span className='spanSearch'></span> Buscar</button>
    </div>
  )
}

export default SearchBar