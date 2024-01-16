import Layout from "@/components/Layout"
import BarGraph from "./BarGraph"
import { useQueryAllWorkQuery } from "@/features/work/workSlice";

const Analytics = () => {
  const { data: workOrders, isLoading: loading, error } = useQueryAllWorkQuery();

  // Check and ensure workOrders?.data is an array
  const workDataArray = workOrders?.data || [];

  return (
    <Layout>

      <BarGraph 
        workDataArray={workDataArray}
        loading={loading}
        error={error}
      />

    </Layout>
  )
};

export default Analytics;