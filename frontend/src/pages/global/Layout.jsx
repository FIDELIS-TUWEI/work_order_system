import { Box } from "@mui/material";
import HeaderTop from "./HeaderTop";
import SidebarAdmin from "./Sidebar";


const Layout = () => {

  return (
    <>
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <SidebarAdmin />
            <Box sx={{ width: "100%", bgColor: "#002952" }}>
                <HeaderTop />
                <Box sx={{ p: 3 }}>
                </Box>
            </Box>
        </div>
    </>
  )
};

export default Layout