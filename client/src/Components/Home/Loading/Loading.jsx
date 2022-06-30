import {React, useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import gif from "../../Multimedia/pokespera.gif";
import Home from '../Home';

function Loading() {
    const history= useHistory()
    const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
        history.push("/home")
      ;
    }, 2000);
  }, []);
  return (
    <div>{loading?(<img className="img" src={gif}  />):"asd"}
    <p>Loading..</p></div>
  )
}

export default Loading