import CreateDepartment from "@/pages/admin/department/CreateDepartment";
import Layout from "@/components/Layout";
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { useCreateDepartmentMutation } from '@/features/departments/departmentSlice';

const NewDepartment = () => {
  const [newDepartment, { isLoading: loading }] = useCreateDepartmentMutation();
  const navigate = useNavigate();

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      const { error } = await newDepartment(values).unwrap();

      if (error) {
        if (error === 400 && error.data && error.data.message) {
          message.error(error.data.message);
          navigate("/all/departments");
        } else {
          message.error("Failed to create new department")
        }
      } else {
        message.success("New Department Created Succesfully");
        navigate("/all/departments");
      }
    } catch (error) {
      message.error(error.message);
    }
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
};

export default NewDepartment;