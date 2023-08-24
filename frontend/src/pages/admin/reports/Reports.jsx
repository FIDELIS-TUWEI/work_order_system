import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import PendingWork from "./PendingWork";
import InprogressWork from "./InprogressWork";
import CompleteWork from "./CompleteWork";
import ReviewedWork from "./ReviewedWork";
import { Button } from "antd";

const Reports = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <h1>Reports</h1>
      <PendingWork />
      <InprogressWork />
      <CompleteWork />
      <ReviewedWork />
    </Layout>
  )
}

export default Reports;