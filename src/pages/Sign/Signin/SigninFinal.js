import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Container } from "../../../elements/index";
import { Grid, Text, Input, Button, Image } from "../elements/index";
import SocialSignin from "./components/SocialSignin";

import { signinAxios } from "../../../store/thunk-actions/userActions";

import logo from "../../../assets/images/png/sign/logo.png";

export default function SigninFinal() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    const changeEmail = (e) => {
        setEmail(e.target.value);
    };
    const changePassword = (e) => {
        setPassword(e.target.value);
    };

    const siginin = () => {
        if (email !== "" && password !== "") {
            dispatch(signinAxios(email, password, (url) => navigate(url)));
        } else if (email === "" && password === "") {
            alert("이메일 || 비밀번호를 입력해주세요");
        }
    };

    const signup = () => {
        navigate("/signup");
    };

    return (
        <Container>
            <Grid mystyles="padding-left: 31px; padding-right: 31px">
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 41px;"
                >
                    {/* <Text mystyles="font-weight: 700; font-size: 16px">
                        로그인
                    </Text> */}
                </Grid>
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
                        onClick={signup}
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
