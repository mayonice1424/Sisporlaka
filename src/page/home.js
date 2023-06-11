import { Box, Flex,Text,Image } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../components/publicNavbar/navbar'
import './home.css'
import { TabTitle } from '../Utility/utility'
import { Link } from 'react-router-dom'
function Home() {
  TabTitle("Home - Sisporlaka");
  return (
    <>
    <Navbar />
    <Flex width={'100%'} flexDir={'column'}  alignItems={'center'} marginTop={'15vh'} alignContent={'center'} height={'85vh'} bg={'white'} overflowY={'scroll'} position={'fixed'} zIndex={'-1'}>
        <Flex mt={50}>
        <Image
						  width={"100%"}
							position={'Relative'} maxWidth={'350px'} 
							src={process.env.PUBLIC_URL + '/logokolaborasi.png'}
						/>
        </Flex>
        <Flex mt={50}>
          <Text fontSize={25} fontWeight={'semibold'} textAlign={'start'} alignContent={'flex-start'} alignItems={'flex-start'} alignSelf={'flex-start'}>
          Menuju 1 Data Informasi Kecelakaan Terpusat Lampung
          </Text>
        </Flex>
        <Flex mt={5} width={'35%'}>
          <Text fontSize={20} fontWeight={'normal'} textAlign={'start'} alignContent={'flex-start'} alignItems={'flex-start'} alignSelf={'flex-start'}>
          Sistem informasi pelaporan lalu lintas merupakan sistem yang digunakan sebagai data terpusat yang terintegrasi berdasarkan pelaporan dari pilar pilar keselamatan lalu lintas dan angkutan jalan.
          </Text>
        </Flex>
        <Flex mt={5} width={'35%'} justify={'space-between'}>
          <Flex>
          <Text>
            Data Kecelakaan
          </Text>
          </Flex>
          <Flex>
          <Link to={'/informasi'}>
          <Text>
            Lihat Selengkapnya
          </Text>
          </Link>
          </Flex>
        </Flex>
    </Flex>
    </>
  )
}

export default Home