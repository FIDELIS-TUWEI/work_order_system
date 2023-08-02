import { Link } from "react-router-dom"
import { SidebarMenu } from "../Data/data"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>Holiday Inn</h6>
            </div>
            <hr style={{ marginBottom: "30px" }} />
            <div className="menu">
              {SidebarMenu.map((menu) => (
                 (
                  <div key={menu.name}>
                    <div className="menu-item">
                      <i>{menu.icon}</i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>
          <div className="content">
            <div className="header"><Navbar /></div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout