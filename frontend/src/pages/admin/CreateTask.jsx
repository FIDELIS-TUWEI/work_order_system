import { Box, Typography } from "@mui/material"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTask } from "../../utils/redux/slice/taskSlice";
import { toast } from "react-toastify";
import axios from "axios";

// backend url endpoint
const URL = 'http://localhost:5000/hin'

// Validation Schema
const validationSchema = yup.object({
  title: yup
      .string("Enter Task Title")
      .required("Task Title is required"),
  location: yup
      .string("Enter a Location")
      .required("Location is required"),
  priority: yup
      .string("Enter a Priority Level")
      .required("Priority Level is required"),
  category: yup
      .string("Enter Task Category")
      .required("Task Category is required"),
  taskType: yup
      .string("Enter Task Type")
      .required("Task Type is Required"),
  assignedTo: yup
      .string("Enter employee name")
      .required("Employee name is required"),
  assignedBy: yup
      .string("Enter your name")
      .required("Supervisor's name is required"),
  //status: yup
  //    .string("Enter Task Status")
  //    .required("Task Status is required"),
  date: yup
      .string("Enter Date Task was assigned")
      .required("Date is required"),
});

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to create Tasks
  const onSubmit = async (values, actions) => {
    const { ...data } = values;

    try {
      const response = await axios.post(`${URL}/tasks/create`, data)
      dispatch(addTask(response.data))
      //toast.success("Task Added Succesfully")
      actions.resetForm();
    } catch (error) {
      console.log(error)
      //toast.error(error.data.error)
    }
  }

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      location: "",
      priority: "",
      taskType: "",
      assignedTo: "",
      assignedBy: "",
      //status: "",
      date: ""
    },
    validateOnBlur: true,
    validationSchema: validationSchema,
    onSubmit
  });

  return (
    <>
    <Navbar />
      <Box sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", pt: 4, mb: 3 }}>
        <Box onSubmit={formik.handleSubmit} component="form" className="form_style border_style">
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
              id="category"
              label="Task Category"
              name="category"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
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
              value={formik.values.taskType}
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
              placeholder="Enter employee name to Assign"
              value={formik.values.assignedTo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.assignedTo && Boolean(formik.errors.assignedTo)}
              helperText={formik.touched.assignedTo && formik.errors.assignedTo}
            />
            
            <TextField sx={{ mb: 3 }}
              fullWidth
              id="assignedBy"
              label="Assigned By"
              name="assignedBy"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Enter your name"
              value={formik.values.assignedBy}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.assignedBy && Boolean(formik.errors.assignedBy)}
              helperText={formik.touched.assignedBy && formik.errors.assignedBy}
            />

            <TextField sx={{ mb: 3 }}
              fullWidth
              id="date"
              label="Date"
              name="date"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Date Task Assigned"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />

            <Button fullWidth variant="contained" type="submit">Create Task</Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default CreateTask