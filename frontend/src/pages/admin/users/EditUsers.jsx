import { useEffect, useState } from "react";

import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button } from "@mui/material";

import { editUser, getUser } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled(FormGroup) `
    width: 50%;
    margin: 5% auto 0 auto;
    &  > div {
        margin-top: 20px
    }
`

// initialState values
const initialState = {
    name: "",
    username: "",
    password: ""
}

const EditUser = () => {

    // state
    const [user, setUser] = useState(initialState);

    const navigate = useNavigate();

    // useParams
    const { id } = useParams()

    // useEeffect hook DidMount 
    useEffect(() => {
        loadUserDetails();
    }, []);

    // function to load user details
    const loadUserDetails = async () => {
        const response = await getUser(id);
        setUser(response.data);
    }


    // function to handle input change
    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // function to edit user
    const editUserDetails = async () => {
        await editUser(user, id);
        navigate("/allusers");
    }

    return ( 
        <Container>
            <Typography variant="h5">Edit User</Typography>
            <FormControl>
                <InputLabel>Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="name" value={user.name} />
            </FormControl>
            <FormControl>
                <InputLabel>Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="username" value={user.username} />
            </FormControl>
            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="password" value={user.password} />
            </FormControl>
            <FormControl>
                <Button variant="contained" onClick={() => editUserDetails()}>Update User</Button>
            </FormControl>
            
        </Container>
    );
}

export default EditUser;