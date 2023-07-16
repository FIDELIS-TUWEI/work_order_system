import { createSlice } from "@reduxjs/toolkit";

// User Slice
const userSlice = createSlice({
    name: "users",
    initialState: {
        users: []
    },
    reducers: {
        getUser : (state, action) => {
            state.users = action.payload.data.map((user) => {
                return { _id: user._id, 
                    name: user.name, 
                    username: user.username,
                    role: user.role,
                    active: user.active,
                    date: user.date 
                }
            })
        },
        addUser : (state, action) => {
            state.users.push(action.payload)
        },
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
}
    }
})

export const {getUser, addUser, editUser} = userSlice.actions;
export default userSlice.reducer;