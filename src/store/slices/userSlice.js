import { createSlice } from "@reduxjs/toolkit";

import { setCookie, deleteCookie } from "../../shared/Cookie";

const initialState = {
    user: null,
    isLogin: false,
    isSignup: false,
    isAvailable: false, // for id check (during the signup phase)
    isEmailCheck: false,
    isNicknameCheck: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signup(state, action) {
            console.log(action.payload.user);
            state.user = action.payload.user;
            state.isLogin = true;
            state.isSignup = true;
        },
        signin(state, action) {
            setCookie("token", action.payload.token);
            state.user = action.payload.user;
            state.isLogin = true;
        },
        signinKakao(state, action) {
            console.log(action.payload);
        },
        signout(state) {
            deleteCookie("token");
            state.user = null;
            state.isLogin = false;
        },
        emailCheck(state, action) {
            state.isEmailCheck = true;
        },
        nicknameCheck(state, action) {
            state.isNicknameCheck = true;
        },
        loginCheck(state, action) {
            if (!action.payload.isValid) {
                deleteCookie("token");
            }
            state.user = { ...state.user, ...action.payload.user };
            state.isLogin = action.payload.isValid;
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
