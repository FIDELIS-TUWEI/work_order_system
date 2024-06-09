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

export const departmentsApi = createApi({
    reducerPath: "departmentsApi",
    baseQuery,
    tagTypes: ["Departments"],
    endpoints: (builder) => ({
        createDepartment: builder.mutation({
            query: (values) => ({
                url: `${ serverUrl }/api/wos/v2/departments/new`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["Departments"],
        }),
        allDepartments: builder.query({
            query: (page) => ({
                url: `${ serverUrl }/api/wos/v2/departments?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Departments"],
        }),
        queryAllDepartments: builder.query({
            query: () => ({
                url: `${ serverUrl }/api/wos/v2/departments/query`,
                method: "GET",
            }),
            providesTags: ["Departments"],
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `${ serverUrl }/api/wos/v2/departments/${id}`,
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