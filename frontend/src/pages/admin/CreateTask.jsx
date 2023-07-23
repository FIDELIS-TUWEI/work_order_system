import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { addTask } from '../../utils/redux/slice/taskSlice';
import { validationSchemaTasks } from '../../utils/formik/validationSchema';

// backend url endpoint
const URL = 'http://localhost:5000/hin'

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    const { ...data } = values;

    try {
      const response = await axios.post(`${URL}/tasks/create`, data);
      dispatch(addTask(response.data));
      toast.success("Task Added Successfully");
      navigate("/tasks/list");
      actions.resetForm();
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      location: "",
      priority: "",
      taskType: "",
      assignedTo: "",
      assignedBy: "",
      date: ""
    },
    validateOnBlur: true,
    validationSchema: validationSchemaTasks,
    onSubmit
  });

  return (
    <>
      <Navbar />
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pt: 4,
          mb: 3,
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
              width: "100%",
            }}
          >
            <Typography variant="h5" component="h2" sx={{ pb: 2 }}>
              Register a Task
            </Typography>
            
            {[
              {
                id: "title",
                label: "Task Title",
                name: "title",
                placeholder: "Eg. Wi-Fi connection, Gas Leak, Paint"
              },
              {
                id: "location",
                label: "Task Location",
                name: "location",
                placeholder: "Eg. Room323, Victoria Hall, Admin Office"
              },
              {
                id: "priority",
                label: "Priority",
                name: "priority",
                placeholder: "Eg. High, Medium, Low"
              },
              {
                id: "category",
                label: "Category",
                name: "category",
                placeholder: "Eg. fix, repair, replace"
              },
              {
                id: "taskType",
                label: "Task Type",
                name: "taskType",
                placeholder: "Eg. Door/Handle, Light/Bulb, Wi-Fi/Connection"
              },
              {
                id: "assignedTo",
                label: "Assigned To",
                name: "assignedTo",
                placeholder: "Eg. Victor, Tito"
              },
              {
                id: "assignedBy",
                label: "Assigned By",
                name: "assignedBy",
                placeholder: "Enter your name"
              },
              {
                id: "date",
                label: "Date",
                name: "date",
                placeholder: "Eg. 14-07-2023"
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

            <Button fullWidth variant="contained" type="submit" color='success'>
              Create Task
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default CreateTask