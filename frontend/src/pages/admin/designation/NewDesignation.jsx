import CreateDesignation from "@/pages/admin/designation/CreateDesignation";
import Layout from "@/components/Layout";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useCreateDesignationMutation } from '@/features/designations/designationSlice';

const NewDesignation = () => {
  const [newDesignation, { isLoading: loading }] = useCreateDesignationMutation();
  const navigate = useNavigate();

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      const { error } = await newDesignation(values).unwrap();

      if (error) {
        if (error === 400 && error?.data?.message) {
          message.error(error.data.message);
          navigate("/all/designations");
        } else {
          message.error("Failed to create new designation!");
        }
      } else {
        message.success("New Designation Created Succesfully");
        navigate("/all/designations");
      };

    } catch (error) {
      message.error("Failed to create new designation!")
    }
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