import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectToken } from "../../../redux/userSlice";
import { Table, Button } from "antd";
import axios from "axios";
const WORK_URL = "/hin";


const InprogressWork = () => {
  const token = useSelector(selectToken);
  const [workOrders, setWorkOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('Pending');

  // Hook to get all work orders
  useEffect(() => {
    fetchWorkOrders(filteredStatus);
  }, [filteredStatus]);

  // Function to get all work orders by status
  const fetchWorkOrders = async (status) => {
    try {
      const response = await axios.get(`${WORK_URL}/workorders/${status}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkOrders(response.data);
      setFilteredStatus(status);
    } catch (error) {
      console.log("Error fetching work orders", error);
    }
  }

  // Function to generate PDF from backend
  const generatePDF = async () => {
    try {
      const response = await axios.get(`${WORK_URL}/generate-Pdf/${filteredStatus}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }, { responseType: 'blob' }); // Important for handling binary response

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'workorder.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error generating PDF", error);
    }
  };

  // antd table columns to display data
  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      key: 'serviceType',
    }
  ];

  return (
    <div>
      <Button onClick={generatePDF}>Generate PDF</Button>
      <Table columns={columns} dataSource={workOrders} rowKey="_id" />
    </div>
  )
}

export default InprogressWork;