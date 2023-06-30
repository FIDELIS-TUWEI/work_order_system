import { Avatar, Box } from "@mui/material"
import LockClockOutlined from '@mui/icons-material/LockClockOutlined'
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useFormik } from "formik"

const LogIn = () => {
  return (
    <>
        <Navbar />
        <Box sx={{ height: "81vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box onSubmit={formik.handleSubmit} component="form" className="form_style border_style">
                <Box sx={{ display: "flex", flexDirection: column, alignItems: "center", width: "100%" }}>
                    <Avatar sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}>
                        <LockClockOutlined />
                    </Avatar>
                </Box>
            </Box>
        </Box>
        <Footer />
    </>
  )
}

export default LogIn