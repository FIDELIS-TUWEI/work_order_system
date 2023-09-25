import { message } from "antd";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUserInfo } from "../../../services/usersApi";
import { useEffect, useState } from "react";
import UpdateUser from "../../../components/UpdateUser";


const EditUser = () => {
  const token = useSelector(selectToken);
  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();


  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
  }, [id]);


  // function to handle form submit
  const onFinishHandler = async (values) => {
    const res = await editUser(id, values, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res) {
      message.success("User Updated Successfully");
      navigate("/users/all");
    } else {
      message.error("User Update Failed");
    }
  };

  // Function to get single user details
  const getUserDetails = async (id) => {
    const res = await getUserInfo(id, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setUserDetails({...res.data});
  }

  return (
    <Layout>
      <UpdateUser 
        userDetails={userDetails}
        onFinishHandler={onFinishHandler}
        navigate={navigate}
      />
    </Layout>
  )
}

export default EditUser;