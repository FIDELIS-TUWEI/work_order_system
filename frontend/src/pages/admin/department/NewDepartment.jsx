import { useState } from 'react';
import CreateDepartment from '../../../components/CreateDepartment';
import Layout from '../../../components/Layout'
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { createNewDepartment } from '../../../services/departmentApi';

const NewDepartment = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    setLoading(true);
    await createNewDepartment(values);
    navigate("/all-departments");
    message.success("New Department Created Succesfully");
    setLoading(false);
  };

  return (
    <Layout>
      <CreateDepartment 
        onFinishHandler={onFinishHandler}
        loading={loading}
        navigate={navigate}
      />
    </Layout>
  )
}

export default NewDepartment;