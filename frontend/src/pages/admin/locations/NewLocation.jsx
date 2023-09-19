import { useState } from "react";
import CreateLocation from "../../../components/CreateLocation"
import Layout from "../../../components/Layout"
import { useNavigate } from "react-router-dom";
import { createNewLocation } from "../../../services/locationApi";

const NewLocation = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle form submit
    const onFinishHandler = async (values) => {
        setLoading(true);
        await createNewLocation(values);
        navigate("/all-locations");
        message.success("New Location Created Succesfully");
        setLoading(false);
    }

  return (
    <Layout>
        <CreateLocation 
            onFinishHandler={onFinishHandler}
            loading={loading}
            navigate={navigate}
        />
    </Layout>
  )
}

export default NewLocation;