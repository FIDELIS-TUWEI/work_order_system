import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER_URL}`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

export const categoriesApi = createApi({
    reducerPath: "categoriesApi",
    baseQuery,
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (values) => ({
                url: `/new/category`,
                method: "POST",
                body: values,
            }),
            invalidatesTags: ["Categories"],
        }),
        allCategories: builder.query({
            query: (page) => ({
                url: `/all/categories?pageNumber=${page}`,
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
        queryAllCategories: builder.query({
            query: () => ({
                url: `/query/all/categories`,
                method: "GET",
            }),
            providesTags: ["Categories"],
        }),
        updateCategory: builder.mutation({
            query: ({id, values}) => ({
                url: `/edit/category/${id}`,
                method: "PUT",
                body: values,
            }),
            invalidatesTags: ["Categories"],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/delete/category/${id}`,
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
    useDeleteCategoryMutation,
} = categoriesApi;