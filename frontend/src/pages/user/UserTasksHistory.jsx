import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { userProfileAction } from "../../redux/actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import CardElement from "../../components/CardElement";


const UserTasksHistory = () => {
    const { user } = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userProfileAction());
    }, []);
     
  return (
    <>
        <Box>
            <Typography variant="h4" sx={{ color: "#fafafa" }}> Tasks History </Typography>

            <Box>
                {
                    user && user.tasksHistory.map((history, i) => (
                        <CardElement
                            key={i}
                            id={history._id}
                            taskTitle={history.title}
                            description={history.description}
                            category=""
                            location={history.location}
                        />
                    ))
                }
            </Box>
        </Box>
        
    </>
  )
}

export default UserTasksHistory;