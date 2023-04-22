import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
const AdminDishubLaporan = () => {
  TabTitle("Laporan - Sisporlaka");
  const role = useAuth('dinas-perhubungan')
  return (
    <>
    <Flex>
      <Text color={'red'}>Halaman Role {role}</Text>
    </Flex>
    </>
  )
}

export default AdminDishubLaporan