import React from "react";
import { Routes, Route } from "react-router-dom";
import Signin from "../pages/Sign/Signin/Signin";
import SignupFinal from "../pages/Sign/Signup/SignupFinal";
import MyPageFinal from "../pages/MyPage/MyPageFinal";
import Feed from "../pages/Feed/Feed";

import Chat from "../pages/Chat/Chat";
import Main from "../pages/Main/Main";
import MapPage from "../pages/Map/MapPage";
import GamePage from "../pages/Game/GamePage";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" exact element={<Main/>} />
            <Route path="/map" exact element={<MapPage/>} />
            <Route path="/quest" exact element={<MapPage/>} />
            <Route path="/map/:type/:questId" exact element={<GamePage/>} />

            {/* <Route path="/" element={<MyPageFinal />} /> */}
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<SignupFinal />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/chat" element={<Chat />} />

        </Routes>
    );
}
