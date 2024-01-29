import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, message } from 'antd';


import { useLoginMutation } from "@/features/auth/authApiSlice";
import { selectToken, selectUserInfo, setCredentials } from "@/features/auth/authSlice";
import LoadingBox from "@/components/LoadingBox";
import { useEffect } from "react";


const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userInfo = useSelector(selectUserInfo);
    const token = useSelector(selectToken);

    const [login, { isLoading, error }] = useLoginMutation();


    useEffect(() => {
        if (!userInfo && !token) {
            navigate('/login');
        }
    }, [userInfo, navigate, token]);

    

    const onFinishHandler = async (values) => {
        try {
            const res = await login(values).unwrap();

            if (error) {
                if (error === 400 && error.data && error.data.message) {
                    message.error(error.data.message);
                } else {
                    message.error("Failed to Login, try again later!")
                }
            } else {
                dispatch(setCredentials({ ...res }));
                message.success("Login Succesful");
                navigate('/private');
            };
        } catch (error) {
            message.error("Unable to login, please try again later", error);
        }
    }

  return (
    <div className="form-container">
        <Form onFinish={onFinishHandler} layout="vertical">
            <Card title="Log In" style={{ width: "300px", margin: "auto", textAlign: "center" }}>
                <Form.Item name="username" label="Username" required rules={[{ required: true, message: 'Please input your username!' }]}>
                    <Input 
                        id="username" 
                        type="text"
                        placeholder="Username" 
                    />
                </Form.Item>

                <Form.Item name="password" label="Password" required rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input 
                        id="password" 
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <div className="loader">
                    { isLoading && <LoadingBox /> }
                </div>

                <Button style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} htmlType="submit">Log In</Button>
            </Card>
        </Form>
    </div>
  )
};

export default LogIn;