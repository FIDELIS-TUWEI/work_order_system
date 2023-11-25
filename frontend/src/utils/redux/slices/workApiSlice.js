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
    })
});

export const {
    useGetWorkDataQuery,
    useCreateWorkDataMutation,
    useUpdateWorkDataMutation,
    useDeleteWorkDataMutation
}   = workApiSlice;
