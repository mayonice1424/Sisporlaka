import React, { useState,useEffect } from "react";
import {
	Drawer,
	Flex,
	Box,
	Center,
	Text,
	DrawerBody,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import NavItem from "../navitem/navitem";
import { FiHome, FiMonitor } from "react-icons/fi";
import { GiGreenhouse } from "react-icons/gi";
import { AiOutlineControl, AiOutlineHistory } from "react-icons/ai";
import { routePageName } from "../../Redux/action";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../middleware/useAuth";
import jwt_decode from "jwt-decode";
import DashboardItem from "../boardItem/dashboardItem";
import {CgFileDocument} from "react-icons/cg";

const Draw = (props) => {
	const data = props.data;
	const navSize = "large";

	const { routeName } = useSelector((state) => state.userReducer);

	const dispatch = useDispatch();

	const role = useAuth();
	const [token, setToken] = useState("");

	
	useEffect(() => {
		
	}, []);

	const patchRoute = (data) => {
		dispatch(routePageName(data));
	};

	return (
		<Drawer placement={"left"} onClose={data.onclose} isOpen={data.isopen}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader borderBottomWidth="1px">
				<Box paddingRight="5%">
						<Center>
							<Flex mt={'8'} textAlign={'center'} justifyContent={'center'} alignContent={"center"} flexDir={'column'}>
								<Text fontSize={'var(--header-2)'} fontWeight={'light'} fontFamily={'var(--font-family-secondary)'} color={'#000000'}>Sisporlaka</Text>
								<Text fontSize={'var(--header-5)'} fontWeight={'light'} fontFamily={'var(--font-family-tertiary)'} color={'#000000'}> Sistem Informasi Pelaporan Kecelakaan </Text>
							</Flex>
						</Center>
					</Box>
				</DrawerHeader>
				<DrawerBody>
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
							icon={FiHome}
							title="Grafik Kecelakaan"
							active={routeName === "Grafik Kecelakaan"}
						/>
					</Link>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
export default Draw;
