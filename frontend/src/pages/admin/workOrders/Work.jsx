import PropTypes from "prop-types";
import { Button, Modal, message, Tooltip, Badge, Table, Card, Input } from "antd"
import {AiFillEye} from "react-icons/ai"
import {BiSolidEditAlt} from "react-icons/bi";
import {MdDelete} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { useDeleteWorkMutation } from "@/features/work/workSlice";
const { Search } = Input;


const Work = ({workOrdersArray, user, loading, refetch, handleStatusChange, searchTerm, handleSearch }) => {
  const { id } = useParams();
  const [deleteWork] = useDeleteWorkMutation(id);
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWorkToDelete, setSelectedWorkToDelete] = useState(null);

  // Function to show modal to delete work
  const showModal = async (work) => {
      setSelectedWorkToDelete(work);
      setIsModalVisible(true);
  };

  // Function to confirm modal delete
  const handleDelete = async () => {
      try {
          const { error } = await deleteWork(selectedWorkToDelete._id).unwrap();

          if (error) {
              if (error.status === 400 && error?.data?.message) {
                  message.error(error.data.message);
              } else {
                  message.error("Failed to delete work order with ID!");
              }
          } else {
            message.success("Work deleted successfully");
            setIsModalVisible(false);
            refetch();
          }
      } catch (error) {
          message.error("Failed to delete work order with ID!");
      }
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to determine if the edit button should be disabled if the work status is not complete
  const isAllowedEdit = (work) => {
    return [
      "admin", "engineer", "superadmin", "maintenance"
    ].includes(user?.role) 
    || (
      ["hod", "user", "supervisor", "reviewer"].includes(user?.role) && work.status === "Complete"
    );
  } 

  // Function to check if user is authorised to delete work
  const isAuthorised = [
    "admin", "superadmin"
  ].includes(user?.role);

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "red";
      case "Complete":
        return "green";
      default:
        return "default";
    }
  };

  // shorten description logic
  const renderDescription = (description) => {
    const maxLength = 10;

    if (description.length > maxLength) {
      return `${description.substring(0, maxLength)}...`;
    }
    return description;
  }

  const renderStatusBagde = (status) => (
      <Badge
        color={getStatusColor(status)}
        text={status}
      />
  );

  // Render locationTitle
  const renderLocation = (locations) => (
    <>
      {Array.isArray(locations) && locations.map((location, index) =>
          <span key={location._id}>
              {location.locationTitle}
              {index < locations.length - 1 ? ", " : ""}
          </span> 
      )}
    </>
  );

  // Render assignedTo
  const renderAssigned = (assignedTo) => (
    assignedTo ? `${assignedTo.firstName} ${assignedTo.lastName}` : "Unassigned"
  );

  // Render actions
  const renderActions = (work, isAuthorised, user, showModal, navigate) => (
    <>
      <Tooltip title="View Work">
        <Button
            style={{ color: 'grey', border: 'none', margin: '0 5px' }}
            onClick={() => navigate(`/work/details/${work._id}`)}
        >
          <AiFillEye />
        </Button>
      </Tooltip>

      {work?.status === "Complete" ? (
        <Tooltip title="This work has been closed, you cannot edit it!">
          <Button
              style={{ color: 'grey', border: 'none', margin: '0 5px' }}
              onClick={() => navigate(`/edit/work/${work._id}`)}
              disabled={work?.status === "Complete"}
          >
              <BiSolidEditAlt />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title={ isAllowedEdit(work) ? "Edit Work" : "Operation disabled!"}>
            <Button
                style={{ color: 'green', border: 'none', margin: '0 5px' }}
                onClick={() => navigate(`/edit/work/${work._id}`)}
                disabled={!isAllowedEdit(work)}
            >
                <BiSolidEditAlt />
            </Button>
        </Tooltip>
      )}

      {isAuthorised && (
        <Tooltip title={isAuthorised ? "Delete Work" : "Operation disabled!"}>
            <Button
                style={{ color: 'red', border: 'none', margin: '0 5px' }}
                onClick={() => showModal(work)}
                disabled={!["admin", "superadmin"].includes(user?.role)}
            >
                <MdDelete />
            </Button>
        </Tooltip>
      )}
        </>
  );

  // AntD Table Columns
  const columns = [
    {
      title: "Description",
      width: 100,
      fixed: "left",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "description",
      key: "description",
      render: (description) => renderDescription(description),
    },
    {
      title: "Order Number",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "workOrderNumber",
      key: "workOrderNumber",
    },
    {
      title: "Service Type",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "serviceType",
      key: "serviceType",
    },
    {
      title: "Status",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "status",
      key: "status",
      render: renderStatusBagde,
    },
    {
      title: "Tracker",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "tracker",
      key: "tracker",
    },
    {
      title: "Location",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "location",
      key: "location",
      render: renderLocation,
    },
    {
      title: "Assigned To",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: renderAssigned,
    },
    {
      title: "Actions",
      width: 150,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "actions",
      key: "actions",
      render: (_, work) => 
        renderActions(work, isAuthorised, user, showModal, navigate)
    },
  ];

  // Filter searched data
  const filteredWorkOrders = workOrdersArray?.filter((workOrder) => 
    workOrder.workOrderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
        <div className="add-btn">
            <Button 
              style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} 
              onClick={() => navigate("/new/work")}
            >
              New Work
            </Button>
        </div>
        <Search 
          placeholder="Enter work order number to search..."
          type="search"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
        />

        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", margin: "20px" }}>
          <label htmlFor="filterStatus" style={{ fontWeight: "700", marginLeft: "20px" }}>
            Filter By Status:
          </label>
          <select id="filterStatus" onChange={handleStatusChange} style={{ marginLeft: "10px", backgroundColor: "darkgreen", color: "white" }}>
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
        
        <Card>
          <Table
              loading={loading}
              columns={columns}
              dataSource={filteredWorkOrders}
              pagination={false}
              scroll={{ x: 1500, y: 300 }}
              rowKey="_id"
          />
        </Card>

        <Modal
            title="Delete Work"
            open={isModalVisible}
            onOk={handleDelete} 
            onCancel={handleCancel}
            okText="Delete"
            okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
            cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
        >
            <p>Are you sure you want to delete a work order titled: {selectedWorkToDelete?.description}?</p>
        </Modal>
            
        <div className="add-btn">
            <Button 
                onClick={() => navigate(-1)} 
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} 
            >
                Go Back
            </Button>
        </div>
      </>
  )
};

Work.propTypes = {
  workOrdersArray: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool,
  refetch: PropTypes.func,
  handleStatusChange: PropTypes.func,
  searchTerm: PropTypes.string,
  handleSearch: PropTypes.func
};

export default Work;