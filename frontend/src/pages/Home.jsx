import { Box, Card, Container, Stack, Typography, useTheme } from "@mui/material"
import Header from "../components/Header"
import Navbar from "../components/Navbar"

const Home = () => {
  const { palette } = useTheme();
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
            <Box sx={{ flex: 2, p:2 }}>
              <Card sx={{ minWidth:150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pn: 2 }}>
                  <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                    Filter Tasks by Category
                  </Typography>
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 5, p:2 }}></Box>
          </Stack>
        </Container>
    </Box>
    </>
  )
}

export default Home