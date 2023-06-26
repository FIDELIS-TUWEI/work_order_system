import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
//import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlinedIcon from "@mui/icons-material/PieChartOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import profileImage from "../../assets/avatar.png";


const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode)
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}


const SideBar = () => {
  // state hook
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important"
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          //color: "inherit !important"
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important"
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important"
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* USER IMAGE */}    
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img 
                  alt="user-profile" 
                  width="100px" 
                  height="100px" 
                  src={profileImage}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" 
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  HOLIDAY INN
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Maintenace Work Order
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item 
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setselected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Users
            </Typography>
            <Item 
              title="Manage Users"
              to="/users"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setselected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Tasks
            </Typography>
            <Item 
              title="Manage Tasks"
              to="/tasks"
              icon={<TaskOutlinedIcon />}
              selected={selected}
              setselected={setSelected}
            />

            <Item 
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setselected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Register
            </Typography>
            <Item 
              title="Register User"
              to="/register"
              icon={<AppRegistrationOutlinedIcon />}
              selected={selected}
              setselected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Login
            </Typography>
            <Item 
              title="Login"
              to="/login"
              icon={<LoginOutlinedIcon />}
              selected={selected}
              setselected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Reports
            </Typography>
            <Item 
              title="Tasks Overview"
              to="/reports"
              icon={<SummarizeOutlinedIcon />}
              selected={selected}
              setselected={setSelected}
            />

            <Typography variant="h6" color={colors.grey[300]} sx={{ m: "15px 0 5px 20px" }}>
              Stats
            </Typography>
            <Item 
              title="Bar Chart"
              to="/bar"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setselected={setSelected}
            />
            <Item 
              title="Pie Chart"
              to="/pie"
              icon={<PieChartOutlinedIcon />}
              selected={selected}
              setselected={setSelected}
            />
            <Item 
              title="Line Chart"
              to="/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setselected={setSelected}
            />
          </Box>
        </Menu>
      </Sidebar>

    </Box>
  )
}

export default SideBar;