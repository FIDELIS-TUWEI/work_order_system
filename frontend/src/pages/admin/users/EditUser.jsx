import { message } from "antd";
import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
import { selectToken } from "@/features/auth/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getUserInfo } from "../../../services/usersApi";
import { useCallback, useEffect, useState } from "react";
import UpdateUser from "@/pages/admin/users/UpdateUser";
import { queryAllDesignations } from "../../../services/designation";
import { useEditUserMutation } from "@/features/users/userSlice";
import { useQueryAllDepartmentsQuery } from "@/features/departments/departmentSlice";


const EditUser = () => {
  const [editUser, { isLoading: loading }] = useEditUserMutation();
  const { data: departments } = useQueryAllDepartmentsQuery();
  const token = useSelector(selectToken);
  const [userDetails, setUserDetails] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [allDesignations, setAllDesignations] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();

  // Logic to check the data being fetched is an array
  const departmentsArray = departments?.data || [];


  // function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      const { error } = await editUser({id, values}).unwrap();
      
      if (error) {
        if (error === 400 && error.data && error.data.message) {
          message.error(error.data.message);
          navigate('/users/all');
        } else {
          message.error("Failed to update user details")
        }
      } else {
        message.success('User Updated Successfully');
        navigate('/users/all');
      }
    } catch (error) {
      message.error(error.message);
    }
  }

  // Function to get single user details
  const getUserDetails = useCallback (async (id) => {
    try {
      const res = await getUserInfo(id, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserDetails(res.data);
    } catch (error) {
      message.error("Error while fetching user details", error.message);
    }
  }, [token]);

  // Function to handle change in department
  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  // Function to handle change in designation
  const handleDesignationChange = (value) => {
    setSelectedDesignation(value);
  };

  // Function to get Designations
  const getAllDesignations = useCallback (async () => {
    const res = await queryAllDesignations({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setAllDesignations(res.data);
  }, [token]);

  // UseEffect hook
  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
    getAllDesignations();
  }, [id, getAllDesignations, getUserDetails]);

  return (
    <Layout>
      <UpdateUser 
        userDetails={userDetails}
        onFinishHandler={onFinishHandler}
        navigate={navigate}
        loading={loading}
        departmentsArray={departmentsArray}
        selectedDepartment={selectedDepartment}
        handleDepartmentChange={handleDepartmentChange}
        allDesignations={allDesignations}
        selectedDesignation={selectedDesignation}
        handleDesignationChange={handleDesignationChange}
      />
    </Layout>
  )
}

export default EditUser;