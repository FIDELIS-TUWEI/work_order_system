import PropTypes from "prop-types";
import { Button, Card, Input, Space, Table } from "antd";
import {GrSearch} from "react-icons/gr";
import Highlighter from 'react-highlight-words';

import "jspdf-autotable";
import { useRef, useState } from "react";
import moment from "moment";


const WorkReport = ({ workOrders, loading, setFilterStatus, exportPDF }) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex, title) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input 
          ref={searchInput}
          placeholder={`Search ${title}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<GrSearch />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <GrSearch style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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

  const columns = [
    {
      title: "Description",
      width: 300,
      fixed: "left",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Service Type",
      fixed: "left",
      width: 150,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "serviceType",
      key: "serviceType",
      ...getColumnSearchProps("serviceType", "Service Type"),
    },
    {
      title: "Priority",
      width: 150,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "priority",
      key: "priority",
      ...getColumnSearchProps("priority", "Priority"),
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
      title: "Requested By",
      width: 150,
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
      width: 180,
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
      ...getColumnSearchProps("supervisedBy", "Supervisor"),
    },
    {
      title: "Date Completed",
      width: 200,
      sorter: true,
      fixed: "right",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "dateCompleted",
      key: "dateCompleted",
      render : formatDateCompleted,
    },
  ];

  return (
    <>
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
          <label htmlFor="filterStatus" style={{ fontWeight: "bold" }}>
            Filter By Status:
          </label>
          <select id="filterStatus" onChange={(e) => setFilterStatus(e.target.value)} style={{ marginLeft: "10px" }}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In_Progress">In-progress</option>
            <option value="Complete">Completed</option>
          </select>
        </div>
        
        <Card>
          <Table 
            dataSource={workOrders}
            loading={loading}
            columns={columns}
            pagination={false}
            scroll={{ x: 1500, y: 240 }}
            rowKey="_id"
          />
        </Card>

        <p style={{ marginTop: "20px" }}>Total Work Orders: {workOrders.length}</p>
        <div className="button__container">
          <Button style={{ 
            color: 'white', 
            backgroundColor: 'darkgreen', 
            border: 'none' 
          }} 
            onClick={exportPDF}>
            Generate Report
          </Button>
        </div>
    </>
  )
};

WorkReport.propTypes = {
  workOrders: PropTypes.array,
  loading: PropTypes.bool,
  setFilterStatus: PropTypes.func,
  exportPDF: PropTypes.func,
};

export default WorkReport;