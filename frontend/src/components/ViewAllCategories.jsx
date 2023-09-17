import { Button, Card } from "antd";
import {AiFillEye} from "react-icons/ai"
import {BiSolidEditAlt} from "react-icons/bi"

const ViewAllCategories = ({ navigate, loading, categories, user }) => {
    console.log(categories)
  return (
    <div>
        <div className="add-btn">
            <Button
                style={{ color: 'white', backgroundColor: 'darkgreen', border: 'none' }}
                onClick={() => navigate("/new/category")}
            >
                Add Category
            </Button>
        </div>
        
        <Card loading={loading} title="All Categories" style={{ margin: "auto", width: "400px" }}>
            <table>
                <thead>
                    <tr>
                        <th>Categories</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category._id}>
                            <td>{category.categoryTitle}</td>
                            <td className="actions__btn">
                                <Button style={{ color: 'green', border: 'none', margin: '0 5px'}} onClick={() => navigate(`/work/details/${work._id}`)}><AiFillEye/></Button>
                                {
                                    user.role === "admin" || user.role === "superadmin" || user.role === "hod" || user.role === "supervisor" || user.role === "reviewer" ? 
                                    <Button danger style={{ border: 'none'}} 
                                        onClick={() => navigate(`/edit/work/${category._id}`)}
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
    </div>
  )
}

export default ViewAllCategories;