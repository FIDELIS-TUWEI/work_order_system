import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const WORK_URL = "/hin";

const baseQuery = fetchBaseQuery({
    baseUrl: WORK_URL,
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
