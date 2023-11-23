import Layout from '../../../components/Layout';
import FilterWorkDate from '../../../components/FilterWorkDate';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectToken } from '../../../utils/redux/slices/authSlice';
import { message } from 'antd';

const WORK_URL = "/hin"

const DateFilter = () => {
  const token = useSelector(selectToken);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch work orders
  const getWork = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/${WORK_URL}/work/date?selectedDate=${selectedDate.toISOString()}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWorkOrders(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      message.error("Failed to fetch work orders", error.message);
    }
  }, [token]);

  // useEffect to fetch work orders
  useEffect(() => {
    getWork();
  }, [getWork]);

  // Function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  }

  return (
    <Layout>
      <FilterWorkDate 
        workOrders={workOrders}
        handleDateChange={handleDateChange}
        selectedDate={selectedDate}
        loading={loading}
      />
    </Layout>
  )
}

export default DateFilter;