import React,{useEffect} from 'react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility'
import LaporanPolisi from '../../components/laporan/laporanPolisi';
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import { Flex } from '@chakra-ui/react';
import './laporan.css'

const AdminPolisiLaporan = () => {
  TabTitle("Laporan - Sisporlaka");
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(routePageName("Laporkan Kejadian"));
	}, []);
 const role = useAuth('polisi')
  return (
    <>
    <Flex>
        <LaporanPolisi />
    </Flex>
    </>
  )
}

export default AdminPolisiLaporan