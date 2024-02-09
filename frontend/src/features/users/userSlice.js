import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverUrl = import.meta.env.VITE_SERVER_API_URL;


const baseQuery = fetchBaseQuery({
    baseUrl: serverUrl,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery,
    tagTypes: ["Users"],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (values) => ({
                url: `/register`,
                method: "POST",
                body: values
            }),
            invalidatesTags: ["Users"],
        }),
        getAllUsers: builder.query({
            query: (page) => ({
                url: `/all-users?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Users"],
        }),
        getSingleUser: builder.query({
            query: (id) => ({
                url: `/single/user/${id}`,
                method: "GET",
            }),
            providesTags: ["Users"],
        }),
        editUser: builder.mutation({
            query: ({id, values}) => ({
                url: `/edit/user/${id}`,
                method: "PUT",
                body: values,
            }),
            invalidatesTags: ["Users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/admin/user/delete/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["Users"],
        }),
        changePassword: builder.mutation({
            query: ({id, values}) => ({
                url: `/update/password/${id}`,
                method: "PUT",
                body: values,
            }),
            invalidatesTags: ["Users"],
        }),
        countAllUsers: builder.query({
            query: () => ({
                url: `/count/total-users`,
                method: "GET",
            }),
            providesTags: ["Users"],
        }),
        countActiveUsers: builder.query({
            query: () => ({
                url: `/count/active-users`,
                method: "GET",
            }),
            providesTags: ["Users"],
        }),
    })
});

export const {
    useRegisterUserMutation,
    useGetAllUsersQuery,
    useGetSingleUserQuery,
    useEditUserMutation,
    useDeleteUserMutation,
    useChangePasswordMutation,
    useCountAllUsersQuery,
    useCountActiveUsersQuery
} = usersApi;