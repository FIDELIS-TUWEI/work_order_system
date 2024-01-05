import {MdDashboard, MdOutlineWork, MdAdminPanelSettings, MdGroups} from 'react-icons/md';
import { FaUserPlus} from 'react-icons/fa';
import {SiGoogleanalytics} from 'react-icons/si';
import {TbReport} from 'react-icons/tb';

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
        name: "Analytics",
        path: "/work/analytics",
        icon: <SiGoogleanalytics/>
    },
    {
        name: "Reports",
        path: "/work/reports",
        icon: <TbReport />
    }
];

export const EngineerMenu = [
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
        name: "Employees",
        path: "/all/employees",
        icon: <MdGroups/>
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
    }
];

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

];

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
    }
];