import React from "react";
import { Flex, Box, Center,Text } from "@chakra-ui/react";
import { FiHome } from "react-icons/fi";
import NavItem from "../navitem/navitem";
import { useSelector, useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import { Link } from "react-router-dom";
import useAuth from "../../middleware/useAuth";
import {CgFileDocument} from "react-icons/cg";
import {VscGraphLine} from "react-icons/vsc";
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
							icon={CgFileDocument}
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
							icon={VscGraphLine}
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
