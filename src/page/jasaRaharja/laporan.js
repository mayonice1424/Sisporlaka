import React,{useState,useEffect} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import LaporanJasaRaharja from '../../components/laporan/laporanJasaRaharja';

const AdminJasaRaharjaLaporan = () => {
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(routePageName("Laporkan Kejadian"));
	}, []);
  TabTitle("Laporan - Sisporlaka");
  const role = useAuth('jasa-raharja')
  return (
    <>
    <div>
      <LaporanJasaRaharja />
    </div>
    </>
  )
}

export default AdminJasaRaharjaLaporan