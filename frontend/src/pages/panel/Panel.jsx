import { Button, Card, Col, Row } from "antd"
import { useNavigate } from "react-router-dom";
import {FaFolder, FaUsers} from 'react-icons/fa';
import {BiSolidCategory} from "react-icons/bi";
import {IoLocation} from "react-icons/io5";
import {HiOfficeBuilding} from "react-icons/hi";
import {MdManageAccounts, MdGroups} from "react-icons/md";
import { FaMapLocationDot, FaUsersLine } from "react-icons/fa6";

const Panel = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Row gutter={16}>
            <Col span={8}>
                <Card className="custom-card" hoverable title="Users" onClick={() => navigate("/users/all")}>
                    <Button icon={<FaUsers />} size="large" style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}> 
                        Users
                    </Button>
                </Card>
                </Col>
                <Col span={8}>
                <Card className="custom-card" hoverable title="Employees" onClick={() => navigate("/all/employees")}>
                    <Button icon={<FaUsersLine />} size="large" style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}> 
                        Employees
                    </Button>
                </Card>
                </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="Categories" onClick={() => navigate("/all-categories")}>
                    <Button icon={<FaFolder />} size="large" style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}> 
                        Categories
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="Locations" onClick={() => navigate("/all-locations")}>
                    <Button icon={<FaMapLocationDot />} size="large" style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}>
                        Locations
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="All Departments" onClick={() => navigate("/all/departments")}>
                    <Button icon={<HiOfficeBuilding />} size="large" style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}>
                        Departments
                    </Button>
                </Card>
            </Col>
            <Col span={8}>
                <Card className="custom-card" hoverable title="All Designations" onClick={() => navigate("/all/designations")}>
                    <Button icon={<MdManageAccounts />} size="large" style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}>
                        Designations
                    </Button>
                </Card>
            </Col>
        </Row>
        
    </div>
  )
};

export default Panel;