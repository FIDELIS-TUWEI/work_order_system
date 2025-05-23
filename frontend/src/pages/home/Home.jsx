import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/images/logo.png";

const Footer = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Typography>
        &copy; {new Date().getFullYear()}. All Rights Reserved. 
      </Typography>
    </div>
  )
}

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style=
      {{ display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh", alignItems: "center",
        justifyContent: "center", 
      }}
    >

      {/* Main Content */}
      <Card
        style={{ 
          width: "400px", 
          padding: "20px", 
          textAlign: "center", 
          borderRadius: "10px",
          boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <img 
          src={Logo}
          alt="logo"
          style={{ width: '80%', height: 'auto' }}
        />

        <Typography.Title level={4}>Work Order Management System</Typography.Title>
        <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} onClick={() => navigate("/login")}>Login</Button>
      </Card>

      <Footer />
    </div>
  )
}

export default Home;