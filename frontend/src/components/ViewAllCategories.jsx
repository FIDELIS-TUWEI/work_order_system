import PropTypes from "prop-types"
import { Button, Card, Modal, message } from "antd";
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
        
        <Card loading={loading} title="All Categories">
            <table>
                <thead>
                    <tr>
                        <th>Categories</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td>{category.categoryTitle}</td>
                            <td className="actions__btn">
                                <Button danger style={{ border: "none" }}
                                    onClick={() => showModal(category)}
                                >
                                    <MdDelete />
                                </Button>  
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

        </Card>
        <div className="pagination">
            <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px' }}>
                <GrFormPrevious />
            </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px' }}>
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
}

export default ViewAllCategories;