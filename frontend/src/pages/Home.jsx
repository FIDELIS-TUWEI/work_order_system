import { Box, Container, 
  Pagination, Stack
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import Header from "../components/Header"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react";
import { taskLoadAction } from "../redux/actions/workAction";
import CardElement from "../components/CardElement";
import Footer from "../components/Footer";
import LoadingBox from "../components/LoadingBox";
//import { data.tasksTypeLoadAction } from "../redux/actions/data.tasksTypeAction";

const Home = () => {
  const { data, pages, loading } = useSelector(state => state.loadTasks);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);


  useEffect(() => {
    dispatch(taskLoadAction(page));
  }, [page]);

  //useEffect(() => {
  //  dispatch(data.tasksTypeLoadAction());
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
            {/*<Box sx={{ flex: 2, p:2 }}>
              <Card sx={{ minWidth:150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                    Filter data.taskss by Category
                  </Typography>
                </Box>
                <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />

              </Card>

              <Card sx={{ minWidth:150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography component="h4" sx={{ color: palette.secondary.main, fontWeight: 600 }}>
                    Filter data.taskss by Location
                  </Typography>
                  <MenuList>
                    {
                      setUniqueLocation && setUniqueLocation.map((location, i) => (
                        <MenuItem key={i}>
                          <ListItemIcon>
                            <LocationOnIcon sx={{ color: palette.secondary.main, fontSize: 18 }} />
                          </ListItemIcon>
                          <Link to={`/search/location/${location}`}>{location}</Link>
                        </MenuItem>
                      ))
                    }
                  </MenuList>
                  </Box>
                <SelectComponent handleChangeCategory={handleChangeCategory} cat={cat} />

              </Card>
            </Box>*/}
            <Box sx={{ flex: 5, p:2 }}>
              {
                loading ? 
                <LoadingBox /> :
                data && data.length === 0 ?
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

                data && data.map((tasks, i) => (
                  <CardElement
                    key={i}
                    id={data.tasks._id}
                    title={data.tasks.title}
                    description={data.tasks.description}
                    //data.tasksType={data.data.tasksType ? data.data.tasksType.data.tasksTypeName : "No category"}
                    location={data.tasks.location}
                  />
                ))
              }

              <Stack spacing={2}>
                <Pagination page={page} count={pages === 0 ? 1 : pages} onChange={(e, value) => setPage(value)} />
              </Stack>
            </Box>
          </Stack>
            </Container>
    </Box>
    <Footer />
    </>
  )
}

export default Home;