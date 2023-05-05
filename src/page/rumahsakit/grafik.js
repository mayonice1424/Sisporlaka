import React,{useEffect} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";

const AdminRSGrafik = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Grafik Kecelakaan"));
  }, []);
  TabTitle("Grafik - Sisporlaka");
  const role = useAuth('rumah-sakit')
  return (
    <>
    <Flex>
      <Text color={'red'}>Halaman Role {role} </Text>
    </Flex>
    </>
  )
}

export default AdminRSGrafik