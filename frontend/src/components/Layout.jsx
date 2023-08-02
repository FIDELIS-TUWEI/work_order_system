import { Link, useLocation } from "react-router-dom"
import { SidebarMenu } from "../Data/data"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h6>Holiday Inn</h6>
            <hr />
          </div>
          <div className="menu">
            {SidebarMenu.map((menu) => {
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
          <div className="header"><Navbar /></div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout