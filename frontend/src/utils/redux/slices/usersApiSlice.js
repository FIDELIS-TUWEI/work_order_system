import { apiSlice } from "./apiSlice";
const USERS_URL = "/hin";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${ USERS_URL }/login`,
                method: "POST",
                body: data,
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${ USERS_URL }/register`,
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
        userData: builder.query({
            query: () => ({
                url: `${ USERS_URL }/userInfo`,
                method: "GET",
                body: data,
            }),
        }),
    })
})

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useUserDataMutation 
} = usersApiSlice;