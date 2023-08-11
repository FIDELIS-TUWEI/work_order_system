import { apiSlice } from "../slices/apiSlice";
const USERS_URL = "/hin";


export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: `${ USERS_URL }/all-users`,
                method: "GET",
                keepUnusedDataFor: 5 * 60 * 1000
            }),
        })
    })
})

export const { useGetUsersQuery } = usersApiSlice