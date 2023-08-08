import { apiSlice } from "./apiSlice";
const USERS_URL = "/hin";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: credentials => ({
                url: `${ USERS_URL }/login`,
                method: "POST",
                body: { ...credentials },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${ USERS_URL }/logout`,
                method: "POST",
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${ USERS_URL }/register`,
                method: "POST",
                body: data,
            }),
        }),
        getUsers: builder.query({
            query: () => ({
                url: `${ USERS_URL }/all-users`,
                method: "GET",
                credentials: "include",
            }),
        })
    })
})

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation,
    useGetUsersQuery 
} = usersApiSlice;