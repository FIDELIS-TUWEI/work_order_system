import { useSelector } from "react-redux"
import Layout from "../../../components/Layout"
import ViewAllLocations from "../../../components/ViewAllLocations"
import { selectToken } from "../../../features/auth/authSlice"
import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { allLocations } from "../../../services/locationApi"
import { Typography, message } from "antd"

const AllLocations = () => {
    const token = useSelector(selectToken);
    const [locations, setLocations] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to get all Work Locations
    const getLocations = useCallback (async () => {
        try {
            setLoading(true);
            const { data, pages } = await allLocations(page, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setLocations(data);
            setPages(pages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            message.error("Failed to fetch locations", error.message);
        }
    }, [token, page]);

    // UseEffect hook
    useEffect(() => {
        getLocations();
    }, [page, getLocations]);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Function to jump to first page
    const jumpToFirstPage = () => {
        if (page !== 1) {
            handlePageChange(1);
        }
    }

    // Function to jump to the last page
    const jumpToLastPage = () => {
        if (page !== pages) {
            handlePageChange(pages);
        }
    }

  return (
    <Layout>
      <Typography style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>All Locations</Typography>
        <ViewAllLocations 
            navigate={navigate}
            loading={loading}
            locations={locations}
            page={page}
            pages={pages}
            handlePageChange={handlePageChange}
            getLocations={getLocations}
            jumpToLastPage={jumpToLastPage}
            jumpToFirstPage={jumpToFirstPage}
        />
    </Layout>
  )
}

export default AllLocations;