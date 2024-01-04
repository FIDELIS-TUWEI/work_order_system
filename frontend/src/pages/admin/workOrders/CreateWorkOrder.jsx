import { message } from 'antd';
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice'
import { queryCategories } from '../../../services/categoryApi'
import NewWork from '../../../components/NewWork';
import { queryLocations } from '../../../services/locationApi';
import { useCreateWorkMutation } from '../../../utils/redux/slices/workSlice';


const CreateWorkOrder = () => {
  const [addWork] = useCreateWorkMutation();
  const user = useSelector(selectUserInfo);
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const authorisedAccess = user?.role === "admin" || user?.role === "superadmin" || user?.role === "supervisor" || user?.role === "hod" || user?.role === "reviewer" || user?.role === "engineer";

  // function to handle form submit
  const onFinishHandler = async (values) => {
    try {
      setLoading(true);
      const { error } = await addWork(values);

      if (error) {
        if (error.status === 400 && error.data && error.data.message) {
          message.error(error.data.message);
        } else {
          message.error("Failed to create new work order");
        }
      } else {
        message.success('Work Order Created Successfully');
        if (authorisedAccess) {
          navigate("/work/list");
        } else {
          navigate("/private");
        }
      } 
      
      setLoading(false);
    } catch (error) {
      message.error(error.message);
    }
  };

  // Function to handle change in location
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  }

  // Function to get all work Locations from Services Api
  const workLocation = async () => {
    try {
      const response = await queryLocations({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setLocation(response.data);
    } catch (error) {
      message.error("Error while fetching all locations query", error.message);
    }
  };

  // Function to handle change in category
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  }

  // Function to get all categories from Services Api
  const getCategories = async () => {
    try {
      const response = await queryCategories({
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategory(response.data);
    } catch (error) {
      message.error("Error while fetching all categories", error.message);
    }
  };

  // UseEffect hook
  useEffect(() => {
    workLocation();
    getCategories();
  }, []);

  return (
    <Layout>
      <NewWork 
        loading={loading} 
        category={category} 
        location={location} 
        onFinishHandler={onFinishHandler}
        selectedLocation={selectedLocation}
        selectedCategory={selectedCategory}
        handleLocationChange={handleLocationChange}
        handleCategoryChange={handleCategoryChange} 
        navigate={navigate}
        workLocation={workLocation}
      />
    </Layout>
  )
};

export default CreateWorkOrder;