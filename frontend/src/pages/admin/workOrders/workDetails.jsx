import { message } from "antd"
import Layout from "@/components/Layout";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ViewWorkDetails from "@/pages/admin/workOrders/ViewWorkDetails";
import { useSingleWorkQuery } from "@/features/work/workSlice";

const WorkDetails = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const { data: workDetails, isLoading, error } = useSingleWorkQuery(id);
    const componentPDF = useRef();

     // check if the workDetails is an array
     const workDetailsArray = workDetails?.data || [];

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
        <ViewWorkDetails 
        workDetailsArray={workDetailsArray} 
        isLoading={isLoading} 
        error={error}
        componentPDF={componentPDF} 
        handlePrint={handlePrint}
        navigate={navigate}
    />
    </Layout>
  )
}

export default WorkDetails