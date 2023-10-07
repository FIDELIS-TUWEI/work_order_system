import { Button, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1 }}>
        <img 
          src={Logo}
          alt="logo"
          style={{ width: '90%', height: 'auto' }}
        />
      </div>
      <div style={{ flex: 1 }}>
        <Card>
          <Typography>Home</Typography>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </Card>
      </div>
    </div>
    </>
  )
}

export default Home;