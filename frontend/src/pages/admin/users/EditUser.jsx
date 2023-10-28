import { message } from "antd";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUserInfo } from "../../../services/usersApi";
import { useEffect, useState } from "react";
import UpdateUser from "../../../components/UpdateUser";
import { queryAllDepartments } from "../../../services/departmentApi";


const EditUser = () => {
  const token = useSelector(selectToken);
  const [userDetails, setUserDetails] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
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
      message.error(error.message, "User Update Failed");
      setLoading(false);
    }
  }

  // Function to get single user details
  const getUserDetails = async (id) => {
    const res = await getUserInfo(id, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUserDetails({...res.data});
  };

  // Function to handle change in department
  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  // Function to get Departments
  const getAllDepartments = async () => {
    const res = await queryAllDepartments({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setAllDepartments(res.data);
  }

  // UseEffect hook
  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
    getAllDepartments();
  }, [id]);

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
      />
    </Layout>
  )
}

export default EditUser;