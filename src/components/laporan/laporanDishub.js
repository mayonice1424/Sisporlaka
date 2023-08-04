import React,{useEffect, useState} from 'react'
import { Flex, Text, Input,
  Table,
  Thead,
  Tbody,
  FormControl,
  Image,
  Divider,
  Tr,
  Th,
  Box,
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
import { TabTitle } from '../../Utility/utility'
import {getLaporan, getJumlahKorban,deleteLaporanApi,getLaporanDownload} from '../../Utility/api.js'
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { FormatRupiah } from "@arismun/format-rupiah";
import Loading from '../../components/loading/loading.js'
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import '../../components/laporan/laporan.css'
import { Link,useNavigate } from 'react-router-dom';
import { useDisclosure } from "@chakra-ui/react"
import { routePageName } from '../../Redux/action';
import { useDispatch } from 'react-redux';
import * as XLSX from 'xlsx';


const LaporanDishub = () => {
 const role = useAuth('dinas-perhubungan')
 const [data , setData] = useState([])
 const [identitasKorban, setIdentitasKorban] = useState([])
 const [identitasPengemudi, setIdentitasPengemudi] = useState([])
 const [loading, setLoading] = useState(true)
 const [page, setPage] = useState(0)
 const { isOpen, onOpen, onClose } = useDisclosure()
 const [totalPage, setTotalPage] = useState(0)
 const [totalData, setTotalData] = useState(0)
 const [dataLaporan, setDataLaporan] = useState('')
 const [lokasi, setLokasi] = useState('')
 const [tanggal, setTanggal] = useState('')
 const [judul_kejadian, setJudulKejadian] = useState('')
 const [kecamatan, setKecamatan] = useState('')
 const [korban,setKorban] = useState('')
 const [rows, setRows] = useState(0)
 const [limit, setLimit] = useState(10)
 const [keyword, setKeyword] = useState('')
 const [query, setQuery] = useState('')
 const [idLaporan, setIdLaporan] = useState('')
 const [msg, setMsg] = useState("");
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const [allData, setAllData] = useState([])

 const getAllDataDownload = async () => {
  try {
    const response = await axios.get(`${getLaporanDownload}search_query=${keyword}`);
    setAllData(response.data.laporan);
    const korbanPromises = response.data.laporan.map((item) =>
    axios.get(`${getJumlahKorban}${item.id_laporan}`).then((res) => res.data.jumlahKorban[0].jumlah_korban)
    );

    Promise.all(korbanPromises).then((jumlahKorbanArray) => {
    setJumlahKorban(jumlahKorbanArray);
    });
    console.log(response.data.laporan);
  } catch (error) {
    console.log(error);
  }
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
const [jumlahKorban, setJumlahKorban] = useState([]) 
const getAllLaporanByQuery = async () => {
  try {
    const response = await axios.get(`${getLaporan}search_query=${keyword}&limit=${limit}&page=${page}`);
    setData(response.data.laporan);

    const korbanPromises = response.data.laporan.map((item) =>
      axios.get(`${getJumlahKorban}${item.id_laporan}`).then((res) => res.data.jumlahKorban[0].jumlah_korban)
    );

    Promise.all(korbanPromises).then((jumlahKorbanArray) => {
      setJumlahKorban(jumlahKorbanArray);
    });
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

function exportToExcel(data, filename) {
  const worksheet = XLSX.utils.json_to_sheet(data);

  // Mengatur judul kolom
  const headers = [
    { label: "No", key: "no" },
    { label: "Judul Kejadian", key: "judul_kejadian" },
    { label: "Tanggal", key: "tanggal" },
    { label: "Waktu", key: "waktu" },
    { label: "Lokasi", key: "lokasi"},
    { label: "Kecamatan", key: "Kecamatan" },
    { label: "Kerugian Materil", key: "kerugian_materil" },
    { label: "Kategori", key: "Laporan_Kategori" },
    { label: "Jumlah Korban", key: "jumlah_korban" },
    { label: "Keterangan", key: "keterangan" },
    { label: "Penyebab", key: "penyebab" },
  ];

  headers.forEach((header, index) => {
    const cellRef = XLSX.utils.encode_cell({ r: 0, c: index });
    worksheet[cellRef].v = header.label;
  });

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
  
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const excelData = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(excelData);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}.xlsx`;
  link.click();
  URL.revokeObjectURL(url);
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
  dispatch(routePageName("Laporkan Kejadian"))
  getAllLaporanByQuery()
  setLoading(true)
  getAllDataDownload()
}, [page,keyword])
var idLocale = require('moment/locale/id');
moment.updateLocale('id', idLocale);
  return (
    <>
    {
      data === null ? <Loading/> : 
<Flex flexDir="column" mt={30} overflowX={'none'}>
      <form onSubmit={searchData}>
      <FormControl id="search" >
      <Flex>
              <Flex mr={'3%'} flexDir={{ base: "column", md: "row", lg: "row" }}
                width={{ base: "100%", md: "40%", lg: "30%" }}
                maxWidth={{ base: "100%", md: "500px", lg: "500px" }}
                >
                <Input
                  variant="filled"
                  color="black"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari Data"
                />
                <Button
                  paddingX={10}
                  bg="#4AA8FF"
                  maxWidth="80px"
                  type="submit"
                  className="button"
                >
                  Cari
                </Button>
              </Flex>
              <Flex flexDir="row"
                width={{ base: "100%", md: "100%", lg: "100%" }}
                align={{ base: "center", md: "flex-start", lg: "flex-start" }}
                mt={{ base: "20px", md: "0px", lg: "0px" }}
                >
              <Button
                  mr={'0.5%'}
       type='submit' 
        className="btn btn-primary"
        fontWeights="bold"
        bg={`rgb(76, 175, 80)`}
        onClick={() => exportToExcel(
          allData.map((item, index) => ({
            no: index + 1,
            judul_kejadian: item.judul_kejadian,
            tanggal: moment(item.tanggal).format('LL'),
            waktu: item.waktu,
            lokasi: item.lokasi,
            Kecamatan: item.Kecamatan.nama_kecamatan,
            kerugian_materil: item.kerugian_materil,
            Laporan_Kategori: item.Laporan_Kategori.nama_kategori,
            jumlah_korban: jumlahKorban[index],
            keterangan: item.keterangan,
            penyebab: item.penyebab,
          })),
          `Laporan ${role}`,
        )}
        >
        <Text color={'white'} fontSize={'100%'}>
          Download To Excel
        </Text>
        </Button>
            <CSVLink                  
             data={
              allData.map((item, index) => ({
            no: index + 1,
            judul_kejadian: item.judul_kejadian,
            tanggal: moment(item.tanggal).format('LL'),
            waktu: item.waktu,
            lokasi: item.lokasi,
            Kecamatan: item.Kecamatan.nama_kecamatan,
            kerugian_materil : item.kerugian_materil,
            Laporan_Kategori: item.Laporan_Kategori.nama_kategori,
            jumlah_korban: jumlahKorban[index],
            keterangan: item.keterangan,
            penyebab: item.penyebab,
          }))
        } filename={`Laporan ${role}.csv`} className="btn btn-primary"
        headers={
          [
            { label: "No", key: "no" },
            { label: "Judul Kejadian", key: "judul_kejadian" },
            { label: "Tanggal", key: "tanggal" },
            { label: "Waktu", key: "waktu" },
            { label: "Lokasi", key: "lokasi"},
            { label: "Kecamatan", key: "Kecamatan" },
            { label: "Kerugian Materil", key: "kerugian_materil" },
            { label: "Kategori", key: "Laporan_Kategori" },
            { label: "Jumlah Korban", key: "jumlah_korban" },
            { label: "Keterangan", key: "keterangan" },
            { label: "Penyebab", key: "penyebab" },
          ]
        }
        >
      <Button  bg={`rgb(76, 175, 80)`} >
        <Text color={'white'}>
          Download To CSV
        </Text> 
      </Button>
        </CSVLink>
      </Flex>
      <Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className="custom-modal-content" style={customModalSize}>
            <ModalHeader>Detail Laporan {judul_kejadian}</ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow={'auto'}>
            <Flex>
              <Image
              width={"50%"}
							position={'Relative'} maxWidth={'200px'} 
              src={process.env.PUBLIC_URL + '/logodishub.jpg'} />
              <Flex flexDir={'column'} justify={'center'} textAlign={'center'} width={'100%'}>
              <Text fontWeight='semibold' fontSize={'40px'}>
                Dinas Perhubungan
              </Text>
              <Text  fontWeight='semibold' fontSize={'40px'}>
                Daerah Kota Bandar Lampung
              </Text>
              <Text fontWeight='semibold' fontSize={'15px'}>
              Rajabasa, Kec. Rajabasa, Kota Bandar Lampung, 
              </Text>
              </Flex>
              </Flex>
              <Divider borderWidth="2px" borderColor="black" />
              <Divider borderWidth="2px" borderColor="black" mt={1} />
              <Flex mt={'5'}>
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr>
                      <Th>Perihal</Th>
                      <Th>:</Th>
                      <Th>{judul_kejadian}</Th>
                      </Tr>
                      <Tr>
                      <Th>Lokasi Kejadian</Th>
                      <Th>:</Th>
                      <Th>{lokasi}</Th>
                      </Tr>
                      <Tr>
                      <Th>Tanggal</Th>
                      <Th>:</Th>
                      <Th>{tanggal}</Th>
                      </Tr>
                    </Thead>
                  </Table>
                </TableContainer>
              </Flex>
              <Flex my={10} width={'50%'}>
              <Text> 
                  Telah terjadi kecelakaan di kecamatan {kecamatan} dengan jumlah korban sebanyak {korban} dengan <b>identitas pengemudi dan korban</b> adalah sebagai berikut:
                </Text>
              </Flex>
              {
                identitasPengemudi.map((item, index) => {
                  if (item.id_laporan === idLaporan) {
                    return (
                      <>
                       <Flex flexDir="column" my={10}>
                    <hr/>
                    <Text fontWeight="bold">
                        Identitas Korban
                      </Text>
                      <TableContainer>
                        <Table>
                          <Tr>
                            <Td fontWeight="bold">Nama Pengemudi</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.nama_pengemudi == null || item.nama_pengemudi == '' ? '-' : item.nama_pengemudi}</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Jenis Kelamin</Td>
                            <Td>:</Td>
                            <Td>
                            <Text>{item.jenis_kelamin_pengemudi == null || item.jenis_kelamin_pengemudi == '' ? '-' : item.jenis_kelamin_pengemudi }</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Umur</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.umur_pengemudi == null || item.umur_pengemudi == ''? '-' : item.umur_pengemudi}</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Alamat</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.alamat_pengemudi == null || item.alamat_pengemudi == ''? '-' : item.alamat_pengemudi }</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Nomor SIM</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.no_sim  == null || item.no_sim == '' ? '-' : item.no_sim }</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Nomor STNK</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.no_STNK  == null || item.no_STNK == ''? '-' : item.no_STNK }</Text>
                            </Td>
                          </Tr>
                        </Table>
                      </TableContainer>
                      </Flex>
                      </>
                  );
                }
                return null;
              })
            }
             {
              identitasKorban.map((item, index) => {
                if (item.laporan.id_laporan === idLaporan) {
                  return (
                    <>
                     <Flex flexDir="column" my={10}>
                    <hr/>
                    <Text fontWeight="bold">
                      Identitas Korban
                    </Text>
                    <TableContainer>
                        <Table>
                          <Tr>
                            <Td fontWeight="bold">Nama Korban</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.nama == null || item.nama == '' ? '-' : item.nama}</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Jenis Kelamin</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.jenis_kelamin == null || item.jenis_kelamin == '' ? '-' : item.jenis_kelamin }</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Umur</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.umur == null || item.umur == '' ? '-' : item.umur}</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Alamat</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.alamat == null || item.alamat == '' ? '-' : item.alamat }</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">NIK</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.NIK  == null || item.NIK == '' ? '-' : item.NIK }</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Nomor Plat Ambulance</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.plat_ambulance == null || item.plat_ambulance == '' ? '-' : item.plat_ambulance}</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Nama Rumah Sakit</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.nama_rumah_sakit == null || item.nama_rumah_sakit == ''? '-' : item.nama_rumah_sakit}</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Jenis Luka</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.wound.keterangan_luka == null || item.wound.keterangan_luka == '' ? '-' : item.wound.keterangan_luka }</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Nomor Rekam Medis</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.nomor_rekam_medis == null || item.nomor_rekam_medis == '' ? '-' : item.nomor_rekam_medis}</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Kode ICD-10</Td>
                            <Td>:</Td>
                            <Td>
                              <Text>{item.kode_icd_10 == null || item.kode_icd_10 == '' ? '-' : `${item.kode_icd_10} : ${item['ICD-10'].insiden}`}</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Kode Skala Triase</Td>
                            <Td>:</Td>
                            <Td>
                              <Text color='black'>{item.Skala_Triase && item.Skala_Triase.kode_ATS ? `${item.Skala_Triase.kode_ATS} - ${item.Skala_Triase.keterangan}` : '-'}</Text>
                            </Td>
                          </Tr>
                          <Tr>
                            <Td fontWeight="bold">Santunan</Td>
                            <Td>:</Td>
                            <Td>
                            <Text>
                      {item.santunans == null || !Array.isArray(item.santunans) || item.santunans.length === 0
                      ? '-'
                      : item.santunans.map((item) => (
                          <span key={item.id}>
                            {item.jenis_santunan} - <FormatRupiah value={item.Identitas_Santunan.nominal == null ? '-' : item.Identitas_Santunan.nominal} />
                            <br />
                          </span>
                        ))}
                      <br />
                      Total: <FormatRupiah value={item.santunans.reduce((sum, item) => sum + (item.Identitas_Santunan.nominal || 0), 0)} />
                      </Text>
                            </Td>
                          </Tr>
                        </Table>
                      </TableContainer>
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
                  // eslint-disable-next-line no-restricted-globals
                  const confirmed = confirm("Apakah Anda yakin ingin menghapus data ini?");
                  if (confirmed) {
                    deleteItem(e,idLaporan);
                  }
              }}
              color={'white'}
              mr={3}
              > Hapus
              </Button>
              <Button border={'solid 2px var(--color-primer)'} bg={'white'}  mr={3} onClick={onClose}>
                Tutup
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
    </Flex>
    </Flex>
      </FormControl>
      </form>
      <Box
      width={{ base: "100%", md: "92vw", lg: "73vw", xl: "70vw",  }}
      maxWidth={{ base: "600px", md: "1000px", lg: "680px", xl: "100%" }}
      minWidth={{ xl: "850px" }}
      borderRadius="md"
      boxShadow="md"
      bg="var(--color-on-primary)"
      justify="flex-start"
      mt={30}
    >
      <TableContainer  
      borderRadius="md"
        boxShadow="md"
        bg="var(--color-on-primary)"
        justify="flex-start"
        width="100%" >
        <Table  size='md' variant="simple">
          <Thead bg={'var(--color-primer)'}>
            <Tr>
              <Th color={'white'}>No</Th>
              <Th color={'white'}>Judul Kejadian</Th>
              <Th color={'white'}>Tanggal</Th>
              <Th color={'white'}>Waktu</Th>
              <Th color={'white'}>Lokasi</Th>
              <Th color={'white'}>Kecamatan</Th>
              <Th color={'white'}>Kerugian Materil</Th>
              <Th color={'white'}>Kategori Kecelakaan</Th>
              <Th color={'white'}>Keterangan</Th>
              <Th color={'white'}>Jumlah Korban</Th>
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
                        {item.lokasi == null ? '-' : item.lokasi}</Td>
                      <Td color={'black'}>
                        {
                          item.Kecamatan == null ? '-' : item.Kecamatan.nama_kecamatan
                        }
                      </Td>
                      <Td color={'black'}>
                        {
                          item.kerugian_materil == null || item.kerugian_materil == '' ? '-': <FormatRupiah value={item.kerugian_materil == null || item.kerugian_materil =='' ? '-': item.kerugian_materil}/>
                        }
                      </Td>
                      <Td color={'black'}>
                      {
                        item.Laporan_Kategori == null || item.Laporan_Kategori == '' ? '-' : item.Laporan_Kategori.nama_kategori
                      }
                      </Td>
                      <Td color={'black'}>
                      {
                        item.keterangan == null || item.keterangan == '' ? '-' : item.keterangan
                      }
                      </Td>
                      <Td color={'black'} textAlign={'center'}>
                        {
                           jumlahKorban[index]
                        }
                      </Td> 
                      <Td color={'black'}>
                        {item.penyebab == null ||  item.penyebab == ''? '-' : item.penyebab}
                      </Td>
                      <Td color={'black'}>
                      <Button
                      onClick= {
                            (e) => {
                              setIdLaporan(item.id_laporan)
                              setJudulKejadian(item.judul_kejadian)
                              setKecamatan(item.Kecamatan.nama_kecamatan)
                              setLokasi(item.lokasi)
                              setTanggal(item.tanggal)
                              setKorban(jumlahKorban[index])
                              onOpen()
                            }
                          }
                            ml={'10px'} border={'solid 2px var(--color-primer) '} bg={'#FAFBFC'} maxWidth={'150px'} type='submit'>
                            <Text color={'black'} >
                            Detail Laporan
                            </Text>
                        </Button>
                      </Td>
                    </Tr>
                  ))
                }
            </Tbody>
        </Table>
      </TableContainer>
    </Box>
    <Flex mx={'2%'} flexDir={'row'} mt={'20px'} justify={'space-between'}>
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
export default LaporanDishub