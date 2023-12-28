import PropTypes from "prop-types"
import { Button, Modal, Table, Tooltip, message } from "antd";
import {MdDelete} from "react-icons/md";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { selectToken } from "../utils/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { deleteCategory } from "../services/categoryApi";

const ViewAllCategories = ({ 
    navigate, loading, categories, 
    page, pages, handlePageChange, getCategories
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState(null);
    const token = useSelector(selectToken);

    // Function to show modal to delete category
    const showModal = async (category) => {
        setSelectedCategoryToDelete(category);
        setIsModalVisible(true);
    };

    // Function to confirm modal delete
    const handleDelete = async () => {
        try {
            await deleteCategory(selectedCategoryToDelete._id, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            message.success("Category deleted successfully");
            setIsModalVisible(false);
            getCategories();
        } catch (error) {
            console.error(error);
            message.error("An error occurred while deleting the category", error);
        }
    };

    // Function to handle modal cancel
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Antd table columns
    const columns = [
        {
            title: "Category",
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "categoryTitle",
            key: "categoryTitle",
        },
        {
            title: "Actions",
            align: "center",
            responsive: ["md", "lg"],
            render: (_, category) => (
                <Tooltip title="Delete Category">
                    <Button
                        danger
                        style={{ border: "none" }}
                        onClick={() => showModal(category)}
                    >
                        <MdDelete />
                    </Button>
                </Tooltip>
            )
        }
    ];
    
  return (
    <div>
        <div className="add-btn">
            <Button
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
                onClick={() => navigate("/new/category")}
            >
                Add Category
            </Button>
        </div>
        
        <Table 
            loading={loading}
            columns={columns}
            dataSource={categories}
            rowKey="_id"
            pagination={false}
        />

            <Modal 
                title="Confirm Delete Category" 
                open={isModalVisible} 
                onOk={handleDelete} 
                onCancel={handleCancel}
                okText="Delete"
                okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
                cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
            >
                <p>Are you sure you want to delete a category titled: {selectedCategoryToDelete?.categoryTitle}?</p>
            </Modal>

        <div className="pagination">
            <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
                <GrFormPrevious />
            </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'lightgrey' }}>
          <GrFormNext />
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
    </div>
  )
};

ViewAllCategories.propTypes = {
    navigate: PropTypes.func,
    loading: PropTypes.bool,
    categories: PropTypes.array,
    page: PropTypes.number,
    pages: PropTypes.number,
    handlePageChange: PropTypes.func,
    getCategories: PropTypes.func
};

export default ViewAllCategories;