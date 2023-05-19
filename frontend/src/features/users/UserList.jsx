/* eslint-disable react/jsx-no-undef */
import { useGetUsersQuery } from "./usersApiSlice";

const UsersList = () => {

    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error,
    } = useGetUsersQuery()

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = users;

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Roles</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}

export default UsersList;