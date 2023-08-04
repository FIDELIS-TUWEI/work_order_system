import {MdDashboard} from 'react-icons/md';
import {FaUsers} from 'react-icons/fa';
import {MdOutlineWork} from 'react-icons/md';
import {SiGoogleanalytics} from 'react-icons/si';
import {FaUser} from 'react-icons/fa';
import { RiLogoutCircleFill } from 'react-icons/ri';

export const AdminMenu = [
    
    {
        name: "Dashboard",
        path: "/private",
        icon: <MdDashboard/>
    },
    {
        name: "Users",
        path: "/users/list",
        icon: <FaUsers/>
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
        icon: <FaUser/>
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
        icon: <FaUser/>
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
        icon: <FaUser/>
    },
]