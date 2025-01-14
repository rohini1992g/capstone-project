import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    userProfile: null,
    suggestedUser: [],
    selectedUser: null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setSuggestedUser: (state, action) => {
      state.suggestedUser = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
});
export const {
  setAuthUser,
  setUserProfile,
  setSuggestedUser,
  setSelectedUser,
} = authSlice.actions;
export default authSlice.reducer;
