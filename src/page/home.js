import { Box, Flex,Text } from '@chakra-ui/react'
import React from 'react'
import Navbar from './navbar'
import './home.css'

function Home() {
  return (
    <>
    <Navbar />
    <Flex width={'100%'} flexDir={'column'}  alignItems={'center'} marginTop={'15vh'} alignContent={'center'} height={'85vh'} bg={'white'} overflowY={'scroll'} position={'fixed'} zIndex={'-1'}>
        <Text paddingY={'10'}>Home</Text>
        <Text paddingY={'10'}>Home</Text>
        <Text paddingY={'10'}>Home</Text>
        <Text paddingY={'10'}>Home</Text>
        <Text paddingY={'10'}>Home</Text>
        <Text paddingY={'10'}>Home</Text>
        <Text paddingY={'10'}>Home</Text>
        <Text paddingY={'10'}>Home</Text>
        <Text paddingY={'10'}>Home</Text>
    </Flex>
    </>
  )
}

export default Home