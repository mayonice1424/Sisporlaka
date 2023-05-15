/* eslint-disable no-lone-blocks */
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
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
 } from '@chakra-ui/react'
 import { useCookies } from 'react-cookie'
 import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import {getLaporanValidation,updateStatusApi,deleteLaporanApi} from '../../Utility/api.js'
import axios from 'axios';
import { FormatRupiah } from "@arismun/format-rupiah";
import Loading from '../../components/loading/loading.js'
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import '../../components/laporan/laporan.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/react"

const AdminDishubValidasi = () => {
 
  const patchLaporan = (id,e) => {
    e.preventDefault();
   axios.patch(`${updateStatusApi}${id}`,{status: true
   }).then(response => {
     console.log(response)
     navigate(window.location.reload(true))
   })
   .catch(error => {
     console.log(error)
   }
   )
 }
 
 const deleteItem = (e,id) => {
  e.preventDefault();
  axios.delete(`${deleteLaporanApi}${id}`,
  console.log(id)
  )
 .then(response => {
   console.log(response)
   navigate(window.location.reload(true))
 })
 .catch(error => {
   console.log(error)
 }
 )
}
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(routePageName("Validasi Laporan"));
	}, []);
  TabTitle("Validasi - Sisporlaka");
 const role = useAuth('dinas-perhubungan')
 const [data , setData] = useState([])
 const [loading, setLoading] = useState(true)
 const [page, setPage] = useState(0)
 const [totalPage, setTotalPage] = useState(0)
 const [totalData, setTotalData] = useState(0)
 const [dataLaporan, setDataLaporan] = useState('')
 const { isOpen, onOpen, onClose } = useDisclosure()
 const [rows, setRows] = useState(0)
 const [limit, setLimit] = useState(10)
 const [keyword, setKeyword] = useState('')
 const [query, setQuery] = useState('')
 const [msg, setMsg] = useState("");
 const [cookies, setCookie, removeCookie] = useCookies(['refreshToken']);
 const [id, setId] = useState('')
 const [judulKejadian, setJudulKejadian] = useState('')


 const getAllLaporanByQuery = async () => {
  const refreshToken = cookies.refreshToken;
  try {
    const response = await axios.get(`${getLaporanValidation}search_query=${keyword}&limit=${limit}&page=${page}`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    });
    setData(response.data.laporan);
    setTotalPage(response.data.totalPages);
    setTotalData(response.data.totalRows);
    setPage(response.data.page);
  } catch (error) {
    console.log(error);
  }
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
    <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Hapus Laporan</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Apakah anda yakin ingin menghapus data {judulKejadian} ini?
            </ModalBody>
            <ModalFooter>
            <Button
                bg={'red'}
                onClick={(e) => {
                deleteItem(e, id);
                onClose();
              }}
              color={'white'}
              mr={3}
              > Hapus
              </Button>
              <Button border={'solid 2px red'} bg={'white'}  mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
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
              <Th color={'white'}>
                <Flex justify={'center'}>
                  <Text>Aksi</Text>
                </Flex>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
          {
              data.map((item,index, key) => (
                <Tr key={item.id_laporan}>
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
                      item.kerugian_materil == null ? '-': <FormatRupiah value={item.kerugian_materil == null ? '--': item.kerugian_materil}/>
                    }
                  </Td>
                  <Td color={'black'}>
                    {item.penyebab == null ? '-' : item.penyebab}
                  </Td>
                  <Td>
                    <Flex justify={'center'} flexDir={'row'}>
                        <Button onClick={(e) => patchLaporan(item.users[0].Users_Laporan.id_users_laporan,e)} bg={'#4AA8FF'} maxWidth={'100px'} type='submit' color={'white'} className='validasiButton'> Validasi</Button>
                        <Button 
                          color={'#646464'}
                          onClick= {
                            () => {
                              setJudulKejadian(item.judul_kejadian)
                              setId(item.id_laporan)
                              onOpen()
                               }
                            }
                            ml={'10px'} border={'solid 2px red'} bg={'#FAFBFC'} maxWidth={'100px'} type='submit' className='deleteButton'> 
                            {item.id_laporan}
                        </Button>
                    </Flex>
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
export default AdminDishubValidasi