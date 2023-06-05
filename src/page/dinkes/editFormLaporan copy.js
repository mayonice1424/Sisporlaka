import React,{useEffect,useState} from 'react'
import useAuth from '../../middleware/useAuth';
import { 
  Flex,
  Text,
  Input,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Textarea
} from '@chakra-ui/react';
import { Formik,Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { routePageName } from '../../Redux/action';
import { TabTitle } from '../../Utility/utility';
import {
  getAllKategori,getAllKecamatan,getIdUserByTokenApi,updateLaporan,getLaporanById
} from '../../Utility/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './input.css'
const EditLaporanDinkes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  TabTitle("Laporan - Sisporlaka");
  const { id } =useParams();
  console.log(id)
  const [loading, setLoading] = useState(true);
  const [dataApi, setDataApi] = useState();
  const [dataKategori, setDataKategori] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const schema = Yup.object({
    judul_kejadian: Yup.string().required("Judul Kejadian harus diisi"),
    tanggal: Yup.string().required("Tanggal Kejadian harus diisi"),
    waktu: Yup.string().required("Waktu Kejadian harus diisi"),
    id_kecamatan: Yup.string().required("Kecamatan harus diisi"),
    lokasi: Yup.string().required("Lokasi Kejadian harus diisi"),
    kerugian_materil: Yup.number(),
    keterangan: Yup.string(),
    id_laporan_kategori: Yup.string(),
    penyebab: Yup.string(),
  }
  );
  const getKecamatan = async () => {
    axios.get(getAllKecamatan)
    .then(response => {
      setKecamatanList(response.data.kecamatan)
      setLoading(true)
      }
      )
    .catch(error => {
      console.log(error)
    }
    )
  }
  const [dataKejadian, setDataKejadian] = useState({});
  const getLaporan = async () => {
    axios.get(`${getLaporanById}${id}`)
    .then(response => {
      setDataKejadian(response.data.laporan)
      console.log(response.data.laporan.judul_kejadian)
      setLoading(false)
      }
      )
    .catch(error => {
      console.log(error)
    }
    )
  }




  const getKategori = async () => {
    axios.get(getAllKategori)
    .then(response => {
      setDataKategori(response.data.kategori)
      setLoading(true)
      }
      )
    .catch(error => {
      console.log(error)
    }
    )
  }



  /* Fungsi formatRupiah */
  const formatRupiah = (angka, prefix) => {
    var number_string = angka.replace(/[^,\d]/g, '').toString(),
      split = number_string.split(','),
      sisa = split[0].length % 3,
      rupiah = split[0].substr(0, sisa),
      ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    // tambahkan titik jika yang di input sudah menjadi angka ribuan
    if (ribuan) {
      var separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }

    rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix === undefined ? rupiah : rupiah ? 'Rp. ' + rupiah : '';
  };


  const getIdUserByToken = async () => {
   await axios.get(getIdUserByTokenApi)
    .then(response => {
      setDataApi(response.data.userId)
      setLoading(true)
      }
      )
    .catch(error => {
      console.log(error)
    }
    )
  }
  useEffect(() => {
    dispatch(routePageName("Laporkan Kejadian"));
    getKecamatan();
    getKategori();
    getLaporan();
    getIdUserByToken();
   
    setLoading(true);
    const rupiah = document.getElementById("rupiah");
  if (rupiah) {
    rupiah.addEventListener('keyup', function(e) {
      // tambahkan 'Rp.' pada saat form di ketik
      // gunakan fungsi formatRupiah() untuk mengubah angka yang di ketik menjadi format angka
      rupiah.value = formatRupiah(this.value, 'Rp. ');
    });
  }
  return () => {
    if (rupiah) {
      rupiah.removeEventListener('keyup', function(e) {
        // handler keyup
      });
    }
  };
}, []);
  const role = useAuth('dinas-kesehatan')
    return (
      <>
        <Flex justify={'flex-start'} width={'100%'}>
          <Formik
            initialValues={{
                judul_kejadian: dataKejadian.judul_kejadian,
                tanggal: dataKejadian.tanggal,
                waktu: dataKejadian.waktu,
                id_kecamatan: dataKejadian.id_kecamatan,
                lokasi: dataKejadian.lokasi,
                kerugian_materil: dataKejadian.kerugian_materil,
                keterangan: dataKejadian.keterangan,
                id_laporan_kategori: dataKejadian.id_laporan_kategori,
                penyebab: dataKejadian.penyebab,
            }}
            validationSchema={schema}
            validateOnChange={false}
            enableReinitialize={true}
						validateOnBlur={false}
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                axios.patch(`${updateLaporan}${id}`,{
                  judul_kejadian: values.judul_kejadian,
                  tanggal: values.tanggal,
                  waktu: values.waktu,
                  id_kecamatan: values.id_kecamatan,
                  lokasi: values.lokasi,
                  kerugian_materil: values.kerugian_materil,
                  keterangan: values.keterangan,
                  id_laporan_kategori: values.id_laporan_kategori,
                  penyebab: values.penyebab,
                })
                .then((response) => {
                  if (response.status === 200) {
                    console.log(response);
                    navigate(`/unit/${role}/laporan`);
                  }
                  else {
                    console.log(response);
                  }
                })
                .catch((error)=> {
                  console.log(error);
                });
                setSubmitting(false);
              }, 500);
              }}
              >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              setFieldValue,
            }) => (
              <Flex width={1500}>
              <Form className='formInput' size='xl' method="PATCH" onSubmit={handleSubmit}>
                  <FormControl 
                    mt={4}
                    isInvalid={errors.judul_kejadian && touched.judul_kejadian}
                  >
                    <FormLabel color={"var(--color-primer)"}>Judul Kejadian</FormLabel>
                    <Flex justify={'flex-start'} >
                    <Input
                      color={"black"}
                      type="text"
                      name="judul_kejadian"
                      width={'100%'}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setFieldValue("judul_kejadian", e.target.value);
                      }
                    }
                    value={values.judul_kejadian}
                      onBlur={handleBlur}
                      variant="outline"
                      placeholder="Judul Kejadian..."
                    />
                    </Flex>
                    <FormErrorMessage>{errors.judul_kejadian}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    mt={4}
                    isInvalid={errors.tanggal && touched.tanggal}
                  >
                    <FormLabel color={"var(--color-primer)"}>Tanggal Kejadian</FormLabel>
                    <Input
                     color={"black"}
                      type="date"
                      name="tanggal"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setFieldValue("tanggal", e.target.value);
                      }}
                      onBlur={handleBlur}
                      value={values.tanggal}
                    />
                    <FormErrorMessage>{errors.tanggal}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    mt={4}    
                    isInvalid={errors.waktu && touched.waktu}
                  >
                    <FormLabel  color={"var(--color-primer)"}>Waktu Kejadian</FormLabel>
                    <Input
                    color={"black"}
                      type="time"
                      name="waktu"
                      onChange={(e) => {
                        console.log(e.target.value);
                        setFieldValue("waktu", e.target.value);
                      }
                    }
                      onBlur={handleBlur}
                      value={values.waktu}
                    />
                    <FormErrorMessage>{errors.waktu}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    mt={4}
                    isInvalid={errors.id_kecamatan && touched.id_kecamatan}
                  >
                    <FormLabel  color={"var(--color-primer)"}>Kecamatan</FormLabel>
                    <Select
                      placeholder="Pilih Kecamatan"
                      name="id_kecamatan"
                      color={"black"}
                      onChange={(e) => {
                        setFieldValue("id_kecamatan", e.target.value);
                      }}
                      onBlur={handleBlur}
                      value={values.id_kecamatan}>
                      {kecamatanList.map((item) => (
                        <option key={item.id} value={item.id_kecamatan}>
                          {item.nama_kecamatan}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.id_kecamatan}</FormErrorMessage>
                  </FormControl>
                  <FormControl 
                    mt={4}
                    isInvalid={errors.lokasi && touched.lokasi}
                  >
                    <FormLabel color={"var(--color-primer)"}> Alamat Lengkap Kejadian</FormLabel>
                    <Flex justify={'flex-start'} >
                    <Input
                      color={"black"}
                      type="text"
                      name="lokasi"
                      width={'100%'}
                      value={values.lokasi}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                      placeholder="Lokasi Kejadian..."
                    />
                    </Flex>
                    <FormErrorMessage>{errors.lokasi}</FormErrorMessage>
                  </FormControl>
                  <FormControl
                    mt={4}
                    isInvalid={errors.id_laporan_kategori && touched.id_laporan_kategori}
                  >
                    <FormLabel  color={"var(--color-primer)"}>Kategori</FormLabel>
                    <Select
                      placeholder="Pilih Kategori Kecelakaan"
                      name="id_laporan_kategori"
                      color={"black"}
                      onChange={(e) => {
                        setFieldValue("id_laporan_kategori", e.target.value);
                      }}
                      onBlur={handleBlur}
                      value={values.id_laporan_kategori}>
                      {dataKategori.map((item) => (
                        <option key={item.id} value={item.id_laporan_kategori}>
                          {item.nama_kategori}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage>{errors.id_laporan_kategori}</FormErrorMessage>
                  </FormControl>
                  <FormControl 
                    mt={4}
                    isInvalid={errors.kerugian_materil && touched.kerugian_materil}
                  >
                    <FormLabel color={"var(--color-primer)"}>Kerugian Materil Kejadian</FormLabel>
                    <Flex justify={'flex-start'} >
                    <Input
                      color={"black"}
                      type="text" 
                      id="rupiah"
                      name="kerugian_materil"
                      width={'100%'}
                      value={values.kerugian_materil}
                      onChange={(e) => {
                        const formattedValue = e.target.value.replace(/\D/g, ''); // Hapus semua karakter non-digit
                        setFieldValue("kerugian_materil", formattedValue);
                        console.log(formattedValue);
                      }}
                      onBlur={handleBlur}
                      variant="outline"
                      placeholder="Kerugian Materil..."
                    />
                    </Flex>
                    <FormErrorMessage>{errors.kerugian_materil}</FormErrorMessage>
                  </FormControl>
                  
                  <FormControl 
                    mt={4}
                    isInvalid={errors.keterangan && touched.keterangan}
                  >
                    <FormLabel color={"var(--color-primer)"}> Keterangan Kejadian</FormLabel>
                    <Flex justify={'flex-start'} >
                    <Textarea
                      color={"black"}
                      type="text"
                      name="keterangan"
                      width={'100%'}
                      value={values.keterangan}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                      placeholder="Keterangan Kejadian..."
                    />
                    </Flex>
                    <FormErrorMessage>{errors.keterangan}</FormErrorMessage>
                  </FormControl>
                  <FormControl 
                    mt={4}
                    isInvalid={errors.penyebab && touched.penyebab}
                  >
                    <FormLabel color={"var(--color-primer)"}>Penyebab Kejadian</FormLabel>
                    <Flex justify={'flex-start'} >
                    <Input
                      color={"black"}
                      type="text"
                      name="penyebab"
                      width={'100%'}
                      value={values.penyebab}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="outline"
                      placeholder="Penyebab Kejadian..."
                    />
                    </Flex>
                    <FormErrorMessage>{errors.penyebab}</FormErrorMessage>
                  </FormControl>
                  <Button
                    bg={"var(--color-primer)"}
                    color={"white"}
                    mt={8}
                    size='md'
                    // isLoading={isSubmitting}
										// disabled={isSubmitting}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Buat Laporan
                  </Button>
              </Form>
              </Flex>
            )}
          </Formik>
        </Flex>
      </>
    );
}

export default EditLaporanDinkes