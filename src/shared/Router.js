import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Sign/Signin/Signin";
import SignupFinal from "../pages/Sign/Signup/SignupFinal";
import MyPageFinal from "../pages/MyPage/MyPageFinal";
import Feed from "../pages/Feed/Feed";

import Chat from "../pages/Chat/Chat";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<MyPageFinal />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignupFinal />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    );
}
