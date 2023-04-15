import React,{useState,useEffect} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import axios from 'axios'
import Board from '../../../src/components/board/board'
import {  useNavigate } from "react-router";
const AdminJasaRaharja = () => {
  const [role,setRole] = useState('')
  const navigate = useNavigate('')
  const checkToken = async () =>{
    await axios.get('http://localhost:4000/token',{
    })
    .then(response => {
      console.log(response.data) 
      if (response.data.role !== 'jasa-raharja'){
        navigate("/login")
      }
    })
  }
    useEffect(()=>{
      checkToken();
    },setTimeout(300))
  return (
    <>
    <Board />
    <Flex>
      <Text color={'red'}>Halaman Role</Text>
    </Flex>
    </>
  )
}

export default AdminJasaRaharja