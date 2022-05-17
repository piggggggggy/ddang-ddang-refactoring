import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Sign/Signin/Signin";
import SignupFinal from "../pages/Sign/Signup/SignupFinal";
import Mbti from "../pages/Sign/Signup/Mbti";
import MyPage from "../pages/MyPage/MyPage";
import MyPageFinal from "../pages/MyPage/MyPageFinal";
import Feed from "../pages/MyPage/components/CardList";

import Chat from "../pages/Chat/Chat";
import Main from "../pages/Main/Main";
import MapPage from "../pages/Map/MapPage";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" exact element={<Main/>} />
            <Route path="/map" exact element={<MapPage/>} />

            {/* <Route path="/" element={<MyPageFinal />} /> */}
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignupFinal />} />
            <Route path="/signup/mbti" element={<Mbti />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/chat" element={<Chat />} />

        </Routes>
    );
}
