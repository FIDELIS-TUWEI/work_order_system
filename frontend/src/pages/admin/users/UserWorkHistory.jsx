import Layout from "@/components/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "@/features/users/userSlice";
import UserWorkInfo from "./UserWorkInfo";

const UserWorkHistory = () => {
    const { id } = useParams();
    const { data: userHistory, isLoading: loading, error } = useGetSingleUserQuery(id);
    const navigate = useNavigate();

    const userHistoryArray = userHistory?.data || [];

  return (
    <Layout>
        <UserWorkInfo 
            userHistoryArray={userHistoryArray}
            navigate={navigate}
            loading={loading}
            error={error}
        />
    </Layout>
  )
};

export default UserWorkHistory;