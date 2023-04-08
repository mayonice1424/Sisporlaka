import { NavLink } from 'react-router-dom';
import { Box, Flex, Select, Image, Text, Wrap, Drawer,
  DrawerBody,
  Icon,
  Button,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks'
import { Link } from 'react-router-dom';
import { React, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';



import './navbar.css'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const btnRef = React.useRef()
  const [navSize, setNavSize] = useState("large");
  const [active, setActive] = useState("Home");
  return (
    <>
    <Flex height={'15vh'} bgColor={'white'} position={'absolute'} zIndex={'1'} p={10} boxShadow={'lg'} blur={4} width={'100%'} justify={'space-between'} alignItems={'center'} flexDir={'row'} alignContent={'center'} pl={'2%'} py={'2%'} pr={'2%'} background={'white'} display={{ base: "flex", md: "flex" }}  >
    <Flex float={'left'} mr={'50%'}>
        <Text color={'black'} fontWeight={'regular'} fontFamily={'var(--font-family-secondary)'} fontSize={'var(--header-1)'}>Sisporlaka</Text>
    </Flex>
    <Flex float={'right'} ml={30} mr={10} display={{ base: "flex", md: "flex" }} >
    <Button onClick={onOpen}>
      <Icon>
        <GiHamburgerMenu  size={'30'}/>
      </Icon>
    </Button>
    </Flex>
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Menu
          </DrawerHeader>
          <DrawerBody>
            <Flex flexDir="column" w="100%"  alignContent={"center"} justifyContent={"center"} alignItems={"center"}>
              <Flex marginY = {5}>
                <NavLink to="/"><Text className='navbar active' fontWeight={'bold'} color= {{ textDecor: "#FFFF", color: "#FBFBFB"}} w={navSize == "large" && "100%"} fontFamily={'var(--font-family-secondary)'}>Home</Text></NavLink>
              </Flex>
              <Flex marginY = {5}>
                <NavLink to="/informasi"><Text  className='navbar'  fontWeight={'bold'} fontFamily={'var(--font-family-secondary)'}>Informasi Publik</Text></NavLink>
              </Flex>
              <Flex marginY = {5}>
                <NavLink to="/kontak"><Text  className='navbar' fontWeight={'bold'} fontFamily={'var(--font-family-secondary)'}>Kontak</Text></NavLink>
              </Flex>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
    </Flex>
    <Flex  display={{ base: "none", md: "none", lg:'flex' }} height={'15vh'} bgColor={'white'} position={'absolute'} zIndex={'1'} p={10} boxShadow={'lg'} blur={4} width={'100%'} justify={'flex-start'} alignItems={'center'} flexDir={'row'} alignContent={'center'} pl={'2%'} py={'2%'} pr={'2%'} background={'white'}> 
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