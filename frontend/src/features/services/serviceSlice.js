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

export const servicesApi = createApi({
    reducerPath: "servicesApi",
    baseQuery,
    endpoints: (builder) => ({
        createService: builder.mutation({
            query: (values) => ({
                url: `/new/service`,
                method: "POST",
                body, values,
            }),
            invalidatesTags: ["Services"],
        }),
        allServices: builder.query({
            query: (page) => ({
                url: `/all/services?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Services"],
        }),
        queryServices: builder.query({
            query: () => ({
                url: `/query/services`,
                method: "GET",
            }),
            providesTags: ["Services"],
        }),
        updateService: builder.mutation({
            query: ({ id, values }) => ({
                url: `/edit/service/${id}`,
                method: "PUT",
                body: values,
            }),
            invalidatesTags: ["Services"]
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `delete/service/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Services"],
        }),
    })
});

export const {
    useCreateServiceMutation,
    useAllServicesQuery,
    useQueryServicesQuery,
    useUpdateServiceMutation,
    useDeleteServiceMutation
} = servicesApi;