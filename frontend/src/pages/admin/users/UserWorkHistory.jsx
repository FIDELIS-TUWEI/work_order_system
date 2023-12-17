import { Table, Typography } from "antd";
import Layout from "../../../components/Layout";
import { useSelector } from "react-redux";
import { selectToken } from "../../../utils/redux/slices/authSlice";
import { useCallback, useEffect, useState } from "react";
import { getUserInfo } from "../../../services/usersApi";
import { useParams } from "react-router-dom";

const UserWorkHistory = () => {
    const token = useSelector(selectToken);
    const [userData, setUserData] = useState([]);
    const { id } = useParams();

    // Function to get user data
    const getUserData = useCallback (async () => {
        try {
            const res = await getUserInfo(id, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(res.data);
        } catch (error) {
            message.error("Failed to fetch user details", error.message);
        }
    }, [token]);


    // useEffect hook
    useEffect(() => {
        if (id) {
            getUserData(id);
        }
    }, [id, getUserData]);

    // antd Columns
    const columns = [
        {
            title: "Title",
            width: 100,
            fixed: "left",
            align: "center",
            responsive: ["md", "lg"],
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            responsive: ["md", "lg"],
            align: "center",
        },
    ]

  return (
    <Layout>
        <Typography 
            style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}
        >
            Work History
        </Typography>

        <Table 
            columns={columns}
            dataSource={userData?.workOrders}
            rowKey="_id"
            pagination={false}
        />
    </Layout>
  )
};

export default UserWorkHistory;