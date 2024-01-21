import PropTypes from "prop-types";
import { Button, Card, DatePicker, Table, Typography } from 'antd'
import React from 'react'
import moment from "moment";
import "jspdf-autotable";

const AllDailyWork = ({ selectedDate, handleDateSelect, workOrders, exportPDF }) => {

    // Format date
    const formatDate = (date) => {
        return moment(date).format("DD/MM/YYYY, hh:mm a");
    };

    const formatDateCompleted = (date) => {
        if (date) {
          return formatDate(date); 
        } else {
          return "Not yet Complete";
        }
      };

    // antD table columns
    const columns = [
        {
            title: "Description",
            align: "center",
            width: 200,
            fixed: "left",
            responsive: ["md", "lg"],
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Service Type",
            width: 150,
            fixed: "left",
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "serviceType",
            key: "serviceType",
        },
        {
            title: "Priority",
            width: 150,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "priority",
            key: "priority"
        },
        {
            title: "Category",
            width: 150,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "category",
            key: "category",
            render: (category) => (
              category ? `${category.categoryTitle}` : "No Category"
            )
        },
        {
            title: "Tracker",
            width: 150,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "tracker",
            key: "tracker",
        },
        {
            title: "Requested By",
            width: 160,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "requestedBy",
            key: "requestedBy",
            render: (requestedBy) => (
                requestedBy ? `${requestedBy.username}` : "Null"
            )
        },
        {
            title: "Tracker",
            width: 150,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "tracker",
            key: "tracker",
        },
        {
            title: "Date Requested",
            width: 200,
            sorter: true,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "Date_Created",
            key: "Date_Created",
            render : (text) => formatDate(text),
        },
        {
            title: "Assigned To",
            width: 150,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "assignedTo",
            key: "assignedTo",
            render: (assignedTo) => (
                assignedTo ? `${assignedTo.firstName} ${assignedTo.lastName}` : "Unassigned"
            )
        },
        {
            title: "Supervisor",
            width: 150,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "supervisedBy",
            key: "supervisedBy",
        },
        {
            title: "Date Completed",
            width: 200,
            fixed: "right",
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "dateCompleted",
            key: "dateCompleted",
            render : formatDateCompleted,
        },
    ]
  return (
    <>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '16px' }}>Daily Work Report</Typography>

        <DatePicker value={selectedDate} onSelect={handleDateSelect} />

        <Button style={{ 
            color: 'white', 
            backgroundColor: 'darkgreen', 
            border: 'none', 
            marginLeft: '30px'
            }} 
            onClick={exportPDF}>
            Generate Report
          </Button>

        <Card title="Daily Work Report" style={{ marginTop: "20px"  }}>
            <Table 
                columns={columns}
                dataSource={workOrders?.data || []}
                rowKey="_id"
                pagination={false}
                scroll={{ x: 1500, y: 240 }}
            />
        </Card>

        <p style={{ marginTop: "20px" }}>Total Work Orders: {workOrders?.length}</p>
    </>
  )
};

AllDailyWork.propTypes = {
    selectedDate: PropTypes.object,
    handleDateSelect: PropTypes.func,
    workOrders: PropTypes.array,
    exportPDF: PropTypes.func,
}

export default AllDailyWork;