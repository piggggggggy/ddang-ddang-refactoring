import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signup(state, action) {
            state.user = action.payload;
        },
        signin(state, action) {
            state.user = { ...state.user, ...action.payload.user };
        },
        loginCheck(state, action) {
            state.user = { ...state.user, ...action.payload.user };
        },
        signout(state) {
            state.user = null;
        },
        getProfileDetails(state, action) {
            state.user = { ...state.user, ...action.payload.user };
        },
        updateProfile(state, action) {
            state.user = { ...state.user, ...action.payload.user };
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice;
