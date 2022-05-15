import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Sign/Signin/Signin";
import SignupFinal from "../pages/Sign/Signup/SignupFinal";
import Mbti from "../pages/Sign/Signup/Mbti";
import MyPage from "../pages/MyPage/MyPage";
import MyPageFinal from "../pages/MyPage/MyPageFinal";
import Feed from "../pages/MyPage/components/CardList";

import Chat from "../pages/Chat/Chat";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<MyPageFinal />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignupFinal />} />
            <Route path="/signup/mbti" element={<Mbti />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/chat" element={<Chat />} />
        </Routes>
    );
}
