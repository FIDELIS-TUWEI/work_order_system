import Layout from "@/components/Layout"
import ViewAllLocations from "@/pages/admin/locations/ViewAllLocations"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography, message } from "antd"
import { useLocationsQuery } from "@/features/locations/locationSlice";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";


const AllLocations = () => {
    const [page, setPage] = useState(1);
    const { data, isLoading: loading, error, refetch } = useLocationsQuery(page);
    const navigate = useNavigate();

    const { data: locationsArray, pages } = data || {};

    // Handle Errors
    useEffect(() => {
        if (error) {
            message.error("Error occured loading locations data!");
        };
    }, [error]);

    // Function to handle page change
    const handlePageChange = (newPage) => {
        setPage(newPage);
        refetch();
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
            locationsArray={locationsArray}
            refetch={refetch}
        />

        <div className="pagination">
            <Button 
                onClick={jumpToFirstPage} 
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none', marginRight: "10px" }}
                disabled={page === 1}
            >
                First Page
            </Button>
            <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
                <GrFormPrevious />
            </Button>
            <span> Page {page} of {pages}</span>
            <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px', backgroundColor: 'darkgrey' }}>
                <GrFormNext />
            </Button>

            <Button 
                onClick={jumpToLastPage} 
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none', marginLeft: "10px" }}
                disabled={page === pages}
            >
                Last Page
            </Button>
      </div>
    </Layout>
  )
}

export default AllLocations;