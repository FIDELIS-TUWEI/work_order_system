import { useState } from "react"
import EditUserPassword from "../../../components/EditUserPassword"
import Layout from "../../../components/Layout"
import { updateUserPassword } from "../../../services/usersApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../../features/auth/authSlice";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
  const token = useSelector(selectToken);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  const onFinishHandler = async (values) => {
    try {
      setLoading(true);
      await updateUserPassword(id, values, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/work/list');
      message.success('Password Updated Successfully');
      setLoading(false);
    } catch (error) {
      message.error('Password Update Failed');
      setLoading(false);
    }
  }

  return (
    <Layout>
      <EditUserPassword 
        onFinishHandler={onFinishHandler}
        password={password}
        setPassword={setPassword}
        loading={loading}
      />
    </Layout>
  )
}

export default ChangePassword;