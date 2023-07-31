import { createSlice } from "@reduxjs/toolkit";

// User Slice
const userSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        // Get all users reducer
        getUser: (state, action) => {
            const { data } = action.payload;
            state.users = data.map(user => ({
                _id: user._id,
                name: user.name,
                username: user.username,
                role: user.role,
                active: user.active,
                date: user.date
            }));
        },

        // Register user reducer
        addUser: (state, action) => ({
        ...state,
        users: [...state.users, action.payload],
        }),

        // Edit user reducer
        editUser: (state, action) => {
        const updatedUser = {
            ...action.payload,
        };

        const updatedUsers = state.users.map(user =>
            user._id === action.payload._id ? updatedUser : user
        );

        return {
            ...state,
            users: updatedUsers,
        };
        },

        // Single user reducer
        singleUser: (state, action) => {
            return {
                ...state,
                user: action.payload,
            };
        },

        // Delete user reducer
        deleteUser: (state, action) => {
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload),
            };
        }
    }
})

export const {getUser, addUser, editUser, singleUser, deleteUser} = userSlice.actions;
export default userSlice.reducer;