import { Avatar, Box, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useFormik } from "formik";
import * as yup from "yup";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { editTask } from "../../utils/redux/slice/taskSlice";


// backend url endpoint
const URL = 'http://localhost:5000/hin'

// Validation Schema 
const validationSchema = yup.object({
 
  status: yup
      .string("Enter status")
      .required("Task Status is required"),
  date: yup
      .string("Enter date")
      .required("Date completed is required")

});

const EditTask = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.put(`${URL}/task/update/${id}`, values);
      dispatch(editTask(response.data));
      toast.success("Task Updated successfully");
      actions.resetForm();
      navigate("/tasks/list");
    } catch (error) {
      console.error(error);
    }
  }

  const formik = useFormik({
    initialValues: {
      status: "",
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
            <Avatar sx={{ m: 1, bgcolor: "primary", mb: 3 }}>
              <BorderColorOutlinedIcon />
            </Avatar>

           

            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="status"
              label="Status"
              name="status"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Task Status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.status && Boolean(formik.errors.status)}
              helperText={formik.touched.status && formik.errors.status}
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
              placeholder="Date Completed"
              value={formik.values.date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.date && Boolean(formik.errors.date)}
              helperText={formik.touched.date && formik.errors.date}
            />

            <Button fullWidth variant="contained" type="submit">Edit Task</Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  )
}

export default EditTask;