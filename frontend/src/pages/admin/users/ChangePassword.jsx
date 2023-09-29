import { useEffect, useState } from "react"
import EditUserPassword from "../../../components/EditUserPassword"
import Layout from "../../../components/Layout"
import { updateUserPassword } from "../../../services/usersApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const USERS_URL = "/hin";


const ChangePassword = () => {
  const token = useSelector(selectToken);
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

const onFinishHandler = async (values) => {
  try {
    const response = await axios.put(`${USERS_URL}/update/password/${id}`, values, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    navigate('/users/all');
    if (response.status === 200) {
      message.success("User Updated Successfully");
    } else {
      throw new Error("Error while updating user password");
    }
  } catch (error) {
    console.error("Error while updating user password", error);
  }
};

  return (
    <Layout>
      <EditUserPassword 
        onFinishHandler={onFinishHandler}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
      />
    </Layout>
  )
}

export default ChangePassword;