import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form, Input, Statistic, Typography, message } from 'antd';


import { useLoginMutation } from "@/features/auth/authApiSlice";
import { selectToken, selectUserInfo, setCredentials } from "@/features/auth/authSlice";
import LoadingBox from "@/components/LoadingBox";
import { useEffect, useState } from "react";
import moment from "moment";


const LogIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userInfo = useSelector(selectUserInfo);
    const token = useSelector(selectToken);

    const [maintenance, setMaintenance] = useState(false);
    const [isDepreciation, setIsDepreciation] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(false);

    const [login, { isLoading, error }] = useLoginMutation();


    useEffect(() => {
        if (!userInfo && !token) {
            navigate('/');
        }
    }, [userInfo, navigate, token]);

    const checkMaintenanceStatus = () => {
        const maintenanceStatus = false;
        setMaintenance(maintenanceStatus);
    };

    const checkDepreciationStatus = () => {
        const depreciationDate = moment('2024-05-26');
        const now = moment();
        const remainingTime = depreciationDate.diff(now);

        if (remainingTime <= 0) {
            setIsDepreciation(true);
            setTimeRemaining(0);
        } else {
            setTimeRemaining(remainingTime);
        }
    }

    useEffect(() => {
        checkMaintenanceStatus()
        checkDepreciationStatus();

        const timer = setInterval(checkDepreciationStatus, 1000);
        return () => clearInterval(timer);
    }, []);

    

    const onFinishHandler = async (values) => {
        if (maintenance) {
            message.error("The System is currently under maintenance. Please try again later.");
            return;
        }

        if (isDepreciation) {
            message.error("The system is discontinued. You cannot log in.")
        }

        try {
            const res = await login(values).unwrap();

            if (error) {
                switch (error.statusCode) {
                    case 401:
                        message.error("Incorrect username or password!");
                        break;
                    case 500:
                        message.error("Server Error, Please try again later!");
                        break;
                    default:
                        message.error("An Unknown error occured");
                }
            } else {
                dispatch(setCredentials({ ...res }));
                message.success("Login Succesful");
                navigate('/private');
            };
        } catch (error) {
            message.error("Invalid username or password!");
        }
    };

    const deadline = moment('2024-05-26').toISOString();

  return (
    <div className="form-container">
        <Form onFinish={onFinishHandler} layout="vertical">
            <Card title="Log In" style={{ width: "450px", margin: "auto", textAlign: "center" }}>

                <Alert 
                    message="Notice of System Discontinuance!"
                    description="Kindly note that this system has been discontinued for maintenance."
                    type="warning"
                    showIcon
                    style={{ marginBottom: '1rem' }}
                />

                {timeRemaining !== null && !isDepreciation && (
                    <Statistic.Countdown 
                        title="Time remaining until discontinuation"
                        value={deadline}
                        onFinish={() => setIsDepreciation(true)}
                        format="D [days] H [hours] m [minutes]"
                        style={{ marginBottom: '1rem' }}
                    />
                )}

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

                <Button 
                    style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} 
                    htmlType="submit" 
                    disabled={maintenance || isLoading || isDepreciation}
                >
                    Log In
                </Button>
                { maintenance && <Typography style={{ color: "red", marginTop: "1rem", textAlign: "center" }}>The system is currently under maintenance. Please try again later</Typography> }
            </Card>
        </Form>
    </div>
  )
};

export default LogIn;