import { apiSlice } from "../slices/apiSlice";
const USERS_URL = "/hin";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => `${USERS_URL}/all-users`,
        })
    })
})

export const { useGetUsersQuery } = usersApiSlice