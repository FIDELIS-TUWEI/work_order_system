import {AiOutlineHome} from "react-icons/ai";
import {MdOutlineWork} from "react-icons/md";
import {MdPeople} from "react-icons/md";
import {TbReportAnalytics} from "react-icons/tb";
import {AiOutlineLogout} from "react-icons/ai";

export const SidebarMenu = [
    {
        name: "Home",
        path: "/",
        icon: <AiOutlineHome />
    },
    {
        name: "Tasks",
        path: "/tasks/list",
        icon: <MdOutlineWork />
    },
    {
        name: "Users",
        path: "/users/list",
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