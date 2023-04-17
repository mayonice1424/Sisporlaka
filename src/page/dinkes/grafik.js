import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Board from '../../components/board/board'
import useAuth from '../../middleware/useAuth'
const AdminDinkesGrafik = () => {
  const role = useAuth('dinas-kesehatan')
  return (
    <>
    <Flex>
      <Text color={'red'}>Halaman role {role}</Text>
    </Flex>
    </>
  )
}

export default AdminDinkesGrafik;