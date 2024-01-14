import { useCallback, useEffect, useState } from 'react'
import Layout from "@/components/Layout";
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { selectToken, selectUserInfo } from "@/features/auth/authSlice"
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleWorkOrder} from '../../../services/workApi'
import UpdateWork from "@/pages/admin/workOrders/UpdateWork";
import { queryAllEmployees } from '../../../services/employeeApi'
import { useSingleWorkQuery, useUpdateWorkMutation } from '@/features/work/workSlice';

const EditWorkOrder = () => {
  const { id } = useParams();
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [updateWorkOrder, { isLoading}] = useUpdateWorkMutation();
  const { data: singleWork } = useSingleWorkQuery(id);
  const [workDetails, setWorkDetails] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();

  const singleWorkArray = singleWork?.data || [];
  console.log("Single work Details: ", singleWorkArray);

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
  }

  // Function to get work order details
  const getWorkOrderDetails = useCallback (async (id) => {
    try {
      const res = await getSingleWorkOrder(id, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkDetails(res.data);
    } catch (error) {
      message.error("Failed to fetch work order details", error.message);
    }
  }, [token]);

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
    if (id) {
      getWorkOrderDetails(id);
      getEmployees();
    }
  }, [id, getWorkOrderDetails, getEmployees]);
  
  return (
    <Layout>
        <UpdateWork 
          workDetails={workDetails}
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