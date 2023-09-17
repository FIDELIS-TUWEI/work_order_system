import { Button, Card } from "antd";
import {MdDelete} from "react-icons/md";
import {BiSolidEditAlt} from "react-icons/bi";
import {GrFormNext, GrFormPrevious} from "react-icons/gr";

const ViewAllCategories = ({ navigate, loading, categories, user, page, pages, handlePageChange }) => {
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
        
        <Card loading={loading} title="All Categories" style={{ margin: "auto", width: "500px" }}>
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
                                <Button style={{ color: "green", border: 'none', marginRight: "8px" }} 
                                    onClick={() => navigate(`/edit/work/${category._id}`)}
                                >
                                    <BiSolidEditAlt/>
                                </Button> 

                                <Button danger style={{ border: "none" }}>
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
    </div>
  )
}

export default ViewAllCategories;