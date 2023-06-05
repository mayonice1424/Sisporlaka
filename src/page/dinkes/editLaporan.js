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
  getAllICD10,deleteKorbanById,getAllLuka,getAllSantunan,getAllIdentitasKorban,updateKorbanById
} from '../../Utility/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './detailInput.css'

const EditKorbanLaporanDinkes = () => {
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
  const [kodeIcd, setICD10] = useState([]);    
  const [identitas, setIdentitas] = useState([]);
  const [id_identitas, setIdIdentitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [santunanId, setSantunanId] = useState([])
  const role = useAuth('dinas-kesehatan')
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
          nomor_rekam_medis: '',
          id_luka: '',
          kode_icd_10: "",
        },
      ],
      id_laporan: id,
    });

  const handleRemoveKorban = (korbanIndex) => {
    setDeleteKorbanIndex(korbanIndex)
    deleteKorban.onOpen()
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
  const getICD10 = async () => {
    axios.get(getAllICD10)
    .then(response => {
      setICD10(response.data.icd10)
      setLoading(false)
    })
    .catch(error => {
      console.log(error)
    }
    )
  }
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
        kode_icd_10: Yup.string().required(),
      })
    ),
  
    id_laporan: Yup.number().required(),
  });
  useEffect(() => {
    dispatch(routePageName("Laporkan Kejadian"));
    setLoading(true);
    getLuka();
    getAllIdentitas();
    getICD10();
    getSantunan();
   
  }, []);
  return (
    <>
      <Flex flexDir={'column'} justify={'flex-start'} width={'100%'}>
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
                      getICD10();
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
                  kode_icd_10: korban.kode_icd_10,
                })
                .then(response => {
                  console.log(response)
                  if (response.status === 200) {
                    navigate(`/unit/${role}/laporan`);
                  }
                  else {
                    console.log(response);
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
                      <FormControl mt={4} isInvalid={errors.kode_icd_10 && touched.kode_icd_10}>
                        <FormLabel color={"var(--color-primer)"}>Kode Insiden ICD-10</FormLabel>
                        <Select
                          name='kode_icd_10'
                          color='black'
                          placeholder="Pilih Kode Insiden ICD-10"
                          onChange={(e) => {
                            setFieldValue(`identitas_korban.${korbanIndex}.kode_icd_10`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_korban && values.identitas_korban[korbanIndex].kode_icd_10}
                        >
                         {
                          kodeIcd.map((item) => (
                            <option key={item.kode_icd_10} value={item.kode_icd_10}>{`${item.kode_icd_10} - ${item.insiden}`}</option>
                          ))}
                        </Select>
                        <FormErrorMessage>{errors.kode_icd_10}</FormErrorMessage>
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
export default EditKorbanLaporanDinkes;