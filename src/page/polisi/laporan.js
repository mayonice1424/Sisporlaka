import React,{useEffect} from 'react'
import { Flex
 } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility'
import LaporanPolisi from '../../components/laporan/laporanPolisi';
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";

const AdminPolisiLaporan = () => {
  TabTitle("Laporan - Sisporlaka");
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(routePageName("Laporkan Kejadian"));
	}, []);
 const role = useAuth('polisi')
  return (
    <>
    <div>
        <LaporanPolisi />
    </div>
    </>
  )
}

export default AdminPolisiLaporan