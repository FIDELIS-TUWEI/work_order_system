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
    }  
});

export const employeesApi = createApi({
    reducerPath: "employeesApi",
    baseQuery,
    tagTypes: ["Employee"],
    endpoints: (builder) => ({
        createEmployee: builder.mutation({
            query: (values) => ({
                url: `/api/wos/v2/employees/register`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["Employee"],
        }),
        employees: builder.query({
            query: (page) => ({
                url: `/api/wos/v2/employees?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        singleEmployee: builder.query({
            query: (id) => ({
                url: `/api/wos/v2/employees/${id}`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        queryAllEmployees: builder.query({
            query: () => ({
                url: `/api/wos/v2/employees/query`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        employeeWorkCount: builder.query({
            query: (id) => ({
                url: `/api/wos/v2/employees/count?id=${id}`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        countAllEmployees: builder.query({
            query: () => ({
                url: `/api/wos/v2/employees/count`,
                method: "GET",
            }),
            providesTags: ["Employee"],
        }),
        editEmployee: builder.mutation({
            query: ({id, values}) => ({
                url: `/api/wos/v2/employees/${id}`,
                method: "PUT",
                body: values,
            }),
            invalidatesTags: ["Employee"],
        }),
        deleteEmployee: builder.mutation({
            query: (id) => ({
                url: `/api/wos/v2/employees/${id}`,
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