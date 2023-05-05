import React,{useEffect, useState} from 'react'
import { Flex, Text, Input,
  Table,
  Thead,
  Tbody,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputGroup,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer
 } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility'
import {getLaporan} from '../../Utility/api.js'
import axios from 'axios';
import { FormatRupiah } from "@arismun/format-rupiah";
import Loading from '../loading/loading.js'
import moment from 'moment';

const LaporanDinkes = () => {
 const [data , setData] = useState([])
 const [loading, setLoading] = useState(true)
 const [search, setSearch] = useState('')
 console.log(search)
 const getAllLaporan = async () => {
  axios.get(getLaporan)
  .then(response => {
    setData(response.data.laporan)
    console.log (data)
    }
    )
  .catch(error => {
    console.log(error)
  }
  )
}

useEffect(() => {
  getAllLaporan()
  setLoading(true)
}, [])
var idLocale = require('moment/locale/id');
moment.updateLocale('id', idLocale);
  return (
    <>
    {
      data === null ? <Loading/> : 
    <Flex flexDir={'column'}>
    <Flex  mt={'-20px'}>
      <FormControl id="search" onChange={(e) => setSearch(e.target.value)} >
        <FormLabel>Cari Data</FormLabel>
        <Input width={'20%'} color={'black'} maxWidth={'1000px'} type="text" placeholder="Cari Data" />
      </FormControl>
    </Flex>
    <Flex justify={'center'} mt={'20px'}>
      <TableContainer width={'90%'} rounded={'2xl'} maxWidth={'2000px'} >
        <Table  size='md' variant="simple">
          <TableCaption>TOP 3 Kecamatan dengan Tingkat Kecelakaan Tertinggi</TableCaption>
          <Thead bg={'var(--color-primer)'}>
            <Tr>
              <Th color={'white'}>No</Th>
              <Th color={'white'}>Judul Kejadian</Th>
              <Th color={'white'}>Tanggal</Th>
              <Th color={'white'}>Waktu</Th>
              <Th color={'white'}>Kecamatan</Th>
              <Th color={'white'}>Kerugian Materil</Th>
              <Th color={'white'}>Penyebab</Th>
            </Tr>
          </Thead>
          <Tbody>
          {
                  Object.values(data).filter((item)=> {
                    return search === "" ? item : item.judul_kejadian.toLowerCase().includes(search.toLowerCase()) || item.Kecamatan.nama_kecamatan.toLowerCase().includes(search.toLowerCase()) 
                  }
                  ).map((item,index, key) => (
                    <Tr key={item.id}>
                      <Td color={'black'}>{index+1}</Td>
                      <Td color={'black'}>{item.judul_kejadian}</Td>
                      <Td color={'black'}>{moment(item.tanggal).format('LL')}</Td>
                      <Td color={'black'}>{moment(item.waktu, 'HH:mm:ss').format('h:mm A')}</Td>
                      <Td color={'black'}>{item.Kecamatan.nama_kecamatan}</Td>
                      <Td color={'black'}><FormatRupiah value={item.kerugian_materil}/></Td>
                      <Td color={'black'}>{item.penyebab}</Td>
                    </Tr>
                  ))
                }
            </Tbody>
        </Table>
      </TableContainer>
    </Flex>
    </Flex>
  }
    </>
  )
}

export default LaporanDinkes