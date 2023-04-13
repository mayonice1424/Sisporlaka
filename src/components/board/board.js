import React, { useState } from 'react'
import {
    Flex,
    Image,
    Box,
    Center,
    Text,
    Icon,
    calc,
} from '@chakra-ui/react';
import Header from '../header/header'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux';
import SideNav from '../sideNav/sidenav';


const Board = () => {
    const { routeName } = useSelector(
        state => state.userReducer,
    );
    return (
        <Flex color='white' width="100%">
            <Box bg='tomato' h={'100vh'}>
                <SideNav />
            </Box>
            <Box flex='1' >
                <Header />
                <Flex
                    padding={'20px'}
                    w='100%'
                    h={'calc(100vh - 100px)'}
                    overflowY={'scroll'}
                    flexDir='column'
                >
                    <Outlet />
                </Flex>
            </Box >
        </Flex >
    )
}
export default Board