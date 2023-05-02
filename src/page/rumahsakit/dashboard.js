import React from 'react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility';
import Dashboard from '../../components/dashboard/dashboard';
import DashboardTable from '../../components/dashboard/dashboardTable';

const AdminRS = () => {
  TabTitle("Dashboard - Sisporlaka");
  const role = useAuth('rumah-sakit')
    return (
      <>
        <Dashboard />
        <DashboardTable />
      </>
    )
}
export default AdminRS