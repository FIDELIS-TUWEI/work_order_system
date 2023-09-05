import { useEffect, useState } from "react";
import { getDailyCounts } from "../../../services/reportsApi";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import moment from "moment";
import { getAllWorkOrders } from "../../../services/workApi";
import { format } from "date-fns";
import { useTable, useFilters } from "react-table";

const Daily = () => {
    const token = useSelector(selectToken);
    const [workOrders, setWorkOrders] = useState([]);
    const [filteredWorkOrders, setFilteredWorkOrders] = useState([]);
    const [filterType, setFilterType] = useState("daily");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getWorkOrders();
    }, []);

    // Function to get All work orders from API Service
    const getWorkOrders = async () => {
        setLoading(true);
        const { data } = await getAllWorkOrders({
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setWorkOrders(data);
        setLoading(false);
    };

    useEffect(() => {
        // Filter work orders based on the selected filter type
        const currentDate = new Date();
        const filtered = workOrders.filter((work) => {
            const orderDate = new Date(work.Date_Created);
            if (filterType === "daily") {
                return format(orderDate, "YYYY-MM-DD") === format(currentDate, "YYYY-MM-DD");
            } else if (filterType === "weekly") {
                return (
                    format(orderDate, "YYYY-MM-DD") >= format(currentDate, "YYYY-MM-DD") &&
                    format(orderDate, "YYYY-MM-DD") <= format(addDays(currentDate, 7), "YYYY-MM-DD")
                );
            } else if (filterType === "monthly") {
                return format(orderDate, "YYYY-MM") === format(currentDate, "YYYY-MM");
            } else {
                return true;
            }
        });
        setFilteredWorkOrders(filtered);
    }, [workOrders, filterType]);

    // Define table columns and data
    const columns = [
        {
            Header: "Date",
            accessor: "Date_Created",
        },
        {
            Header: "Total",
            accessor: "Total",
        },
        {
            Header: "Completed",
            accessor: "Completed",
        }
    ];

    const data = filteredWorkOrders.map((work) => {
        return {
            _id: work._id,
        };
    });

    // Initialize table instance
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
        {
            columns,
            data,
        },
        useFilters
    );
    
  return (
    <div>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
        </select>

        <table {...getTableProps()} style={{ border: '1px solid black' }}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Daily