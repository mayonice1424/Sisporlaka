import React,{useEffect} from 'react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility';
import Dashboard from '../../components/dashboard/dashboard';
import DashboardTable from '../../components/dashboard/dashboardTable';
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import Footer from '../../components/footer/footer';

const AdminPolisi = () => {
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(routePageName("Dashboard"));
	}, []);
  TabTitle("Dashboard - Sisporlaka");
  const role = useAuth('polisi')
    return (
      <>
        <Dashboard />
        <DashboardTable />
      </>
    )
}
export default AdminPolisi