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
                url: `/create/work`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["WorkOrder"],
        }),
        WorkOrders: builder.query({
            query: (args) => ({
                url: `/getall/work`,
                method: "GET",
                params: {
                    pageNumber: args.page,
                    status: args.status
                }
            }),
            providesTags: ["WorkOrder"],
        }),
        singleWork: builder.query({
            query: (id) => ({
                url: `/single/work/${id}`,
                method: "GET",
            }),
            providesTags: ["WorkOrder"],
        }),
        searchWork: builder.query({
            query: (searchTerm) => ({
                url: `/search/work?searchTerm=${searchTerm}`,
                method: "GET",
            }),
            providesTags: ["WorkOrder"],
        }),
        queryAllWork: builder.query({
            query: () => ({
                url: `/query/all/work`,
                method: "GET",
            }),
            providesTags: ["WorkOrder"],
        }),
        inAttendanceWork: builder.query ({
            query: (args) => ({
                url: `/work-orders/in-attendance`,
                method: "GET",
                params: {
                    pageNumber: args.page
                }
            }),
            providesTags: ["WorkOrder"],
        }),
        inCompleteWork: builder.query ({
            query: (args) => ({
                url: `/work-orders/in-complete`,
                method: "GET",
                params: {
                    pageNumber: args.page,
                }
            }),
            providesTags: ["WorkOrder"],
        }),
        attendedWork: builder.query ({
            query: (args) => ({
                url: `/work-orders/attended`,
                method: "GET",
                params: {
                    pageNumber: args.page,
                }
            }),
            providesTags: ["WorkOrder"],
        }),
        updateWork: builder.mutation({
            query: ({id, values}) => ({
                url: `/update/work/${id}`,
                method: "PUT",
                body: values,
            }),
            invalidatesTags: ["WorkOrder"],
        }),
        deleteWork: builder.mutation({
            query: (id) => ({
                url: `/delete/work/${id}`,
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
    useSearchWorkQuery,
    useQueryAllWorkQuery,
    useInAttendanceWorkQuery,
    useInCompleteWorkQuery,
    useAttendedWorkQuery,
    useUpdateWorkMutation,
    useDeleteWorkMutation,
} = workApi;
