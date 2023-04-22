import React,{useState,useEffect} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
const AdminJasaRaharja = () => {
  TabTitle("Dashboard - Sisporlaka");
  const role = useAuth('jasa-raharja')
  return (
    <>
    <Flex>
      <Text color={'red'}>Halaman Role {role}</Text>
    </Flex>
    </>
  )
}

export default AdminJasaRaharja