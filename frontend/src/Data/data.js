import AiOutlineHome from "react-icons/ai";
import MdWork from "react-icons/md";
import MdPeople from "react-icons/md";
import TbReportAnalytics from "react-icons/tb";
import AiOutlineLogout from "react-icons/ai";

export const sidebarMenu = [
    {
        name: "Home",
        path: "/",
        icon: <AiOutlineHome />
    },
    {
        name: "Tasks",
        path: "/tasks/list",
        icon: <MdWork />
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