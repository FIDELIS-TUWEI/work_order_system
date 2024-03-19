import PropTypes from "prop-types";
import { Button, Input, Typography, message } from "antd"
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

import Work from "@/pages/admin/workOrders/Work";
import { useSearchWorkQuery, useWorkOrdersQuery } from "@/features/work/workSlice";
import { selectUserInfo } from "@/features/auth/authSlice";
import LoadingBox from "@/components/LoadingBox";
const { Search } = Input;

// Search component
const Filter = ({ searchTerm, setSearchTerm, handleSearch }) => {
  return (
    <Search 
      type="search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      onSearch={handleSearch}
      placeholder="Enter work order number to search..."
    />
  )
};

Filter.propTypes = {
  searchTerm: PropTypes.string,
  handleSearch: PropTypes.func
};

// Render searched work
const SearchedWork = ({ filteredWork }) => {
  return (
    <div>
      {
        filteredWork?.map(work => (
          <p key={work._id}>
            {work.description} {work.workOrderNumber}
            <Button type="submit">Edit</Button>
          </p>
        ))
      }
    </div>
  )
};

SearchedWork.propTypes = {
  filteredWork: PropTypes.array,
}


const AllWorkOrders = () => {
  const user = useSelector(selectUserInfo);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { dataInfo, isLoading } = useSearchWorkQuery(searchTerm)
  const [page, setPage] = useState(1);
  const { data, isLoading: loading, error, refetch } = useWorkOrdersQuery({ page, status: filterStatus });

  const { data: workOrdersArray, pages } = data || {};
  const { dataInfo: workSearch } = dataInfo || {};

 // Handle errors
 useEffect(() => {
    if (error) {
      message.error("Error Occured loading work orders!");
    };
 }, [error]);

 // Function to handle status change
 const handleStatusChange = (event) => {
  const newStatus = event.target.value
  setFilterStatus(newStatus);
  refetch();
 }

 // Handle pagination
 const handlePageChange = (newPage) => {
   setPage(newPage);
   refetch();
 };

 const handleSearch = (value) => {
  setSearchTerm(value);
 }

 // Function to filter work by order number
 const filteredWork = workSearch?.filter(work => work.workOrderNumber.toLowerCase().includes(searchTerm.toLowerCase()));
 

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Work Orders</Typography>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />
      { isLoading && <LoadingBox /> }
      { filteredWork?.map((workOrder) => {
        <Typography key={workOrder._id}>
          {workOrder.description} {workOrder.workOrderNumber}

          <Button type="submit">Edit</Button>
        </Typography>
      })}

      <Work 
        workOrdersArray={workOrdersArray}
        user={user} 
        loading={loading}
        refetch={refetch}
        handleStatusChange={handleStatusChange}
      />
      
      <div className="pagination">
        <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
          <GrFormPrevious />
        </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
          <GrFormNext />
        </Button>
      </div>
    </Layout>
  )
}

export default AllWorkOrders;