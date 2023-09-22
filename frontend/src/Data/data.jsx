import {MdDashboard, MdOutlineWork, MdAdminPanelSettings} from 'react-icons/md';
import {FaUsers, FaUserPlus} from 'react-icons/fa';
import {SiGoogleanalytics} from 'react-icons/si';
import {PiUserCircleGearFill} from 'react-icons/pi';
import {TbReport} from 'react-icons/tb';
import {BiSolidCategory} from "react-icons/bi";
import {IoLocation} from "react-icons/io5";

export const AdminMenu = [
    
    {
        name: "Dashboard",
        path: "/private",
        icon: <MdDashboard/>
    },
    {
        name: "Admin Panel",
        path: "/admin/panel",
        icon: <MdAdminPanelSettings/>
    },
    {
        name: "Register",
        path: "/users/register",
        icon: <FaUserPlus/>
    },
    {
        name: "Work Order",
        path: "/work/list",
        icon: <MdOutlineWork/>
    },
    {
        name: "Categories",
        path: "/all-categories",
        icon: <BiSolidCategory />
    },
    {
        name: "Locations",
        path: "/all-locations",
        icon: <IoLocation />
    },
    {
        name: "Analytics",
        path: "/work/analytics",
        icon: <SiGoogleanalytics/>
    },
    {
        name: "Reports",
        path: "/work/reports",
        icon: <TbReport />
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <PiUserCircleGearFill/>
    },
]

export const UserMenu = [
    
    {
        name: "Dashboard",
        path: "/private",
        icon: <MdDashboard/>
    },
    {
        name: "Work Order",
        path: "/new/work",
        icon: <MdOutlineWork/>
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <PiUserCircleGearFill/>
    },
]

export const HodMenu = [
    
    {
        name: "Dashboard",
        path: "/private",
        icon: <MdDashboard/>
    },
    {
        name: "Work Order",
        path: "/work/list",
        icon: <MdOutlineWork/>
    },
    {
        name: "Analytics",
        path: "/work/analytics",
        icon: <SiGoogleanalytics/>
    },
    {
        name: "Reports",
        path: "/work/reports",
        icon: <TbReport />
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <PiUserCircleGearFill/>
    },
]