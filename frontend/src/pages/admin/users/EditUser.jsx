import { message } from "antd";
import Layout from "@/components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import UpdateUser from "@/pages/admin/users/UpdateUser";
import { useEditUserMutation, useGetSingleUserQuery } from "@/features/users/userSlice";
import { useQueryAllDepartmentsQuery } from "@/features/departments/departmentSlice";
import { useQueryAllDesignationsQuery } from "@/features/designations/designationSlice";


const EditUser = () => {
  const {id} = useParams();
  const [editUser, { isLoading: loading }] = useEditUserMutation();
  const { data: departments } = useQueryAllDepartmentsQuery();
  const { data: designations } = useQueryAllDesignationsQuery();
  const { data: userData } = useGetSingleUserQuery(id);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedDesignation, setSelectedDesignation] = useState(null);
  const navigate = useNavigate();

  // Logic to check the data being fetched is an array
  const departmentsArray = departments?.data || [];
  const designationsArray = designations?.data || [];
  const userDataArray = userData?.data || [];

  // function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      const { error } = await editUser({id, values}).unwrap();
      
      if (error) {
        if (error === 400 && error?.message) {
          message.error(error.message);
          navigate('/users/all');
        } else {
          message.error("Failed to update user details!")
        }
      } else {
        message.success('User Updated Successfully');
        navigate('/users/all');
      }
    } catch (error) {
      message.error("Failed to update user details!");
    }
  };

  // Function to handle change in department
  const handleDepartmentChange = (value) => {
    setSelectedDepartment(value);
  };

  // Function to handle change in designation
  const handleDesignationChange = (value) => {
    setSelectedDesignation(value);
  };

  return (
    <Layout>
      <UpdateUser 
        userDataArray={userDataArray}
        onFinishHandler={onFinishHandler}
        navigate={navigate}
        loading={loading}
        departmentsArray={departmentsArray}
        selectedDepartment={selectedDepartment}
        handleDepartmentChange={handleDepartmentChange}
        designationsArray={designationsArray}
        selectedDesignation={selectedDesignation}
        handleDesignationChange={handleDesignationChange}
      />
    </Layout>
  )
}

export default EditUser;