import { apiSlice } from "./apiSlice";
const USERS_URL = "/hin";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${ USERS_URL }/login`,
                method: "POST",
                body: data,
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
} = authApiSlice;