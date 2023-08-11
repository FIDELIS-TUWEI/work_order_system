import { Link, useLocation, useNavigate } from "react-router-dom"
import { AdminMenu, HodMenu, UserMenu } from "../Data/data"
import { useDispatch, useSelector } from "react-redux";
import {CgProfile} from "react-icons/cg";
import {RiLogoutCircleFill} from "react-icons/ri";
import { useLogoutMutation } from "../utils/redux/slices/authApiSlice";
import {logout, selectUserInfo} from "../utils/redux/slices/authSlice";
import { message } from "antd";

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

  // Rendering menu list
  const adminMenu = userInfo?.role === "admin" || userInfo?.role === "superadmin" ? AdminMenu : userInfo?.role === "hod" || userInfo?.role === "supervisor" ? HodMenu : UserMenu;

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>Holiday Inn</h6>
            <hr />
          </div>
          <div className="menu">
            {adminMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div key={menu.name}>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <i>{menu.icon}</i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                </div>
              );
            })}
            <div className={`menu-item`} onClick={handleLogout}>
                    <i><RiLogoutCircleFill/></i>
                    <Link to="/login">Logout</Link>
                  </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
              <i><CgProfile/></i>
              <Link to="/profile">{userInfo?.firstName}, {userInfo?.lastName}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout