import React, { useCallback, useEffect, useState } from 'react'
import Layout from '../../../components/Layout';

import axios from 'axios';
import { message } from 'antd';
import FilterWorkDate from '../../../components/FilterWorkDate';
import moment from 'moment';
const WORK_URL = "/hin";


const DateFilter = () => {
  const [filteredWorkOrders, setFilteredWorkOrders] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [loading, setLoading] = useState(false);

  // function to handle date change
  const handleDateChange = (dates) => {
    setSelectedDateRange(dates);
  };

  // function to fetch work orders filtered by date
  const fetchFilteredWorkOrders = useCallback (async () => {
    try {
      const [startDate, endDate] = selectedDateRange.map(date => moment(date).format('YYYY-MM-DD'));
      // Make an API call to fetch work orders based on selected date
      setLoading(true);
      const res = await axios.get(`${WORK_URL}/work/date-created`, {
        params: {
          startDate,
          endDate
        },
      });

      // Update the filteredWorkOrders state with the fetched work orders
      setFilteredWorkOrders(res.data);
      setLoading(false);

    } catch (error) {
      // Handle error if API call fails
      setLoading(false);
      console.error("Failed to fetch work orders", error.message);
      message.error("Failed to fetch work orders", error.message);
    }
  }, [selectedDateRange]);

  // useEffect hook
  useEffect(() => {
    fetchFilteredWorkOrders();
  }, [fetchFilteredWorkOrders, selectedDateRange]);

  return (
    <Layout>
      <FilterWorkDate 
        filteredWorkOrders={filteredWorkOrders}
        fetchFilteredWorkOrders={fetchFilteredWorkOrders}
        handleDateChange={handleDateChange}
        loading={loading}
      />
    </Layout>
  )
}

export default DateFilter;