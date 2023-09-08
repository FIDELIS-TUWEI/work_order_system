import { Button, Card } from "antd"
import {AiFillEye} from "react-icons/ai"
import {BiSolidEditAlt} from "react-icons/bi"
import { useNavigate } from "react-router-dom"

const Work = ({allWork, user, loading}) => {
  const navigate = useNavigate();

  return (
    <>
        <div className="add-btn">
            <Button 
            style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }} 
            onClick={() => navigate("/new/work")}
            >
            New Work
            </Button>
        </div>

        <Card 
            loading={loading} 
            title="All Work Orders" 
            style={{ margin: "15px" }}
        >
            
        <table>
            <thead>
                <tr>
                <th>Title</th>
                <th>Location</th>
                <th>Service Type</th>
                <th>Category</th>
                <th>Status</th>
                <th>Requested By</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {allWork.map((work) => (
                <tr key={work._id}>
                    <td>{work.title}</td>
                    <td>{work.location && work.location.locationTitle}</td>
                    <td>{work.serviceType}</td>
                    <td>{work.category && work.category.categoryTitle}</td>
                    <td>{work.status}</td>
                    <td>{work.requestedBy.username}</td>
                    <td className="actions__btn">
                    <Button style={{ color: 'green', border: 'none', margin: '0 5px'}} onClick={() => navigate(`/work/details/${work._id}`)}><AiFillEye/></Button>
                    {
                        user.role === "admin" || user.role === "superadmin" || user.role === "hod" || user.role === "supervisor" || user.role === "reviewer" ? 
                        <Button danger style={{ border: 'none'}} 
                            onClick={() => navigate(`/edit/work/${work._id}`)}
                        >
                            <BiSolidEditAlt/>
                        </Button> 
                        : null
                    }
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
            
        </Card>
        
      </>
  )
}

export default Work