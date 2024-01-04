import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const WORK_URL = "/hin";

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery: fetchBaseQuery({ baseUrl: WORK_URL }),
    endpoints: (builder) => ({
        createLocation: builder.mutation({
            query: (values) => ({
                url: `/create/location`,
                method: "POST",
                body: values,
            }),
        }),
        allLocations: builder.query({
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
                url: `/location/${id}`,
                method: "DELETE",
            }),
        })
    })
});

export const { useCreateLocationMutation, useQueryAllLocationsQuery, useAllLocationsQuery, useDeleteLocationMutation } = locationsApi;