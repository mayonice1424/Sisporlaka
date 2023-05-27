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

const DetailLaporanJasaRaharja = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  TabTitle("Laporan - Sisporlaka");
  const { id } = useParams();
  const [idKorban, setIdKorban] = useState(0);
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
        nomor_rekam_medis: '',
        id_luka: '',
        kode_ATS: '',
        identitas_santunan: [{
          nominal: '',
          id_santunan: ''
      }],
      },
    ],
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
    id_laporan: id,
  });
  const handleKorbanChange = (e, index) => {
    const { name, value } = e.target;
    const korbanData = [...data.identitas_korban];
    korbanData[index] = { ...korbanData[index], [name]: value };
    set({ ...data, identitas_korban: korbanData });
  };
  const handlePengemudiChange = (e, index) => {
    const { name, value } = e.target;
    const pengemudiData = [...data.identitas_pengemudi];
    pengemudiData[index] = { ...pengemudiData[index], [name]: value };
    set({ ...data, identitas_pengemudi: pengemudiData });
  };

  const handleKorbanSantunanChange = (e, korbanIndex, santunanIndex) => {
    const { name, value } = e.target;
    const korbanData = [...data.identitas_korban];
    const santunanData = [...korbanData[korbanIndex].identitas_santunan];
    santunanData[santunanIndex] = { ...santunanData[santunanIndex], [name]: value };
    korbanData[korbanIndex] = { ...korbanData[korbanIndex], identitas_santunan: santunanData };
    set({ ...data, identitas_korban: korbanData });
  };


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
          nomor_rekam_medis: '',
          id_luka: '',
          kode_ATS: '',
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

  const handleAddPengemudi = () => {
    set({
      ...data,
      identitas_pengemudi: [
        ...data.identitas_pengemudi,
        {
          nama_pengemudi: '',
          jenis_kelamin_pengemudi: '',
          umur_pengemudi: '',
          alamat_pengemudi: '',
          no_sim: '',
          no_STNK: '',
        },
      ],
    });
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
  
  const handleRemovePengemudi = (pengemudiIndex) => {
    const pengemudiData = [...data.identitas_pengemudi];
    pengemudiData.splice(pengemudiIndex, 1);
    set({ ...data, identitas_pengemudi: pengemudiData });
  };

  const schema = Yup.object().shape({
    identitas_pengemudi: Yup.array().of(
      Yup.object().shape({
        nama_pengemudi: Yup.string().required(),
        jenis_kelamin_pengemudi: Yup.string().required(),
        umur_pengemudi: Yup.number().required(),
        alamat_pengemudi: Yup.string().required(),
        no_sim: Yup.number().required(),
        no_STNK: Yup.number().required(),
      })
    ),
  
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
        nomor_rekam_medis: Yup.string().required(),
        identitas_santunan: Yup.array().of(
          Yup.object().shape({
            id_santunan: Yup.number().required(),
            nominal: Yup.number().required(),
          })
        ),
      })
    ),
  
    id_laporan: Yup.number().required(),
  });

  useEffect(() => {
    dispatch(routePageName("Laporkan Kejadian"));
    setLoading(true);
  }, []);
  return (
    <>
      <Flex flexDir={'column'} justify={'flex-start'} width={'100%'}>
        <Formik
          initialValues={{
            identitas_pengemudi: {
              nama_pengemudi: '',
              jenis_kelamin_pengemudi: '',
              umur_pengemudi: '',
              alamat_pengemudi: '',
              no_sim: '',
              no_STNK: '',
            },
            identitas_santunan: {
              id_santunan: '',
              nominal: '',
            },
            identitas_korban: {
              nama: '',
              jenis_kelamin: '',
              umur: '',
              alamat: '',
              NIK: '',
              id_luka: '',
              plat_ambulance: '',
              nama_rumah_sakit: '',
              nomor_rekam_medis: '',
            },
          }}
          validationSchema={schema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, { setSubmitting }) => {
            console.log('test')
            setTimeout(() => {
            const submitedData = new FormData();
          
            // Identitas Pengemudi
            submitedData.append('nama_pengemudi', values.identitas_pengemudi.nama_pengemudi);
            submitedData.append('jenis_kelamin_pengemudi', values.identitas_pengemudi.jenis_kelamin_pengemudi);
            submitedData.append('umur_pengemudi', values.identitas_pengemudi.umur_pengemudi);
            submitedData.append('alamat_pengemudi', values.identitas_pengemudi.alamat_pengemudi);
            submitedData.append('no_sim', values.identitas_pengemudi.no_sim);
            submitedData.append('no_STNK', values.identitas_pengemudi.no_STNK);
          
            // Identitas Santunan
            submitedData.append('id_santunan', values.identitas_santunan.id_santunan);
            submitedData.append('nominal', values.identitas_santunan.nominal);
          
            // Identitas Korban
            submitedData.append('nama', values.identitas_korban.nama);
            submitedData.append('jenis_kelamin', values.identitas_korban.jenis_kelamin);
            submitedData.append('umur', values.identitas_korban.umur);
            submitedData.append('alamat', values.identitas_korban.alamat);
            submitedData.append('NIK', values.identitas_korban.NIK);
            submitedData.append('id_luka', values.identitas_korban.id_luka);
            submitedData.append('plat_ambulance', values.identitas_korban.plat_ambulance);
            submitedData.append('nama_rumah_sakit', values.identitas_korban.nama_rumah_sakit);
            submitedData.append('nomor_rekam_medis', values.identitas_korban.nomor_rekam_medis);
            submitedData.append('id_laporan', id);
          
            // Append other data as needed
          
            axios
              .post(createDetailLaporanPolisi, data)
              .then((response) => {
                if (response.status === 201) {
                  navigate(`/unit/${role}/laporan`);
                  console.log(response);
                } else {
                  console.log(response);
                }
              })
              .catch((error) => {
                console.log(error);
              })
                setSubmitting(false);
            });
          }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              setFieldValue,
            }) => (
              <Flex width={1500}>
                <Form className='formInput' size='xl' method='POST' onSubmit={handleSubmit}>
                <Text fontSize={'var(--header-1)'} color={'black'}>Identitas Pengemudi</Text>
                  {data.identitas_pengemudi.map((pengemudi, pengemudiIndex) => (
                    <React.Fragment key={pengemudiIndex} >
                      <Flex flexDir={'row'} alignItems={'center'} alignContent={'center'}>
                      <Flex flexDir={'column'} >
                      <FormControl mt={4} isInvalid={errors.nama_pengemudi && touched.nama_pengemudi}>
                        <FormLabel color={"var(--color-primer)"}>Nama Pengemudi</FormLabel>
                        <Input
                          name='nama_pengemudi'
                          type='text'
                          color='black'
                          placeholder='Nama Pengemudi'
                          onChange={(e) => handlePengemudiChange(e, pengemudiIndex)}
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
                          onChange={(e) => handlePengemudiChange(e, pengemudiIndex)}
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
                          onChange={(e) => handlePengemudiChange(e, pengemudiIndex)}
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
                          onChange={(e) => handlePengemudiChange(e, pengemudiIndex)}
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
                          onChange={(e) => handlePengemudiChange(e, pengemudiIndex)}
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
                          onChange={(e) => handlePengemudiChange(e, pengemudiIndex)}
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
                        disabled={data.identitas_pengemudi.length === 1} onClick={() => handleRemovePengemudi(pengemudiIndex)}
                      >
                        <Text>
                          -
                        </Text>
                      </Button>
                      <Button fontSize={50} bg={"var(--color-primer)"} display={pengemudiIndex === data.identitas_pengemudi.length - 1 ? 'flex' : 'none'} mt={4} size='md' onClick={handleAddPengemudi}>
                        +
                      </Button>
                      </Flex>
                      </Flex>
                    </React.Fragment>
                  ))}
                 <Text mt={10} fontSize={'var(--header-1)'} color={'black'}>Identitas Korban</Text>
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
                          <option value='1'>Luka Ringan</option>
                          <option value='2'>Luka Berat</option>
                          <option value='3'>Meninggal</option>
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
                      <FormControl mt={4} isInvalid={errors.nomor_rekam_medis && touched.nomor_rekam_medis}>
                        <FormLabel color={"var(--color-primer)"}> Nomor Rekam Medis</FormLabel>
                        <Input
                          name='nomor_rekam_medis'
                          type='text'
                          color='black'
                          placeholder='Nomor Rekam Medis'
                          onChange={(e) => handleKorbanChange(e,korbanIndex)}
                          onBlur={handleBlur}
                          value={korban.nomor_rekam_medis}
                        />
                        <FormErrorMessage>{errors.nomor_rekam_medis}</FormErrorMessage>
                      </FormControl>
                      <Button onClick={()=> handleAddKorbanSantunan(korbanIndex)}>
                          Tambah Santunan
                      </Button>
                      {korban.identitas_santunan.map((santunan, santunanIndex) => (
                        <React.Fragment key={santunanIndex}>
                          <FormControl mt={4} isInvalid={errors.nominal && touched.nominal}>
                            <FormLabel color={"var(--color-primer)"}>Santunan</FormLabel>
                            <Input
                              name='nominal'
                              type='number'
                              color='black'
                              placeholder='Santunan'
                              onChange={(e) => handleKorbanSantunanChange(e, korbanIndex, santunanIndex)}
                              onBlur={handleBlur}
                              value={santunan.nominal}
                            />
                            <FormErrorMessage>{errors.nominal}</FormErrorMessage>
                          </FormControl>
                          <FormControl mt={4} isInvalid={errors.id_santunan && touched.id_santunan}>
                            <FormLabel color={"var(--color-primer)"}>Jenis Santunan</FormLabel>
                            <Select 
                              name='id_santunan'
                              type='number'
                              color='black'
                              placeholder="Pilih Jenis Santunan"
                              onChange={(e) => {
                                handleKorbanSantunanChange(e, korbanIndex, santunanIndex);
                                console.log(e.target.value);
                              }}
                            >
                              <option value='1'>Santunan Kematian</option>
                              <option value='2'>Santunan Kecelakaan</option>
                            </Select>
                            <FormErrorMessage>{errors.id_santunan}</FormErrorMessage>
                          </FormControl>
                          <Button onClick={()=> handleRemoveKorbanSantunan(korbanIndex, santunanIndex)}>
                            Hapus Santunan
                          </Button>
                        </React.Fragment>
                      ))}
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
                      <Button fontSize={50} bg={"var(--color-primer)"} display={korbanIndex === data.identitas_korban.length - 1 ? 'flex' : 'none'} mt={4} size='md' onClick={handleAddKorban}>
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
export default DetailLaporanJasaRaharja;
