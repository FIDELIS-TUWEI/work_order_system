import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { addTask } from '../../utils/redux/slice/taskSlice';
import { validationSchema } from '../../utils/formik/validationSchema';

const CreateTask = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState(null);

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
      setFormError("An error occurred while creating the task.");
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
    validationSchema: validationSchema,
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

            <TextField
              sx={{ mb: 3 }}
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

            {/* Other text fields go here */}

            <Button fullWidth variant="contained" type="submit">
              Create Task
            </Button>

            {formError && (
              <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                {formError}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default CreateTask