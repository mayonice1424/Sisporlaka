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
import { Formik,Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { routePageName } from '../../Redux/action';
import { TabTitle } from '../../Utility/utility';
import {
  createDetailLaporanPolisi,getAllLuka,getAllICD10
} from '../../Utility/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './input.css'

const DetailLaporanDinkes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  TabTitle("Laporan - Sisporlaka");
  const { id } = useParams();
  console.log(id);
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
  const [kodeIcd, setICD10] = useState([]);    
  const [luka, setLuka] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = useAuth('dinas-kesehatan')
 const [korbanList, setKorbanList] = useState([{
    nama: "",
    jenis_kelamin: "",
    umur: "",
    alamat: "",
    NIK: "",
    plat_ambulance: "",
    nama_rumah_sakit: "",
    kode_icd_10: "",
    id_luka: ""
  }]);
  const addKorbanInput = () => {
    setKorbanList([...korbanList, {
      nama: "",
      jenis_kelamin: "",
      umur: "",
      alamat: "",
      NIK: "",
      plat_ambulance: "",
      id_luka: "",
      kode_icd_10: "",
      nama_rumah_sakit: "",
    }]);
  };
  const handleKorbanChange = (index, field, value) => {
    const updatedKorbanList = [...korbanList];
    updatedKorbanList[index][field] = value;
    setKorbanList(updatedKorbanList);
  };
  const removeKorbanInput = (index) => {
    const updatedKorbanList = [...korbanList];
    updatedKorbanList.splice(index, 1);
    setKorbanList(updatedKorbanList);
  }
    const data = {
      identitas_korban: korbanList,
      id_laporan: id,
    };
  const schema = Yup.object({
    //identitas korban
    nama: Yup.string(),
    jenis_kelamin: Yup.string(),
    umur: Yup.number(),
    alamat: Yup.string(),
    plat_ambulance: Yup.string(),
    NIK: Yup.number(),
    id_luka: Yup.number(),
    kode_icd_10: Yup.string(),
    nama_rumah_sakit: Yup.string(),
  })

  useEffect(() => {
    dispatch(routePageName("Laporkan Kejadian"));
    setLoading(true);
    getLuka();
    getICD10();
  }, []);
  return (
    <>
      <Flex flexDir={'column'} justify={'flex-start'} width={'100%'}>
       
        <Formik
          initialValues={{
            //identitas korban
            nama: '',
            jenis_kelamin: '',
            umur: '',
            alamat: '',
            NIK: '',
            plat_ambulance: '',
            id_luka: '',
            nama_rumah_sakit: '',
            kode_icd_10 : ''
          }}
          validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              const submitedData = new FormData();
              submitedData.append('nama', values.nama);
              submitedData.append('jenis_kelamin', values.jenis_kelamin);
              submitedData.append('umur', values.umur);
              submitedData.append('alamat', values.alamat);
              submitedData.append('NIK', values.NIK);
              submitedData.append('plat_ambulance', values.plat_ambulance);
              submitedData.append('id_luka', values.id_luka);
              submitedData.append('nama_rumah_sakit', values.nama_rumah_sakit);
              submitedData.append('kode_icd_10', values.kode_icd_10);
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
              <Flex width={1500}>
                <Form className='formInput' size='xl' method='POST' onSubmit={handleSubmit}>
                <Text fontSize={'var(--header-1)'} color={'black'}>Identitas Korban</Text>
                  {korbanList.map((korban, index) => (
                    <React.Fragment key={index} >
                      <Flex flexDir={'row'} alignItems={'center'} alignContent={'center'}>
                      <Flex flexDir={'column'} >
                      <FormControl mt={4} isInvalid={errors.nama && touched.nama}>
                        <FormLabel color={"var(--color-primer)"}>Nama Korban</FormLabel>
                        <Input
                          name='nama'
                          type='text'
                          color='black'
                          placeholder='Nama Korban'
                          onChange={(e) => handleKorbanChange(index, 'nama', e.target.value)}
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
                          onChange={(e) => handleKorbanChange(index, 'jenis_kelamin', e.target.value)}
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
                          onChange={(e) => handleKorbanChange(index, 'umur', e.target.value)}
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
                          onChange={(e) => handleKorbanChange(index, 'alamat', e.target.value)}
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
                          onChange={(e) => handleKorbanChange(index, 'NIK', e.target.value)}
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
                            handleKorbanChange(index, 'id_luka', e.target.value);
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
                      <FormControl mt={4} isInvalid={errors.kode_icd_10 && touched.kode_icd_10}>
                        <FormLabel color={"var(--color-primer)"}>Kode Insiden ICD-10</FormLabel>
                        <Select
                          name='kode_icd_10'
                          color='black'
                          placeholder="Pilih Kode Insiden ICD-10"
                          onChange={(e) => handleKorbanChange(index, 'kode_icd_10', e.target.value)}
                          onBlur={handleBlur}
                          value={korban.kode_icd_10}
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
                          onChange={(e) => handleKorbanChange(index, 'plat_ambulance', e.target.value)}
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
                          onChange={(e) => handleKorbanChange(index, 'nama_rumah_sakit', e.target.value)}
                          onBlur={handleBlur}
                          value={korban.nama_rumah_sakit}
                        />
                        <FormErrorMessage>{errors.nama_rumah_sakit}</FormErrorMessage>
                      </FormControl>
                      </Flex>
                      <Flex ml={20} flexDir={'column'}>
                      <Button
                        mt={4}
                        size='md'
                        width={'100px'}
                        bg={"red"}
                        disabled={korbanList.length === 1} onClick={() => removeKorbanInput(index)}
                      >
                      -
                      </Button>
                      <Button fontSize={50} bg={"var(--color-primer)"} display={index === korbanList.length - 1 ? 'flex' : 'none'} mt={4} size='md' onClick={addKorbanInput}>
                        +
                      </Button>
                      </Flex>
                      </Flex>
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
              size='md'
              isLoading={isSubmitting}
              disabled={isSubmitting}
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
  )
}
export default DetailLaporanDinkes;
