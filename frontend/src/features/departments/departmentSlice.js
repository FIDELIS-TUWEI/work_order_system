import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SERVER_URL = '/hin';



const baseQuery = fetchBaseQuery({
    baseUrl: SERVER_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
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