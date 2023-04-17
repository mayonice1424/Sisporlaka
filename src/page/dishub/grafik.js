import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
const AdminDishubGrafik = () => {
  const role = useAuth('dinas-perhubungan')
  return (
    <>
    <Flex>
      <Text color={'red'}>Halaman Role {role}</Text>
    </Flex>
    </>
  )
}

export default AdminDishubGrafik