import { Box } from "@mui/material"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const NotFound = () => {
  return (
    <>
      <Navbar />
      <Box sx={{ height: '81vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h1>Page Not Found!</h1>
      </Box>
      <Footer />
    </>
  )
}

export default NotFound