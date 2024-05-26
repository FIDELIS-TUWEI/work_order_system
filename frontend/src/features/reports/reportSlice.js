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

export const reportsApi = createApi({
    reducerPath: "reportsApi",
    baseQuery,
    tagTypes: ["Reports"],
    endpoints: (builder) => ({
        getFilterStatus: builder.query({
            query: (args) => ({
                url: `/api/wos/v2/reports`,
                method: "GET",
                params: {
                    pageNumber: args.page,
                    status: args.status
                }
            }),
            providesTags: ["Reports"],
        }),
        getWorkCountByStatus: builder.query ({
            query: () => ({
                url: `/api/wos/v2/reports/count/status`,
                method: "GET",
            }),
            providesTags: ["Reports"],
        }),
        countWorkTracker: builder.query ({
            query: () => ({
                url: `/api/wos/v2/reports/report/count/tracker`,
                method: "GET",
            }),
            providesTags: ["Reports"],
        }),
        getWorkByDate: builder.query({
            query: (selectedDate) => ({
                url: `/api/wos/v2/reports/date/${selectedDate}`,
                mehtod: "GET",
            }),
            providesTags: ["Reports"],
        }),
        totalWorkCount: builder.query({
            query: () => ({
                url: `/api/wos/v2/reports/report/total/count`,
                method: "GET",
            }),
            providesTags: ["Reports"],
        }),
    })
});

export const {
    useGetFilterStatusQuery,
    useGetWorkCountByStatusQuery,
    useCountWorkTrackerQuery,
    useGetWorkByDateQuery,
    useTotalWorkCountQuery
} = reportsApi;