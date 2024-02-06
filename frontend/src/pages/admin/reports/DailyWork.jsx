import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import AllDailyWork from "./AllDailyWork";
import jsPDF from "jspdf";
import Logo from "@/assets/images/logo.png";
import moment from "moment";
import { message } from "antd";

const serverUrl = import.meta.env.VITE_SERVER_URL;

const DailyWork = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [workOrders, setWorkOrders] = useState([]);

    // Function to handle date selected
    const handleDateSelect = async (value) => {
        setSelectedDate(value)
        const formattedDate = value.format("YYYY-MM-DD")

        try {
            const res = await axios.get(`${serverUrl}/work/created/date/${formattedDate}`, {
              withCredentials: true
            });
            setWorkOrders(res.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Function to generate pdf
    const exportPDF = async () => {
        const doc = new jsPDF({ orientation: "landscape" });

        // Calculate the center position of the logo
        const centerX = doc.internal.pageSize.width / 2;

        // Add company logo centered
        const imgData = Logo;
        const logoWidth = 30;
        const logoHeight = 30;
        const logoX = centerX - logoWidth / 2;
        doc.addImage(imgData, "PNG", logoX, 10, logoWidth, logoHeight);

        // Add report generation date
        const reportDate = moment().format("DD-MM-YYYY, hh:mm a");
        doc.setFontSize(6);
        doc.text(`${reportDate}`, 10, 20);

        const initialTableY = 50;

        doc.setFontSize(12);
        doc.text("Daily Work Created Report", 15, initialTableY - 10);

        // Report table columns
        const columns = [
            {
                header: "Description",
                dataKey: "description",
            },
            {
              header: "Service Type",
              dataKey: "serviceType",
            },
            {
              header: "Priority",
              dataKey: "priority",
            },
            {
              header: "Category",
              dataKey: "category",
            },
            {
              header: "Tracker",
              dataKey: "tracker",
            },
            {
              header: "Date Requested",
              dataKey: "Date_Created",
            },
            {
              header: "Assigned To",
              dataKey: "assignedTo",
            },
            {
              header: "Supervisor",
              dataKey: "supervisedBy",
            },
            {
              header: "Date Completed",
              dataKey: "dateCompleted",
            },
        ];

        // Format date work added
        const formatDate = (date) => moment(date).format("DD-MM-YYYY, hh:mm a");

        // Format Date Completed
        const formatDateCompleted = (date) => (date ? formatDate(date) : "Noy yet Complete");

        // Display employee assigned
        const showEmployeeName = (employee) => (employee ? `${employee.firstName} ${employee.lastName}` : "Unassigned");

        // Table rows
        const rows = workOrders.map((workOrder) => [
            workOrder.description,
            workOrder.serviceType,
            workOrder.priority,
            `${workOrder.category.categoryTitle}`,
            workOrder.tracker,
            formatDate(workOrder.Date_Created),
            showEmployeeName(workOrder.assignedTo),
            workOrder.supervisedBy,
            formatDateCompleted(workOrder.dateCompleted),
        ]);

        doc.autoTable({
            head: [columns.map((col) => col.header)],
            body: rows,
            startY: initialTableY,
        });

        doc.save("Daily-Work.pdf");
        message.success("Report Generated Succesfully");
    }

  return (
    <Layout>
        <AllDailyWork 
            selectedDate={selectedDate}
            handleDateSelect={handleDateSelect}
            workOrders={workOrders}
            exportPDF={exportPDF}
        />
    </Layout>
  )
}

export default DailyWork;