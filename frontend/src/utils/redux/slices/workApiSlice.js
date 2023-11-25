import { apiSlice } from "./apiSlice";
const WORK_URL = "/hin";

export const workApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getWorkData: builder.query({
            query: () => ({
                url: `${WORK_URL}/getall/work`,
                method: "GET",
            }),
        }),
    }),
    createWorkData: builder.mutation({
        query: (data) => ({
            url: `${WORK_URL}/create/work`,
            method: "POST",
            body: data,
        }),
    }),
    updateWorkData: builder.mutation({
        query: ({id, data}) => ({
            url:  `${WORK_URL}/update/work/${id}`,
            method: "PUT",
            body: data,
        }),
    }),
    deleteWorkData: builder.mutation({
        query: (id) => ({
            url:  `${WORK_URL}/delete/work/${id}`,
            method: "DELETE",
        }),
    })
});

export const {
    useGetWorkDataQuery,
    useCreateWorkDataMutation,
    useUpdateWorkDataMutation,
    useDeleteWorkDataMutation
}   = workApiSlice;
