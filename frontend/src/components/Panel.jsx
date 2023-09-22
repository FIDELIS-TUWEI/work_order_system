import { Button, Card, Col, Row, Typography } from "antd"
import { useNavigate } from "react-router-dom";
import {FaUsers, FaUserPlus} from 'react-icons/fa';
import {BiSolidCategory} from "react-icons/bi";


const Panel = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Row gutter={16}>
            <Col span={8}>
                <Card bordered={false}>
                    <Typography>Users</Typography>
                    <Button onClick={() => navigate("/users/all")}> 
                        <FaUsers/>
                        Users
                    </Button>
                </Card>
                </Col>
            <Col span={8}>
                <Card bordered={false}>
                    <Typography>Categories</Typography>
                    <Button onClick={() => navigate("/all-categories")}> 
                        <BiSolidCategory />
                        Categories
                    </Button>
                </Card>
            </Col>
        </Row>
        
    </div>
  )
}

export default Panel