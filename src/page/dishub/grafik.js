import React,{useEffect} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import  GrafikComponent from "../../components/grafik/grafik.js"

const AdminDishubGrafik = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Grafik Kecelakaan"));
  }, []);
  TabTitle("Grafik - Sisporlaka");
  const role = useAuth('dinas-perhubungan')

  return (
    <>
    <Flex>
      <GrafikComponent />
    </Flex>
    </>
  )
}

export default AdminDishubGrafik