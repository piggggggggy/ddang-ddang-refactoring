import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Grid } from "../../../elements/index";
import { Button, Input } from "../../Sign/elements/index";

import SocialSignin from "../Signin/components/SocialSignin";

import { signinAxios } from "../../../store/thunk-actions/userActions";

export default function Signin() {
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
        }
    };

    const signup = () => {
        navigate("/signup");
    };

    return (
        <>
            <Grid mystyles="min-height: 30vh; ">
                <motion.h1
                    initial={{ y: -250, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    땅땅 로고
                </motion.h1>
            </Grid>
            <Grid direction="column" mystyles="min-height: 45vh;">
                <Grid direction="column" mystyles="min-height: 25vh;">
                    <Input
                        mystyles="height: 40px; width: 250px; border-radius: 10px; border: none; box-shadow: 2px 5px 16px 0px #0B325E"
                        placeholder="이메일을 입력해주세요"
                        onChange={changeEmail}
                        whileFocus={{ scale: 1.2 }}
                    />
                    <Input
                        mystyles="height: 40px; width: 250px; border-radius: 10px; border: none; margin-top: 20px; box-shadow: 2px 5px 16px 0px #0B325E"
                        placeholder="비밀번호를 입력해주세요"
                        onChange={changePassword}
                        type="password"
                        whileFocus={{ scale: 1.2 }}
                    />
                </Grid>
                <Grid direction="column" mystyles="min-height: 20vh">
                    <Button
                        mystyles="height: 50px; width: 200px; border-radius: 25px; border: none; font-size: 20px; font-weight: bold; background-color: #FBA3A0"
                        onClick={siginin}
                        whileHover={{ scale: 1.1 }}
                    >
                        로그인
                    </Button>
                    <Button
                        mystyles="height: 50px; width: 200px; border-radius: 25px; margin-top: 20px; border: none; font-size: 20px; font-weight: bold; background-color: #D6E9FE"
                        onClick={signup}
                        whileHover={{ scale: 1.1 }}
                    >
                        회원가입
                    </Button>
                </Grid>
            </Grid>
            <hr />
            <Grid direction="column" mystyles="min-height: 25vh;">
                <SocialSignin></SocialSignin>
            </Grid>
            <motion.input type="text" whileFocus={{ scale: 1.2 }} />
        </>
    );
}
