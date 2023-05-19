import AddUser from "./AddUser";
import DeleteUser from "./DeleteUsers";
import UpdateUser from "./UpdateUsers";

const UserList = () => {
    return ( 
        <>
            <AddUser />
            <UpdateUser />
            <DeleteUser />
        </>
     );
}
 
export default UserList;