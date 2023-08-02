import { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Avatar, Box, Button, TextField  } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from "axios";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LoadingBox from "../../components/LoadingBox";
import { useRegisterMutation } from "../../utils/redux/slices/usersApiSlice";
import { setCredentials } from "../../utils/redux/slices/authSlice";
import { validationSchemaUsers } from "../../utils/formik/validationSchema";


// backend url endpoint
const URL = 'http://localhost:5000/hin'


const CreateUsers = () => {
  const { userInfo } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  // check if user is logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/dashboard');
    }
  }, [userInfo, navigate]);

  const onSubmit = async (values, actions) => {
    try {
      const res = await register(values).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("User Registered successfully");
      actions.resetForm();
      navigate('/users/list');
    } catch (error) {
      toast.error(error.data.error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      date: ""
    },
    validateOnBlur: true,
    validationSchema: validationSchemaUsers,
    onSubmit
  });

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 4,
          mb: 3
        }}
      >
        <Box
          onSubmit={formik.handleSubmit}
          component="form"
          className="form_style border_style"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%"
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "primary.main", mb: 3 }}
            >
              <LockOutlinedIcon />
            </Avatar>

            {[
              {
                id: "name",
                label: "Name",
                name: "name",
                placeholder: "Enter Full Name"
              },
              {
                id: "username",
                label: "Username",
                name: "username",
                placeholder: "Enter a Username"
              },
              {
                id: "password",
                label: "Password",
                name: "password",
                placeholder: "Enter Password"
              },
              {
                id: "date",
                label: "Date",
                name: "date",
                placeholder: "Enter today's date"
              }
            ].map((input) => (
              <TextField
                key={input.id}
                sx={{ mb: 3 }}
                fullWidth
                id={input.id}
                label={input.label}
                name={input.name}
                InputLabelProps={{
                  shrink: true
                }}
                placeholder={input.placeholder}
                value={formik.values[input.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[input.name] && Boolean(formik.errors[input.name])}
                helperText={formik.touched[input.name] && formik.errors[input.name]}
              />
            ))}

            { isLoading && <LoadingBox /> }

            <Button fullWidth variant="contained" type="submit">
              Register User
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default CreateUsers;