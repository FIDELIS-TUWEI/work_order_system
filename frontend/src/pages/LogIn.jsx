import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Avatar, Box, Button, TextField } from "@mui/material";
import LockClockOutlined from '@mui/icons-material/LockClockOutlined';


import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useLoginMutation } from "../utils/redux/slices/usersApiSlice";
import { setCredentials } from "../utils/redux/slices/authSlice";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";

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

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector(state => state.auth);

    // useEffect to check if user is logged in
    useEffect(() => {
        if (userInfo) {
            navigate('/private');
        }
    }, [userInfo, navigate]);

    const onSubmit = async (values, actions) => {
        try {
            const res = await login(values).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Login Succesful");
            actions.resetForm();
            navigate('/private');
        } catch (error) {
            toast.error(error.data.error);
        }
    }


    // formik
    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit
    })
  return (
    <>
        <Navbar />
        <Box sx={{ height: "81vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box onSubmit={formik.handleSubmit} component="form" className="form_style border_style">
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                    <Avatar sx={{ m: 1, bgcolor: "green", mb: 3 }}>
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
                    { isLoading && <LoadingBox /> }

                    <Button fullWidth variant="contained" type="submit" color="success">Log In</Button>
                </Box>
            </Box>
        </Box>
        <Footer />
    </>
  )
}

export default LogIn;