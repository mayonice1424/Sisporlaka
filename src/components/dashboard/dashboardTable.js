import React,{useState,useEffect} from 'react'
import { TabTitle } from '../../Utility/utility';
import { 
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer 
} from '@chakra-ui/react';
import axios from 'axios';
import Loading from '../../components//loading/loading.js'
import { top3Api } from '../../Utility/api';

const DashboardTable = () => {
  TabTitle("Dashboard - Sisporlaka");
  const [data, setData] = useState([])
  const [kecamatanId, setKecamatanId] = useState([])
  const [loading, setLoading] = useState(true)


  const getCountKecamatan = async () => {
    axios.get(top3Api)
    .then(response => {
      setData(response.data.count)
      console.log (kecamatanId)
      }
      )
       
    .catch(error => {
      console.log(error)
    }
    )
  }


  useEffect(() => {
    getCountKecamatan()
    setLoading(true)
  }, [])



    return (
      <>
      {
        data == null ? ( <Loading/> ) : (
        <Flex justify={'center'} mt={'50px'}>
          <TableContainer width={'95%'} rounded={'2xl'} maxWidth={'1200px'} >
            < Table  size='lg' variant="simple">
              <TableCaption>TOP 3 Kecamatan dengan Tingkat Kecelakaan Tertinggi</TableCaption>
              <Thead bg={'var(--color-primer)'}>
                <Tr>
                  <Th color={'white'}>No</Th>
                  <Th color={'white'}>Kecamatan</Th>
                  <Th color={'white'}>Jumlah</Th>
                </Tr>
              </Thead>
              <Tbody>
                {
                  Object.values(data).map((item,index, key) => (
                    <Tr>
                      <Td color={'black'}>{index+1}</Td>
                      <Td color={'black'}>{item.Kecamatan.nama_kecamatan}</Td>
                      <Td color={'black'}>{item.count}</Td>
                    </Tr>
                  ))
                }
              </Tbody>
              </ Table>
          </TableContainer>
        </Flex>
      )}
      </>
    )
}
export default DashboardTable