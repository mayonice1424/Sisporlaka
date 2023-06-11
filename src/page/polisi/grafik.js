import React,{useEffect, useState} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import GrafikComponent from '../../components/grafik/grafik';

const AdminPolisiGrafik = () => {
  TabTitle("Grafik - Sisporlaka");
  const dispatch = useDispatch();
  useEffect(() => {
		dispatch(routePageName("Grafik Kecelakaan"));
	}, []);
 const role = useAuth('polisi')
  return (
    <>
    <Flex>
      <GrafikComponent />
    </Flex>
    </>
  )
}

export default AdminPolisiGrafik