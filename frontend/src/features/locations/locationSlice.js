import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
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
            invalidatesTags: ["Location"],
        }),
        locations: builder.query({
            query: (page) => ({
                url: `/all-locations?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Location"],
        }),
        queryAllLocations: builder.query({
            query: () => ({
                url: `/search/location`,
                method: "GET",
            }),
            providesTags: ["Location"],
        }),
        deleteLocation: builder.mutation({
            query: (id) => ({
                url: `/delete/location/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Location"],
        })
    })
});

export const { 
    useCreateLocationMutation, 
    useQueryAllLocationsQuery, 
    useLocationsQuery, 
    useDeleteLocationMutation 
} = locationsApi;