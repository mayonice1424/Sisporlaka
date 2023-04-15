import React,{useCallback, useEffect, useState} from "react"
import {  useNavigate } from "react-router";
import axios from 'axios'

const useAuth = (checkRole) => {
  const navigate = useNavigate('')
  const [role,setRole] = useState('')
  const checkToken = useCallback( async () =>{
    try {
      const response = await axios.get('http://localhost:4000/token',{
      })
      setRole(response.data.role);
      if (!checkRole )
      return
         if ( response.data.role  !== checkRole ){
          return navigate("/login")
        }
    }catch (error) {
      return navigate("/login")
    }
  },[checkRole])
  useEffect(()=>{
    checkToken();
  },[])

  return role 
}
export default useAuth