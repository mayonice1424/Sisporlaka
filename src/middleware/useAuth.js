import React,{useCallback, useEffect, useState} from "react"
import {  useNavigate } from "react-router";
import axios from 'axios'
import { getIdUserByTokenApi } from "../Utility/api";

const useAuth = (checkRole) => {
  const navigate = useNavigate('')
  const [role,setRole] = useState('')
  const checkToken = useCallback( async () =>{
    try {
      const response = await axios.get(getIdUserByTokenApi,{
      })
      setRole(response.data.role);
      if (!checkRole )
      return
         if ( response.data.role  !== checkRole ){
          console.log(response.data.role)
          return navigate("/login")
        }
    }catch (error) {
      console.log(error)
      return navigate("/login")
    }
  },[checkRole])
  useEffect(()=>{
    checkToken();
  },[])

  return role 
}
export default useAuth