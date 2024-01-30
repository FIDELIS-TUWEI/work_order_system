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

export const designationsApi = createApi({
    reducerPath: "designationsApi",
    baseQuery,
    tagTypes: ["Designations"],
    endpoints: (builder) => ({
        createDesignation: builder.mutation({
            query: (values) => ({
                url: `/new/designation`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["Designations"],
        }),
        allDesignations: builder.query({
            query: (page) => ({
                url: `/all-designations?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Designations"],
        }),
        queryAllDesignations: builder.query({
            query: () => ({
                url: `/query/all-designations`,
                method: "GET",
            }),
            providesTags: ["Designations"],
        }),
        deleteDesignation: builder.mutation({
            query: (id) => ({
                url: `/delete/designation/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["Designations"],
        })
    })
});

export const {
    useCreateDesignationMutation,
    useAllDesignationsQuery,
    useQueryAllDesignationsQuery,
    useDeleteDesignationMutation,
} = designationsApi;