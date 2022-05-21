import { createSlice } from "@reduxjs/toolkit";

import { setCookie, deleteCookie } from "../../shared/Cookie";

const initialState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signup(state, action) {
            state.user = action.payload.user;
        },
        signin(state, action) {
            setCookie("token", action.payload.token);
            state.user = { ...state.user, ...action.payload.user };
        },
        loginCheck(state, action) {
            console.log(action.payload);
            setCookie("token", action.payload.token);
            state.user = { ...state.user, ...action.payload.user };
        },
        signout(state) {
            deleteCookie("token");
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
