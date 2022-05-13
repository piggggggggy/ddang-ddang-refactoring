import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Sign/Signin/Signin";
import Signup from "../pages/Sign/Signup/Signup";
import Mbti from "../pages/Sign/Signup/Mbti";
import MyPage from "../pages/MyPage/MyPage";
import Feed from "../pages/Feed/Feed";
import Animation from "../pages/Animation";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<MyPage />} />
            <Route path="/test" element={<Animation />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/mbti" element={<Mbti />} />
            <Route path="/feed" element={<Feed />} />
        </Routes>
    );
}
