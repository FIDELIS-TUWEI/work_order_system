import { message } from 'antd'
import Layout from "@/components/Layout";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { selectToken, selectUserInfo } from "@/features/auth/authSlice";
import { useEffect, useState } from 'react';
import CreateUser from "@/pages/admin/users/CreateUser";
import { queryAllDepartments } from '../../../services/departmentApi';
import { queryAllDesignations } from '../../../services/designation';
import { useRegisterUserMutation } from '@/features/users/userSlice';


const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const [allDepartments, setAllDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [allDesignations, setAllDesignations] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userInfo = useSelector(selectUserInfo);
  const token = useSelector(selectToken);

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

// Function to get all departments from API service
const getDepartments = async () => {
  try {
    const res = await queryAllDepartments({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setAllDepartments(res.data);
  } catch (error) {
    message.error("Error while fetching all departments", error.message);
  }
};

// Function to handle Department Change
const handleDepartmentChange = (value) => {
  setSelectedDepartment(value);
};

// Function to fetch all designations form API service
const getDesignations = async () => {
  try {
    const res = await queryAllDesignations({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setAllDesignations(res.data);
  } catch (error) {
    message.error("Error while fetching all designations", error.message);
  }
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

// useEffect hook
useEffect(() => {
  getDepartments();
  getDesignations();
}, []);

  return (
    <Layout>
      <CreateUser 
        onFinishHandler={onFinishHandler}
        loading={loading}
        allDepartments={allDepartments}
        allDesignations={allDesignations}
        selectedDepartment={selectedDepartment}
        selectedDesignation={selectedDesignation}
        handleDepartmentChange={handleDepartmentChange}
        handleDesignationChange={handleDesignationChange}
      />
    </Layout>
  )
}

export default Register;