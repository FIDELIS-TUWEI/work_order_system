import { useCallback, useEffect, useState } from 'react'
import Layout from "@/components/Layout";
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { selectToken, selectUserInfo } from "@/features/auth/authSlice"
import { useNavigate, useParams } from 'react-router-dom'
import UpdateWork from "@/pages/admin/workOrders/UpdateWork";
import { queryAllEmployees } from '../../../services/employeeApi'
import { useSingleWorkQuery, useUpdateWorkMutation } from '@/features/work/workSlice';

const EditWorkOrder = () => {
  const { id } = useParams();
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [updateWorkOrder, { isLoading}] = useUpdateWorkMutation();
  const { data: singleWork } = useSingleWorkQuery(id);
  const 
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  const singleWorkArray = singleWork?.data || [];

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

  // Function to get all employees
  const getEmployees = useCallback (async () => {
    try {
      const res = await queryAllEmployees({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmployees(res.data);
    } catch (error) {
      message.error("Failed to fetch employees", error.message);
    }
  }, [token]);

  // UseEffect hook
  useEffect(() => {
      getEmployees();
  }, [getEmployees]);
  
  return (
    <Layout>
        <UpdateWork 
          singleWorkArray={singleWorkArray}
          onFinishHandler={onFinishHandler}
          user={user}
          navigate={navigate}
          employees={employees}
          selectedEmployee={selectedEmployee}
          handleEmployeeChange={handleEmployeeChange}
          isLoading={isLoading}
        />
    </Layout>
  )
}

export default EditWorkOrder;