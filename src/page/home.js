import { Box, Flex,Text,Image } from '@chakra-ui/react'
import {React,useState,useEffect} from 'react'
import Navbar from '../components/publicNavbar/navbar'
import './home.css'
import { TabTitle } from '../Utility/utility'
import { listData } from '../Utility/api'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment';
import Footer from '../components/footer/footer'
const Home = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(listData);
      setData(response.data.laporan);
      console.log(response.data.laporan);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  TabTitle("Home - Sisporlaka");
  var idLocale = require('moment/locale/id');
  moment.updateLocale('id', idLocale);
  return (
    <>
    <Navbar />
    <Box
        width={'100%'}
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingTop="15vh"
        paddingBottom="8vh"
        minHeight="100vh" // Use minHeight to ensure the footer does not overlap content
        bg="white"
        overflowY="scroll"
      >
        <Flex mt={50}>
        <Image
						  width={"100%"}
							position={'Relative'} maxWidth={'350px'} 
							src={process.env.PUBLIC_URL + '/logokolaborasi.png'}
						/>
        </Flex>
        <Flex mt={50} textAlign={'center'}>
          <Text fontSize={25} fontWeight={'semibold'}>
          Menuju 1 Data Informasi Kecelakaan Terpusat Lampung
          </Text>
        </Flex>
        <Flex mt={5} width={'50%'}>
          <Text fontSize={20} fontWeight={'normal'} textAlign={'start'} alignContent={'flex-start'} alignItems={'flex-start'} alignSelf={'flex-start'}>
          Sistem informasi pelaporan lalu lintas merupakan sistem yang digunakan sebagai data terpusat yang terintegrasi berdasarkan pelaporan dari pilar - pilar keselamatan lalu lintas dan angkutan jalan.
          </Text>
        </Flex>
        <Flex mt={5} width={'50%'} textAlign={'center'} justify={'space-between'}>
          <Flex>
          <Text fontSize={18} fontWeight={'semibold'}>
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
        {
          data == null ? (<></>):
            data.map((item,index) => {
              return(
                <Flex
                border={'3px solid #CECECE'}
                borderRadius={10}
                flexDir={'column'}
                mt={5}
                width={'50%'}
                >
                <Link to={`/laporan/${item.data}`}>
                <Text
                  color={'#529EE3'}
                  fontSize={20}
                  fontWeight={'semibold'}
                  textAlign={'start'}
                  alignContent={'flex-start'}
                  alignItems={'flex-start'}
                  alignSelf={'flex-start'}
                  mx={'20px'}
                  my={'5px'}
                  >
                  Data Kecelakaan per {moment(item.data).format('MMMM YYYY')}
                </Text>
                <Text 
                mx={'20px'} my={'5px'} color={'#4C4C4C'}
                >
                  Sumber Data : Dirlantas, PT Jasa Raharja, Dinas Perhubungan Kota Bandar Lampung, dan Dinas Kesehatan Kota Bandar Lampung
                </Text>
                </Link>
              </Flex>
        )})
        }
    </Box>
    <Footer />
    </>
  )
}

export default Home