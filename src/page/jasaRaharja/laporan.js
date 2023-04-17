import React,{useState,useEffect} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
const AdminJasaRaharjaLaporan = () => {
  const role = useAuth('jasa-raharja')
  return (
    <>
    <Flex>
      <Text color={'red'}>Halaman Role {role}</Text>
    </Flex>
    </>
  )
}

export default AdminJasaRaharjaLaporan