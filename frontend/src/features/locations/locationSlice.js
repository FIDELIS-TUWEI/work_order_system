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
})

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery,
    tagTypes: ["Location"],
    endpoints: (builder) => ({
        createLocation: builder.mutation({
            query: (values) => ({
                url: `${ serverUrl }/api/wos/v2/locations/new`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["Location"],
        }),
        locations: builder.query({
            query: (page) => ({
                url: `${ serverUrl }/api/wos/v2/locations?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Location"],
        }),
        queryAllLocations: builder.query({
            query: () => ({
                url: `${ serverUrl }/api/wos/v2/locations/search`,
                method: "GET",
            }),
            providesTags: ["Location"],
        }),
        deleteLocation: builder.mutation({
            query: (id) => ({
                url: `${ serverUrl }/api/wos/v2/locations/${id}`,
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