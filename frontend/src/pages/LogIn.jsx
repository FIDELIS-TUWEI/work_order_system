import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button, Card, Form, Input } from 'antd';


import { useLoginMutation } from "../utils/redux/slices/usersApiSlice";
import { setCredentials } from "../utils/redux/slices/authSlice";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";


const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector(state => state.auth);

    // useEffect to check if user is logged in
    useEffect(() => {
        if (userInfo) {
            navigate('/private');
        }
    }, [userInfo, navigate]);

    const onFinishHandler = async (values) => {
        try {
            const res = await login(values).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Login Succesful");
            navigate('/private');
        } catch (error) {
            toast.error(error.data.error);
        }
    }

  return (
    <>
        <div className="form-container">
            <Form onFinish={onFinishHandler} layout="vertical">
                <Card title="Log In" style={{ width: "300px", margin: "auto", textAlign: "center" }}>
                    <Form.Item name="username" label="Username">
                        <Input 
                            id="username" 
                            type="text"
                            placeholder="Username" 
                        />
                    </Form.Item>

                    <Form.Item name="password" label="Password">
                        <Input 
                            id="password" 
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    { isLoading && <LoadingBox /> }

                    <Button type="primary" htmlType="submit">Log In</Button>
                </Card>
            </Form>
        </div>
    </>
  )
}

export default LogIn;