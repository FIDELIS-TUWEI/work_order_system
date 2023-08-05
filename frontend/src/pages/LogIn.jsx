import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Form, Input } from 'antd';


import { useLoginMutation } from "../utils/redux/slices/usersApiSlice";
import { setCredentials } from "../utils/redux/slices/authSlice";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";

// Yup Form validation Schema
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
        <div>
            <Form onSubmit={formik.handleSubmit} layout="vertical" className="form_style border_style">

                <Input 
                    id="username"
                    label="Username"
                    name="username"
                    placeholder="Username"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />

                <Input 
                    id="password"
                    label="password"
                    name="password"
                    placeholder="Password"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                { isLoading && <LoadingBox /> }

                <Button>Log In</Button>
            </Form>
        </div>
    </>
  )
}

export default LogIn;