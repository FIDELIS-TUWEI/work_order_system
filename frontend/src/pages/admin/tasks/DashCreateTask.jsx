import { Box, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";

// Validation Schema
const validationSchema = yup.object({
  title: yup
      .string("Enter Task Title")
      .required("Task Title is required"),
  description: yup
      .string("Enter a description")
      .min(6, "Description should be a minimum of 6 characters")
      .required("Description is required"),
  location: yup
      .string("Enter a Location")
      .required("Location is required"),
  priority: yup
      .string("Enter a Priority Level")
      .required("Priority Level is required"),
  taskType: yup
      .string("Enter Category")
      .required("Task Category is Required"),
  assignedTo: yup
  .string("Enter a description")
  .required("Description is required"),
});

const DashCreateTask = () => {

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      location: "",
      priority: "",
      taskType: "",
      assignedTo: ""
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
              Register a Task
            </Typography>

            <TextField sx={{ mb: 3 }}
              fullWidth
              id="title"
              label="Title"
              name="title"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Task Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />

            <TextField sx={{ mb: 3 }}
              fullWidth
              id="description"
              label="Description"
              name="description"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />

            <TextField sx={{ mb: 3 }}
              fullWidth
              id="location"
              label="Location"
              name="location"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Task Location"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />

            <TextField sx={{ mb: 3 }}
              fullWidth
              id="priority"
              label="Priority"
              name="priority"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Priority Level: High, Medium, Low"
              value={formik.values.priority}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.priority && Boolean(formik.errors.priority)}
              helperText={formik.touched.priority && formik.errors.priority}
            />
            
            <TextField sx={{ mb: 3 }}
              fullWidth
              id="taskType"
              label="Task Type"
              name="taskType"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Category: Fix, Repair, Replace"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.taskType && Boolean(formik.errors.taskType)}
              helperText={formik.touched.taskType && formik.errors.taskType}
            />

            <TextField sx={{ mb: 3 }}
              fullWidth
              id="assignedTo"
              label="Assigned To"
              name="assignedTo"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Enter name to Assign"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
              helperText={formik.touched.assignedTo && formik.errors.assignedTo}
            />

            <Button fullWidth variant="contained" type="submit">Create Task</Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default DashCreateTask