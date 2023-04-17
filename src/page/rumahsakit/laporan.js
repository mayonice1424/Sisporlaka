import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Board from '../../components/board/board'
import useAuth from '../../middleware/useAuth'
const AdminRSLaporan = () => {
  const role = useAuth('rumah-sakit')
  return (
    <>
    <Flex>
      <Text color={'red'}>Halaman Role {role} </Text>
    </Flex>
    </>
  )
}

export default AdminRSLaporan