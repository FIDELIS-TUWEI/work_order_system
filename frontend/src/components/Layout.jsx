import { Link, useLocation } from "react-router-dom"
import { AdminMenu, HodMenu, UserMenu } from "../Data/data"
import { useSelector } from "react-redux";
import { useUserDataMutation } from "../utils/redux/slices/usersApiSlice";

const Layout = ({ children }) => {
  const { userInfo } = useSelector(state => state.auth);
  const location = useLocation();


  // Rendering menu list
  const adminMenu = userInfo?.role === "admin" ? AdminMenu : userInfo?.role === "hod" ? HodMenu : UserMenu;
   
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
          </div>
        </div>
        <div className="content">
          <div className="header">
            
            { userInfo ? (
              <h1>{userInfo.name}</h1>
            ): (
              <h4>Login</h4>
            )}
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout