import { Flex } from '@chakra-ui/react'
import React from 'react'
import Navbar from './navbar'

function Home() {
  return (
    <>
    <Navbar />
    <Flex width={'100%'} height={'85vh'}>
      <Flex width={'100%'} height={'100%'} bg={'red'}><h1>Home</h1></Flex>
    </Flex>
    </>
  )
}

export default Home