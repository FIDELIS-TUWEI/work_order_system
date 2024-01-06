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

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery,
    tagTypes: ["Location"],
    endpoints: (builder) => ({
        createLocation: builder.mutation({
            query: (values) => ({
                url: `/create/location`,
                method: "POST",
                body: values,
            }),
        }),
        locations: builder.query({
            query: (page) => ({
                url: `/all-locations?pageNumber=${page}`,
                method: "GET",
            }),
        }),
        queryAllLocations: builder.query({
            query: () => ({
                url: `/search/location`,
                method: "GET",
            }),
        }),
        deleteLocation: builder.mutation({
            query: (id) => ({
                url: `/delete/location/${id}`,
                method: "DELETE",
            }),
        })
    })
});

export const { 
    useCreateLocationMutation, 
    useQueryAllLocationsQuery, 
    useLocationsQuery, 
    useDeleteLocationMutation 
} = locationsApi;