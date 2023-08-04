import { Wrap, Flex, Text, color } from '@chakra-ui/react'
import {React,useState} from 'react'
import {SiGooglemaps} from 'react-icons/si'
import {FiPhone} from 'react-icons/fi'
import Navbar from '../components/publicNavbar/navbar'
import { TabTitle } from '../Utility/utility'
import Footer from '../components/footer/footer'

function Kontak() {
  TabTitle("Kontak - Sisporlaka");
  const [data, setData] = useState([
    {
      id: 1,
      namaInstansi: 'Dinas Perhubungan',
      alamat: 'Jl. Basuki Rahmat No.34, Sumur Putri, Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35211',
      warna: '#448FFF',
      noTelp: '(0721) 471 633',
    },
    {
      id: 2,
      namaInstansi: 'Polresta Bandar Lampung',
      alamat: ' Jl. Mayor Jenderal Mt Haryono No. 15, Kota Bandar Lampung, Lampung',
      warna: '#000000',
      noTelp: '(0721) 253110',
    },
    {
      id: 3,
      namaInstansi: 'Dinas Kesehatan',
      alamat: 'Jl. Dr. Susilo No. 44 Bandar Lampung',
      warna: '#44B04E',
      noTelp: '(0721) 471 633',
    },
    {
      id: 4,
      namaInstansi: 'PT. Jasa Raharja',
      alamat: 'Jalan Wolter Monginsidi No.220A, Pahoman, Teluk Betung Utara, Sumur Putri, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35213',
      warna: '#159EDB',
      noTelp: '(0721) 487522',
    },
  ]);
  return (
    <>
    <Navbar />
    <Wrap width={'100%'} flexDir={'column'}  alignItems={'center'} marginTop={'15vh'} alignContent={'center'} minHeight={'77vh'} marginBottom={'8vh'} bg={'white'} overflowY={'scroll'} position={'relative'} zIndex={'-1'}>
       {
          data.map((item) => {
            data.id = item.id;
            return (
            <Flex width={'50%'} flexDir={'column'}>
              <Text pt={'10'} fontWeight={'medium'} paddingBottom={'5'}>{item.namaInstansi}</Text>
            <Flex py={'2%'} flexDir={'row'}>
              <SiGooglemaps color={item.warna} size={'30px'} />
                <Text fontWeight={'regular'} marginLeft={'2%'}>{item.alamat}</Text>
            </Flex>
            <Flex flexDir={'row'}>
              <FiPhone color={item.warna} size={'30px'} />
                <Text marginLeft={'2%'}>{item.noTelp}</Text>
            </Flex>
          </Flex>
            )
          })
       }
    </Wrap>
    <Footer />
    </>
  )
}

export default Kontak;