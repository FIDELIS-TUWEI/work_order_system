import { useState } from "react";
import CreateLocation from "../../../components/CreateLocation"
import Layout from "../../../components/Layout"
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useCreateLocationMutation } from "../../../utils/redux/slices/locationSlice";

const NewLocation = () => {
    const [addLocation] = useCreateLocationMutation();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to handle form submit
    const onFinishHandler = async (values) => {
        try {
          setLoading(true);
          const { error } = await addLocation(values);

          if (error) {
            if (error.status === 400 && error.data && error.data.message) {
              message.error(error.data.message);
              navigate("/all-locations");
            } else {
              message.error("Failed to create new location");
            }
          } else {
            navigate("/all-locations");
            message.success("New Location Created Succesfully");
            setLoading(false);
          }
        } catch (error) {
          message.error(error.message);
        }
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