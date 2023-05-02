import React from 'react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility';
import Dashboard from '../../components/dashboard/dashboard';
import DashboardTable from '../../components/dashboard/dashboardTable';

const AdminDinkes = () => {
  TabTitle("Dashboard - Sisporlaka");
  const role = useAuth('dinas-kesehatan')
    return (
      <>
        <Dashboard />
        <DashboardTable />
      </>
    )
}
export default AdminDinkes