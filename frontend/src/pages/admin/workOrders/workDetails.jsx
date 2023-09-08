import { message } from "antd"
import Layout from "../../../components/Layout"
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleWorkOrder } from "../../../services/workApi";
import { useReactToPrint } from "react-to-print";
import ViewWorkDetails from "../../../components/ViewWorkDetails";

const WorkDetails = () => {
    const [workDetails, setWorkDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = useSelector(selectToken);
    const navigate = useNavigate();
    const {id} = useParams();
    const componentPDF = useRef();

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

    // Function to print work details
    const handlePrint = useReactToPrint({
        content: () => componentPDF.current,
        documentTitle: "Work Details",
        onAfterPrint: () => {
            navigate("/work/list")
            message.success("Work Details Printed Successfully");
        },
        pageStyle: "print",

    });

  return (
    <Layout>
        <ViewWorkDetails workDetails={workDetails} loading={loading} 
        componentPDF={componentPDF} 
        handlePrint={handlePrint}
        navigate={navigate}
    />
    </Layout>
  )
}

export default WorkDetails