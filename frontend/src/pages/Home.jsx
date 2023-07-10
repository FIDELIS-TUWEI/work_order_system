import { Box, Container, Stack
} from "@mui/material";
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer";

const Home = () => {

  return (
    <>
    <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <Navbar />
        <Header />

        <Container>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >

          </Stack>
            </Container>
    </Box>
    <Footer />
    </>
  )
}

export default Home;