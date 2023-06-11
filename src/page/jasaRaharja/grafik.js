import React,{useState,useEffect} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import GrafikComponent from '../../components/grafik/grafik';

const AdminJasaRaharjaGrafik = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Grafik Kecelakaan"));
  }, []);
  TabTitle("Grafik - Sisporlaka");
  const role = useAuth('jasa-raharja')
  return (
    <>
    <Flex>
       <GrafikComponent />
    </Flex>
    </>
  )
}

export default AdminJasaRaharjaGrafik