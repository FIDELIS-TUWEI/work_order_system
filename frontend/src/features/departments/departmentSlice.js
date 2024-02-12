import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const serverUrl = import.meta.env.VITE_SERVER_API_URL;


const baseQuery = fetchBaseQuery({
    baseUrl: serverUrl,
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = JSON.parse(localStorage.getItem("token"));
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    } 
});

export const departmentsApi = createApi({
    reducerPath: "departmentsApi",
    baseQuery,
    tagTypes: ["Departments"],
    endpoints: (builder) => ({
        createDepartment: builder.mutation({
            query: (values) => ({
                url: `/new/department`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["Departments"],
        }),
        allDepartments: builder.query({
            query: (page) => ({
                url: `/all-departments?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Departments"],
        }),
        queryAllDepartments: builder.query({
            query: () => ({
                url: `/query/all/departments`,
                method: "GET",
            }),
            providesTags: ["Departments"],
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `/delete/department/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["Departments"]
        }),
    })
});

export const {
    useCreateDepartmentMutation,
    useAllDepartmentsQuery,
    useQueryAllDepartmentsQuery,
    useDeleteDepartmentMutation,
} = departmentsApi;