import { apiSlice } from "../api/apiSlice";
const serverUrl = import.meta.env.VITE_SERVER_API_URL

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${ serverUrl }/login`,
                method: "POST",
                body: data,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${ serverUrl }/logout`,
                method: "POST",
            }),
        }),
    })
});

export const { 
    useLoginMutation, 
    useLogoutMutation, 
} = authApiSlice;