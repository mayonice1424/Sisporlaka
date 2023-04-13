import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Board from '../../../src/components/board/board'

const Dashboard = () => {

  return (
    <>
    <Board />
    <Flex>
      <Text color={'red'}>Ini dashboard</Text>
    </Flex>
    </>
  )
}

export default Dashboard