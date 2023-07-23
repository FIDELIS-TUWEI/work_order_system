import { Box
} from "@mui/material";
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
      <Navbar />
      <Header />
      <Footer />
    </Box>
  );
};

export default Home;