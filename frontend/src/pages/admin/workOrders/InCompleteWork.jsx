import { selectUserInfo } from "@/features/auth/authSlice";
import { useInCompleteWorkQuery } from "@/features/work/workSlice";
import { Button, Typography, message } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Layout from "@/components/Layout";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import ViewInCompleteWork from "./ViewInCompleteWork";

const InCompleteWork = () => {
    const user = useSelector(selectUserInfo);
    const [page, setPage] = useState(1);
    const { data, isLoading: loading, error, refetch } = useInCompleteWorkQuery({ page });

    const { data: workArray, pages } = data || {};

    // Handle errors
    useEffect(() => {
        if (error) {
            message.error("An error occured loading In-complete work data!")
        }
    }, [error]);

    // Handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
        refetch();
    }
  return (
    <Layout>
        <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
            In Complete Work
        </Typography>

        <ViewInCompleteWork 
            workArray={workArray}
            loading={loading}
            user={user}
            refetch={refetch}
        />

        <div className="pagination">
            <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
            <GrFormPrevious />
            </Button>
            <span> Page {page} of {pages}</span>
            <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
            <GrFormNext />
            </Button>
        </div>
    </Layout>
  )
}

export default InCompleteWork;