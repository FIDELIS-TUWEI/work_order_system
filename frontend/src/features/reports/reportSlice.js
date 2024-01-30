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
    }
});

export const reportsApi = createApi({
    reducerPath: "reportsApi",
    baseQuery,
    tagTypes: ["Reports"],
    endpoints: (builder) => ({
        getFilterStatus: builder.query({
            query: (args) => ({
                url: `/work`,
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
                url: `/report/work/count/status`,
                method: "GET",
            }),
            providesTags: ["Reports"],
        }),
        getWorkByDate: builder.query({
            query: (selectedDate) => ({
                url: `/work/created/date/${selectedDate}`,
                mehtod: "GET",
            }),
        }),
        totalReviewedWork: builder.query({
            query: () => ({
                url: `/report/work/total/reviewed`,
                method: "GET",
            }),
            providesTags: ["Reports"]
        }),
        totalWorkCount: builder.query({
            query: () => ({
                url: `/report/total/work/count`,
                method: "GET",
            }),
            providesTags: ["Reports"]
        }),
    })
});

export const {
    useGetFilterStatusQuery,
    useGetWorkCountByStatusQuery,
    useGetWorkByDateQuery,
    useTotalReviewedWorkQuery,
    useTotalWorkCountQuery
} = reportsApi;