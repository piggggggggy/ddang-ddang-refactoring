import styled from "styled-components";
import { KAKAO_OAUTH_URL } from "../../../../shared/OAuth";
import axios from "axios";
import kakaoIcon from "../../../../assets/images/png/sign/kakao_icon.png";
import googleIcon from "../../../../assets/images/png/sign/google_icon.png";
import React from "react";
import api from "../../../../modules/api";
import TokenService from "../../../../services/token.service";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// import { userActions } from "../slices/userSlice";
import { userActions } from "../../../../store/slices/userSlice";

const SocialSignin = (props) => {
    return (
        <>
            <div>
                {/* //https://thaitour.shop/api/players/kakao */}
                {/* REACT_APP_KAKAO_LOGIN_URI */}
                {/* // href={${process.env.REACT_APP_KAKAO_LOGIN_URI}} */}
                <a
                    href={`${process.env.REACT_APP_BASE_URL}/api/players/kakao`}
                    style={{ textDecoration: "none" }}
                >
                    <KakaoBtn>
                        <KakaoImg alt="kakao login" src={kakaoIcon} />
                        <KakaoText>카카오로 시작하기</KakaoText>
                    </KakaoBtn>
                </a>
            </div>
            {/* <br />
            <br />
            <br />
            <div>
                <a
                    href="http://localhost:8080/api/players/google"
                    style={{ textDecoration: "none" }}
                >
                    <GoogleBtn>
                        <GoogleImg alt="google login" src={kakaoIcon} />
                        <GoogleText>구글로 시작하기</GoogleText>
                    </GoogleBtn>
                </a>
            </div> */}
        </>
    );
};

const GoogleBtn = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 308px;
    border-radius: 4px;
    background-color: #ffffff;
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

const GoogleText = styled.span`
    color: #191600;
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
`;

const GoogleImg = styled.img`
    width: 24px;
    height: 24px;
    margin-top: 3px;
`;

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
