import { Card } from "antd";
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <Card style={{ margin: "auto", width: "200px", display: "flex", justifyContent: "center" }}>
      <h1>Home</h1>
      <Link to="/login">Login</Link>
    </Card>
  )
}

export default Home;