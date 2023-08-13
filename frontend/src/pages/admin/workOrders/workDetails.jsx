import { Button, Typography } from "antd"
import Layout from "../../../components/Layout"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleWorkOrder } from "../../../services/workApi";


const WorkDetails = () => {
    const [workDetails, setWorkDetails] = useState({});
    const token = useSelector(selectToken);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            getSingleWork(id);
        }
    }, [id]);

    // get work details
    const getSingleWork = async (id) => {
        const res = await getSingleWorkOrder(id, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (res.data) {
            setWorkDetails({...res.data});
        }
    }

    console.log(workDetails);

  return (
    <Layout>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
           Manage Work Details
        </Typography>
        <div>
            <p>Work Id: {id}</p>
            <p>
                Title: {workDetails && workDetails.title}
            </p>
            <Button onClick={() => navigate(-1)}>Back</Button>
        </div>
    </Layout>
  )
}

export default WorkDetails