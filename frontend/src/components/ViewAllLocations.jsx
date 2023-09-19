import { Button, Card } from "antd";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";
import {MdDelete} from "react-icons/md";

const ViewAllLocations = ({ navigate, loading, 
    locations, page, pages, handlePageChange, getLocations 
}) => {
    

  return (
    <>
        <div className="add-btn">
            <Button
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
                onClick={() => navigate("/new/location")}
            >
                Add Location
            </Button>
        </div>

        <Card loading={loading} title="All Locations" style={{ margin: "auto", width: "500px" }}>
            <table>
                <thead>
                    <tr>
                        <th>Locations</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {locations.map((location) => (
                        <tr key={location._id}>
                            <td>{location.locationTitle}</td>
                            <td className="actions__btn">
                                <Button danger style={{ border: "none" }}
                                    onClick={() => showModal(location)}
                                >
                                    <MdDelete />
                                </Button>  
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Card>
        <div className="pagination">
            <Button disabled={page === 1} onClick={() => handlePageChange(page - 1)} style={{ border: 'none', margin: '0 5px' }}>
                <GrFormPrevious />
            </Button>
        <span> Page {page} of {pages}</span>
        <Button disabled={page === pages} onClick={() => handlePageChange(page + 1)} style={{ border: 'none', margin: '0 5px' }}>
          <GrFormNext />
        </Button>
      </div>
    </>
  )
}

export default ViewAllLocations