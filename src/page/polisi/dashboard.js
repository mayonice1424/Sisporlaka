import React,{useEffect, useState} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Board from '../../../src/components/board/board'
import axios from 'axios'
import { useNavigate } from "react-router";


const AdminPolisi = () => {
  const [role,setRole] = useState('')
  const navigate = useNavigate('')
const checkToken = async () =>{
  await axios.get('http://localhost:4000/token',{
  })
  .then(response => {
    console.log(response.data) 
    if (response.data.role !== 'polisi'){
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
      <Text color={'blue'}>Halaman Role</Text>
    </Flex>
    </>
  )
}

export default AdminPolisi