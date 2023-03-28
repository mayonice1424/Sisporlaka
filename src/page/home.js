import { Flex } from '@chakra-ui/react'
import React from 'react'
import Navbar from './navbar'

function Home() {
  return (
    <>
    <Navbar />
    <Flex>
      <h1>Home</h1>
    </Flex>
    </>
  )
}

export default Home