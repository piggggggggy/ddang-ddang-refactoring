import React from "react";
import api from "../../modules/api";
import TokenService from "../../services/token.service";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { userActions } from "../slices/userSlice";
import { userActions } from "../../store/slices/userSlice";

const Auth = () => {
};

export default async function KakaoLogin() {
    console.log("wklejfklwjeflkwejf");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const code = new URL(window.location.href).searchParams.get("code");

    try {
        const response = await api.get("/api/players/kakaoAuth");
        console.log(response);

        const user = {
            email: response.data.user.email,
            expPoints: response.data.user.expPoints,
            level: response.data.user.level,
            mbti: response.data.user.mbti,
            nickname: response.data.user.nickname,
            playerId: response.data.user.playerId,
            points: response.data.user.points,
            profileImg: response.data.user.profileImg,
        };

        TokenService.setAccessToken(response.headers["accesstoken"]);

        const tokenFullString = response.headers.accesstoken;
        const tokenArr = tokenFullString.split(" ");

        console.log(tokenArr);

        dispatch(userActions.signin({ user, token: tokenArr[1] }));

        // navigate("/");
    } catch (err) {
        console.log(err);
    }

    return <>hello</>;
}
