import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const WORK_URL = "/hin";

export const locationsApi = createApi({
    reducerPath: "locationsApi",
    baseQuery: fetchBaseQuery({ baseUrl: WORK_URL }),
    endpoints: (builder) => ({
        queryAllLocations: builder.query({
            query: () => ({
                url: `/search/location`,
                method: "GET",
            }),
        })
    })
});

export const { useQueryAllLocationsQuery } = locationsApi;
