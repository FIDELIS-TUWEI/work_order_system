import { Typography } from "antd"
import Layout from "@/components/Layout"
import BarGraph from "./BarGraph"

const Analytics = () => {
  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>Work Order Analytics</Typography>
      <BarGraph />
    </Layout>
  )
}

export default Analytics