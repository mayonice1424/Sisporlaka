import { Box, Flex,Text } from '@chakra-ui/react'
import React from 'react'
import Navbar from './navbar'

function Home() {
  return (
    <>
    <Navbar />
    <Flex width={'100%'} top={'15vh'} height={'85vh'} bg={'white'} justifyContent={'center'} alignItems={'center'} alignContent={'center'} position={'absolute'} zIndex={'-1'}>
      <Flex alignItems={'center'} alignContent={'center'} overflowY={'scroll'} flexDir={'column'} maxHeight={'85vh'} width={'60%'} height={'100%'} justifyContent={'center'} >
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
    </Flex>
    </>
  )
}

export default Home