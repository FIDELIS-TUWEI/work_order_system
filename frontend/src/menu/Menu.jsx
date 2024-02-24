import { MdOutlineWork, MdAdminPanelSettings, MdGroups } from 'react-icons/md';
import { FaChartLine, FaFilePdf, FaUserPlus } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';

export const AdminMenu = [
    
    {
        name: "Dashboard",
        path: "/private",
        icon: <AiFillDashboard />
    },
    {
        name: "Admin Panel",
        path: "/admin/panel",
        icon: <MdAdminPanelSettings />
    },
    {
        name: "Register",
        path: "/users/register",
        icon: <FaUserPlus />
    },
    {
        name: "Work Order",
        path: "/work/list",
        icon: <MdOutlineWork />
    },
    {
        name: "Analytics",
        path: "/work/analytics",
        icon: <FaChartLine />
    },
    {
        name: "Reports",
        path: "/work/reports",
        icon: <FaFilePdf  />
    }
];

export const EngineerMenu = [
    {
        name: "Dashboard",
        path: "/private",
        icon: <AiFillDashboard />
    },
    {
        name: "Work Order",
        path: "/work/list",
        icon: <MdOutlineWork />
    },
    {
        name: "Employees",
        path: "/all/employees",
        icon: <MdGroups />
    },
    {
        name: "Analytics",
        path: "/work/analytics",
        icon: <FaChartLine />
    },
    {
        name: "Reports",
        path: "/work/reports",
        icon: <FaFilePdf />
    }
];

export const UserMenu = [
    
    {
        name: "Dashboard",
        path: "/private",
        icon: <AiFillDashboard />
    },
    {
        name: "Work Order",
        path: "/new/work",
        icon: <MdOutlineWork />
    },

];

export const HodMenu = [
    
    {
        name: "Dashboard",
        path: "/private",
        icon: <AiFillDashboard />
    },
    {
        name: "Work Order",
        path: "/work/list",
        icon: <MdOutlineWork />
    },
    {
        name: "Analytics",
        path: "/work/analytics",
        icon: <FaChartLine />
    },
    {
        name: "Reports",
        path: "/work/reports",
        icon: <FaFilePdf />
    }
];