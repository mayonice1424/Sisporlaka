import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
const AdminRSGrafik = () => {
  TabTitle("Grafik - Sisporlaka");
  const role = useAuth('rumah-sakit')
  return (
    <>
    <Flex>
      <Text color={'red'}>Halaman Role {role} </Text>
    </Flex>
    </>
  )
}

export default AdminRSGrafik