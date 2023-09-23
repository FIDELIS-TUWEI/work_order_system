import { useState } from 'react';
import CreateDesignation from '../../../components/CreateDesignation';
import Layout from '../../../components/Layout';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { createNewDesignation } from '../../../services/designation';

const NewDesignation = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    setLoading(true);
    await createNewDesignation(values);
    navigate("/all/designations");
    message.success("New Designation Created Succesfully");
    setLoading(false);
  }

  return (
    <Layout>
      <CreateDesignation 
        onFinishHandler={onFinishHandler}
        loading={loading}
        navigate={navigate}
      />
    </Layout>
  )
}

export default NewDesignation;