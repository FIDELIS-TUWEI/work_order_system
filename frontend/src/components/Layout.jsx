import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="content">{ children }</div>
    </>
  )
}

export default Layout