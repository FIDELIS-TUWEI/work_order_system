import { Box } from "@mui/material";
import HeaderTop from "./HeaderTop";
import SidebarAdmin from "./Sidebar";


const Layout = (Component) => ({ ...props }) => {

  return (
    <>
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <SidebarAdmin />
            <Box sx={{ width: "100%", bgColor: "#002952" }}>
                <HeaderTop />
                <Box sx={{ p: 3 }}>
                    <Component {...props} />
                </Box>
            </Box>
        </div>
    </>
  )
};

export default Layout