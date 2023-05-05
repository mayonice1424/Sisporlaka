import React,{useEffect, useState} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";

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
      <Text color={'blue'}>Halaman Role {role}  </Text>
    </Flex>
    </>
  )
}

export default AdminPolisiGrafik