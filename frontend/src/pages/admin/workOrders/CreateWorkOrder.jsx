import { message } from 'antd';
import Layout from "@/components/Layout";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserInfo } from "@/features/auth/authSlice"
import NewWork from "@/pages/admin/workOrders/NewWork";
import { useCreateWorkMutation } from "@/features/work/workSlice";
import { useQueryAllLocationsQuery } from '@/features/locations/locationSlice';
import { useQueryAllCategoriesQuery } from '@/features/categories/categorySlice';


const CreateWorkOrder = () => {
  const [addWork, { isLoading: loading }] = useCreateWorkMutation();
  const { data: locations } = useQueryAllLocationsQuery();
  const { data: categories } = useQueryAllCategoriesQuery();
  const user = useSelector(selectUserInfo);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // Logic to check the data being fetched is an array
  const locationsArray = locations?.data || [];
  const categoriesArray = categories?.data || [];

  const authorisedAccess = user?.role === "admin" || user?.role === "superadmin" || user?.role === "supervisor" || user?.role === "hod" || user?.role === "reviewer" || user?.role === "engineer";

  // function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      const { error } = await addWork(values).unwrap();

      if (error) {
        if (error.status === 400 && error?.message) {
          message.error(error.message);
          navigate("/work/list");
        } else {
          message.error("Failed to create new work order!");
        }
      } else {
        message.success('Work Order Created Successfully');
        if (authorisedAccess) {
          navigate("/work/list");
        } else {
          navigate("/private");
        }
      } 
      
    } catch (error) {
      message.error("Failed to create new work order!");
    }
  };

  // Function to handle change in location
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  }

  // Function to handle change in category
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  }

  return (
    <Layout>
      <NewWork 
        loading={loading} 
        onFinishHandler={onFinishHandler}
        selectedLocation={selectedLocation}
        selectedCategory={selectedCategory}
        handleLocationChange={handleLocationChange}
        handleCategoryChange={handleCategoryChange} 
        navigate={navigate}
        locationsArray={locationsArray}
        categoriesArray={categoriesArray}
      />
    </Layout>
  )
};

export default CreateWorkOrder;