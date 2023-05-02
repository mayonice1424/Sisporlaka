import React from 'react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility';
import Dashboard from '../../components/dashboard/dashboard';
import DashboardTable from '../../components/dashboard/dashboardTable';

const AdminPolisi = () => {
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