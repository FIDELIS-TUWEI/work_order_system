import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../../components/Layout';

import axios from 'axios';
import { message } from 'antd';
import FilterWorkDate from '../../../components/FilterWorkDate';
import moment from 'moment';
const WORK_URL = "/hin";


const DateFilter = () => {
  const [workFilterDate, setWorkFilterDate] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  // function to handle date change
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // function to fetch work orders filtered by date
  const filterWorkOrders = useCallback (async () => {
    try {
      const { date } = selectedDate || {};
      // Make an API call to fetch work orders based on selected date
      setLoading(true);
      const res = await axios.get(`${WORK_URL}/work/date-created`, {
        params: {
          date,
        },
      });

      // Update the workFilterDate state with the fetched work orders
      setWorkFilterDate(res.data);
      setLoading(false);

    } catch (error) {
      // Handle error if API call fails
      setLoading(false);
      console.error("Failed to fetch work orders", error.message);
      message.error("Failed to fetch work orders", error.message);
    }
  }, [selectedDate]);

  // useEffect hook
  useEffect(() => {
    filterWorkOrders();
  }, [filterWorkOrders, selectedDate]);

  return (
    <Layout>
      <FilterWorkDate 
        workFilterDate={workFilterDate}
        filterWorkOrders={filterWorkOrders}
        handleDateChange={handleDateChange}
        loading={loading}
      />
    </Layout>
  )
}

export default DateFilter;