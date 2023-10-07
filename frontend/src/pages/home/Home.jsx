import { Button, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <p>
        &copy; {new Date().getFullYear()} Work Order Management System. All Rights Reserved.
      </p>
    </div>
  )
}

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex" }}>
        <div style={{ flex: 1 }}>
          <img 
            src={Logo}
            alt="logo"
            style={{ width: '80%', height: 'auto' }}
          />
        </div>
        
        { /* Right Side */}
        <div style={{ flex: 1 }}>
          <Card style=
            {{ 
              padding: '20px', textAlign: 'center', 
              fontSize: '1.5rem', fontWeight: 'bold',
              margin: '100px' 
            }}
          >
            <Typography>Home</Typography>
            <Button onClick={() => navigate("/login")}>Login</Button>
          </Card>
      </div>
      </div>
      
      <Footer />
    </div>
    </>
  )
}

export default Home;