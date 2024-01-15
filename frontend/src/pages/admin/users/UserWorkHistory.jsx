import { Button, Card, Table, Typography } from "antd";
import Layout from "@/components/Layout";
import { useSelector } from "react-redux";
import { selectToken } from "@/features/auth/authSlice";
import { useCallback, useEffect, useState } from "react";
import { getUserInfo } from "../../../services/usersApi";
import { useNavigate, useParams } from "react-router-dom";

const UserWorkHistory = () => {
    const token = useSelector(selectToken);
    const [userData, setUserData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const userDataArray = userData?.workOrders || [];

    // Function to get user data
    const getUserData = useCallback (async () => {
        try {
            setLoading(true);
            const res = await getUserInfo(id, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(res.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
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
            title: "Description",
            responsive: ["md", "lg"],
            align: "center",
            dataIndex: "description",
            key: "description",
            
        },
        {
            title: "Status",
            responsive: ["md", "lg"],
            align: "center",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Tracker",
            responsive: ["md", "lg"],
            align: "center",
            dataIndex: "tracker",
            key: "tracker",
        }
    ]

  return (
    <Layout>
        <Typography 
            style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}
        >
            Work History
        </Typography>

        <Card>
        <Table 
            columns={columns}
            dataSource={userDataArray}
            rowKey="_id"
            loading={loading}
            pagination={false}
        />
        </Card>
      <Typography.Text>Total Work Orders: {userData?.workOrders?.length} </Typography.Text>
      <div className="add-btn">
        <Button 
            onClick={() => navigate(-1)} 
            style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
        >
            Back
        </Button>
      </div>
    </Layout>
  )
};

export default UserWorkHistory;