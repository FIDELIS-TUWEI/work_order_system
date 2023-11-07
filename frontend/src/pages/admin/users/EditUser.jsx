import { message } from "antd";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUserInfo } from "../../../services/usersApi";
import { useCallback, useEffect, useState } from "react";
import UpdateUser from "../../../components/UpdateUser";
import { queryAllDepartments } from "../../../services/departmentApi";
import { queryAllDesignations } from "../../../services/designation";


const EditUser = () => {
  const token = useSelector(selectToken);
  const [userDetails, setUserDetails] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [allDesignations, setAllDesignations] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();


  // function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      setLoading(true);
      await editUser(id, values, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      message.success('User Updated Successfully');
      navigate('/users/all');
      setLoading(false);
    } catch (error) {
      message.error("User Update Failed", error.message);
      setLoading(false);
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

  // Function to get Departments
  const getAllDepartments = useCallback (async () => {
    const res = await queryAllDepartments({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setAllDepartments(res.data);
  }, [token]);

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
    getAllDepartments();
    getAllDesignations();
  }, [id, getAllDepartments, getAllDesignations, getUserDetails]);

  return (
    <Layout>
      <UpdateUser 
        userDetails={userDetails}
        onFinishHandler={onFinishHandler}
        navigate={navigate}
        loading={loading}
        allDepartments={allDepartments}
        selectedDepartment={selectedDepartment}
        handleDepartmentChange={handleDepartmentChange}
        getAllDepartments={getAllDepartments}
        allDesignations={allDesignations}
        selectedDesignation={selectedDesignation}
        handleDesignationChange={handleDesignationChange}
      />
    </Layout>
  )
}

export default EditUser;