import { Box, Container, 
  Pagination, Stack
} from "@mui/material";
//import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
//import { useEffect, useState } from "react";
//import { taskLoadAction } from "../redux/actions/workAction";
import CardElement from "../components/CardElement";
import Footer from "../components/Footer";
import LoadingBox from "../components/LoadingBox";

const Home = () => {
  //const { tasks, pages, loading } = useSelector(state => state.loadTasks);
  //const dispatch = useDispatch();

  //const [page, setPage] = useState(1);


  //useEffect(() => {
  //  dispatch(taskLoadAction(page));
  //}, [page]);

  //useEffect(() => {
  //  dispatch(tasksTypeLoadAction());
  //}, []);


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

            {/*<Box sx={{ flex: 5, p:2 }}>
              {
                loading ? 
                <LoadingBox /> :
                tasks && tasks.length === 0 ?
                <>
                  <Box
                    sx={{
                      minHeight: '350px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <h2>No  results Found!</h2>
                  </Box>
                </> :

                tasks && tasks.map((task, i) => (
                  <CardElement
                    key={i}
                    id={task._id}
                    title={task.title}
                    description={task.description}
                    location={task.location}
                  />
                ))
              }

              <Stack spacing={2}>
                <Pagination page={page} count={pages === 0 ? 1 : pages} onChange={(e, value) => setPage(value)} />
              </Stack>
            </Box>*/}
          </Stack>
            </Container>
    </Box>
    <Footer />
    </>
  )
}

export default Home;