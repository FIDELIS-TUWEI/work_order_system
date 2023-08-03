import {FaHome} from 'react-icons/fa';
import {MdDashboard} from 'react-icons/md';
import {FaUsers} from 'react-icons/fa';
import {MdOutlineWork} from 'react-icons/md';
import {TbBrandGoogleAnalytics} from 'react-icons/tb';
import {CgProfile} from 'react-icons/cg';
import { RiLogoutCircleFill } from 'react-icons/ri';

export const AdminMenu = [
    {
        name: "Home",
        path: "/",
        icon: <FaHome/>
    },
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
        icon: <TbBrandGoogleAnalytics/>
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <CgProfile/>
    },
    {
        name: "Logout",
        icon: <RiLogoutCircleFill/>
    },
]