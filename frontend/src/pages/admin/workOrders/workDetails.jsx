import { Button, Card, Typography } from "antd"
import Layout from "../../../components/Layout"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleWorkOrder } from "../../../services/workApi";


const WorkDetails = () => {
    const [workDetails, setWorkDetails] = useState([]);
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
        setWorkDetails({...res.data});
    }

  return (
    <Layout>
        <Card title="Work Details" style={{ margin: 'auto', width: '300px' }}>
            <p>Work Id: {id}</p>
            <p>
                Title: {workDetails && workDetails.title}
            </p>
            <p>
                Work Location: {workDetails && workDetails.location}
            </p>
            <p>
                Work Service Type: {workDetails && workDetails.serviceType}
            </p>
            <p>
                Category : {workDetails && workDetails.category}
            </p>
            <p>
                Work Status: {workDetails && workDetails.status}
            </p>
            <p>
                Requested Date: {workDetails && workDetails.date}
            </p>
            <p>
                Work Requested Time: {workDetails && workDetails.time}
            </p>
            <p>
                Assigned To: {workDetails && workDetails.assignedTo}
            </p>
            <p>
                Date Completed: {workDetails && workDetails.dateCompleted}
            </p>
            <p>
                Reviewed: {workDetails && workDetails.reviewed === true ? "Yes" : "No"}
            </p>
            <p>
                Reviewed By: {workDetails && workDetails.reviewedBy}
            </p>
            <p>
                Date Reviewed: {workDetails && workDetails.dateReviewed}
            </p>
            <Button onClick={() => navigate(-1)}>Back</Button>
        </Card>
    </Layout>
  )
}

export default WorkDetails