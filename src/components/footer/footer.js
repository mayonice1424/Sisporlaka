import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      height={'8vh'}
      minHeight={'8vh'}
      bgColor={'white'}
      position={'fixed'} /* Ubah menjadi 'fixed' */
      bottom={0} /* Tambahkan bottom: 0 */
      zIndex={'1'} /* Ubah zIndex menjadi 1 atau angka yang lebih besar dari konten utama */
      p={10}
      boxShadow={'lg'}
      width={'100vw'}
      maxWidth={'100vw'}
      justify={'space-between'}
      flexDir={'row'}
      alignContent={'center'}
      pl={'2%'}
      py={'2%'}
      textAlign={'center'} 
      align={'center'}
      alignSelf={'center'}
      alignItems={'center'}
      pr={'2%'}
      display={{ base: "block", md: "block" }}
    >
      <Text >&copy; Sisporlaka 2023. All rights reserved.</Text>
    </Flex>
  );
}

export default Footer;