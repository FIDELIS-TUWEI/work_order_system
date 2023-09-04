import { Button, Card } from "antd"
import Layout from "../../../components/Layout"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleWorkOrder } from "../../../services/workApi";
import moment from "moment";

const WorkDetails = () => {
    const [workDetails, setWorkDetails] = useState([]);
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        const res = await getSingleWorkOrder(id, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setWorkDetails({...res.data});
        setLoading(false);
    }

  return (
    <Layout>
        <Card loading={loading} title="Work Details" style={{ margin: 'auto', width: '500px' }}>
            <p>Work Id: {id}</p>
            <p>
                Title: {workDetails && workDetails.title}
            </p>
            
            <p>
                Work Service Type: {workDetails && workDetails.serviceType}
            </p>
            
            <p>
                Work Status: {workDetails && workDetails.status}
            </p>
            <p>
                Requested Date: {moment(workDetails && workDetails.Date_Created).format("DD/MM/YYYY, hh:mm a")}
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
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none'}} onClick={() => navigate(-1)}>Back</Button>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}>Print</Button>
            <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}>Delete</Button>
            </div>
            
        </Card>
    </Layout>
  )
}

export default WorkDetails