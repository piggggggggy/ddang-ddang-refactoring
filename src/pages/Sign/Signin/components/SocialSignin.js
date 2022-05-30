import styled from "styled-components";
import { KAKAO_OAUTH_URL } from "../../../../shared/OAuth";
import axios from "axios";
import kakaoIcon from "../../../../assets/images/png/sign/kakao_icon.png";
import React from "react";
import api from "../../../../modules/api";
import TokenService from "../../../../services/token.service";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { userActions } from "../slices/userSlice";
import { userActions } from "../../../../store/slices/userSlice";

const SocialSignin = (props) => {
    // onClick={() => window.location.replace(KAKAO_OAUTH_URL)}

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const kakaologin = async () => {
        try {
            const response = await axios.get(
                "http://localhost:8080/api/players/kakao"
            );

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
    };

    return (
        <a href="/api/players/kakaoauth" style={{ textDecoration: "none" }}>
            <KakaoBtn>
                <KakaoImg alt="kakao login" src={kakaoIcon} />
                <KakaoText>카카오로 시작하기</KakaoText>
            </KakaoBtn>
        </a>
    );
};

const KakaoBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 308px;
    border-radius: 4px;
    background-color: #fee500;
    padding-top: 19px;
    padding-bottom: 19px;
    &:hover {
        cursor: pointer;
    }
    img {
        margin-right: 10px;
    }
    span {
        color: #000000;
    }
`;

const KakaoText = styled.span`
    color: #191600;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
`;

const KakaoImg = styled.img`
    width: 24px;
    height: 24px;
    margin-top: 3px;
`;

export default SocialSignin;
