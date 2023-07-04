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
import { getJumlahKorban,getLaporanDownload,getPublicLaporan,selectDataGrafik} from '../Utility/api'
import axios from 'axios';
import { CSVLink } from 'react-csv';
import { FormatRupiah } from "@arismun/format-rupiah";
import moment from 'moment';
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from 'react-router-dom';
import { TbDownload }  from "react-icons/tb";
import Navbar from '../components/publicNavbar/navbar';
import { useParams } from 'react-router-dom';
import './laporan.css' 
import GrafikData from '../components/grafikComponent/grafikComponent';
import * as XLSX from 'xlsx';


const PublicLaporan = () => {
 const [data , setData] = useState([])
 const [identitasKorban, setIdentitasKorban] = useState([])
 const [identitasPengemudi, setIdentitasPengemudi] = useState([])
 const [loading, setLoading] = useState(true)
 const [page, setPage] = useState(0)
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
const navigate  = useNavigate()
const [allData, setAllData] = useState([])
const { id } = useParams();


 const getAllDataDownload = async () => {
  try {
    const response = await axios.get(`${getLaporanDownload}search_query=${id}`);
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
const [jumlahKorban, setJumlahKorban] = useState([]) 
const getAllLaporanByQuery = async () => {
  try {
    const response = await axios.get(`${getPublicLaporan}/${id}`);
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

useEffect(() => {
  getAllLaporanByQuery()
  setLoading(true)
  getAllDataDownload()
}, [page])
var idLocale = require('moment/locale/id');
moment.updateLocale('id', idLocale);
return (
      <>
      <Navbar />
      <Flex width={'100%'} flexDir={'column'}  alignItems={'center'} marginTop={'15vh'} alignContent={'center'} height={'85vh'} bg={'white'} overflowY={'scroll'} position={'fixed'} zIndex={'-1'}>
    <Flex  flexDir={'row'} mt={'20px'}>
    <Flex  width={'35%'} maxWidth={'1500px'}>
    <CSVLink data={
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
        } filename={`Laporan.csv`} className="btn btn-primary"
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
      <Button bg={`rgb(76, 175, 80)`} mr={'4px'}>
        <Text color={'white'}>
          Download To CSV
        </Text> 
      </Button>
        </CSVLink>
        </Flex>
        <Flex ml={'38px'}>
        <Button
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
          `Laporan`,
        )}
        >
          <Text color={'white'}>
          Download To Excel
        </Text>
        </Button>
            </Flex>
        </Flex>
      <Flex mr={'6%'}>
    </Flex>
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
              <Th color={'white'}>Keterangan</Th>
              <Th color={'white'}>Jumlah Korban</Th>
              <Th color={'white'}>Penyebab</Th>
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
                        <Flex flexDir={'row'}>
                        <Flex justify={'center'} alignContent={'center'} alignItems={'center'}>
                        </Flex>
                      <Flex flexDir={'column'}>
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
    <Flex  
                border={'3px solid #CECECE'}
                borderRadius={10}
                flexDir={'column'}
                mt={5}
                width={'85%'}
                alignContent={'center'}
                alignItems={'center'}
                mb={5}
                >
    {
      id == ""? (
        <></>
        ):(
          // console.log(dataGrafik),
              <GrafikData 
              size="lg"
              width="100%"
              height="800px"
              maxWidth="100%"
              className="grafik"
              data={{
                value: id
              }}
              />
              )
            }
    </Flex>
  </Flex>
    </>
  )
}
export default PublicLaporan