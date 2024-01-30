import { apiSlice } from "../api/apiSlice";
const SERVER_URL = '/hin';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${ SERVER_URL }/login`,
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${ SERVER_URL }/logout`,
                method: "POST",
            }),
        }),
    })
});

export const { 
    useLoginMutation, 
    useLogoutMutation, 
} = authApiSlice;