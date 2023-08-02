import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">Work Order</div>
            <hr style={{ marginBottom: "30px" }} />
            <div className="menu">Menu</div>
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