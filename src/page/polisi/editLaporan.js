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
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { routePageName } from '../../Redux/action';
import { TabTitle } from '../../Utility/utility';
import {
  deleteKorbanById,getAllLuka,getPengemudi,getAllIdentitasKorban,deletePengemudiById,updateKorbanById,updatePengemudiById
} from '../../Utility/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './detailInput.css'

const EditKorbanLaporanPolisi = () => {
  const { id } = useParams(); 
  const deleteKorban = useDisclosure()
  const deletePengemudi = useDisclosure()
  const [error, setError] = useState(null);
  const [santunanList, setSantunan] = useState([]);
  const [deleteKorbanIndex, setDeleteKorbanIndex] = useState([])


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [luka, setLuka] = useState([]);
  const [identitas, setIdentitas] = useState([]);
  const [id_identitas, setIdIdentitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [santunanId, setSantunanId] = useState([])
  const role = useAuth('polisi')
  TabTitle("Laporan - Sisporlaka"); 
    const [data,set] = useState({
      identitas_pengemudi: [
        {
          nama_pengemudi: '',
          jenis_kelamin_pengemudi: '',
          umur_pengemudi: '',
          alamat_pengemudi: '',
          no_sim: '',
          no_STNK: '',
        },
      ],
      identitas_korban: [
        {
          nama: '',
          jenis_kelamin: '',
          umur: '',
          alamat: '',
          NIK: '',
          nama_rumah_sakit: '',
          id_luka: '',
        },
      ],
      id_laporan: id,
    });

    const [deletePengemudiByIndex, setDeletePengemudi] = useState([])



  const handleRemovePengemudi = (pengemudiIndex) => {
    setDeletePengemudi(pengemudiIndex)
    deletePengemudi.onOpen()
  };


  const handleRemoveKorban = (korbanIndex) => {
    setDeleteKorbanIndex(korbanIndex)
    deleteKorban.onOpen()
  };
  const getAllPengemudi = async () => {
    axios.get(`${getPengemudi}${id}`)
    .then(response => {
      setPengemudi(response.data)
      console.log("DATA IDENTITAS : ",response.data.identitasPengemudi[0].nama_pengemudi)
      setLoading(false)
    })
    .catch(error => {
      console.log(error)
    }
    )
  }



  const [pengemudi, setPengemudi] = useState([]);
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
    getAllPengemudi();
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
                      getAllPengemudi();
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
        <Modal isOpen={deletePengemudi.isOpen} onClose={deletePengemudi.onClose}>
          <ModalOverlay />
          <ModalContent className="custom-modal-content" >
            <ModalHeader> Hapus Korban </ModalHeader>
            <ModalCloseButton />
            <ModalBody overflow={'auto'}>
              <Text> Apakah Anda yakin ingin menghapus data pengemudi ini ?</Text>
            </ModalBody>
            <ModalFooter>
            <Button
                bg={'red'}
                onClick={(e) => {
                  e.preventDefault();
                    axios.delete(deletePengemudiById + deletePengemudiByIndex)
                    .then(response => {
                      getLuka();
                      getAllIdentitas();
                      getAllPengemudi();
                      console.log(response)
                      deletePengemudi.onClose()
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
            identitas_pengemudi: pengemudi.identitasPengemudi,
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
                  nomor_rekam_medis: korban.nomor_rekam_medis,
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
              values.identitas_pengemudi.map((pengemudi, pengemudiIndex) => {
                axios.patch(updatePengemudiById + pengemudi.id_laporan_pengemudi, {
                  nama_pengemudi: pengemudi.nama_pengemudi,
                  jenis_kelamin_pengemudi: pengemudi.jenis_kelamin_pengemudi,
                  umur_pengemudi: pengemudi.umur_pengemudi,
                  alamat_pengemudi: pengemudi.alamat_pengemudi,
                  no_sim: pengemudi.no_sim,
                  no_STNK: pengemudi.no_STNK,
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
                <Form className='formInput' size='xl' method='PATCH' onSubmit={handleSubmit}>
                 <Text fontSize={'var(--header-1)'} color={'black'}>Identitas Pengemudi</Text>
                  {
                    pengemudi.identitasPengemudi && Object.values(pengemudi.identitasPengemudi).map((pengemudi, pengemudiIndex) => (
                      <React.Fragment key={pengemudiIndex}>
                        <Flex flexDir={'row'} alignItems={'center'} alignContent={'center'}>
                        <Flex flexDir={'column'} >
                        <FormControl mt={4} isInvalid={errors.nama_pengemudi && touched.nama_pengemudi}>
                          <FormLabel color={"var(--color-primer)"}>Nama Pengemudi</FormLabel>
                          <Input
                            name='nama_pengemudi'
                            type='text'
                            color='black'
                            placeholder='Nama Pengemudi'
                            onChange={(e) => {
                              setFieldValue(`identitas_pengemudi.${pengemudiIndex}.nama_pengemudi`, e.target.value);
                            }}
                           onBlur={handleBlur}
                           value={values.identitas_pengemudi && values.identitas_pengemudi[pengemudiIndex].nama_pengemudi}
                          />
                          <FormErrorMessage>{errors.nama_pengemudi && touched.nama_pengemudi && errors.nama_pengemudi}</FormErrorMessage>
                        </FormControl>
                        <FormControl mt={4} isInvalid={errors.jenis_kelamin_pengemudi && touched.jenis_kelamin_pengemudi}>
                          <FormLabel color={"var(--color-primer)"}>Jenis Kelamin Pengemudi</FormLabel>
                          <Select
                          name='jenis_kelamin_pengemudi'
                          color='black'
                          placeholder="Pilih Jenis Kelamin"
                          onChange={(e) => {
                            setFieldValue(`identitas_pengemudi.${pengemudiIndex}.jenis_kelamin_pengemudi`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_pengemudi && values.identitas_pengemudi[pengemudiIndex].jenis_kelamin_pengemudi}
                        >
                          <option value='Laki-laki'>Laki-laki</option>
                          <option value='Perempuan'>Perempuan</option>
                        </Select>
                        <FormErrorMessage>{errors.jenis_kelamin_pengemudi}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.umur_pengemudi && touched.umur_pengemudi}>
                        <FormLabel color={"var(--color-primer)"}>Umur Pengemudi</FormLabel>
                        <Input
                          name='umur_pengemudi'
                          type='number'
                          color='black'
                          placeholder='Umur Pengemudi'
                          onChange={(e) => {
                            setFieldValue(`identitas_pengemudi.${pengemudiIndex}.umur_pengemudi`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_pengemudi && values.identitas_pengemudi[pengemudiIndex].umur_pengemudi}
                        />
                        <FormErrorMessage>{errors.umur_pengemudi && touched.umur_pengemudi && errors.umur_pengemudi}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.alamat_pengemudi && touched.alamat_pengemudi}>
                        <FormLabel color={"var(--color-primer)"}>Alamat Pengemudi</FormLabel>
                        <Input
                          name='alamat_pengemudi'
                          type='text'
                          color='black'
                          placeholder='Alamat Pengemudi'
                          onChange={(e) => {
                            setFieldValue(`identitas_pengemudi.${pengemudiIndex}.alamat_pengemudi`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_pengemudi && values.identitas_pengemudi[pengemudiIndex].alamat_pengemudi}
                        />
                        <FormErrorMessage>{errors.alamat_pengemudi && touched.alamat_pengemudi && errors.alamat_pengemudi}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.no_sim && touched.no_sim}>
                        <FormLabel color={"var(--color-primer)"}>No SIM</FormLabel>
                        <Input
                          name='no_sim'
                          type='text'
                          color='black'
                          placeholder='No SIM'
                          onChange={(e) => {
                            setFieldValue(`identitas_pengemudi.${pengemudiIndex}.no_sim`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_pengemudi && values.identitas_pengemudi[pengemudiIndex].no_sim}
                        />
                        <FormErrorMessage>{errors.no_sim && touched.no_sim && errors.no_sim}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.no_STNK && touched.no_STNK}>
                        <FormLabel color={"var(--color-primer)"}>No STNK</FormLabel>
                        <Input
                          name='no_STNK'
                          type='text'
                          color='black'
                          placeholder='No STNK'
                          onChange={(e) => {
                            setFieldValue(`identitas_pengemudi.${pengemudiIndex}.no_STNK`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_pengemudi && values.identitas_pengemudi[pengemudiIndex].no_STNK}
                        />
                        <FormErrorMessage>{errors.no_STNK && touched.no_STNK && errors.no_STNK}</FormErrorMessage>
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
                        onClick={()=> handleRemovePengemudi(pengemudi.id_laporan_pengemudi)}
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
                      <FormControl mt={4} isInvalid={errors.nomor_rekam_medis && touched.nomor_rekam_medis}>
                        <FormLabel color={"var(--color-primer)"}> Nomor Rekam Medis</FormLabel>
                        <Input
                          name='nomor_rekam_medis'
                          type='text'
                          color='black'
                          placeholder='Nomor Rekam Medis'
                          onChange={(e) => {
                            setFieldValue(`identitas_korban.${korbanIndex}.nomor_rekam_medis`, e.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.identitas_korban && values.identitas_korban[korbanIndex].nomor_rekam_medis}
                        />
                        <FormErrorMessage>{errors.nomor_rekam_medis}</FormErrorMessage>
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
        )}
      </Formik>
      </Flex>
    </>
  )
}
export default EditKorbanLaporanPolisi;