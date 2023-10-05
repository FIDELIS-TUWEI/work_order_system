import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "./authSlice";

const baseQuery = fetchBaseQuery({ 
    baseUrl: "",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    } 
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    // if you get a FORBIDDEN response, try to get a new token
    if (result?.error?.status === 401) {
        // try to get the new token
        const refreshResult = await baseQuery(
            { url: "/auth/refresh", method: "GET", credentials: "include" },
            api,
            extraOptions
        );

        // if the token refresh was successful, set the token
        if (refreshResult?.data) {
            // store the new token
            api.dispatch(setCredentials({ ...refreshResult.data }));

            // retry the query
            await baseQuery(args, api, extraOptions);
        } else {
            if (refreshResult?.error?.status === 401) {
                refreshResult.error.data.message = "Session expired, please login again";
            }

            return refreshResult;
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Users", "WorkOrder"],
    endpoints: (builder) => ({}),
})