import Layout from "../../../components/Layout";
import Daily from "./Daily";
import WorkReport from "./WorkReport";

import { Typography } from "antd";

const Reports = () => {

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Reports</Typography>
      <Daily />
      
    </Layout>
  )
}

export default Reports;