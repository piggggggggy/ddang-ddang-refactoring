import React, { useEffect } from "react";
import Container from "../../../../elements/Container";
import splashmp4 from "../../../../assets/images/png/sign/NDND_splash.mp4";
import TokenService from "../../../../services/token.service";
import api from "../../../../modules/api";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../../../store/slices/userSlice";
import Mbti from "../../../Sign/Signup/components/Mbti";
import KakaoLogin from "./kakaologin";

export default function OAuth2RedirectHandler() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);
    const [isMbti, setIsMbti] = React.useState(false);
    const [page, setPage] = React.useState(1);
    //파라미터에서 리프레쉬 값가져오기
    let code = new URL(window.location.href).searchParams.get("code");

    TokenService.setRefreshToken(code);

    console.log(code);
    const kakaoLogin = async () => {
        // 리프레쉬 토큰을 로컬스토리지에 저장

        try {
            //리프레쉬 토큰을 가지고 엑세스 토큰발행(로그인 과정)
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/players/auth/getToken`,
                {
                    headers: {
                        Accept: "/",
                        "content-type": "application/json;charset=UTF-8",
                        "Access-Control-Allow-Origin": "*",
                        refreshtoken: code,
                    },
                }
            );

            // 가져온 엑세스 토큰을 로컬스토리지 저장
            const accesstoken = response.headers["accesstoken"];
            TokenService.setAccessToken(accesstoken);

            // auth를 이용해 데이터를 가져온다.
            const infodata = await api.get("/api/players/auth");
            const { mbti, playerId } = infodata.data.user;

            dispatch(
                userActions.signin({
                    user: infodata.data.user,
                    token: accesstoken,
                })
            );

            if (mbti === "") {
                console.log(mbti);
                setIsMbti(true);
                navigate("/mbti", {
                    state: { data: { getKakaoMbti: mbti, playerId } },
                });
            } else {
                navigate("/");
            }
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        kakaoLogin((url) => navigate(url));
    }, []);

    return <></>;
}
