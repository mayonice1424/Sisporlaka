import React,{useEffect} from 'react'
import { Flex, Text } from '@chakra-ui/react'
import Board from '../../components/board/board'
import useAuth from '../../middleware/useAuth'
import { TabTitle } from '../../Utility/utility'
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";

const AdminDinkesGrafik = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Grafik Kecelakaan"));
  }, []);
  TabTitle("Grafik - Sisporlaka");
  const role = useAuth('dinas-kesehatan')
  return (
    <>
    <Flex>
      <Text color={'red'}>Halaman role {role}</Text>
    </Flex>
    </>
  )
}

export default AdminDinkesGrafik;
