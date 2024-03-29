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
  createDetailLaporanPolisi,getAllLuka
} from '../../Utility/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './detailInput.css'

const DetailLaporanPolisi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  TabTitle("Laporan - Sisporlaka");
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(true);
  const role = useAuth('polisi')
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
  const [pengemudiList, setPengemudiList] = useState([{ 
    nama_pengemudi: "",
    jenis_kelamin_pengemudi: "",
    umur_pengemudi: "",
    alamat_pengemudi: "",
    no_sim: "",
    no_STNK: ""
  }]);
 const [korbanList, setKorbanList] = useState([{
    nama: "",
    jenis_kelamin: "",
    umur: "",
    alamat: "",
    NIK: "",
    id_luka: "",
    nama_rumah_sakit: "",
  }]);
  const addKorbanInput = () => {
    setKorbanList([...korbanList, {
      nama: "",
      jenis_kelamin: "",
      umur: "",
      alamat: "",
      NIK: "",
      id_luka: "",
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
  const addPengemudiInput = () => {
    setPengemudiList([...pengemudiList, { 
      nama_pengemudi: "",
      jenis_kelamin_pengemudi: "",
      umur_pengemudi: "",
      alamat_pengemudi: "",
      no_sim: "",
      no_STNK: ""
    }]);
  };
    const data = {
      identitas_korban: korbanList,
      identitas_pengemudi: pengemudiList,
      id_laporan: id,
    };
    // Kirim data ke backend
    console.log(data);
  const handlePengemudiChange = (index, field, value) => {
    const updatedPengemudiList = [...pengemudiList];
    updatedPengemudiList[index][field] = value;
    setPengemudiList(updatedPengemudiList);
  };
  const removePengemudiInput = (index) => {
    const updatedPengemudiList = [...pengemudiList];
    updatedPengemudiList.splice(index, 1);
    setPengemudiList(updatedPengemudiList);
  }
  const schema = Yup.object({
    //identitas pengemudi
    nama_pengemudi: Yup.string(),
    jenis_kelamin_pengemudi: Yup.string(),
    umur_pengemudi: Yup.number(),
    alamat_pengemudi: Yup.string(),
    no_sim: Yup.number(),
    no_STNK: Yup.number(),

    //identitas korban
    nama: Yup.string(),
    jenis_kelamin: Yup.string(),
    umur: Yup.number(),
    alamat: Yup.string(),
    NIK: Yup.number(),
    id_luka: Yup.number(),
    nama_rumah_sakit: Yup.string(),
  })

  useEffect(() => {
    dispatch(routePageName("Laporkan Kejadian"));
    setLoading(true);
    getLuka();
  }, []);
  return (
    <>
      <Flex flexDir={'column'} justify={'flex-start'} width={'100%'}>
       
        <Formik
          initialValues={{
            //identitas pengemudi
            nama_pengemudi: '',
            jenis_kelamin_pengemudi: '',
            umur_pengemudi: '',
            alamat_pengemudi: '',
            no_sim: '',
            no_STNK: '',
            //identitas korban
            nama: '',
            jenis_kelamin: '',
            umur: '',
            alamat: '',
            NIK: '',
            id_luka: '',
            nama_rumah_sakit: '',
          }}
          validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
              const submitedData = new FormData();
              submitedData.append('nama_pengemudi', values.nama_pengemudi);
              submitedData.append('jenis_kelamin_pengemudi', values.jenis_kelamin_pengemudi);
              submitedData.append('umur_pengemudi', values.umur_pengemudi);
              submitedData.append('alamat_pengemudi', values.alamat_pengemudi);
              submitedData.append('no_sim', values.no_sim);
              submitedData.append('no_STNK', values.no_STNK);
              submitedData.append('nama', values.nama);
              submitedData.append('jenis_kelamin', values.jenis_kelamin);
              submitedData.append('umur', values.umur);
              submitedData.append('alamat', values.alamat);
              submitedData.append('NIK', values.NIK);
              submitedData.append('id_luka', values.id_luka);
              submitedData.append('nama_rumah_sakit', values.nama_rumah_sakit);
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
                <Text fontSize={'var(--header-1)'} color={'black'}>Identitas Pengemudi</Text>
                  {pengemudiList.map((pengemudi, index) => (
                    <React.Fragment key={index} >
                      <Flex flexDir={'row'} alignItems={'center'} alignContent={'center'}>
                      <Flex flexDir={'column'} >
                      <FormControl mt={4} isInvalid={errors.nama_pengemudi && touched.nama_pengemudi}>
                        <FormLabel color={"var(--color-primer)"}>Nama Pengemudi</FormLabel>
                        <Input
                          name='nama_pengemudi'
                          type='text'
                          color='black'
                          placeholder='Nama Pengemudi'
                          onChange={(e) => handlePengemudiChange(index, 'nama_pengemudi', e.target.value)}
                          onBlur={handleBlur}
                          value={pengemudi.nama_pengemudi}
                        />
                        <FormErrorMessage>{errors.nama_pengemudi}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.jenis_kelamin_pengemudi && touched.jenis_kelamin_pengemudi}>
                        <FormLabel color={"var(--color-primer)"}>Jenis Kelamin Pengemudi</FormLabel>
                        <Select
                          name='jenis_kelamin_pengemudi'
                          color='black'
                          placeholder="Pilih Jenis Kelamin"
                          onChange={(e) => handlePengemudiChange(index, 'jenis_kelamin_pengemudi', e.target.value)}
                          onBlur={handleBlur}
                          value={pengemudi.jenis_kelamin_pengemudi}
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
                          onChange={(e) => handlePengemudiChange(index, 'umur_pengemudi', e.target.value)}
                          onBlur={handleBlur}
                          value={pengemudi.umur_pengemudi}
                        />
                        <FormErrorMessage>{errors.umur_pengemudi}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.alamat_pengemudi && touched.alamat_pengemudi}>
                        <FormLabel color={"var(--color-primer)"}>Alamat Pengemudi</FormLabel>
                        <Input
                          name='alamat_pengemudi'
                          type='text'
                          color='black'
                          placeholder='Alamat Pengemudi'
                          onChange={(e) => handlePengemudiChange(index, 'alamat_pengemudi', e.target.value)}
                          onBlur={handleBlur}
                          value={pengemudi.alamat_pengemudi}
                        />
                        <FormErrorMessage>{errors.alamat_pengemudi}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.no_sim && touched.no_sim}>
                        <FormLabel color={"var(--color-primer)"}>No SIM</FormLabel>
                        <Input
                          name='no_sim'
                          type='text'
                          color='black'
                          placeholder='No SIM'
                          onChange={(e) => handlePengemudiChange(index, 'no_sim', e.target.value)}
                          onBlur={handleBlur}
                          value={pengemudi.no_sim}
                        />
                        <FormErrorMessage>{errors.no_sim}</FormErrorMessage>
                      </FormControl>
                      <FormControl mt={4} isInvalid={errors.no_STNK && touched.no_STNK}>
                        <FormLabel color={"var(--color-primer)"}>No STNK</FormLabel>
                        <Input
                          name='no_STNK'
                          type='text'
                          color='black'
                          placeholder='No STNK'
                          onChange={(e) => handlePengemudiChange(index, 'no_STNK', e.target.value)}
                          onBlur={handleBlur}
                          value={pengemudi.no_STNK}
                        />
                        <FormErrorMessage>{errors.no_STNK}</FormErrorMessage>
                      </FormControl>
                      </Flex>
                      <Flex ml={20} flexDir={'column'}>
                      <Button
                        mt={4}
                        size='md'
                        width={'100px'}
                        bg={"red"}
                        disabled={pengemudiList.length === 1} onClick={() => removePengemudiInput(index)}
                      >
                        <Text>
                          -
                        </Text>
                      </Button>
                      <Button fontSize={50} bg={"var(--color-primer)"} display={index === pengemudiList.length - 1 ? 'flex' : 'none'} mt={4} size='md' onClick={addPengemudiInput}>
                        +
                      </Button>
                      </Flex>
                      </Flex>
                    </React.Fragment>
                  ))}
                <Text mt={10} fontSize={'var(--header-1)'} color={'black'}>Identitas Korban</Text>
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
export default DetailLaporanPolisi;
