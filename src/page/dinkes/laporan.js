import React,{useEffect} from 'react'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import LaporanDinkes from '../../components/laporan/laporanDinkes';

const AdminDinkesLaporan = () => {
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(routePageName("Laporkan Kejadian"));
	}, []);
  TabTitle("Laporan - Sisporlaka");
  const role = useAuth('dinas-kesehatan')
  return (
    <>
    <div>
      <LaporanDinkes />
    </div>
    </>
  )
}

export default AdminDinkesLaporan