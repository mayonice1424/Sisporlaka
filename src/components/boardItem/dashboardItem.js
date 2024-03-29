import React from "react";
import { Link } from "react-router-dom";
import NavItem from "../navitem/navitem";
import { useSelector, useDispatch } from "react-redux";
import { routePageName } from "../../Redux/action";
import {MdOutlineFactCheck} from "react-icons/md";

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
							icon={MdOutlineFactCheck}
							title="Validasi Laporan"
							active={routeName === "Validasi Laporan"}
						/>
      </Link>
      default: return null
  }
} 

export default DashboardItem