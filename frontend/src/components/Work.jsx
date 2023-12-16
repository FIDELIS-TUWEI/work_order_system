import PropTypes from "prop-types";
import { Button, Modal, message, Tooltip, Badge, Table } from "antd"
import {AiFillEye} from "react-icons/ai"
import {BiSolidEditAlt} from "react-icons/bi"
import {MdDelete} from "react-icons/md";
import { useNavigate } from "react-router-dom"
import { selectToken } from "../utils/redux/slices/authSlice"
import { useSelector } from "react-redux"
import { deleteWorkOrder } from "../services/workApi"
import { useState } from "react";


const Work = ({allWork, user, loading, getAllWork }) => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedWorkToDelete, setSelectedWorkToDelete] = useState(null);
  const token = useSelector(selectToken);

  // Function to show modal to delete work
  const showModal = async (work) => {
      setSelectedWorkToDelete(work);
      setIsModalVisible(true);
  };

  // Function to confirm modal delete
  const handleDelete = async () => {
      try {
          await deleteWorkOrder(selectedWorkToDelete._id, {
              withCredentials: true,
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
          message.success("Work deleted successfully");
          setIsModalVisible(false);
          getAllWork();
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

  // AntD Table Columns
  const columns = [
    {
      title: "Title",
      width: 100,
      fixed: "left",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "title",
      key: "title",
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
      render: (status) => (
          <Badge
            color={
              status === "Pending"
                ? "grey"
                : status === "In_Progress"
                ? "yellow"
                : status === "Complete"
                ? "green"
                : "default"
            }
            text={status}
          />
      ),
    },
    {
      title: "Location",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "location",
      key: "location",
      render: (locations) => (
          <>
              {Array.isArray(locations) && locations.map((location, index) =>
                  <span key={location._id}>
                      {location.locationTitle}
                      {index < locations.length - 1 ? ", " : ""}
                  </span> 
              )}
          </>
      ),
    },
    {
      title: "Assigned To",
      width: 100,
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (assignedTo) => (
          assignedTo ? `${assignedTo.firstName} ${assignedTo.lastName}` : "Unassigned"
      ),
    },
    {
      title: "Actions",
      width: 100,
      fixed: "right",
      align: "center",
      responsive: ["md", "lg"],
      dataIndex: "actions",
      key: "actions",
      render: (_, work) => (
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
      ),      
    },
  ]

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
            dataSource={allWork}
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
  allWork: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool,
  getAllWork: PropTypes.func
};

export default Work;