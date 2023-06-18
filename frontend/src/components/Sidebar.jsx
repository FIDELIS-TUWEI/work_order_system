import {
    Box, Divider, Drawer,
    IconButton, List, ListItem,
    ListItemButton, ListItemIcon,
    ListItemText, Typography, useTheme
} from "@mui/material";
import {
    SettingsOutlined, ChevronLeft,
    ChevronRightOutlined, HomeOutlined,
    ShoppingCartOutlined, Groups2Outlined,
    ReceiptLongOutlined, PublicOutlined,
    TodayOutlined, CalendarMonthOutlined,
    AdminPanelSettingsOutlined, TrendingUpOutlined, PieChartOutlined
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";

const Sidebar = ({
    isNonMobile,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
}) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1));
    }, [pathname]);

  return <Box component="nav">
    {isSidebarOpen && (
        <Drawer
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
                width: drawerWidth,
                "& .MuiDrawer-paper": {
                    color: theme.palette.secondary[200],
                    backgroundColor: theme.palette.background.alt,
                    boxSizing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth
                }
            }}
        ></Drawer>
    )}
  </Box>
}

export default Sidebar