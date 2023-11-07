import { message } from 'antd';
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import { createWorkOrder } from '../../../services/workApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken, selectUserInfo } from '../../../utils/redux/slices/authSlice'
import { allWorkCategories } from '../../../services/categoryApi'
import NewWork from '../../../components/NewWork';
import { queryLocations } from '../../../services/locationApi';


const CreateWorkOrder = () => {
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
      await createWorkOrder(values);
      if (authorisedAccess) {
        navigate("/work/list");
      } else {
        navigate("/private");
      }
      message.success('Work Order Created Successfully');
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
      const response = await allWorkCategories({
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
}

export default CreateWorkOrder