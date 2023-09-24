import { message } from 'antd';
import Layout from '../../../components/Layout'
import { useEffect, useState } from 'react'
import { createWorkOrder } from '../../../services/workApi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectToken } from '../../../utils/redux/slices/authSlice'
import { allWorkCategories } from '../../../services/categoryApi'
import NewWork from '../../../components/NewWork';
import { queryLocations } from '../../../services/locationApi';
import axios from 'axios';
const WORK_URL = "/hin";


const CreateWorkOrder = () => {
  const token = useSelector(selectToken);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // function to handle form submit
  const onFinishHandler = async (values) => {
    setLoading(true);
    await createWorkOrder(values);
    navigate('/work/list');
    message.success('Work Order Created Successfully');
    setLoading(false);
  };

  // Function to handle change in location
  const handleLocationChange = (value) => {
    setSelectedLocation(value);
  }

  // Function to get all work Locations from Services Api
  const workLocation = async (query) => {
    const response = await axios.get(`${WORK_URL}/search/location?query=${query}`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = response.data
    setLocation(data)
  };

  // Function to handle change in category
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  }

  // Function to get all categories from Services Api
  const getCategories = async () => {
    const response = await allWorkCategories({
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setCategory(response.data);
  }

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