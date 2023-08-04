import { Box, Flex,Text,Image } from '@chakra-ui/react'
import {React,useState,useEffect} from 'react'
import Navbar from '../components/publicNavbar/navbar'
import './home.css'
import { TabTitle } from '../Utility/utility'
import { getPublicReportUnlimited } from '../Utility/api'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment';
import Footer from '../components/footer/footer'
const Informasi = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const response = await axios.get(getPublicReportUnlimited);
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
        <Flex mt={5} width={'50%'} justify={'space-between'}>
          <Flex>
          <Text fontSize={20} fontWeight={'semibold'}>
            Data Kecelakaan
          </Text>
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
                  transition="background-color 0.3s ease" // Tambahkan efek transisi untuk smooth hover
                  _hover={[{bg: '#EAEAEA'},{boxShadow:'0px 0px 1px rgba(0, 0, 0, 0.3)'}]} // Tambahkan warna latar belakang saat dihover
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

export default Informasi