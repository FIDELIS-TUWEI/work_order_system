import { useSelector } from "react-redux"
import Layout from "../../../components/Layout"
import ViewAllLocations from "../../../components/ViewAllLocations"
import { selectToken } from "../../../utils/redux/slices/authSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { allLocations } from "../../../services/locationApi"

const AllLocations = () => {
    const token = useSelector(selectToken);
    const [locations, setLocations] = useState([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [lastPage, setLastPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to get all Work Locations
    const getLocations = async () => {
        setLoading(true);
        const { data, pages } = await allLocations(page, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLocations(data);
        setPages(pages);
        setLastPage(pages - 1)
        setLoading(false);
    }

    // UseEffect hook
    useEffect(() => {
        getLocations();
    }, [page]);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    // Function to jump to the last page
    const jumpToLastPage = () => {
        setPage(lastPage);
    }

  return (
    <Layout>
        <ViewAllLocations 
            navigate={navigate}
            loading={loading}
            locations={locations}
            page={page}
            pages={pages}
            handlePageChange={handlePageChange}
            getLocations={getLocations}
            jumpToLastPage={jumpToLastPage}
        />
    </Layout>
  )
}

export default AllLocations