import PropTypes from "prop-types";
import { Card, DatePicker, Table } from 'antd'
import React from 'react'

const AllDailyWork = ({ selectedDate, handleDateSelect, workOrders }) => {

    // antD table columns
    const columns = [
        {
            title: "Description",
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Priority",
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "priority",
            key: "priority"
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
            title: "Service Type",
            width: 150,
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "serviceType",
            key: "serviceType",
        },
    ]
  return (
    <>
        <DatePicker value={selectedDate} onSelect={handleDateSelect} />

        <Card title="Daily Work Report" style={{ marginTop: "20px"  }}>
            <Table 
                columns={columns}
                dataSource={workOrders?.data || []}
                rowKey="_id"
                pagination={false}
            />
        </Card>
    </>
  )
};

AllDailyWork.propTypes = {
    selectedDate: PropTypes.object,
    handleDateSelect: PropTypes.func,
    workOrders: PropTypes.array,
}

export default AllDailyWork;