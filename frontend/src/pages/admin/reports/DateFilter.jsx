import Layout from '../../../components/Layout';
import FilterWorkDate from '../../../components/FilterWorkDate';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

const WORK_URL = "/hin";


const DateFilter = () => {
  const [workOrders, setWorkOrders] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch work orders
  const getWorkOrders = useCallback (async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${WORK_URL}/work/date-created`, {
        params: {
          dateAdded: filterDate
        },
      });
      setWorkOrders(res.data.data)
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch work orders")
    }
  }, [filterDate]);

  useEffect(() => {
    getWorkOrders();
  }, [getWorkOrders, filterDate]);

  // Function to handle date change
  const handleDateChange = (date) => {
    setFilterDate(date.toISOString());
    getWorkOrders();
  }

  return (
    <Layout>
      <FilterWorkDate 
        handleDateChange={handleDateChange}
        workOrders={workOrders}
        loading={loading}
        getWorkOrders={getWorkOrders}
      />
    </Layout>
  )
}

export default DateFilter;