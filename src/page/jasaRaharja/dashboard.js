import React,{useEffect} from 'react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility';
import Dashboard from '../../components/dashboard/dashboard';
import DashboardTable from '../../components/dashboard/dashboardTable';
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";


const AdminJasaRaharja = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Dashboard"));
  }, []);
  TabTitle("Dashboard - Sisporlaka");
  const role = useAuth('jasa-raharja')
    return (
      <>
        <Dashboard />
        <DashboardTable />
      </>
    )
}
export default AdminJasaRaharja