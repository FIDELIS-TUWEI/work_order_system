import Layout from "../../../components/Layout";
import PendingWork from "./PendingWork";

import { Typography } from "antd";

const Reports = () => {

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Reports</Typography>
      <PendingWork />
      
    </Layout>
  )
}

export default Reports;