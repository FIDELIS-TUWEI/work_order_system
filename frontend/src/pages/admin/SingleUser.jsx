import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleUser } from "../../utils/redux/slice/userSlice";
import axios from "axios";


const SingleUser = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${URL}/user/${users._id}`);
                dispatch(singleUser(response.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, []);

  return (
    <>
        { users.map((user) => {
            return (
                <div key={user._id}>
                    <h1>{user.name}</h1>
                </div>
            )
        }) }
    </>
  )
}

export default SingleUser