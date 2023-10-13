import { Button, Card, Modal, message } from "antd";
import { useState } from "react";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {MdDelete} from "react-icons/md";
import { useSelector } from "react-redux";
import { selectToken } from "../utils/redux/slices/authSlice";
import { deleteLocation } from "../services/locationApi";

const ViewAllLocations = ({ navigate, loading, 
    locations, page, pages, handlePageChange, getLocations, jumpToLastPage, jumpToFirstPage
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedLocationToDelete, setSelectedLocationToDelete] = useState(null);
    const token = useSelector(selectToken);

    // Function to show modal to delete category
    const showModal = async (location) => {
        setSelectedLocationToDelete(location);
        setIsModalVisible(true);
    };

    // Function to confirm modal delete
    const handleDelete = async () => {
        try {
            await deleteLocation(selectedLocationToDelete._id, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success("Location deleted successfully");
            setIsModalVisible(false);
            getLocations();
        } catch (error) {
            console.error(error);
            message.error("An error occurred while deleting the location", error);
        }
    };

    // Function to handle modal cancel
    const handleCancel = () => {
        setIsModalVisible(false);
    };

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

        <Card loading={loading} title="All Locations">
            <table>
                <thead>
                    <tr>
                        <th>Locations</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location._id}>
                            <td>{location.locationTitle}</td>
                            <td className="actions__btn">
                                <Button danger style={{ border: "none" }}
                                    onClick={() => showModal(location)}
                                >
                                    <MdDelete />
                                </Button>  
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
        </Card>
        <div className="pagination">
            <Button 
                onClick={jumpToFirstPage} 
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none', marginRight: "10px" }}
                disabled={page === 1}
            >
                First Page
            </Button>
            <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px' }}>
                <GrFormPrevious />
            </Button>
            <span> Page {page} of {pages}</span>
            <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px' }}>
                <GrFormNext />
            </Button>

            <Button 
                onClick={jumpToLastPage} 
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none', marginLeft: "10px" }}
                disabled={page === pages}
            >
                Last Page
            </Button>
      </div>

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
}

export default ViewAllLocations;