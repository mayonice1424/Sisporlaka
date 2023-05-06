import React,{useEffect} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import LaporanRS from '../../components/laporan/laporanRS';


const AdminRSLaporan = () => {
  TabTitle("Laporan - Sisporlaka");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Laporkan Kejadian"));
  }, []);
  const role = useAuth('rumah-sakit')
  return (
    <>
    <div width={'100%'}>
      <LaporanRS />
    </div>
    </>
  )
}

export default AdminRSLaporan