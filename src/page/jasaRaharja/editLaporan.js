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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from '@chakra-ui/react';
import { useDisclosure } from "@chakra-ui/react"
import { Formik,Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { routePageName } from '../../Redux/action';
import { TabTitle } from '../../Utility/utility';
import {
  createDetailLaporanPolisi,postSantunan,deleteKorbanById,getAllLuka,getAllSantunan,getAllIdentitasKorban,deleteSantunanById,updateKorbanById,updateSantunanById,postKorban
} from '../../Utility/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './detailInput.css'

const EditKorbanLaporanJasaRaharja = () => {
  const { id } = useParams(); 
  const deleteSantunan = useDisclosure()
  const addSantunan = useDisclosure()
  const deleteKorban = useDisclosure()
  const [error, setError] = useState(null);
  const [santunanList, setSantunan] = useState([]);
  const [deleteKorbanIndex, setDeleteKorbanIndex] = useState([])
  const navigate = useNavigate();
  const [deleteSantunanIndex, setDeleteSantunanIndex] = useState([])
  const dispatch = useDispatch();
  const [luka, setLuka] = useState([]);
  const [identitas, setIdentitas] = useState([]);
  const [id_identitas, setIdIdentitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [santunanId, setSantunanId] = useState([])
  const role = useAuth('jasa-raharja')
  TabTitle("Laporan - Sisporlaka"); 
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
  const handleAddKorbanSantunan = (Id_identitas) => {
    setIdIdentitas(Id_identitas) 
    addSantunan.onOpen()
  };

  const handleRemoveKorban = (korbanIndex) => {
    setDeleteKorbanIndex(korbanIndex)
    deleteKorban.onOpen()
  };
  
  const handleRemoveKorbanSantunan = (santunanIndex) => {
    console.log(santunanIndex.id_identitas_santunan);
    setDeleteSantunanIndex(santunanIndex.id_identitas_santunan)
     deleteSantunan.onOpen()
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
  const getAllIdentitas = async () => {
    axios.get(`${getAllIdentitasKorban}${id}`)
    .then(response => {
      setIdentitas(response.data)
      console.log("DATA IDENTITAS : ",response.data.identitasSantunan[0].nama)
      setLoading(false)
    })
    .catch(error => {
      console.log(error)
    }
    ) 
  }
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
  useEffect(() => {
    dispatch(routePageName("Laporkan Kejadian"));
    setLoading(true);
    getLuka();
    getAllIdentitas();
    getSantunan();
    const rupiah = document.getElementById("rupiah");
    if (rupiah) {
      rupiah.addEventListener('keyup', function(e) {
        rupiah.value = formatRupiah(this.value, 'Rp. ');
      });
    }
    return () => {
      if (rupiah) {
        rupiah.removeEventListener('keyup', function(e) {
        });
      }
    };
  }, []);
  return (
    <>
      <Flex flexDir={'column'} justify={'flex-start'} width={'100%'}>
      <Modal isOpen={addSantunan.isOpen} onClose={addSantunan.onClose}>
          <ModalOverlay />
          <ModalContent className="custom-modal-content" >
            <ModalHeader>Tambah Input Santunan </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow={'auto'}>
              <Flex flexDir={'column'} justify={'flex-start'} width={'100%'}>
                <Text color={'red'}>
                    {error}
                </Text>
                  <Text> Pilih Jenis Santunan</Text>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <FormControl>
                <Select
                  placeholder="Pilih Santunan"
                  onChange={(e) => {
                    setSantunanId(e.target.value)
                  }}
                >
                  {santunanList.map((santunan, index) => (
                    <option key={index} value={santunan.id_santunan}>
                      {santunan.jenis_santunan}
                    </option>
                  ))}
                </Select>
              </FormControl>
            <Button
                bg={'red'}
                onClick={(e) => {
                  e.preventDefault();
                  axios.post(postSantunan, {
                    id_identitas_korban: id_identitas,
                    id_santunan: santunanId,
                  })
                  .then(response => {
                    getLuka();
                    getAllIdentitas();
                    getSantunan();
                    addSantunan.onClose()
                    window.location.reload()
                  }
                  ).catch(error => {
                    if (error.response.status === 500) {
                        setError('Data Santunan Sudah Ada')
                    }
                  }
                  )
                }}
              color={'white'}
              mr={3}
              > Tambah
              </Button>
              <Button border={'solid 2px var(--color-primer)'} bg={'white'}  mr={3} onClick={addSantunan.onClose}>
                Tutup
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
       <Modal isOpen={deleteKorban.isOpen} onClose={deleteKorban.onClose}>
          <ModalOverlay />
          <ModalContent className="custom-modal-content" >
            <ModalHeader> Hapus Korban </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow={'auto'}>
              <Text> Apakah Anda yakin ingin menghapus data korban ini ?</Text>
            </ModalBody>
            <ModalFooter>
            <Button
                bg={'red'}
                onClick={(e) => {
                  e.preventDefault();
                    axios.delete(deleteKorbanById + deleteKorbanIndex)
                    .then(response => {
                      getLuka();
                      getAllIdentitas();
                      getSantunan();
                      console.log(response)
                      deleteKorban.onClose()
                    })
                }}
              color={'white'}
              mr={3}
              > Hapus
              </Button>
              <Button border={'solid 2px var(--color-primer)'} bg={'white'}  mr={3} onClick={deleteKorban.onClose}>
                Tutup
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> 
        <Modal isOpen={deleteSantunan.isOpen} onClose={deleteSantunan.onClose}>
          <ModalOverlay />
          <ModalContent className="custom-modal-content" >
            <ModalHeader>Hapus Input Santunan </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow={'auto'}>
              <Text> Apakah Anda yakin ingin menghapus data santunan ini ?</Text>
            </ModalBody>
            <ModalFooter>
            <Button
                bg={'red'}
                onClick={(e) => {
                  e.preventDefault();
                    axios.delete(deleteSantunanById + deleteSantunanIndex)
                    .then(response => {
                      console.log(response)
                      getLuka();
                      getAllIdentitas();
                      getSantunan();
                      deleteSantunan.onClose();
                    })
                }}
              color={'white'}
              mr={3}
              > Hapus
              </Button>
              <Button border={'solid 2px var(--color-primer)'} bg={'white'}  mr={3} onClick={deleteSantunan.onClose}>
                Tutup
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Formik
          initialValues={{
            identitas_korban: identitas.identitasSantunan,
          }}
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize={true}
          onSubmit={(values, {setSubmitting}) => {
            console.log(values)
            setTimeout(() => {
              values.identitas_korban.map((korban, korbanIndex) => {
                axios.patch(updateKorbanById + korban.id_identitas_korban, {
                  nama: korban.nama,
                  jenis_kelamin: korban.jenis_kelamin,
                  umur: korban.umur,
                  alamat: korban.alamat,
                  NIK: korban.NIK,
                  id_luka: korban.id_luka,
                  plat_ambulance: korban.plat_ambulance,
                  nama_rumah_sakit: korban.nama_rumah_sakit,
                })
                .then(response => {
                  console.log(response)
                  if (response.status === 200) {
                    navigate(`/unit/${role}/laporan`);
                  }
                  else {
                    console.log(response);
                  }
                  if (Array.isArray(korban.santunans)) {
                  korban.santunans && Object.values(korban.santunans).map((santunan, santunanIndex) => {
                    axios.patch(updateSantunanById + santunan.Identitas_Santunan.id_identitas_santunan, {
                      id_santunan: santunan.Identitas_Santunan.id_santunan,
                      nominal: santunan.Identitas_Santunan.nominal,
                    })
                    .then((response) => {
                      console.log(response.status)
                    if (response.status === 200) {
                      navigate(`/unit/${role}/laporan`);
                      console.log(response);
                    }
                    else {
                      console.log(response);
                    }
                  }
                  ).catch(error => {
                    if (error.response.status === 500) {
                        setError('Data Santunan Sudah Ada')
                    }
                  }
                  )
                  })
                }
                })
              })
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
                <Form className='formInput' size='xl' method='PATCH' onSubmit={handleSubmit}>
                 <Text fontSize={'var(--header-1)'} color={'black'}>Identitas Korban</Text>
                  {identitas.identitasSantunan && Object.values(identitas.identitasSantunan).map((korban, korbanIndex) => (
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
                          onChange={(e) => {
                            setFieldValue(`identitas_korban.${korbanIndex}.nama`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_korban && values.identitas_korban[korbanIndex].nama}
                          required
                        />
                        <FormErrorMessage>{errors.nama}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.jenis_kelamin && touched.jenis_kelamin}>
                        <FormLabel color={"var(--color-primer)"}>Jenis Kelamin Korban</FormLabel>
                        <Select
                          name='jenis_kelamin'
                          color='black'
                          placeholder="Pilih Jenis Kelamin"
                          onChange={(e) => {
                            setFieldValue(`identitas_korban.${korbanIndex}.jenis_kelamin`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_korban && values.identitas_korban[korbanIndex].jenis_kelamin}
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
                          onChange={(e) =>{
                            setFieldValue(`identitas_korban.${korbanIndex}.umur`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_korban && values.identitas_korban[korbanIndex].umur}
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
                          onChange={(e) => {
                            setFieldValue(`identitas_korban.${korbanIndex}.alamat`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_korban && values.identitas_korban[korbanIndex].alamat}
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
                          onChange={(e) => {
                            setFieldValue(`identitas_korban.${korbanIndex}.NIK`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_korban && values.identitas_korban[korbanIndex].NIK}
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
                            setFieldValue(`identitas_korban.${korbanIndex}.id_luka`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_korban && values.identitas_korban[korbanIndex].id_luka}
                        >
                          {luka.map((luka) => (
                            <option key={luka.id} value={luka.id_luka}>{luka.keterangan_luka}</option>
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
                          onChange={(e) => {
                            setFieldValue(`identitas_korban.${korbanIndex}.plat_ambulance`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_korban && values.identitas_korban[korbanIndex].plat_ambulance}
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
                          onChange={(e) => {
                            setFieldValue(`identitas_korban.${korbanIndex}.nama_rumah_sakit`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_korban && values.identitas_korban[korbanIndex].nama_rumah_sakit}
                        />
                        <FormErrorMessage>{errors.nama_rumah_sakit}</FormErrorMessage>
                      </FormControl>
                     {korban.santunans && Object.values(korban.santunans).map((santunan, santunanIndex) => (
                        <React.Fragment key={santunanIndex}>
                          <FormControl mt={4} isInvalid={errors.nominal && touched.nominal}>
                            <FormLabel color={"var(--color-primer)"}>Nominal Santunan</FormLabel>
                            <Input
                              name='nominal'
                              type='number'
                              id='rupiah'
                              color='black'
                              placeholder='Santunan'
                              onChange={(e) => {
                                setFieldValue(`identitas_korban.${korbanIndex}.santunans.${santunanIndex}.Identitas_Santunan.nominal`, e.target.value);
                                console.log(e.target.value);
                            }}
                              onBlur={handleBlur}
                              value={values.identitas_korban && values.identitas_korban[korbanIndex].santunans && values.identitas_korban[korbanIndex].santunans[santunanIndex].Identitas_Santunan.nominal}
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
                                setFieldValue(`identitas_korban.${korbanIndex}.santunans.${santunanIndex}.Identitas_Santunan.id_santunan`, e.target.value);
                            }}
                              onBlur={handleBlur}
                              value={values.identitas_korban && values.identitas_korban[korbanIndex].santunans && values.identitas_korban[korbanIndex].santunans[santunanIndex].Identitas_Santunan.id_santunan}
                            >
                              {
                                santunanList.map((item) => (
                                  <option key={item.id_santunan} value={item.id_santunan}>{item.jenis_santunan}</option>
                                ))
                              }
                            </Select>
                            <FormErrorMessage>{errors.id_santunan}</FormErrorMessage>
                          </FormControl>
                        <Button mt={4}
                            size='md'
                            my={4}
                            bg={"red"} 
                            onClick={()=> handleRemoveKorbanSantunan(santunan.Identitas_Santunan)}
                            >
                            Hapus Santunan
                          </Button>
                        </React.Fragment>
                      ))} 
                          <Button bg={"var(--color-primer)"}
                          size='md'
                          onClick={()=> handleAddKorbanSantunan(korban.id_identitas_korban)}
                          >
                          Tambah Santunan
                      </Button>
                      </Flex>
                      <Flex ml={20} flexDir={'column'}>
                      <Button
                        mt={4}
                        size='md'
                        textAlign={'center'}
                        width={'100px'}
                        bg={"red"}
                        fontSize={'30px'}
                        onClick={()=> handleRemoveKorban(korban.id_identitas_korban)}
                      >
                      -
                      </Button>
                      </Flex>
                      </Flex>
                      <br />
                     <Text color={'black'}>
                      <b>-----------------------------------------------------------------------------------------</b>
                     </Text>
                      <br />
                    </React.Fragment>
                  ))
                  } 
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
      </Flex>
        )}
      </Formik>
      </Flex>
    </>
  )
}
export default EditKorbanLaporanJasaRaharja;