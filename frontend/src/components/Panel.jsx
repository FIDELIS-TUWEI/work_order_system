import { Button, Card, Col, Row } from "antd"
import { useNavigate } from "react-router-dom";
import {FaUsers} from 'react-icons/fa';
import {BiSolidCategory} from "react-icons/bi";
import {IoLocation} from "react-icons/io5";
import {HiOfficeBuilding} from "react-icons/hi";
import {MdManageAccounts} from "react-icons/md";



const Panel = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Row gutter={16}>
            <Col span={8}>
                <Card className="custom-card" hoverable title="Users" onClick={() => navigate("/users/all")}>
                    <Button icon={<FaUsers />} size="large"> 
                        Users
                    </Button>
                </Card>
                </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="Categories" onClick={() => navigate("/all-categories")}>
                    <Button icon={<BiSolidCategory />} size="large"> 
                        Categories
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="Locations" onClick={() => navigate("/all-locations")}>
                    <Button icon={<IoLocation />} size="large">
                        Locations
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="All Departments" onClick={() => navigate("/all/departments")}>
                    <Button icon={<HiOfficeBuilding />} size="large">
                        Departments
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="All Designations" onClick={() => navigate("/all/designations")}>
                    <Button icon={<MdManageAccounts />} size="large">
                        Designations
                    </Button>
                </Card>
            </Col>
        </Row>
        
    </div>
  )
}

export default Panel