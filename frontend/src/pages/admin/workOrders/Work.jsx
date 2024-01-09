import PropTypes from "prop-types";
import { Button, Modal, message, Tooltip, Badge, Table } from "antd"
import {AiFillEye} from "react-icons/ai"
import {BiSolidEditAlt} from "react-icons/bi"
import {MdDelete} from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom"
import { useState } from "react";
import { useDeleteWorkMutation } from "@/features/work/workSlice";


const Work = ({workOrdersArray, user, loading, }) => {
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
              if (error.status === 400 && error.data && error.data.message) {
                  message.error(error.data.message);
              } else {
                  message.error("Failed to delete work order");
              }
          } else {
            message.success("Work deleted successfully");
            setIsModalVisible(false);
          }
      } catch (error) {
          console.error(error);
          message.error("An error occurred while deleting the work order", error);
      }
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Function to check if user is authorised to view, edit or delete work
  const isAuthorised = [
    "admin", "superadmin", "supervisor", "hod", "engineer", "reviewer"
  ].includes(user?.role);

  // Status badge colors
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "red";
      case "In_Progress":
        return "yellow";
      case "Complete":
        return "green";
      default:
        return "default";
    }
  };

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

      {work.reviewed === true ? (
        <Tooltip title="This work has been reviewed, you cannot edit it!">
          <Button
              style={{ color: 'grey', border: 'none', margin: '0 5px' }}
              onClick={() => navigate(`/edit/work/${work._id}`)}
              disabled={work.reviewed === true}
          >
              <BiSolidEditAlt />
          </Button>
        </Tooltip>
      ) : (
        <Tooltip title="Edit Work">
            <Button
                style={{ color: 'green', border: 'none', margin: '0 5px' }}
                onClick={() => navigate(`/edit/work/${work._id}`)}
            >
                <BiSolidEditAlt />
            </Button>
        </Tooltip>
      )}

      {isAuthorised && (
        <Tooltip title={isAuthorised ? "Delete Work" : "You are not authorised to delete this work"}>
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
    },
    {
      title: "Service Type",
      width: 100,
      fixed: "left",
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
      width: 100,
      fixed: "right",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "actions",
      key: "actions",
      render: (_, work) => 
        renderActions(work, isAuthorised, user, showModal, navigate)
    },
  ];

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

        <Table
            loading={loading}
            columns={columns}
            dataSource={workOrdersArray}
            pagination={false}
            scroll={{ x: 1500, y: 300 }}
            rowKey="_id"
        />

        <Modal
            title="Delete Work"
            open={isModalVisible}
            onOk={handleDelete} 
            onCancel={handleCancel}
            okText="Delete"
            okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
            cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
        >
            <p>Are you sure you want to delete a work order titled: {selectedWorkToDelete?.title}?</p>
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
};

export default Work;