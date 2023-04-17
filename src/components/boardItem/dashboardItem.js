import React from "react";
import { Link } from "react-router-dom";
import { FiHome, FiMonitor } from "react-icons/fi";
import NavItem from "../navitem/navitem";
import { useSelector, useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";

const DashboardItem = ({role, navSize}) => {
  const { routeName } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

	const patchRoute = (data) => {
		dispatch(routePageName(data));
	};
  switch (role){
    case 'dinas-perhubungan' :
      return <Link
      to={`/unit/${role}/validasi-laporan`}
						onClick={() => {
							patchRoute("Validasi Laporan");
						}}>
						<NavItem
							navSize={navSize}
							icon={FiHome}
							title="Validasi"
							active={routeName === "Validasi Laporan"}
						/>
      </Link>
      default: return null
  }
} 

export default DashboardItem