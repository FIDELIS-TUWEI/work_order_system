import { useNavigate } from "react-router-dom";
import Layout from "../../../components/Layout";
import PendingWork from "./PendingWork";
import InprogressWork from "./InprogressWork";
import CompleteWork from "./CompleteWork";
import ReviewedWork from "./ReviewedWork";
import { Typography } from "antd";

const Reports = () => {

  return (
    <Layout>
      <Typography>Reports</Typography>
      <PendingWork />
      <InprogressWork />
      <CompleteWork />
      <ReviewedWork />
    </Layout>
  )
}

export default Reports;