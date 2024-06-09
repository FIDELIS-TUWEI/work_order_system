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

export const designationsApi = createApi({
    reducerPath: "designationsApi",
    baseQuery,
    tagTypes: ["Designations"],
    endpoints: (builder) => ({
        createDesignation: builder.mutation({
            query: (values) => ({
                url: `${ serverUrl }/api/wos/v2/designations/new`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["Designations"],
        }),
        allDesignations: builder.query({
            query: (page) => ({
                url: `${ serverUrl }/api/wos/v2/designations?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Designations"],
        }),
        queryAllDesignations: builder.query({
            query: () => ({
                url: `${ serverUrl }/api/wos/v2/designations/query`,
                method: "GET",
            }),
            providesTags: ["Designations"],
        }),
        deleteDesignation: builder.mutation({
            query: (id) => ({
                url: `${ serverUrl }/api/wos/v2/designations/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["Designations"],
        })
    })
});

export const {
    useCreateDesignationMutation,
    useAllDesignationsQuery,
    useQueryAllDesignationsQuery,
    useDeleteDesignationMutation,
} = designationsApi;