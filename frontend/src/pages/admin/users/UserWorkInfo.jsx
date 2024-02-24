import PropTypes from "prop-types";
import { Button, Card, Table, Typography, message } from "antd";

const UserWorkInfo = ({ userHistoryArray, navigate, loading, error }) => {

    // antD Table dataSource
    const tableData = userHistoryArray?.workOrders || [];

    // Handle errors
    if (error) {
        message.error(error.message);
    }

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
    <>
       <Typography 
            style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: "16px" }}
        >
            Work History
        </Typography>

        <Card>
            <Table 
                columns={columns}
                dataSource={tableData}
                rowKey="_id"
                loading={loading}
                pagination={false}
                scroll={{ x: 1500, y: 300 }}
            />
        </Card>

      <Typography.Text>Total Work Orders: {userHistoryArray?.workOrders?.length} </Typography.Text>
      
      <div className="add-btn">
        <Button 
            onClick={() => navigate(-1)} 
            style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
        >
            Back
        </Button>
      </div>
    </>
  )
};

UserWorkInfo.propTypes = {
    userHistoryArray: PropTypes.array,
    navigate: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.object
}

export default UserWorkInfo;