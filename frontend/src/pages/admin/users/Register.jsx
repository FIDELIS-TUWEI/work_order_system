import { message } from 'antd'
import Layout from "@/components/Layout";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectToken, selectUserInfo } from "@/features/auth/authSlice";
import { useEffect, useState } from 'react';
import CreateUser from "@/pages/admin/users/CreateUser";
import { useRegisterUserMutation } from '@/features/users/userSlice';
import { useQueryAllDepartmentsQuery } from '@/features/departments/departmentSlice';
import { useQueryAllDesignationsQuery } from '@/features/designations/designationSlice';


const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const { data: departments } = useQueryAllDepartmentsQuery();
  const { data: designations } = useQueryAllDesignationsQuery();
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userInfo = useSelector(selectUserInfo);
  const token = useSelector(selectToken);

  // Logic to check the data being fetched is an array
  const departmentsArray = departments?.data || [];
  const designationsArray = designations?.data || [];

// function to create user
const onFinishHandler = async (values) => {
  try {
    setLoading(true);
    const { error } = await registerUser(values);

    if (error) {
      if (error.status === 400 && error.data && error.data.message) {
        message.error(error.data.message);
        navigate('/users/all');
      } else {
        message.error("User Registration Failed");
      }
    } else {
      navigate('/users/all');
      message.success("User Registered Succesfully");
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    message.error( error.message);
  }
}

// Function to handle Department Change
const handleDepartmentChange = (value) => {
  setSelectedDepartment(value);
};

// Function to handle designation change
const handleDesignationChange = (value) => {
  setSelectedDesignation(value);
}

// useEffect to check if user is logged in
useEffect(() => {
  if (!userInfo && !token) {
    navigate('/login');
  }
}, [userInfo, navigate, token]);

  return (
    <Layout>
      <CreateUser 
        onFinishHandler={onFinishHandler}
        loading={loading}
        departmentsArray={departmentsArray}
        designationsArray={designationsArray}
        selectedDepartment={selectedDepartment}
        selectedDesignation={selectedDesignation}
        handleDepartmentChange={handleDepartmentChange}
        handleDesignationChange={handleDesignationChange}
      />
    </Layout>
  )
}

export default Register;