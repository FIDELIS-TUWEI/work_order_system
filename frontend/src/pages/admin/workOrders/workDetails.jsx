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
    const [workDetails, setWorkDetails] = useState([]);
    const token = useSelector(selectToken);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getWorkDetails();
    }, []);

    const getWorkDetails = async () => {
        let res = await getSingleWorkOrder({
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }, id);
        setWorkDetails(res.data);
    };

    console.log(workDetails);

  return (
    <Layout>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
           Manage Work Details
        </Typography>
        {
            workDetails.map((work) => (
                <div key={work._id}>
                    <h2>{work.title}</h2>

                </div>
            ))
        }
    </Layout>
  )
}

export default WorkDetails