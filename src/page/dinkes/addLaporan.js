import React,{useEffect} from 'react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility';
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import { Flex,Text } from '@chakra-ui/react';


const AddLaporanDinkes = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Laporkan Kejadian"));
  }, []);
  TabTitle("Laporan - Sisporlaka");
  const role = useAuth('dinas-kesehatan')
    return (
      <>
       <Flex>
        <Text color={'red'}>
          INI HALAMAN add laporan
        </Text>
       </Flex>
      </>
    )
}
export default AddLaporanDinkes