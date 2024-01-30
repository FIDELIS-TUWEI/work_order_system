import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const SERVER_URL = import.meta.env.SERVER_URL || '/hin';



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

export const employeesApi = createApi({
    reducerPath: "employeesApi",
    baseQuery,
    tagTypes: ["Employee"],
    endpoints: (builder) => ({
        createEmployee: builder.mutation({
            query: (values) => ({
                url: `/new/employee`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["Employee"],
        }),
        employees: builder.query({
            query: (page) => ({
                url: `/all/employees?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        singleEmployee: builder.query({
            query: (id) => ({
                url: `/single/employee/${id}`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        employeeData: builder.query({
            query: (id) => ({
                url: `/employee/data/${id}`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        queryAllEmployees: builder.query({
            query: () => ({
                url: `/query/all/employees`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        employeeWorkCount: builder.query({
            query: (id) => ({
                url: `/employee/work/count?id=${id}`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        countAllEmployees: builder.query({
            query: () => ({
                url: `/count/employees`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        editEmployee: builder.mutation({
            query: ({id, values}) => ({
                url: `/edit/employee/${id}`,
                method: "PUT",
                body: values,
            }),
            invalidatesTags: ["Employee"],
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/delete/employee/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Employee"],
        }),
    }),
});

export const {
    useCreateEmployeeMutation,
    useEmployeesQuery,
    useSingleEmployeeQuery,
    useEmployeeDataQuery,
    useQueryAllEmployeesQuery,
    useEmployeeWorkCountQuery,
    useCountAllEmployeesQuery,
    useEditEmployeeMutation,
    useDeleteEmployeeMutation,
} = employeesApi;