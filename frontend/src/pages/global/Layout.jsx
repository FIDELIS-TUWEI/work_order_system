import { Box } from "@mui/material";
import SidebarAdmin from "./Sidebar";
import HeaderTop from "./HeaderTop";


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