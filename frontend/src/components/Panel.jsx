import { Button, Card, Col, Row } from "antd"
import { useNavigate } from "react-router-dom";
import {FaUsers} from 'react-icons/fa';
import {BiSolidCategory} from "react-icons/bi";
import {IoLocation} from "react-icons/io5";
import {HiOfficeBuilding} from "react-icons/hi";



const Panel = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Row gutter={16}>
            <Col span={8}>
                <Card bordered={false} title="Users">
                    <Button onClick={() => navigate("/users/all")}> 
                        <FaUsers/>
                        Users
                    </Button>
                </Card>
                </Col>
            <Col span={8}>
                <Card bordered={false} title="Categories">
                    <Button onClick={() => navigate("/all-categories")}> 
                        <BiSolidCategory />
                        Categories
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card bordered={false} title="Locations">
                    <Button onClick={() => navigate("/all-locations")}>
                        <IoLocation />
                        Locations
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card bordered={false} title="All Departments">
                    <Button onClick={() => navigate("/all-departments")}>
                        <HiOfficeBuilding />
                        Departments
                    </Button>
                </Card>
            </Col>
        </Row>
        
    </div>
  )
}

export default Panel