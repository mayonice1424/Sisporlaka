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
import useAuth from '../../middleware/useAuth';
import {IoAddCircleOutline} from 'react-icons/io5';
import { TabTitle } from '../../Utility/utility'
import {getLaporan, getLaporanToCount} from '../../Utility/api.js'
import axios from 'axios';
import { FormatRupiah } from "@arismun/format-rupiah";
import Loading from '../loading/loading.js'
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import './laporan.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/react"
import { routePageName } from '../../Redux/action';
import { useDispatch } from 'react-redux';

const LaporanRS = () => {
 const role = useAuth('rumah-sakit')
 const [data , setData] = useState([])
 const [identitasKorban, setIdentitasKorban] = useState([])
 const [identitasPengemudi, setIdentitasPengemudi] = useState([])
 const [loading, setLoading] = useState(true)
 const [page, setPage] = useState(0)
 const { isOpen, onOpen, onClose } = useDisclosure()
 const [totalPage, setTotalPage] = useState(0)
 const [totalData, setTotalData] = useState(0)
 const [dataLaporan, setDataLaporan] = useState('')
 const [judul_kejadian, setJudulKejadian] = useState('')
 const [rows, setRows] = useState(0)
 const [limit, setLimit] = useState(10)
 const [keyword, setKeyword] = useState('')
 const [query, setQuery] = useState('')
 const [idLaporan, setIdLaporan] = useState('')
 const [msg, setMsg] = useState("");
const dispatch = useDispatch()
const navigate  = useNavigate()
const getAllLaporanByQuery = async () => {
  try {
    const response = await axios.get(`${getLaporan}search_query=${keyword}&limit=${limit}&page=${page}`);
    setData(response.data.laporan);
    console.log(response.data);
    setTotalPage(response.data.totalPages);
    setTotalData(response.data.totalRows);
    setPage(response.data.page);
    setDataLaporan(response.data.laporan[0].Laporan_Kategori.nama_kategori);
    setIdentitasKorban(response.data.identitas_korban);
    setIdentitasPengemudi(response.data.identitas_pengemudi);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

const customModalSize = {
  maxWidth: "2000px",
  width: "80%",
  height: "80%",
  maxHeight: "1500px",
};

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
  dispatch(routePageName("Laporkan Kejadian"))
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
          <ModalContent className="custom-modal-content" style={customModalSize}>
            <ModalHeader>Detail Laporan {judul_kejadian}</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow={'auto'}>
              <Text fontWeight="bold" fontSize={'35px'}>Identitas Korban</Text>
              <hr/>
              {
              identitasKorban.map((item, index, key) => {
                if (item.laporan.id_laporan === idLaporan) {
                  return (
                    <>
                    <Flex key={item.id_laporan}  flexDir="column" mb="20px">
                      <Text fontWeight="bold">Nama Korban</Text>
                      <Text>{item.nama == null? '-' : item.nama}</Text>
                      <Text fontWeight="bold">Jenis Kelamin</Text>
                      <Text>{item.jenis_kelamin == null? '-' : item.jenis_kelamin }</Text>
                      <Text fontWeight="bold">Umur</Text>
                      <Text>{item.umur == null ? '-' : item.umur}</Text>
                      <Text fontWeight="bold">Alamat</Text>
                      <Text>{item.alamat == null ? '-' : item.alamat }</Text>
                      <Text fontWeight="bold">NIK</Text>
                      <Text>{item.NIK  == null ? '-' : item.NIK }</Text>
                      <Text fontWeight="bold">Nomor Plat Ambulance</Text>
                      <Text>{item.plat_ambulance == null ? '-' : item.plat_ambulance}</Text>
                      <Text fontWeight="bold">Nama Rumah Sakit</Text>
                      <Text>{item.nama_rumah_sakit == null ? '-' : item.nama_rumah_saki}</Text>
                      <Text fontWeight="bold">Jenis Luka</Text>
                      <Text>{item.wound.keterangan_luka == null ? '-' : item.wound.keterangan_luka }</Text>
                      <Text fontWeight="bold">Nomor Rekam Medis</Text>
                      <Text>{item.nomor_rekam_medis == null ? '-' : item.nomor_rekam_medis}</Text>
                      <Text fontWeight="bold">Skala Triase</Text>
                      <Text>{item.kode_ATS == null ? '-' : `${item.kode_ATS} : ${item.Skala_Triase.keterangan}`}</Text>
                      <Text fontWeight="bold">------------------------------</Text>
                    </Flex>
                    </>
                  );
                }
                return null;
              })
            }
            </ModalBody>
            <ModalFooter>
            <Button
                bg={'red'}
                onClick={(e) => {
                 navigate(`/unit/${role}/laporan/edit/${idLaporan}`)
              }}
              color={'white'}
              mr={3}
              >
                Update Data
              </Button>
              <Button border={'solid 2px var(--color-primer)'} bg={'white'}  mr={3} onClick={onClose}>
                Tutup
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
     <Link to={`/unit/${role}/laporan/add`}>
      <Button bg={'#4AA8FF'} maxWidth={'160px'} type='submit' className='button'>
        <Flex justify={'center'} flexDir={'row'}>
          <Flex>
            <IoAddCircleOutline className="custom-icon" fontSize={23} />
          </Flex>
          <Flex>
            <Text ml={2} color={'white'} >
              Buat Laporan
            </Text>
          </Flex>
        </Flex>
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
              <Th color={'white'}>Kategori Kecelakaan</Th>
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
                  Object.values(data).map((item,index, key) => (
                    <Tr key={item.id}>
                      <Td color={'black'}>{index+1}</Td>
                      <Td color={'black'}>
                        {item.judul_kejadian == null ? '-' : item.judul_kejadian}</Td>
                      <Td color={'black'}>
                        {moment(item.tanggal).format('LL') == null ? '-' : moment(item.tanggal).format('LL')}</Td>
                      <Td color={'black'}>{moment(item.waktu, 'HH:mm:ss').format('h:mm A') == null ? '-' : moment(item.waktu, 'HH:mm:ss').format('h:mm A') }</Td>
                      <Td color={'black'}>
                        {
                          item.Kecamatan == null ? '-' : item.Kecamatan.nama_kecamatan
                        }
                      </Td>
                      <Td color={'black'}>
                        {
                          item.kerugian_materil == null ? '-': <FormatRupiah value={item.kerugian_materil == null ? '-': item.kerugian_materil}/>
                        }
                      </Td>
                      <Td color={'black'}>
                      {
                        item.Laporan_Kategori == null ? '-' : item.Laporan_Kategori.nama_kategori
                      }
                      </Td>
                      <Td color={'black'}>
                        {item.penyebab == null ? '-' : item.penyebab}
                      </Td>
                      <Td color={'black'}>
                        <Flex flexDir={'row'}>
                        <Flex justify={'center'} alignContent={'center'} alignItems={'center'}>
                      <Button mr={'10px'}
                         ml={'10px'} border={'solid 2px var(--color-primer) '} bg={'#FAFBFC'} maxWidth={'160px'} type='submit'
                        color={'#646464'}>
                        <Link to={`/unit/${role}/detail-laporan/${item.id_laporan}`}>  
                          <Text color={'black'} >
                            Tambah Korban
                          </Text>
                        </Link>
                      </Button>
                        </Flex>
                      <Flex flexDir={'column'}>
                      <Button 
                          mb={3}
                          mr={'10px'}
                          color={'#646464'}
                          onClick= {
                            () => {
                              setIdLaporan(item.id_laporan)
                              setJudulKejadian(item.judul_kejadian)
                              onOpen()
                            }
                          }
                            ml={'10px'} border={'solid 2px var(--color-primer) '} bg={'#FAFBFC'} maxWidth={'150px'} type='submit'>
                            <Text color={'black'} >
                            Detail Laporan
                            </Text>
                        </Button>
                        <Button
                         mr={'10px'}
                         ml={'10px'} border={'solid 2px var(--color-primer) '} bg={'#FAFBFC'} maxWidth={'150px'} type='submit'
                        color={'#646464'}
                         >
                        <Link to={`/unit/${role}/laporan/edit/${item.id_laporan}`}>
                          <Text color={'black'} >
                            Edit
                          </Text>
                        </Link>
                        </Button>
                        </Flex>
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
export default LaporanRS