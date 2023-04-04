import { NavLink } from 'react-router-dom';
import { Box, Flex, Select, Image, Text, Wrap } from '@chakra-ui/react';
import './navbar.css'

const Navbar = () => {
  return (
    <>
    <Flex height={'15vh'} bgColor={'white'} position={'absolute'} zIndex={'1'} p={10} boxShadow={'lg'} blur={4} width={'100%'} justify={'flex-start'} alignItems={'center'} flexDir={'row'} alignContent={'center'} pl={'2%'} py={'2%'} pr={'2%'} background={'white'}> 
    <Flex float={'left'} mr={'50%'}>
        <Text color={'black'} fontWeight={'regular'} fontFamily={'var(--font-family-secondary)'} fontSize={'var(--header-1)'}>Sisporlaka</Text>
      </Flex>
      <Flex id={'navbar'} justifyContent={'space-around'} width={'100%'}>
            <NavLink to="/"><Text className='navbar active' fontWeight={'bold'} fontFamily={'var(--font-family-secondary)'}>Home</Text></NavLink>
            <NavLink to="/informasi"><Text  className='navbar'  fontWeight={'bold'} fontFamily={'var(--font-family-secondary)'}>Informasi Publik</Text></NavLink>
            <NavLink to="/kontak"><Text  className='navbar' fontWeight={'bold'} fontFamily={'var(--font-family-secondary)'}>Kontak</Text></NavLink>
      </Flex>
    </Flex>
    </>
  );
}
export default Navbar;