import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input } from 'antd';


import { useLoginMutation } from "../utils/redux/slices/authApiSlice";
import { selectToken, selectUserInfo, setCredentials } from "../utils/redux/slices/authSlice";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { useEffect } from "react";


const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector(selectToken);

    const [login, { isLoading }] = useLoginMutation();

    const userInfo = useSelector(selectUserInfo);

    useEffect(() => {
        if (!userInfo && !token) {
            navigate('/login');
        }
    }, [userInfo, navigate, token]);

    

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

                    <Button type="primary" htmlType="submit">Log In</Button>
                </Card>
            </Form>
        </div>
    </>
  )
}

export default LogIn;