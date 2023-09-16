import Layout from "../../../components/Layout";
import WorkReport from "../../../components/WorkReport";

import { Typography } from "antd";

const Reports = () => {

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Reports</Typography>
      <WorkReport />
      
    </Layout>
  )
}

export default Reports;