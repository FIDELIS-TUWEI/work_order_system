import PropTypes from "prop-types";
import { Button, Card, Input, Space, Table } from "antd";
import {GrFormNext, GrFormPrevious, GrSearch} from "react-icons/gr";
import Highlighter from 'react-highlight-words';

import "jspdf-autotable";
import LoadingBox from "../components/LoadingBox";
import { useRef, useState } from "react";
import moment from "moment";


const WorkReport = ({ workOrders, loading, setFilterStatus, exportPDF, page, pages, handlePageChange, navigate }) => {
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
  const dateCreated = (text) => {
    return text ? moment(text).format("DD/MM/YYYY, hh:mm a") : "Not yet Created";
  };
  
  const formattedDate = (text) => {
    return text ? moment(text).format("DD/MM/YYYY, hh:mm a") : "Not yet Complete";
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ...getColumnSearchProps("title", "Title"),
    },
    {
      title: "Date Requested",
      dataIndex: "dateAdded",
      key: "dateAdded",
      render : dateCreated,
        ...getColumnSearchProps("dateAdded", "Date Requested"), // Need to set
    },
    {
      title: "Service Type",
      dataIndex: "serviceType",
      key: "serviceType",
      ...getColumnSearchProps("serviceType", "Service Type"),
    },
    {
      title: "Category",
      dataIndex: "category.categoryTitle",
      key: "category",
      ...getColumnSearchProps("category.categoryTitle", "Category"),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      ...getColumnSearchProps("priority", "Priority"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps("status", "Status"),
    },
    {
      title: "Date Completed",
      dataIndex: "dateCompleted",
      key: "dateCompleted",
      render : formattedDate,
        ...getColumnSearchProps("dateCompleted", "Date Completed"), // Need to set
    },
  ];

  return (
    <>
      <Card title="Work Orders" style={{ margin: "15px" }}>
        <div style={{ display: "flex", justifyContent: "flex-end", margin: "20px" }}>
          <label style={{ fontWeight: "bold" }}>
            Filter By Status:
          </label>
          <select onChange={(e) => setFilterStatus(e.target.value)} style={{ marginLeft: "10px" }}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="In_Progress">In Progress</option>
            <option value="Complete">Completed</option>
          </select>
        </div>
        

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
            <LoadingBox />
          </div>
        ) : (
          <>
          <Table 
           id="table"
            dataSource={workOrders}
            columns={columns}
            pagination={false}
            rowKey={(record) => record._id}
          />
            <p>Total Work Orders: {workOrders.length}</p>
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
          )}
      </Card>

      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages || workOrders.length === 0} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormNext />
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
  page: PropTypes.number,
  pages: PropTypes.number,
  handlePageChange: PropTypes.func,
  navigate: PropTypes.func
};

export default WorkReport;