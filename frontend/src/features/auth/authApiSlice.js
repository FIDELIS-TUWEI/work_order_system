import { apiSlice } from "../api/apiSlice";
const baseUrl = process.env.NODE_ENV === "production" ? "/hin" : 'http://localhost:5000/hin';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${ baseUrl }/login`,
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${ baseUrl }/logout`,
                method: "POST",
            }),
        }),
    })
});

export const { 
    useLoginMutation, 
    useLogoutMutation, 
} = authApiSlice;