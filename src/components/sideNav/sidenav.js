import React, { useState,useEffect } from "react";
import { Flex, Image, Box, Center,Text } from "@chakra-ui/react";
import { FiHome, FiMonitor } from "react-icons/fi";
import { GiGreenhouse } from "react-icons/gi";
import { AiOutlineControl, AiOutlineHistory } from "react-icons/ai";
import NavItem from "../navitem/navitem";
import { useSelector, useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import useAuth from "../../middleware/useAuth";
import DashboardItem from "../boardItem/dashboardItem";
const SideNav = () => {
	const navSize = "large";

	const dispatch = useDispatch();

	const patchRoute = (data) => {
		dispatch(routePageName(data));
	};
	const { routeName } = useSelector((state) => state.userReducer);
	const role = useAuth()
	return (
		<>
			<Flex
				backgroundColor={"white"}
				display={{
					base: "none",
					lg: "flex",
				}}
				pos="sticky"
				h="100vh"
				boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
				w={"370px"}
				flexDir="column"
				justifyContent="space-between">
				<Flex
					flexDir="column"
					w="100%"
					as="nav"
					className="navbar">
					<Box paddingRight="5%">
						<Center>
							<Flex mt={'8'} textAlign={'center'} justifyContent={'center'} alignContent={"center"} flexDir={'column'}>
								<Text fontSize={'var(--header-1)'} fontWeight={'regular'} fontFamily={'var(--font-family-secondary)'} color={'#000000'}>Sisporlaka</Text>
								<Text fontFamily={'var(--font-family-tertiary)'} color={'#000000'}> Sistem Informasi Pelaporan Kecelakaan </Text>
							</Flex>
						</Center>
					</Box>
					<Link 
						to={`/unit/${role}`}
						onClick={() => {
							patchRoute("Dashboard");
						}}>
						<NavItem
							navSize={navSize}
							icon={FiHome}
							title="Dashboard"
							active={routeName === "Dashboard"}
						/>
					</Link>
					<DashboardItem role={role} navSize={navSize} />
					<Link 
						to={`/unit/${role}/laporan`}
						onClick={() => {
							patchRoute("Laporkan Kejadian");
						}}>
						<NavItem
							navSize={navSize}
							icon={FiHome}
							title="Laporkan Kejadian"
							active={routeName === "Laporkan Kejadian"}
						/>
					</Link>
					<Link 
						to={`/unit/${role}/grafik`}
						onClick={() => {
							patchRoute("Grafik Kecelakaan");
						}}>
						<NavItem
							navSize={navSize}
							icon={FiHome}
							title="Grafik Kecelakaan"
							active={routeName === "Grafik Kecelakaan"}
						/>
					</Link>
				</Flex>
			</Flex>
		</>
	);
};
export default SideNav;
