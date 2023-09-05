import { useEffect, useState } from "react";
import { getDailyCounts } from "../../../services/reportsApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import moment from "moment";

const Daily = () => {
    const token = useSelector(selectToken);
    const [reports, setReports] = useState([]);
    
    // Function to get daily report from API Service
    const dailyReport = async () => {
        const { data } = await getDailyCounts({
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setReports(data);
        console.log(data);
    }
    console.log(reports);

    useEffect(() => {
        dailyReport();
    })
  return (
    <div>
        <h3>Daily Report</h3>
        <table>
            <thead>
                <tr>
                    <th>Work Id</th>
                    <th>Work Title</th>
                    <th>Work Service Type</th>
                    <th>Date</th>
                    <th>Total Work Orders</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report) => (
                    <tr key={report._id}>
                        <td>{report._id}</td>
                        <td>{report.title}</td>
                        <td>{report.serviceType}</td>
                        <td>{moment(report.Date_Created).format("DD/MM/YYYY")}</td>
                        <td>{report.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Daily