import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const WORK_URL = "/hin";

export const workApi = createApi({
    reducerPath: "workApi",
    baseQuery: fetchBaseQuery({ baseUrl: WORK_URL }),
    endpoints: (builder) => ({
        createWork: builder.mutation({
            query: (values) => ({
                url: `/create/work`,
                method: "POST",
                body: values,
            }),
        }),
        WorkOrders: builder.query({
            query: (page) => ({
                url: `/getall/work?pageNumber=${page}`,
                method: "GET",
            }),
        }),
        singleWork: builder.query({
            query: (id) => ({
                url: `/single/work/${id}`,
                method: "GET",
            }),
        }),
        queryAllWork: builder.query({
            query: () => ({
                url: `/query/all/work`,
                method: "GET",
            }),
        }),
        updateWork: builder.mutation({
            query: ({ id, values }) => ({
                url: `/update/work/${id}`,
                method: "PUT",
                body: values,
            }),
        }),
        deleteWork: builder.mutation({
            query: (id) => ({
                url: `/delete/work/${id}`,
                method: "DELETE",
            }),
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
