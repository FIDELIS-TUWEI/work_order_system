import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleWorkOrder, updateWorkOrder } from '../../../services/workApi'
import UpdateWork from '../../../components/UpdateWork'
import { queryAllEmployees } from '../../../services/employeeApi'

const EditWorkOrder = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [workDetails, setWorkDetails] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const navigate = useNavigate();
  const {id} = useParams();

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      await updateWorkOrder(id, values);
      navigate('/work/list');
      message.success('Work Order Updated Successfully');
    } catch (error) {
      message.error(error.message);
    }
  }

  // Function to get work order details
  const getWorkOrderDetails = async (id) => {
    const res = await getSingleWorkOrder(id, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setWorkDetails({...res.data});
  }

  // Function to handle change in employee selection
  const handleEmployeeChange = (value) => {
    setSelectedEmployee(value);
  };

  // Function to get all employees
  const getEmployees = async () => {
    const { data } = await queryAllEmployees({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEmployees(data);
  };

  // UseEffect hook
  useEffect(() => {
    if (id) {
      getWorkOrderDetails(id);
      getEmployees();
    }
  }, [id]);
  
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
        />
    </Layout>
  )
}

export default EditWorkOrder