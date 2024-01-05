import PropTypes from "prop-types"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AdminMenu, HodMenu, UserMenu, EngineerMenu } from "@/menu/Menu"
import { useDispatch, useSelector } from "react-redux";
import {CgProfile} from "react-icons/cg";
import {RiLogoutCircleFill} from "react-icons/ri";
import { useLogoutMutation } from "@/features/auth/authApiSlice";
import {logout, selectUserInfo} from "@/features/auth/authSlice";
import { Tooltip, message } from "antd";
import Logo from "@/assets/images/logo.png";

const Layout = ({ children }) => {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // function to handle logout
  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      message.success("Logout Succesful");
      navigate("/");
    } catch (error) {
      message.error(error.data.error);
      console.log(error);
    }
  }

  // function to handle keydown
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogout();
    }
  };

  // Rendering menu list
  //const adminMenu = userInfo?.role === "admin" || userInfo?.role === "superadmin" ? AdminMenu : userInfo?.role === "hod" || userInfo?.role === "supervisor" || userInfo?.role === "reviewer" || userInfo?.role === "engineer" ? HodMenu : UserMenu;

  // function to render menu list
  const renderMenu = () => {
    if (userInfo?.role === "admin" || userInfo?.role === "superadmin") {
      return AdminMenu;
    } else if (userInfo?.role === "hod") {
      return HodMenu;
    } else if (userInfo?.role === "engineer" || userInfo?.role === "supervisor" || userInfo?.role === "reviewer") {
      return EngineerMenu;
    } else {
      return UserMenu;
    }
  }

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <img src={Logo} alt="Holiday Inn" className="sidebar--logo" />
          </div>
          <hr />

          <div className="menu">
            {renderMenu().map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={menu.name}>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <Link to={menu.path}>
                      <Tooltip title={menu.name}>
                        <i>{menu.icon}</i>
                      </Tooltip>
                    </Link>
                  </div>
                </div>
              );
            })}
              <div className={`menu-item`} onClick={handleLogout} tabIndex={0} onKeyDown={handleKeyDown}>
                <Link to="/">
                  <Tooltip title="Logout">
                    <i><RiLogoutCircleFill/></i>
                  </Tooltip>
                </Link>
              </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-title">
              <h4>Work Order Management System</h4>
            </div>
            <div className="header-content">
              <i><CgProfile/></i>
              <Link to={`/profile/${userInfo?._id}`}>
                {userInfo?.firstName}, {userInfo?.lastName}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;