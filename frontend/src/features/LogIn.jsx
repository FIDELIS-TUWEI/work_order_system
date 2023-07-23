import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Avatar, Box, Button, TextField } from "@mui/material";
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';


import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { userSignInAction } from "../utils/redux/actions/userAction";

// Yup form validation Schema
const validationSchema = yup.object({
    username: yup
        .string("Enter your Username")
        .matches(/^[a-zA-Z0-9_]+$/, "Enter a valid username")
        .required("Username is required"),

    password: yup
        .string("Enter your password")
        .min(8, "Password should be of minimum 8 characters length")
        .required("Password is required")
});

const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(state => state.signIn);

    // useEffect hook
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated]);

    // formik
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values, actions) => {
            //alert(JSON.stringify(values, null, 2))
            dispatch(userSignInAction(values));
            actions.resetForm();
        }
    })
  return (
    <>
        <Navbar />
        <Box sx={{ height: "81vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box onSubmit={formik.handleSubmit} component="form" className="form_style border_style">
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
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