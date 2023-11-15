import Layout from '../../../components/Layout';
import FilterWorkDate from '../../../components/FilterWorkDate';
import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import { message } from 'antd';
const WORK_URL = '/hin';


const DateFilter = () => {
  const [loading, setLoading] = useState(false);
  const [workOrders, setWorkOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Function to handle Date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Function to handle Filter
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${WORK_URL}/work/date-created?date=${selectedDate}`);
        setWorkOrders(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        message.error('Error while fetching work orders', error.message);
      }
    };
    fetchData();
  }, [selectedDate]);

  return (
    <Layout>
      <FilterWorkDate 
        handleDateChange={handleDateChange}
        loading={loading}
        workOrders={workOrders}
        selectedDate={selectedDate}
      />
    </Layout>
  )
}

export default DateFilter;