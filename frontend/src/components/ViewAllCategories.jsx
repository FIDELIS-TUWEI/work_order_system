import { Button, Card, Form, Input, Modal, message } from "antd";
import {MdDelete} from "react-icons/md";
import {BiSolidEditAlt} from "react-icons/bi";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import { selectToken } from "../utils/redux/slices/authSlice";
import { useSelector } from "react-redux";
import { useState } from "react";
import { deleteCategory, editCategory } from "../services/categoryApi";

const ViewAllCategories = ({ 
    navigate, loading, categories, 
    page, pages, handlePageChange, getCategories
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState(null);
    const [selectedCategoryToEdit, setSelectedCategoryToEdit] = useState(null);
    const [isModalEditVisible, setIsModalEditVisible] = useState(false);
    const token = useSelector(selectToken);

    // Function to show modal to edit category
    const showEditModal = async (category) => {
        setSelectedCategoryToEdit(category);
        setIsModalEditVisible(true);
    }

    // Function to show modal to delete category
    const showModal = async (category) => {
        setSelectedCategoryToDelete(category);
        setIsModalVisible(true);
    };

    // Function to confirm modal edit
    const handleEdit = async () => {
        try {
            await editCategory(selectedCategoryToEdit._id, {categoryTitle: selectedCategoryToEdit.categoryTitle}, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSelectedCategoryToEdit(editCategory);
            message.success("Category edited successfully");
            setIsModalEditVisible(false);
            getCategories();
        } catch (error) {
            console.error(error);
            message.error("An error occurred while editing the category", error);
        }
    }

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
        setIsModalEditVisible(false);
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
        
        <Card loading={loading} title="All Categories" style={{ margin: "auto", width: "500px" }}>
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
                                <Button style={{ color: "green", border: 'none', marginRight: "8px" }}
                                    onClick={() => showEditModal(category)}
                                >
                                    <BiSolidEditAlt/>
                                </Button> 

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
                title="Confirm Edit Category"
                open={isModalEditVisible}
                onOk={handleEdit}
                onCancel={handleCancel}
                okText="Edit"
                okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
                cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
            >
                <p>Are you sure you want to Edit this category?</p>
                <Form layout="vertical" onFinish={handleEdit}>
                    <Form.Item>
                        <Input 
                            value={selectedCategoryToEdit ? selectedCategoryToEdit.categoryTitle : ""}
                            onChange={(e) => setSelectedCategoryToEdit({...selectedCategoryToEdit, categoryTitle: e.target.value})}
                        />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal 
                title="Confirm Delete Category" 
                open={isModalVisible} 
                onOk={handleDelete} 
                onCancel={handleCancel}
                okText="Delete"
                okButtonProps={{ style: { backgroundColor: 'green', border: 'none' } }}
                cancelButtonProps={{ style: { backgroundColor: 'red', border: 'none', color: 'white' } }}
            >
                <p>Are you sure you want to delete this category?</p>
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
    </div>
  )
}

export default ViewAllCategories;