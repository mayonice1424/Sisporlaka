import React,{useEffect} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import LaporanDishub from '../../components/laporan/laporanDishub';


const AdminDishubLaporan = () => {
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(routePageName("Laporkan Kejadian"));
	}, []);
  TabTitle("Laporan - Sisporlaka");
  const role = useAuth('dinas-perhubungan')
  return (
    <>
    <div>
      <LaporanDishub /> 
    </div>
    </>
  )
}

export default AdminDishubLaporan