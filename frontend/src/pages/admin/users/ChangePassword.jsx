import { useEffect, useState } from "react"
import EditUserPassword from "../../../components/EditUserPassword"
import Layout from "../../../components/Layout"
import { updateUserPassword } from "../../../services/usersApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
  const token = useSelector(selectToken);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  const onFinishHandler = async (values) => {
    try {
      await updateUserPassword(id, values, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/work/list');
      message.success('Password Updated Successfully');
    } catch (error) {
      console.log(error);
      message.error('Password Update Failed');
    }
  }

  return (
    <Layout>
      <EditUserPassword 
        onFinishHandler={onFinishHandler}
        oldPassword={oldPassword}
        newPassword={newPassword}
        setOldPassword={setOldPassword}
        setNewPassword={setNewPassword}
      />
    </Layout>
  )
}

export default ChangePassword;