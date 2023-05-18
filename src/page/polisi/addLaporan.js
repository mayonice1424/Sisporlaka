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
  Select
} from '@chakra-ui/react';
import { Formik,Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { routePageName } from '../../Redux/action';
import { TabTitle } from '../../Utility/utility';
import {
  postLaporanApi,getAllKecamatan,getIdUserByTokenApi
} from '../../Utility/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './input.css'
const AddLaporanPolisi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  TabTitle("Laporan - Sisporlaka");
  const { id } =useParams();
  const [loading, setLoading] = useState(true);
  const [dataApi, setDataApi] = useState();

  const schema = Yup.object({
    judul_kejadian: Yup.string().required("Judul Kejadian harus diisi"),
    tanggal: Yup.string().required("Tanggal Kejadian harus diisi"),
    waktu: Yup.string().required("Waktu Kejadian harus diisi"),
    id_kecamatan: Yup.string().required("Kecamatan harus diisi"),
  }
  );
  const [kecamatanList, setKecamatanList] = useState([]);
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
    getIdUserByToken();
    setLoading(true);
  }, []);
  const role = useAuth('polisi')
    return (
      <>
        <Flex justify={'flex-start'} width={'100%'}>
          <Formik
            initialValues={{
              judul_kejadian: "",
              tanggal: "",
              waktu: "",
              id_kecamatan: "",
            }}
            validationSchema={schema}
            validateOnChange={false}
						validateOnBlur={false}
            onSubmit={(values, {setSubmitting}) => {
              setTimeout(() => {
                const submitedData = new FormData();
                submitedData.append("judul_kejadian", values.judul_kejadian);
                submitedData.append("tanggal", values.tanggal);
                submitedData.append("waktu", values.waktu);
                submitedData.append("id_kecamatan", values.id_kecamatan);
                axios.post(postLaporanApi,{
                  judul_kejadian: values.judul_kejadian,
                  tanggal: values.tanggal,
                  waktu: values.waktu,
                  id_kecamatan: values.id_kecamatan,
                  id_users: dataApi
                })
                .then((response) => {
                  if (response.status === 201) {
                    console.log(response);
                    navigate(`/unit/${role}/detail-laporan/${response.data.id_laporan}`)
                  }
                  else {
                    console.log(response);
                  }
                })
                .catch((error)=> {
                  console.log(error);
                });
                setSubmitting(false);
              },400);
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
              setFieldValue
            }) => (
              <Flex width={1500}>
              <Form className='formInput' size='xl' method="POST" onSubmit={handleSubmit}>
                  <FormControl 
                    mt={4}
                    isInvalid={errors.judul_kejadian && touched.judul_kejadian}
                  >
                    <FormLabel color={"var(--color-primer)"}>Judul Kejadian</FormLabel>
                    <Flex justify={'flex-start'} width={'100%'}maxWidth={'1500px'}>
                    <Input
                      color={"black"}
                      type="text"
                      name="judul_kejadian"
                      size={'lg'}
                      
                      width={'100%'}
                      value={values.judul_kejadian}
                      onChange={handleChange}
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
                    <Input
                      color={'black'}
                      type="hidden"
                      value={dataApi}
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
    );
}

export default AddLaporanPolisi