import { Button, Card, Col, DatePicker, Form, Input, Row, Typography } from "antd"
import Layout from "../../../components/Layout"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleWorkOrder } from "../../../services/workApi";
const WORK_URL = "/hin";


const WorkDetails = () => {
    const [workDetails, setWorkDetails] = useState({});
    const token = useSelector(selectToken);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchWorkDetails = async () => {
            const response = await axios.get(`${WORK_URL}/single/work/${id}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setWorkDetails(response.data);
        }
        fetchWorkDetails();
    }, []);

    console.log(workDetails);

  return (
    <Layout>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
           Manage Work Details
        </Typography>
        <div>
            <p>
                Title: {workDetails.title}
            </p>
        </div>
    </Layout>
  )
}

export default WorkDetails