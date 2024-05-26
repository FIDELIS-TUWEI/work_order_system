import { apiSlice } from "../api/apiSlice";
const serverUrl = 'http://localhost:5000';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${ serverUrl }/api/wos/v2/auth/login`,
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${ serverUrl }/api/wos/v2/auth/logout`,
                method: "POST",
            }),
        }),
    })
});

export const { 
    useLoginMutation, 
    useLogoutMutation, 
} = authApiSlice;