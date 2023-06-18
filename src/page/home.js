import { Box, Flex,Text,Image } from '@chakra-ui/react'
import {React,useState,useEffect} from 'react'
import Navbar from '../components/publicNavbar/navbar'
import './home.css'
import { TabTitle } from '../Utility/utility'
import { listData } from '../Utility/api'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment';
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
          Sistem informasi pelaporan lalu lintas merupakan sistem yang digunakan sebagai data terpusat yang terintegrasi berdasarkan pelaporan dari pilar - pilar keselamatan lalu lintas dan angkutan jalan.
          </Text>
        </Flex>
        <Flex mt={5} width={'35%'} justify={'space-between'}>
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
                width={'35%'}
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
                mx={'20px'}
                my={'5px'}
                >
                  Sumber Data : Dirlantas, PT Jasa Raharja, Dinas Perhubungan Provinsi Lampung, dan Dinas Kesehatan Provinsi Lampung
                </Text>
              </Link>
              </Flex>
        )})
        }
    </Flex>
    </>
  )
}

export default Home