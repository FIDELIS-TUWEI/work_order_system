import { useState } from "react"
import EditUserPassword from "@/pages/admin/users/EditUserPassword"
import Layout from "@/components/Layout"
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useChangePasswordMutation } from "@/features/users/userSlice";

const ChangePassword = () => {
  const {id} = useParams();
  const [changePassword, { isLoading: loading }] = useChangePasswordMutation();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onFinishHandler = async (values) => {
    try {
      const { error } = await changePassword({id, values}).unwrap();
      if (error) {
        if (error === 400 && error?.message) {
          message.error(error.message);
          navigate('/users/all');
        } else {
          message.error("User Password update failed, try again later!");
        }
      } else {
        navigate('/users/all');
        message.success('Password Updated Successfully');
      }
    } catch (error) {
      message.error('Password Update Failed');
    }
  };

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
};

export default ChangePassword;