import { Button, Card, Col, Row } from "antd"
import { useNavigate } from "react-router-dom";
import {FaUsers} from 'react-icons/fa';
import {BiSolidCategory} from "react-icons/bi";
import {IoLocation} from "react-icons/io5";
import {HiOfficeBuilding} from "react-icons/hi";
import {MdManageAccounts, MdGroups} from "react-icons/md";

const Panel = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Row gutter={16}>
            <Col span={8}>
                <Card className="custom-card" hoverable title="Users" onClick={() => navigate("/users/all")}>
                    <Button icon={<FaUsers />} size="large" style={{ color: 'black', backgroundColor: 'white', border: 'none' }}> 
                        Users
                    </Button>
                </Card>
                </Col>
                <Col span={8}>
                <Card className="custom-card" hoverable title="Work Orders" onClick={() => navigate("/all/employees")}>
                    <Button icon={<MdGroups />} size="large" style={{ color: 'black', backgroundColor: 'white', border: 'none' }}> 
                        Employees
                    </Button>
                </Card>
                </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="Categories" onClick={() => navigate("/all-categories")}>
                    <Button icon={<BiSolidCategory />} size="large" style={{ color: 'black', backgroundColor: 'white', border: 'none' }}> 
                        Categories
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="Locations" onClick={() => navigate("/all-locations")}>
                    <Button icon={<IoLocation />} size="large" style={{ color: 'black', backgroundColor: 'white', border: 'none' }}>
                        Locations
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="All Departments" onClick={() => navigate("/all/departments")}>
                    <Button icon={<HiOfficeBuilding />} size="large" style={{ color: 'black', backgroundColor: 'white', border: 'none' }}>
                        Departments
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="All Designations" onClick={() => navigate("/all/designations")}>
                    <Button icon={<MdManageAccounts />} size="large" style={{ color: 'black', backgroundColor: 'white', border: 'none' }}>
                        Designations
                    </Button>
                </Card>
            </Col>
        </Row>
        
    </div>
  )
};

export default Panel;