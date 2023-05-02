import React from 'react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility';
import Dashboard from '../../components/dashboard/dashboard';
import DashboardTable from '../../components/dashboard/dashboardTable';

const AdminJasaRaharja = () => {
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