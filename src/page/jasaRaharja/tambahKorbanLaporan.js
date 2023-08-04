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
  list
} from '@chakra-ui/react';
import { Formik,Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { routePageName } from '../../Redux/action';
import { TabTitle } from '../../Utility/utility';
import {
  createDetailLaporanPolisi,getAllLuka,getAllSantunan
} from '../../Utility/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './detailInput.css'

const TambahKorbanLaporanJasaRaharja = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  TabTitle("Laporan - Sisporlaka");
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(true);
  const role = useAuth('jasa-raharja')
  const [data,set] = useState({
    identitas_korban: [
      {
        nama: '',
        jenis_kelamin: '',
        umur: '',
        alamat: '',
        plat_ambulance: '',
        NIK: '',
        nama_rumah_sakit: '',
        id_luka: '',
        identitas_santunan: [{
          nominal: '',
          id_santunan: ''
      }],
      },
    ],
    id_laporan: id,
  });
  const handleKorbanChange = (e, index) => {
    const { name, value } = e.target;
    const korbanData = [...data.identitas_korban];
    korbanData[index] = { ...korbanData[index], [name]: value };
    set({ ...data, identitas_korban: korbanData });
  };

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

  const [santunanList, setSantunan] = useState([]);
  const getSantunan = async () => {
    axios.get(getAllSantunan)
    .then(response => {
      setSantunan(response.data.santunan)
      setLoading(false)
    })
    .catch(error => {
      console.log(error)
    }
    )
  }


  const handleKorbanSantunanChange = (e, korbanIndex, santunanIndex) => {
    const { name } = e.target;
    const { value } = e.target;
    const korbanData = [...data.identitas_korban];
    const santunanData = [...korbanData[korbanIndex].identitas_santunan];
    
    if (value) {
      const replacedValue = value.replace(/\D/g, '');
      console.log(replacedValue);
      santunanData[santunanIndex] = { ...santunanData[santunanIndex], [name]: replacedValue };
      korbanData[korbanIndex] = { ...korbanData[korbanIndex], identitas_santunan: santunanData };
      set({ ...data, identitas_korban: korbanData });
    }
  };
  const getLuka = async () => {
    axios.get(getAllLuka)
    .then(response => {
      setLuka(response.data.luka)
      setLoading(false)
    })
    .catch(error => {
      console.log(error)
    }
    )
  }
  const [luka, setLuka] = useState([]);

  const handleAddKorban = () => {
    set({
      ...data,
      identitas_korban: [
        ...data.identitas_korban,
        {
          nama: '',
          jenis_kelamin: '',
          umur: '',
          alamat: '',
          plat_ambulance: '',
          NIK: '',
          nama_rumah_sakit: '',
          id_luka: '',
          identitas_santunan: [{
            nominal: '',
            id_santunan: '',
        }],
        },
      ],
    });
  };

  const handleAddKorbanSantunan = (korbanIndex) => {
    const korbanData = [...data.identitas_korban];
    korbanData[korbanIndex].identitas_santunan.push({ nominal: '', id_santunan: '' });
    set({ ...data, identitas_korban: korbanData });
  };

  const handleRemoveKorban = (korbanIndex) => {
    const korbanData = [...data.identitas_korban];
    korbanData.splice(korbanIndex, 1);
    set({ ...data, identitas_korban: korbanData });
  };
  
  const handleRemoveKorbanSantunan = (korbanIndex, santunanIndex) => {
    const korbanData = [...data.identitas_korban];
    const santunanData = [...korbanData[korbanIndex].identitas_santunan];
    santunanData.splice(santunanIndex, 1);
    korbanData[korbanIndex] = { ...korbanData[korbanIndex], identitas_santunan: santunanData };
    set({ ...data, identitas_korban: korbanData });
  };

  const schema = Yup.object().shape({
  
    identitas_korban: Yup.array().of(
      Yup.object().shape({
        nama: Yup.string().required(),
        jenis_kelamin: Yup.string().required(),
        umur: Yup.number().required(),
        alamat: Yup.string().required(),
        NIK: Yup.number().required(),
        id_luka: Yup.number().required(),
        nama_rumah_sakit: Yup.string().required(),
        plat_ambulance: Yup.string().required(),
        identitas_santunan: Yup.array().of(
          Yup.object().shape({
            id_santunan: Yup.number(),
            nominal: Yup.number(),
          })
        ),
      })
    ),
  
    id_laporan: Yup.number().required(),
  });


  useEffect(() => {
    dispatch(routePageName("Laporkan Kejadian"));
    setLoading(true);
    getLuka();
    getSantunan();    const rupiah = document.getElementById("rupiah");
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
  return (
    <>
      <Flex flexDir={'column'} justify={'flex-start'} width={'100%'}>
       
        <Formik
          initialValues={{
            //identitas korban
            identitas_korban: [
              {
                nama: '',
                jenis_kelamin: '',
                umur: '',
                alamat: '',
                plat_ambulance: '',
                NIK: '',
                nama_rumah_sakit: '',
                id_luka: '',
                identitas_santunan: [{
                  nominal: '',
                  id_santunan: '',
              }],
              },
            ],
          }}
          // validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              const submitedData = new FormData();
              console.log(values);
            submitedData.append('nama', values.identitas_korban.nama);
            submitedData.append('jenis_kelamin', values.identitas_korban.jenis_kelamin);
            submitedData.append('umur', values.identitas_korban.umur);
            submitedData.append('alamat', values.identitas_korban.alamat);
            submitedData.append('NIK', values.identitas_korban.NIK);
            submitedData.append('id_luka', values.identitas_korban.id_luka);
            submitedData.append('plat_ambulance', values.identitas_korban.plat_ambulance);
            submitedData.append('nama_rumah_sakit', values.identitas_korban.nama_rumah_sakit);
            if (Array.isArray(values.identitas_korban.identitas_santunan)) {
              submitedData.append('nominal', JSON.stringify(values.identitas_korban.identitas_santunan.map(item => item.nominal)));
              submitedData.append('id_santunan', JSON.stringify(values.identitas_korban.identitas_santunan.map(item => item.id_santunan)));
            }
            submitedData.append('id_laporan', id);
              axios.post(createDetailLaporanPolisi, data).then((response) => {
                if (response.status === 201) {
                  navigate(`/unit/${role}/laporan`);
                  console.log(response);
                }
                else {
                  console.log(response);
                }
              })
              .catch((error) => {
                console.log(error);
              });
              setSubmitting(false);
            }, 400);
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
                <Form className='formInput' size='xl' method='POST' onSubmit={handleSubmit}>
                 <Text fontSize={'var(--header-1)'} color={'black'}>Identitas Korban</Text>
                  {Object.values(data.identitas_korban).map((korban, korbanIndex) => (
                    <React.Fragment key={korbanIndex} >
                      <Flex flexDir={'row'} alignItems={'center'} alignContent={'center'}>
                      <Flex flexDir={'column'} >
                      <FormControl mt={4} isInvalid={errors.nama && touched.nama}>
                        <FormLabel color={"var(--color-primer)"}>Nama Korban</FormLabel>
                        <Input
                          name='nama'
                          type='text'
                          color='black'
                          placeholder='Nama Korban'
                          onChange={(e) => handleKorbanChange(e,korbanIndex)}
                          onBlur={handleBlur}
                          value={korban.nama}
                        />
                        <FormErrorMessage>{errors.nama}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.jenis_kelamin && touched.jenis_kelamin}>
                        <FormLabel color={"var(--color-primer)"}>Jenis Kelamin Korban</FormLabel>
                        <Select
                          name='jenis_kelamin'
                          color='black'
                          placeholder="Pilih Jenis Kelamin"
                          onChange={(e) => handleKorbanChange(e,korbanIndex)}
                          onBlur={handleBlur}
                          value={korban.jenis_kelamin}
                        >
                          <option value='Laki-laki'>Laki-laki</option>
                          <option value='Perempuan'>Perempuan</option>
                        </Select>
                        <FormErrorMessage>{errors.jenis_kelamin}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.umur && touched.umur}>
                        <FormLabel color={"var(--color-primer)"}>Umur Korban</FormLabel>
                        <Input
                          name='umur'
                          type='number'
                          color='black'
                          placeholder='Umur Korban'
                          onChange={(e) => handleKorbanChange(e,korbanIndex)}
                          onBlur={handleBlur}
                          value={korban.umur}
                        />
                        <FormErrorMessage>{errors.umur}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.alamat && touched.alamat}>
                        <FormLabel color={"var(--color-primer)"}>Alamat Korban</FormLabel>
                        <Input
                          name='alamat'
                          type='text'
                          color='black'
                          placeholder='Alamat Korban'
                          onChange={(e) => handleKorbanChange(e,korbanIndex)}
                          onBlur={handleBlur}
                          value={korban.alamat}
                        />
                        <FormErrorMessage>{errors.alamat}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.NIK && touched.NIK}>
                        <FormLabel color={"var(--color-primer)"}>NIK Korban</FormLabel>
                        <Input
                          name='NIK'
                          type='text'
                          color='black'
                          placeholder='NIK Korban'
                          onChange={(e) => handleKorbanChange(e,korbanIndex)}
                          onBlur={handleBlur}
                          value={korban.NIK}
                        />
                        <FormErrorMessage>{errors.NIK}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.id_luka && touched.id_luka}>
                        <FormLabel color={"var(--color-primer)"}>Luka Korban</FormLabel>
                        <Select
                          name='id_luka'
                          type='number'
                          color='black'
                          placeholder="Pilih Luka"
                          onChange={(e) => {
                            handleKorbanChange(e,korbanIndex);
                            console.log(e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={korban.id_luka}
                        >
                          {luka.map((luka) => (
                            <option key={luka.id_luka} value={luka.id_luka}>{luka.keterangan_luka}</option>
                          ))}
                        </Select>
                        <FormErrorMessage>{errors.id_luka}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.plat_ambulance && touched.plat_ambulance}>
                        <FormLabel color={"var(--color-primer)"}>Nomor Plat Ambulance</FormLabel>
                        <Input
                          name='plat_ambulance'
                          type='text'
                          color='black'
                          placeholder='Nomor Plat Ambulance'
                          onChange={(e) => handleKorbanChange(e,korbanIndex)}
                          onBlur={handleBlur}
                          value={korban.plat_ambulance}
                        />
                        <FormErrorMessage>{errors.plat_ambulance}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.nama_rumah_sakit && touched.nama_rumah_sakit}>
                        <FormLabel color={"var(--color-primer)"}>Nama Rumah Sakit</FormLabel>
                        <Input
                          name='nama_rumah_sakit'
                          type='text'
                          color='black'
                          placeholder='Nama Rumah Sakit'
                          onChange={(e) => handleKorbanChange(e,korbanIndex)}
                          onBlur={handleBlur}
                          value={korban.nama_rumah_sakit}
                        />
                        <FormErrorMessage>{errors.nama_rumah_sakit}</FormErrorMessage>
                      </FormControl>
                      {Object.values(korban.identitas_santunan).map((santunan, santunanIndex) => (
                        <React.Fragment key={santunanIndex}>
                          <FormControl mt={4} isInvalid={errors.nominal && touched.nominal}>
                            <FormLabel color={"var(--color-primer)"}>Nominal Santunan</FormLabel>
                            <Input
                              name='nominal'
                              type='text'
                              id='rupiah'
                              color='black'
                              placeholder='Santunan'
                              onChange={(e) => {
                                const formattedValue = e.target.value.replace(/\D/g, ''); // Remove all non-digit characters
                                handleKorbanSantunanChange(e, korbanIndex, santunanIndex);
                            }}
                              onBlur={handleBlur}
                              value={santunan.nominal}
                            />
                            <FormErrorMessage>{errors.nominal}</FormErrorMessage>
                          </FormControl>
                          <FormControl mt={4} isInvalid={errors.id_santunan && touched.id_santunan}>
                            <FormLabel color={"var(--color-primer)"}>Jenis Santunan</FormLabel>
                            <Select 
                              name='id_santunan'
                              type='text'
                              color='black'
                              placeholder="Pilih Jenis Santunan"
                              onChange={(e) => {
                                handleKorbanSantunanChange(e, korbanIndex, santunanIndex);
                              }
                            }
                              onBlur={handleBlur}
                              value={santunan.id_santunan}
                            >
                              {
                                santunanList.map((item) => (
                                  <option key={item.id_santunan} value={item.id_santunan}>{item.jenis_santunan}</option>
                                ))
                              }
                            </Select>
                            <FormErrorMessage>{errors.id_santunan}</FormErrorMessage>
                          </FormControl>
                          <Button
                           size='md'
                           my={4}
                           bg={"red"} 
                          onClick={()=> handleRemoveKorbanSantunan(korbanIndex, santunanIndex)}>
                            Hapus Santunan
                          </Button>
                          <br />
                          <Text color={'black'}>
                            <b>---------------------------------------------------------------------------------------</b>
                          </Text>
                            <br />
                        </React.Fragment>
                      ))}
                      <Button
                      bg={"var(--color-primer)"}
                      size='md' 
                      onClick={()=> handleAddKorbanSantunan(korbanIndex)}>
                          Tambah Santunan
                      </Button>
                      </Flex>
                      <Flex ml={20} flexDir={'column'}>
                      <Button
                        mt={4}
                        size='md'
                        width={'100px'}
                        bg={"red"}
                        disabled={data.identitas_korban.length === 1} onClick={() => handleRemoveKorban(korbanIndex)}
                      >
                      -
                      </Button>
                      <Button bg={"var(--color-primer)"} display={korbanIndex === data.identitas_korban.length - 1 ? 'flex' : 'none'} mt={4} size='md' onClick={handleAddKorban}>
                        +
                      </Button>
                      </Flex>
                      </Flex>
                      <br />
                     <Text color={'black'}>
                      <b>---------------------------------------------------------------------------------------</b>
                     </Text>
                      <br />
                    </React.Fragment>
                  ))} 
              <Input
                        color={'black'}
                        type="hidden"
                        value={id}
                        onBlur={handleBlur}
                        variant="outline"
                        placeholder="ID User..."
                    />
            <Button
              bg={"var(--color-primer)"}
              color={"white"}
              mt={8}
              type='submit'
              size='md'
              onClick={handleSubmit}
            >
              Buat Laporan
            </Button>
          </Form>
        )}
      </Formik>
      </Flex>
    </>
  )
}
export default TambahKorbanLaporanJasaRaharja;