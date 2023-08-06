import {MdDashboard} from 'react-icons/md';
import {FaUsers} from 'react-icons/fa';
import {MdOutlineWork} from 'react-icons/md';
import {SiGoogleanalytics} from 'react-icons/si';
import {FaUserPlus} from 'react-icons/fa';
import {PiUserCircleGearFill} from 'react-icons/pi';

export const AdminMenu = [
    
    {
        name: "Dashboard",
        path: "/private",
        icon: <MdDashboard/>
    },
    {
        name: "Users",
        path: "/users/all",
        icon: <FaUsers/>
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
        name: "Analytics",
        path: "/work/analytics",
        icon: <SiGoogleanalytics/>
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
        path: "/work/list",
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
        name: "Profile",
        path: "/profile",
        icon: <PiUserCircleGearFill/>
    },
]