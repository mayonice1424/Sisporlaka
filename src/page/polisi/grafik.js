import React,{useEffect, useState} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility'

const AdminPolisiGrafik = () => {
  TabTitle("Grafik - Sisporlaka");
 const role = useAuth('polisi')
  return (
    <>
    <Flex>
      <Text color={'blue'}>Halaman Role {role}  </Text>
    </Flex>
    </>
  )
}

export default AdminPolisiGrafik