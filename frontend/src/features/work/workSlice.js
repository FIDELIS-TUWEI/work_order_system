import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NODE_ENV === "production" ? "/hin" : 'http://localhost:5000/hin',
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
})

export const workApi = createApi({
    reducerPath: "workApi",
    baseQuery,
    tagTypes: ["WorkOrder"],
    endpoints: (builder) => ({
        createWork: builder.mutation({
            query: (values) => ({
                url: `/create/work`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["WorkOrder"],
        }),
        WorkOrders: builder.query({
            query: (page) => ({
                url: `/getall/work?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["WorkOrder"],
        }),
        singleWork: builder.query({
            query: (id) => ({
                url: `/single/work/${id}`,
                method: "GET",
            }),
            providesTags: ["WorkOrder"],
        }),
        queryAllWork: builder.query({
            query: () => ({
                url: `/query/all/work`,
                method: "GET",
            }),
            providesTags: ["WorkOrder"],
        }),
        updateWork: builder.mutation({
            query: ({id, values}) => ({
                url: `/update/work/${id}`,
                method: "PUT",
                body: values,
            }),
            invalidatesTags: ["WorkOrder"],
        }),
        deleteWork: builder.mutation({
            query: (id) => ({
                url: `/delete/work/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["WorkOrder"],
        })
    })
});

export const {
    useCreateWorkMutation,
    useWorkOrdersQuery,
    useSingleWorkQuery,
    useQueryAllWorkQuery,
    useUpdateWorkMutation,
    useDeleteWorkMutation,
} = workApi;
