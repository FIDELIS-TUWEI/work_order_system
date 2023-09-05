import { useEffect, useState } from "react";
import { getDailyReport } from "../../../services/reportsApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import moment from "moment";

const Daily = () => {
    const token = useSelector(selectToken);
    const [reports, setReports] = useState([]);
    
    // Function to get daily report from API Service
    const dailyReport = async () => {
        const {data} = await getDailyReport({
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setReports(data);
    }

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
                    <th>Work Status</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {reports.map((report) => (
                    <tr key={report._id}>
                        <td>{report._id}</td>
                        <td>{report.title}</td>
                        <td>{report.serviceType}</td>
                        <td>{report.status}</td>
                        <td>{moment(report.Date_Created).format("DD/MM/YYYY")}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Daily