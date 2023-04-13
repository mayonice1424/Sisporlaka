import React, { useState,useEffect } from "react";
import {
	Drawer,
	Image,
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
import jwt_decode from "jwt-decode";

const Draw = (props) => {
	const data = props.data;
	const navSize = "large";

	const { routeName } = useSelector((state) => state.userReducer);

	const dispatch = useDispatch();

	const [role, setRole] = useState("");
	const [token, setToken] = useState("");

	
	const refreshToken = async () => {
		try {
			const response = await axios.get("http://localhost:4000/token");
			setToken (response.data.accessToken);
			const decoded = jwt_decode(response.data.accessToken);
			console.log(decoded);
			setRole(decoded.role);
			console.log(role);
		} catch (error) {
			
		}
	};
	
	useEffect(() => {
		refreshToken();
	}, []);

	const patchRoute = (data) => {
		dispatch(routePageName(data));
	};

	return (
		<Drawer placement={"left"} onClose={data.onclose} isOpen={data.isopen}>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerHeader borderBottomWidth="1px">
					<Image
						display={{ base: "flex", lg: "none" }}
						position={"Relative"}
						width={"80%"}
						maxWidth={"200px"}
						src="https://res.cloudinary.com/diyu8lkwy/image/upload/v1663418492/itera%20herro%20icon/Frame_3_2_3_1_hfojfh.png"
					/>
				</DrawerHeader>
				<DrawerBody>
					<Link
						to={`/unit/dashboard/${role}`}
						onClick={() => {
							patchRoute("Dashboard");
						}}>
						<NavItem
							navSize={navSize}
							icon={FiHome}
							title="Dashboard"
							active={routeName === "Dashboard"}
						/>
											<Link
						to={`/unit/dashboard/${role}`}
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
					</Link>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};
export default Draw;
