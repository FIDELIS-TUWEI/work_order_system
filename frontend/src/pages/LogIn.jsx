import { Avatar, Box, Button, TextField } from "@mui/material"
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

                    <TextField 
                        sx={{ mb: 3 }}
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Username"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.username && Boolean(formik.errors.username)}
                        helperText={formik.touched.username && formik.errors.username}
                    />

                    <TextField 
                        sx={{ mb: 3 }}
                        fullWidth
                        id="password"
                        label="password"
                        name="password"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        placeholder="Password"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />

                    <Button fullWidth variant="contained" type="submit">Log In</Button>
                </Box>
            </Box>
        </Box>
        <Footer />
    </>
  )
}

export default LogIn;