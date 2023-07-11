import { Menu, MenuItem, Sidebar, menuClasses, useProSidebar } from "react-pro-sidebar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Box,  useTheme } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";
import Person3Icon from "@mui/icons-material/Person3";
import Avatar from "@mui/material/Avatar";
import logoDashboard from "../../assets/progress.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAction } from "../../utils/redux/actions/userAction";
import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";


const SidebarAdmin = ({children}) => {
  const { userInfo } = useSelector(state => state.signIn);
  const { palette } = useTheme();
  const { collapsed } = useProSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //useEffect(() => {
  //  dispatch(userProfileAction());
  //}, []);

  // Function to Log Out User
  const logOut = () => {
    dispatch(userLogoutAction());
    window.location.reload(true);
    setTimeout(() => {
      navigate("/");
    }, 500)
  }

  return (
    <>
    {children}
      <Sidebar backgroundColor="#003366" style={{ borderRightStyle: "none" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "column", height: "100%" }}>
          <Box>
            <Box sx={{ pt: 3, pb: 5, display: "flex", justifyContent: "center" }}>
              {
                collapsed ?
                  <Avatar alt="Logo Dashboard" src={logoDashboard} /> :
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <img style={{ width: "100px", height: "100px", textAlign: "center", transition: "all ease-out .5s" }} src={logoDashboard} alt="Logo Dashboard" />
                  </Box>
              }
            </Box>

            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#fafafa",
                  },
                  [`&.${menuClasses.disabled}`]: {
                    color: "green",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(23, 105, 170, 1)",
                    color: "#fafafa",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    // color: "blue",
                    color: palette.primary.main,
                  }
                },
              }}

            >
              {
                userInfo && userInfo.role === 1 ?
                <>
                  <MenuItem component={<Link to="/admin/dashboard" />} icon={<DashboardIcon />}> Dashboard </MenuItem>
                  <MenuItem component={<Link to="/admin/users" />} icon={<GroupAddIcon />}> Users </MenuItem>
                  <MenuItem component={<Link to="/admin/tasks" />} icon={<WorkIcon />}> Tasks </MenuItem>
                  <MenuItem component={<Link to="/admin/category" />} icon={<CategoryIcon />}> Category </MenuItem>
                </> :
                <>
                  <MenuItem component={<Link to="/user/dashboard" />} icon={<DashboardIcon />}> Dashboard </MenuItem>
                  <MenuItem component={<Link to="/user/tasks" />} icon={<WorkHistoryIcon />}> Assigned Tasks </MenuItem>
                  <MenuItem component={<Link to="/user/info" />} icon={<Person3Icon />}> Profile </MenuItem>
                </>
              }

            </Menu>
          </Box>

          <Box sx={{ pb: 2 }}>
            <Menu
              menuItemStyles={{
                button: {
                  [`&.${menuClasses.button}`]: {
                    color: "#fafafa",
                  },

                  "&:hover": {
                    backgroundColor: "rgba(23, 105, 170, 1)",
                    color: "#fafafa",
                  },
                },

                icon: {
                  [`&.${menuClasses.icon}`]: {
                    // color: "blue",
                    color: palette.primary.main,
                  }
                },
              }}

            >
              <MenuItem onClick={logOut} icon={<LoginIcon />}> Log Out </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Sidebar>
    </>
  )
}

export default SidebarAdmin