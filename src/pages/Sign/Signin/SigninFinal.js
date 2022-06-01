import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Container } from "../../../elements/index";
import { Grid, Text, Input, Button, Image } from "../elements/index";
import SocialSignin from "./components/SocialSignin";

import { signinAxios } from "../../../store/thunk-actions/userActions";

import logo from "../../../assets/images/png/sign/logo.png";
import AuthService from "../../../services/auth.service";
import TokenService from "../../../services/token.service";
import { userActions } from "../../../store/slices/userSlice";
import ToastPageMsg from "../../../elements/ToastMsgPage";
import splashmp4 from "../../../assets/images/png/sign/NDND_splash.mp4";

export default function SigninFinal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [onToast, setOnToast] = useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };
    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    console.log("test");
    const siginin = async () => {
        try {
            const response = await AuthService.login(email, password);
            const user = {
                email,
                nickname: response.data.row.nickname,
                expPoints: response.data.row.expPoints,
                level: response.data.row.level,
                mbti: response.data.row.mbti,
                points: response.data.row.points,
                profileImg: response.data.row.profileImg,
                playerId: response.data.row.playerId,
            };
            TokenService.setAccessToken(response.headers["accesstoken"]);
            const tokenFullString = response.headers.accesstoken;
            const tokenArr = tokenFullString.split(" ");
            dispatch(userActions.signin({ user, token: tokenArr[1] }));
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);

            setIsLoading(true);
            setTimeout(() => {
                navigate("/");
            }, 3000);
        } catch (error) {
            console.log(error);
            setOnToast(true);
        }
    };

    const moveToSignupPage = () => {
        navigate("/signup/1");
    };

    if (isLoading) {
        return (
            <Container>
                {/* <Grid flex alignItems="center" justifyContent="center">
                    <img
                        src={loadingSpinnerGif}
                        alt=""
                        style={{ width: "50%", height: "50%" }}
                    />
                </Grid> */}

                <video
                    width="100%"
                    height="100%"
                    preload="auto"
                    muted
                    autoPlay={true}
                >
                    <source src={splashmp4} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video>
            </Container>
        );
    }

    return (
        <Container>
            <ToastPageMsg onToast={onToast} setOnToast={setOnToast}>
                <>
                    이메일이나 비밀번호가
                    <br />
                    틀렸어요!
                </>
            </ToastPageMsg>
            <Grid mystyles="padding: 0 31px">
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="font-weight: 700; text-align: center; margin-top: 109px"
                >
                    <Grid mystyles="width: 76px; height: 75px">
                        <Image
                            src={logo}
                            mystyles="width: 76px; height: 75px;"
                        ></Image>
                    </Grid>
                    <Text mystyles="font-weight: 700; font-size: 19.0939px; margin-top: 9px ">
                        니땅내땅
                    </Text>
                </Grid>
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 76px; height: 98px;"
                >
                    <Input
                        mystyles="height: 35px; width: 308px; text-align: left; border: none; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.3); padding: 13px; border-radius: 4px;"
                        placeholder="이메일"
                        onChange={changeEmail}
                        whileFocus={{ scale: 1.1 }}
                    />
                    <Input
                        mystyles="height: 35px; width: 308px; border: none; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.3); padding: 13px; border-radius: 4px;"
                        placeholder="비밀번호"
                        onChange={changePassword}
                        whileFocus={{ scale: 1.1 }}
                        type="password"
                    />
                </Grid>
                <Grid
                    flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 50px"
                >
                    <Button
                        onClick={siginin}
                        type="password"
                        mystyles="height: 35px; width: 308px; font-weight:700; background: #5CEB84; border: none; border-radius: 4px; font-size: 16px;"
                    >
                        로그인
                    </Button>
                </Grid>
                <Grid
                    flex
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 30px"
                >
                    <Text
                        pointer
                        mystyles="font-size: 12px; margin-right: 5px; color: rgba(5, 36, 14, 0.3);"
                    >
                        아이디, 비밀번호 찾기
                    </Text>
                    <Text mystyles="font-size: 12px; margin-right: 5px; color: rgba(5, 36, 14, 0.3);">
                        |
                    </Text>
                    <Text
                        pointer
                        mystyles="font-size: 12px; color: rgba(5, 36, 14, 0.3);"
                        onClick={moveToSignupPage}
                    >
                        회원가입
                    </Text>
                </Grid>
                <Grid
                    flex
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 30px"
                >
                    <Grid mystyles="border: 1px solid rgba(5, 36, 14, 0.3); width: 148px" />
                    <Text mystyles="font-size: 12px; color: rgba(5, 36, 14, 0.3); width: 30px; margin-left: 10px">
                        또는
                    </Text>
                    <Grid mystyles="border: 1px solid rgba(5, 36, 14, 0.3); width: 148px;" />
                </Grid>

                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 64px "
                >
                    <SocialSignin></SocialSignin>
                </Grid>
            </Grid>
        </Container>
    );
}
