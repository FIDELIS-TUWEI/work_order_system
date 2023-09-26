import { useState } from "react"
import EditUserPassword from "../../../components/EditUserPassword"
import Layout from "../../../components/Layout"
import { updateUserPassword } from "../../../services/usersApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const token = useSelector(selectToken);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const onFinishHandler = async (values) => {
    try {
      await updateUserPassword(values, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
        message.success("Password Updated Successfully");
        navigate("/profile");
    } catch (error) {
      message.error("Password Update Failed");
      console.error(error);
    }
  }

  return (
    <Layout>
      <EditUserPassword 
        onFinishHandler={onFinishHandler}
      />
    </Layout>
  )
}

export default ChangePassword;