import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import Navbar from './navbar';
function Kontak() {
  return (
    <>
    <Navbar />
    <Flex width={'100%'} top={'15vh'} height={'85vh'} bg={'white'} justifyContent={'center'} alignItems={'center'} alignContent={'center'} position={'absolute'} zIndex={'-1'}>
      <Flex alignItems={'center'} alignContent={'center'} overflowY={'scroll'} flexDir={'column'} maxHeight={'85vh'} width={'60%'} height={'100%'} justifyContent={'center'} >
        <Text paddingY={'10'}>Kontak</Text>
        <Text paddingY={'10'}>Kontak</Text>
        <Text paddingY={'10'}>Kontak</Text>
        <Text paddingY={'10'}>Kontak</Text>
        <Text paddingY={'10'}>Kontak</Text>
        <Text paddingY={'10'}>Kontak</Text>
        <Text paddingY={'10'}>Kontak</Text>
        <Text paddingY={'10'}>Kontak</Text>
        <Text paddingY={'10'}>Kontak</Text>
      </Flex>
    </Flex>
    </>
  )
}

export default Kontak;