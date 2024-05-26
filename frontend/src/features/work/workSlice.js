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

export const workApi = createApi({
    reducerPath: "workApi",
    baseQuery,
    tagTypes: ["WorkOrder"],
    endpoints: (builder) => ({
        createWork: builder.mutation({
            query: (values) => ({
                url: `/api/wos/v2/work-orders/new`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["WorkOrder"],
        }),
        WorkOrders: builder.query({
            query: (args) => ({
                url: `/api/wos/v2/work-orders`,
                method: "GET",
                params: {
                    pageNumber: args.page,
                    status: args.status,
                    searchTerm: args.searchTerm
                }
            }),
            providesTags: ["WorkOrder"],
        }),
        singleWork: builder.query({
            query: (id) => ({
                url: `/api/wos/v2/work-orders/${id}`,
                method: "GET",
            }),
            providesTags: ["WorkOrder"],
        }),
        queryAllWork: builder.query({
            query: () => ({
                url: `/api/wos/v2/work-orders/graph`,
                method: "GET",
            }),
            providesTags: ["WorkOrder"],
        }),
        inAttendanceWork: builder.query ({
            query: (args) => ({
                url: `/api/wos/v2/work-orders/in-attendance`,
                method: "GET",
                params: {
                    pageNumber: args.page
                }
            }),
            providesTags: ["WorkOrder"],
        }),
        inCompleteWork: builder.query ({
            query: (args) => ({
                url: `/api/wos/v2/work-orders/in-complete`,
                method: "GET",
                params: {
                    pageNumber: args.page,
                }
            }),
            providesTags: ["WorkOrder"],
        }),
        attendedWork: builder.query ({
            query: (args) => ({
                url: `/api/wos/v2/work-orders/attended`,
                method: "GET",
                params: {
                    pageNumber: args.page,
                }
            }),
            providesTags: ["WorkOrder"],
        }),
        updateWork: builder.mutation({
            query: ({id, values}) => ({
                url: `/api/wos/v2/work-orders/update/${id}`,
                method: "PUT",
                body: values,
            }),
            invalidatesTags: ["WorkOrder"],
        }),
        deleteWork: builder.mutation({
            query: (id) => ({
                url: `/api/wos/v2/work-orders/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["WorkOrder"],
        })
    })
});

export const {
    useCreateWorkMutation,
    useWorkOrdersQuery,
    useSingleWorkQuery,
    useQueryAllWorkQuery,
    useInAttendanceWorkQuery,
    useInCompleteWorkQuery,
    useAttendedWorkQuery,
    useUpdateWorkMutation,
    useDeleteWorkMutation,
} = workApi;
