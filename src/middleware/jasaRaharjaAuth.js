import React,{useEffect} from "react"
import {  useNavigate } from "react-router";
import axios from 'axios'

const CatchRoleJasaRaharja = () => {
  const navigate = useNavigate('')
  const checkToken = async () =>{
    await axios.get('http://localhost:4000/token',{
    })
    .then(response => {
      console.log(response.data) 
       if (response.data.role !== 'jasa-raharja'){
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
export default CatchRoleJasaRaharja