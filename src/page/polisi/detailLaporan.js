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
  getAllKecamatan,updateLaporan
} from '../../Utility/api.js';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './input.css'

const DetailLaporanPolisi = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  TabTitle("Laporan - Sisporlaka");
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(true);
  const [dataApi, setDataApi] = useState();
  const role = useAuth('polisi')
  const [dataLaporan, setDataLaporan] = useState([]);

  // const schema = Yup.object({
  //   //identitas kecelakaan
  //   id_laporan_kategori: Yup.string().required('Id Laporan Kecelakaan harus diisi'),
  //   //identitas pengemudi
  //   nama_pengemudi: Yup.string().required('Nama harus diisi'),
  //   jenis_kelamin_pengemudi: Yup.string().required('Jenis Kelamin harus diisi'),
  //   umur_pengemudi: Yup.number().required('Umur harus diisi'),
  //   alamat_pengemudi: Yup.string().required('Alamat harus diisi'),
  //   no_sim: Yup.number().required('No SIM harus diisi'),
  //   no_stnk: Yup.number().required('No STNK harus diisi'),

  //   //identitas korban
  //   nama: Yup.string().required('Nama harus diisi'),
  //   jenis_kelamin: Yup.string().required('Jenis Kelamin harus diisi'),
  //   umur: Yup.number().required('Umur harus diisi'),
  //   alamat: Yup.string().required('Alamat harus diisi'),
  //   NIK: Yup.number().required('NIK harus diisi'),
  //   id_luka: Yup.number().required('Id Luka harus diisi'),
  //   nama_rumah_sakit: Yup.string().required('Nama Rumah Sakit harus diisi'),
  //   nomor_rekam_medis: Yup.string().required('Nomor Rekam Medis harus diisi'),
  // })
  // const postDetailData = async (values) => {
  //   const data = {

  //   }
  //   console.log(data);
  //   await axios.(`${updateLaporan}${id}`, data)
  //     .then((res) => {
  //       console.log(res);
  //       navigate('/polisi/laporan')
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }
  // const getData = async () => {
  //   await axios.get(`${getAllKecamatan}`)
  //     .then((res) => {
  //       setDataLaporan(res.data.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }

  // useEffect(() => {
  //   dispatch(routePageName("Laporkan Kejadian"));
  //   setLoading(true);
  // }, []);
  return (
    <>
      <Flex>
       
      </Flex>
    </>
  )
}
export default DetailLaporanPolisi;
