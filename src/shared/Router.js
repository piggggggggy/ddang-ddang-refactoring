import React from "react";
import { Routes, Route } from "react-router-dom";
// 재혁
import SigninFinal from "../pages/Sign/Signin/SigninFinal";
import SignupFinal from "../pages/Sign/Signup/SignupFinal";
import MyPageFinal from "../pages/MyPage/MyPageFinal";
import FeedFinal from "../pages/Feed/FeedFinal";
import FeedFinalPopular from "../pages/Feed/FeedFinalPopular";
import FeedFinalDistance from "../pages/Feed/FeedFinalDistance";
import Ranking from "../pages/Ranking/Ranking";
import Chat from "../pages/Chat/Chat";
import LandingPage from "../pages/Chat/LandingPage";
// 용태

import Main from "../pages/Main/Main";
import MapPage from "../pages/Map/MapPage";
import GamePage from "../pages/Game/GamePage";
import KakaoLoginHandler from "../pages/Sign/Signin/components/kakaoRedirect";
import GoogleRedirect from "../pages/Sign/Signin/components/googleRedirect";
import Mbti from "../pages/Sign/Signup/components/Mbti";

import API_TEST from "../APITEST";

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" exact element={<Main />} />
            <Route path="/map" exact element={<MapPage />} />
            <Route path="/quest" exact element={<MapPage />} />
            <Route path="/quest/:type/:questId" exact element={<GamePage />} />
            <Route path="/mypage" element={<MyPageFinal />} />
            <Route path="/signin" element={<SigninFinal />} />
            <Route path="/signup/:index" element={<SignupFinal />} />
            <Route path="/feed" element={<FeedFinal />} />
            <Route path="/feed/popular" element={<FeedFinalPopular />} />
            <Route path="/feed/distance" element={<FeedFinalDistance />} />
            <Route path="/ranking" element={<Ranking />} />
            <Route
                path="/chat/:userId/:nickname/:si/:gu/:dong"
                element={<Chat />}
            />
            <Route exact path="/landing" element={<LandingPage />} />

            <Route exact path="/apitest" element={<API_TEST />} />
            <Route path="/kakaoauth" element={<KakaoLoginHandler />} />
            <Route path="/mbti" element={<Mbti />} />
            {/* <Route path="/googleauth" element={<GoogleRedirect/>} /> */}
        </Routes>
    );
}
