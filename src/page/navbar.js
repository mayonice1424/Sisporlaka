import { NavLink } from 'react-router-dom';
import { Box, Flex, Select, Image, Text, Wrap } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <>
    <Flex  bgColor={'white'} p={10} boxShadow={'lg'} blur={4} width={'100%'} justify={'flex-start'} alignItems={'center'} flexDir={'row'} alignContent={'center'} pl={'2%'} py={'2%'} pr={'2%'} background={'white'}> 
    <Flex float={'left'} mr={'50%'}>
        <Text color={'black'} fontWeight={'regular'} fontFamily={'var(--font-family-secondary)'} fontSize={'var(--header-1)'}>Sisporlaka</Text>
      </Flex>
      <Flex justifyContent={'space-around'} width={'100%'}>
          <Flex justifyContent={'space-between'}>
            <NavLink to="/"><h1>Home</h1></NavLink>
          </Flex>
          <Flex>
            <NavLink to="/about"><h1>About</h1></NavLink>
          </Flex>
          <Flex>
            <NavLink to="/kontak"><h1>Kontak</h1></NavLink>
          </Flex>
      </Flex>
    </Flex>
    </>
  );
}
export default Navbar;