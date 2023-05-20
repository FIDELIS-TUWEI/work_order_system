import { useState } from "react";

import { FormControl, FormGroup, InputLabel, Input, Typography, styled, Button } from "@mui/material";

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

const AddUser = () => {

    // state
    const [user, setUser] = useState(initialState);

    // function to handle input change
    const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // function to add user
    const addUserDetails = () => {
        
    }

    return ( 
        <Container>
            <Typography variant="h5">New User</Typography>
            <FormControl>
                <InputLabel>Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="name" />
            </FormControl>
            <FormControl>
                <InputLabel>Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="username" />
            </FormControl>
            <FormControl>
                <InputLabel>Password</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="password" />
            </FormControl>
            <FormControl>
                <Button variant="contained" onClick={() => addUserDetails()}>Add User</Button>
            </FormControl>
            
        </Container>
    );
}
 
export default AddUser;