import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import { message } from 'antd'
import { useSelector } from 'react-redux'
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { getSingleWorkOrder, updateWorkOrder } from '../../../services/workApi'
import UpdateWork from '../../../components/UpdateWork'

const EditWorkOrder = () => {
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [workDetails, setWorkDetails] = useState([]);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    if (id) {
      getWorkOrderDetails(id);
    }
  }, [id]);

  // Function to handle form submit
  const onFinishHandler = async (values) => {
    await updateWorkOrder(id, values);
    navigate('/work/list');
    message.success('Work Order Updated Successfully');
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
  
  return (
    <Layout>
        <UpdateWork 
          workDetails={workDetails}
          onFinishHandler={onFinishHandler}
          user={user}
          navigate={navigate}
        />
    </Layout>
  )
}

export default EditWorkOrder