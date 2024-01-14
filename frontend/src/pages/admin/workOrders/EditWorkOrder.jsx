import { useState } from 'react'
import Layout from "@/components/Layout";
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { selectUserInfo } from "@/features/auth/authSlice"
import { useNavigate, useParams } from 'react-router-dom'
import UpdateWork from "@/pages/admin/workOrders/UpdateWork";
import { useSingleWorkQuery, useUpdateWorkMutation } from '@/features/work/workSlice';
import { useQueryAllEmployeesQuery } from '@/features/employees/employeeSlice';

const EditWorkOrder = () => {
  const { id } = useParams();
  const user = useSelector(selectUserInfo);
  const [updateWorkOrder, { isLoading}] = useUpdateWorkMutation();
  const { data: singleWork } = useSingleWorkQuery(id);
  const { data: allEmployees } = useQueryAllEmployeesQuery();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  // Logic to check if data being fetched is an array
  const singleWorkArray = singleWork?.data || [];
  const employeesArray = allEmployees?.data || [];

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      const { error } = await updateWorkOrder({id, values}).unwrap();

      if (error) {
        if (error.status === 400 && error.data && error.data.message) {
          message.error(error.data.message);
          navigate('/work/list');
        } else {
          message.error("Failed to update work order");
        }
      } else {
        message.success('Work Order Updated Successfully');
        navigate('/work/list');
      }

    } catch (error) {
      message.error(error.message);
    }
  };

  // Function to handle change in employee selection
  const handleEmployeeChange = (value) => {
    setSelectedEmployee(value);
  };
  
  return (
    <Layout>
        <UpdateWork 
          singleWorkArray={singleWorkArray}
          onFinishHandler={onFinishHandler}
          user={user}
          navigate={navigate}
          employeesArray={employeesArray}
          selectedEmployee={selectedEmployee}
          handleEmployeeChange={handleEmployeeChange}
          isLoading={isLoading}
        />
    </Layout>
  )
}

export default EditWorkOrder;