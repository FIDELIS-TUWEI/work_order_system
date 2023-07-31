import { Avatar, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../utils/redux/slices/userSlice"
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


// backend url endpoint
const URL = 'http://localhost:5000/hin'

// Validation Schema 
const validationSchema = yup.object({
  name: yup
      .string("Enter name")
      .required("Name is required"),
  username: yup
      .string("Enter username")
      .required("Username is required"),
  role: yup
      .string("Enter role")
      .required("Role is required"),
  date: yup
      .string("Enter date")
      .required("Today's date is required")

});

const EditUser = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.put(`${URL}/edit/${id}`, values);
      dispatch(editUser(response.data));
      toast.success("User Updated successfully");
      actions.resetForm();
      navigate("/users/list");
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: users.name,
      username: users.username,
      role: "",
      date: ""
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit
  })

  return (
    <>
      <Navbar />
      <Box sx={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", pt: 4, mb: 3 }}>
        <Box onSubmit={formik.handleSubmit} component="form" className="form_style border_style">
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Avatar sx={{ m: 1, bgcolor: "green", mb: 3 }}>
              <BorderColorOutlinedIcon />
            </Avatar>

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="name"
              label="Name"
              name="name"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Your Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="username"
              label="Username"
              name="username"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Your Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="role"
              label="Role"
              name="role"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Enter role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.role && Boolean(formik.errors.role)}
              helperText={formik.touched.role && formik.errors.role}
            />

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="date"
              label="Date"
              name="date"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Enter today's date"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />

            <Button fullWidth variant="contained" type="submit" color="success">Edit User</Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default EditUser;