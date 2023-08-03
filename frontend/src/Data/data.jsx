import {AiOutlineHome} from "react-icons/ai";
import {MdOutlineWork} from "react-icons/md";
import {MdPeople} from "react-icons/md";
import {TbReportAnalytics} from "react-icons/tb";
import {AiOutlineLogout} from "react-icons/ai";
import {CgProfile} from "react-icons/cg";

// Users Menu
export const SidebarMenu = [
    {
        name: "Home",
        path: "/private",
        icon: <AiOutlineHome />
    },
    {
        name: "Work",
        path: "/work/list",
        icon: <MdOutlineWork />
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <CgProfile />
    },
    {
        name: "Logout",
        path: "/logout",
        icon: <AiOutlineLogout />
    }
]

// HoD Menu
export const hodMenu = [
    {
        name: "Home",
        path: "/private",
        icon: <AiOutlineHome />
    },
    {
        name: "Work",
        path: "/work/list",
        icon: <MdOutlineWork />
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: <TbReportAnalytics />
    },
    {
        name: "Logout",
        path: "/logout",
        icon: <AiOutlineLogout />
    }
]

// Admin Menu
export const adminMenu = [
    {
        name: "Home",
        path: "/private",
        icon: <AiOutlineHome />
    },
    {
        name: "Work",
        path: "/work/list",
        icon: <MdOutlineWork />
    },
    {
        name: "Users",
        path: "/users",
        icon: <MdPeople />
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: <TbReportAnalytics />
    },
    {
        name: "Logout",
        path: "/logout",
        icon: <AiOutlineLogout />
    }
]
