import PropTypes from "prop-types"
import { Button, Card, Modal, Table, Tooltip, Typography, message } from "antd";
import {MdDelete} from "react-icons/md";
import { useState } from "react";
import { useDeleteCategoryMutation } from "@/features/categories/categorySlice";
import { useParams } from "react-router-dom";
import { BiSolidEditAlt } from "react-icons/bi";

const ViewAllCategories = ({ navigate, loading, categories, refetch }) => {
    const {id} = useParams();
    const [deleteCategory] = useDeleteCategoryMutation(id)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategoryToDelete, setSelectedCategoryToDelete] = useState(null);

    // Function to show modal to delete category
    const showModal = async (category) => {
        setSelectedCategoryToDelete(category);
        setIsModalVisible(true);
    };

    // Function to confirm modal delete
    const handleDelete = async () => {
        try {
            const { error } = await deleteCategory(selectedCategoryToDelete._id).unwrap();

            if (error) {
                if (error === 400 && error?.data?.message) {
                    message.error(error.data.message)
                } else {
                    message.error("Failed to delete Category with ID!")
                }
            } else {
                message.success("Category deleted successfully");
                setIsModalVisible(false);
                refetch();
            }
        } catch (error) {
            message.error("Failed to delete Category with ID!");
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
                <>
                    <Tooltip title="Edit Category">
                        <Button
                            style={{ color: 'green', border: 'none', margin: '0 5px' }}
                            onClick={() => navigate(`/edit/category/${category._id}`)}

                        >
                            <BiSolidEditAlt />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Delete Category">
                        <Button
                            danger
                            style={{ border: "none" }}
                            onClick={() => showModal(category)}
                        >
                            <MdDelete />
                        </Button>
                    </Tooltip>
                </>
            )
        }
    ];
    
  return (
    <>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            All Categories
        </Typography>
        <div>
            <div className="add-btn">
                <Button
                    style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
                    onClick={() => navigate("/new/category")}
                >
                    Add Category
                </Button>
            </div>
            
            <Card>
                <Table 
                    loading={loading}
                    columns={columns}
                    dataSource={categories}
                    rowKey="_id"
                    pagination={false}
                    scroll={{ x: 1500, y: 300 }}

                />
            </Card>

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

        <div className="add-btn">
            <Button 
            onClick={() => navigate(-1)} 
            style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} 
            >
            Go Back
            </Button>
        </div>
        </div>
    </>
  )
};

ViewAllCategories.propTypes = {
    navigate: PropTypes.func,
    loading: PropTypes.bool,
    categories: PropTypes.array,
    refetch: PropTypes.func
};

export default ViewAllCategories;