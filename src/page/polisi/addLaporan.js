import React,{useEffect} from 'react'
import useAuth from '../../middleware/useAuth';
import { TabTitle } from '../../Utility/utility';
import { useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import { Flex,Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';



const AddLaporanPolisi = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(routePageName("Laporkan Kejadian"));
  }, []);
  TabTitle("Laporan - Sisporlaka");
  const role = useAuth('polisi')
    return (
      <>
       <Flex>
        <Text color={'red'}>
          
        </Text>
       </Flex>
      </>
    )
}
export default AddLaporanPolisi