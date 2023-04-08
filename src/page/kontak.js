import { Wrap, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import {SiGooglemaps} from 'react-icons/si'
import Navbar from './navbar';
function Kontak() {
  return (
    <>
    <Navbar />
    <Wrap marginLeft={'10'} width={'100%'} flexDir={'row'} marginTop={'15vh'} height={'85vh'} bg={'white'} overflowY={'scroll'} position={'absolute'} zIndex={'-1'}>
       <Flex marginLeft={'5vh'} marginRight={'5vh'} >
          <Flex flexDir={'column'}>
            <Text pt={'10'} paddingBottom={'5'}>Dinas Perhubungan</Text>
            <Flex flexDir={'row'}>
              <SiGooglemaps color='#448FFF' size={'30'} />
              <Text marginLeft={'2%'}>Jl. Jendral Sudirman No. 1, Kec. Kebayoran Baru, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12110</Text>
            </Flex>
          </Flex>
       </Flex>
    </Wrap>
    </>
  )
}

export default Kontak;