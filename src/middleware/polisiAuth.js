import React,{useEffect} from "react"
import {  useNavigate } from "react-router";
import axios from 'axios'

const CatchRole = () => {
  const navigate = useNavigate('')
  const checkToken = async () =>{
    await axios.get('http://localhost:4000/token',{
    })
    .then(response => {
      console.log(response.data) 
       if (response.data.role !== 'polisi'){
        return navigate("/login")
      }
    })
  }
  useEffect(()=>{
    checkToken();
  },setTimeout(300))

  return(
    <>
    </>
  )
}
export default CatchRole