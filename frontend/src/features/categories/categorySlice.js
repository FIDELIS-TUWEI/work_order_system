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

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery,
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (values) => ({
                url: `${ serverUrl }/api/wos/v2/categories/new`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["Categories"],
        }),
        allCategories: builder.query({
            query: (page) => ({
                url: `${ serverUrl }/api/wos/v2/categories?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
        queryAllCategories: builder.query({
            query: () => ({
                url: `${ serverUrl }/api/wos/v2/categories/query`,
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
        singleCategory: builder.query({
            query: (id) => ({
                url: `${ serverUrl }/api/wos/v2/categories/${id}`,
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
        updateCategory: builder.mutation({
            query: ({id, values}) => ({
                url: `${ serverUrl }/api/wos/v2/categories/update${id}`,
                method: "PUT",
                body: values,
            }),
            invalidatesTags: ["Categories"],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${ serverUrl }/api/wos/v2/categories/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Categories"],
        }),
    })
});

export const {
    useCreateCategoryMutation,
    useAllCategoriesQuery,
    useQueryAllCategoriesQuery,
    useSingleCategoryQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = categoriesApi;