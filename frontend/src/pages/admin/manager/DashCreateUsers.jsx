import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// Validation Schema 
const validationSchema = yup.object({
  name: yup
      .string("Enter Fullname")
      .required("Fullname is required"),
  username: yup
      .string("Enter a username")
      .required("Username is required"),
  password: yup
      .string("Enter you password")
      .min(8, "Password should be of minimum 8 characters long")
      .required("Password is required")

})

const DashCreateUsers = () => {

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch((values))
      actions.resetForm()
    }
  })

  return (
    <>
    <Navbar />
      <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", pt: 4, mb: 3 }}>
        <Box component="form" className="form_style border_style">
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
            <Typography variant="h5" component="h2" sx={{ pb:2 }}>
              Register a User
            </Typography>

            <TextField sx={{ mb: 3 }}
              fullWidth
              id="name"
              label="Name"
              name="name"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Enter Full Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField sx={{ mb: 3 }}
              fullWidth
              id="username"
              label="Username"
              name="username"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Enter a Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
            />

            <TextField sx={{ mb: 3 }}
              fullWidth
              id="password"
              label="Password"
              name="password"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Enter Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button fullWidth variant="contained" type="submit">Register User</Button>
          </Box>
        </Box>
      </Box>
    <Footer />
    </>
  )
}

export default DashCreateUsers;