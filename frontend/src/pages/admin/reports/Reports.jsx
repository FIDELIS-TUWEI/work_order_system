import Layout from "../../../components/Layout";
import InprogressWork from "./InprogressWork";

import { Typography } from "antd";

const Reports = () => {

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Reports</Typography>
      <InprogressWork />
      
    </Layout>
  )
}

export default Reports;