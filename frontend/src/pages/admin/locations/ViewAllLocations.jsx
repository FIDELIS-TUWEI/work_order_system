import PropTypes from "prop-types";
import { Button, Card, Modal, Table, Tooltip, message } from "antd";
import { useState } from "react";
import {MdDelete} from "react-icons/md";
import { useParams } from "react-router-dom";
import { useDeleteLocationMutation } from "@/features/locations/locationSlice";

const ViewAllLocations = ({ navigate, loading, locationsArray, refetch }) => {
    const { id } = useParams();
    const [deleteLocation] = useDeleteLocationMutation(id);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedLocationToDelete, setSelectedLocationToDelete] = useState(null);

    // Function to show modal to delete category
    const showModal = async (location) => {
        setSelectedLocationToDelete(location);
        setIsModalVisible(true);
    };

    // Function to confirm modal delete
    const handleDelete = async () => {
        try {
            const { error } = await deleteLocation(selectedLocationToDelete._id).unwrap();

            if (error) {
                if (error.status === 400 && error.data && error.data.message) {
                    message.error(error.data.message);
                } else {
                    message.error("Failed to delete location");
                }
            } else {
                message.success("Location deleted successfully");
                setIsModalVisible(false);
                refetch();
            }
        } catch (error) {
            console.error(error);
            message.error("An error occurred while deleting the location", error);
        }
    };

    // Function to handle modal cancel
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Antd Table Columns
    const columns = [
        {
            title: "Location",
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "locationTitle",
            key: "locationTitle",
        },
        {
            title: "Action",
            align: "center",
            responsive: ["md", "lg"],
            key: "action",
            render: (_, location) => (
                <Tooltip title="Delete Location">
                    <Button
                        danger
                        style={{ border: "none" }}
                        onClick={() => showModal(location)}
                    >
                        <MdDelete />
                    </Button>
                </Tooltip>
            ),
        }
    ]

  return (
    <>
        <div className="add-btn">
            <Button
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
                onClick={() => navigate("/new/location")}
            >
                Add Location
            </Button>
        </div>

        <Card>
            <Table 
                loading={loading}
                columns={columns}
                dataSource={locationsArray}
                rowKey="_id"
                pagination={false}
                scroll={{ y: 300 }}
            />
        </Card>

        <Modal
            title="Delete Location"
            open={isModalVisible}
            onOk={handleDelete} 
            onCancel={handleCancel}
            okText="Delete"
            okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
            cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
        >
            <p>Are you sure you want to delete a location titled: {selectedLocationToDelete?.locationTitle}?</p>
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

ViewAllLocations.propTypes = {
    navigate: PropTypes.func,
    loading: PropTypes.bool,
    locationsArray: PropTypes.array,
    refetch: PropTypes.func,
};

export default ViewAllLocations;