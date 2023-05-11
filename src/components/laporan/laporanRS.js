import React,{useEffect, useState} from 'react'
import { Flex, Text, Input,
  Table,
  Thead,
  Tbody,
  FormControl,
  Tr,
  Th,
  Td,
  TableContainer,
  Button
 } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility'
import {getLaporan, getLaporanToCount} from '../../Utility/api.js'
import axios from 'axios';
import { FormatRupiah } from "@arismun/format-rupiah";
import Loading from '../loading/loading.js'
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import './laporan.css';
import { Link } from 'react-router-dom';
const LaporanRS = () => {
 const role = useAuth('rumah-sakit')
 const [data , setData] = useState([])
 const [loading, setLoading] = useState(true)
 const [page, setPage] = useState(0)
 const [totalPage, setTotalPage] = useState(0)
 const [totalData, setTotalData] = useState(0)
 const [dataLaporan, setDataLaporan] = useState('')
 const [jumlahSearch, setJumlahSearch] = useState(0)

 const [rows, setRows] = useState(0)
 const [limit, setLimit] = useState(10)
 const [keyword, setKeyword] = useState('')
 const [query, setQuery] = useState('')
 const [msg, setMsg] = useState("");
 const getAllLaporanByQuery  = async () => {
  axios.get(`${getLaporan}search_query=${keyword}&limit=${limit}&page=${page}`)
  .then(response => {
    setData(response.data.laporan)
    setTotalPage(response.data.totalPages)
    setTotalData(response.data.totalRows)
    setPage(response.data.page)
    console.log (data)
    }
    )
  .catch(error => {
    console.log(error)
  }
  )
}

const getAllLaporan  = async () => {
  axios.get(getLaporanToCount)
  .then(response => {
    setDataLaporan(response.data.laporan)
    console.log (data)
    }
    )
  .catch(error => {
    console.log(error)
  }
  )
}
const changePage = ({ selected }) => {
  setPage(selected);
  if (selected === 9) {
    setMsg(
      "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
    );
  } else {
    setMsg("");
  }
};
const searchData = (e) => {
  e.preventDefault()
  setPage(0)
  setMsg("")
  setKeyword(query)
}
useEffect(() => {
  getAllLaporan()
  getAllLaporanByQuery()
  setLoading(true)
}, [page,keyword])
var idLocale = require('moment/locale/id');
moment.updateLocale('id', idLocale);
  return (
    <>
    {
      data === null ? <Loading/> : 
    <Flex flexDir={'column'} >
      <form onSubmit={searchData}>
      <FormControl id="search" >
    <Flex justify={'space-between'} flexDir={'row'} mt={'20px'}>
          <Flex ml={'5%'}  width={'20%'} maxWidth={'1000px'}>
            <Input variant={'filled'} color={'black'} type="text" value={query} onChange={(e)=> setQuery(e.target.value)} placeholder="Cari Data" />
            <Button ml={'14px'} width={'50%'} bg={'#4AA8FF'} maxWidth={'80px'} type='submit' className='button'>
              Cari
            </Button>
          </Flex>
    <Flex mr={'6%'}>
     <Link to={`/unit/${role}/laporan/add`}>
      <Button bg={'#4AA8FF'} maxWidth={'100px'} type='submit' className='button'>
      <Text color={'white'} >
        Tambah
      </Text>
      </Button>
      </Link>
    </Flex>
    </Flex>
      </FormControl>
      </form>
    <Flex justify={'center'} mt={'20px'}>
      <TableContainer width={'90%'} maxWidth={'2000px'} >
        <Table  size='md' variant="simple">
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
                data.map((item,index, key) => (
                    <Tr key={item.id}>
                      <Td color={'black'}>{index+1}</Td>
                      <Td color={'black'}>
                        {item.judul_kejadian == null ? '-' : item.judul_kejadian}</Td>
                      <Td color={'black'}>
                        {moment(item.tanggal).format('LL') == null ? '-' : moment(item.tanggal).format('LL')}</Td>
                      <Td color={'black'}>{moment(item.waktu, 'HH:mm:ss').format('h:mm A') == null ? '-' : moment(item.waktu, 'HH:mm:ss').format('h:mm A') }</Td>
                      <Td color={'black'}>
                        {item.Kecamatan.nama_kecamatan == null ? '-' : item.Kecamatan.nama_kecamatan}</Td>
                      <Td color={'black'}>
                        {
                          item.kerugian_materil == null ? '-': <FormatRupiah value={item.kerugian_materil == null ? '-': item.kerugian_materil}/>
                        }
                      </Td>
                      <Td color={'black'}>
                        {item.penyebab == null ? '-' : item.penyebab}
                      </Td>
                    </Tr>
                  ))
                }
            </Tbody>
        </Table>
      </TableContainer>
    </Flex>
    <Flex mx={'5%'} flexDir={'row'} mt={'20px'} justify={'space-between'}>
    <Flex>
      <Text color={'black'} >Menampilkan {data.length} dari {totalData} Data</Text>
    </Flex>
    <Flex
      key={rows}
    >
      <ReactPaginate
        previousLabel={"<"}
        previousClassName={'page-item'}
        nextLabel={">"}
        nextClassName={'page-item'}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.min(10, totalPage)}
        onPageChange={changePage}
        marginPagesDisplayed={2}
        breakLinkClassName={'page-link'}
        breakAriaLabels={'Break'}
        pageRangeDisplayed={2}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
        pageClassName={'page-item'}
        disabledClassName={'disabled'}
        disabledLinkClassName={'disabledLink'}
      />
    </Flex>
    </Flex>
  </Flex>
  }
    </>
  )
}
export default LaporanRS