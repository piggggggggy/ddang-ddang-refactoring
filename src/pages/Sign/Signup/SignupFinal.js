import React from "react";
import lo from "lodash";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

import { Grid, Text } from "../../../elements/index";
import { Button, Input } from "../../Sign/elements/index";
import DuplicateCheck from "../Signup/components/DuplicateCheck";
import ProfilePreview from "../../Sign/Signup/components/ProfilePreview";
import Mbti from "../Signup/components/MbtiSlider";

import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import DangerousIcon from "@mui/icons-material/Dangerous";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";

import AuthService from "../../../apis/auth.service";

export default function SignupFinal() {
    // 최종 회원 가입 값
    const [finalSignupValue, setFinalSignupValue] = React.useState({
        email: "string",
        nickname: "string",
        password: "string",
        mbti: "string",
        profileImg: "string",
    });

    // 이메일
    const [email, setEmail] = React.useState("");
    const emailDebounce = lo.debounce((k) => setEmail(k), 500);
    const emailKeyPress = React.useCallback(emailDebounce, []);
    const [emailValue, setEmailValue] = React.useState("");
    const emailChange = (e) => {
        setEmailValue(e.target.value);
        emailKeyPress(e.target.value);
    };

    const [emailCheckMessage, setEmailCheckMessage] = React.useState();
    const [emailIsValid, setEmailIsValid] = React.useState(false);

    const checkEmailByRegex = (email) => {
        const regEmail = /^((\w|[.])+)@((\w|[-.])+)\.([A-Za-z]+){2,3}$/;
        if (email && !regEmail.test(email)) {
            setEmailCheckMessage("이메일 형식을 다시 확인해주세요");
            setEmailIsValid(false);
        } else if (email && regEmail.test(email)) {
            setEmailCheckMessage("올바른 이메일 형식입니다");
            setEmailIsValid(true);
        } else if (email === "") {
            setEmailCheckMessage("");
            setEmailIsValid(false);
        }
    };

    const [emailafterCheck, setEmailAfterCheck] = React.useState("");
    const [emailAxiosCheck, setEmailAxiosCheck] = React.useState(false);

    const checkEmail = () => {
        if (emailIsValid) {
            AuthService.checkEmail(email)
                .then((res) => {
                    console.log(res);
                    if (!res.data.row) {
                        console.log("good!");
                        setEmailAfterCheck(email);
                        setEmailAxiosCheck(true);
                    } else {
                        console.log("not good!");
                        setEmailAfterCheck(email);
                        setEmailAxiosCheck(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert("이메일 형식을 확인해 주세요!");
        }
    };

    // 닉네임
    const [nickname, setNickname] = React.useState("");
    const nicknameDebounce = lo.debounce((k) => setNickname(k), 500);
    const nicknameKeyPress = React.useCallback(nicknameDebounce, []);
    const [nicknameValue, setNicknameValue] = React.useState("");

    const nicknameChange = (e) => {
        setNicknameValue(e.target.value);
        nicknameKeyPress(e.target.value);
    };

    const [nicknameCheckMessage, setNicknameCheckMessage] = React.useState("");
    const [nicknameIsValid, setNicknameIsValid] = React.useState(false);

    const checkNicknameByRegex = (nickname) => {
        if (nickname.length > 10) {
            setNicknameCheckMessage("최대 10글자 까지 가능합니다");
            setNicknameIsValid(false);
        } else if (nickname.length === 0) {
            setNicknameCheckMessage("");
            setNicknameIsValid(false);
        } else {
            setNicknameCheckMessage("사용가능한 아이디입니다");
            setNicknameIsValid(true);
        }
    };

    const [nicknameafterCheck, setNicknameAfterCheck] = React.useState("");
    const [nicknameAxiosCheck, setNicknameAxiosCheck] = React.useState(false);

    const checkNickname = () => {
        if (nicknameIsValid) {
            AuthService.checkNickname(nickname)
                .then((res) => {
                    console.log(res);
                    if (!res.data.row) {
                        setNicknameAfterCheck(nickname);
                        setNicknameAxiosCheck(true);
                    } else {
                        setNicknameAfterCheck(nickname);
                        setNicknameAxiosCheck(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            alert("닉네임 형식을 확인해 주세요!");
        }
    };

    // 비밀번호
    const [password, setPassword] = React.useState("");
    const passwordDebounce = lo.debounce((k) => setPassword(k), 500);
    const passwordKeyPress = React.useCallback(passwordDebounce, []);
    const [passwordValue, setPasswordValue] = React.useState("");

    const passwordChange = (e) => {
        setPasswordValue(e.target.value);
        passwordKeyPress(e.target.value);
    };

    const [passwordCheckMessage, setPasswordCheckMessage] = React.useState();
    const [passwordIsValid, setPasswordIsValid] = React.useState(false);
    const [passwordAfterRegex, setPasswordAfterRegex] = React.useState("");

    const checkPasswordByRegex = (password) => {
        const regPassword =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
        if (!password) {
            setPasswordCheckMessage();
            setPasswordIsValid(false);
        } else if (password && !regPassword.test(password)) {
            setPasswordCheckMessage(
                "잘못된 비밀번호 양식입니다.영문 대소문자, 숫자, 특수문자(.!@#$%)를 넣어주세요"
            );
            setPasswordIsValid(false);
            setPasswordAfterRegex(password);
        } else if (password && regPassword.test(password)) {
            setPasswordCheckMessage("올바른 비밀번호입니다.");
            setPasswordIsValid(true);
            setPasswordAfterRegex(password);
        }
    };

    // 비밀번호 확인
    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const passwordConfirmDebounce = lo.debounce(
        (k) => setPasswordConfirm(k),
        500
    );
    const passwordConfirmKeyPress = React.useCallback(
        passwordConfirmDebounce,
        []
    );
    const [passwordConfirmValue, setPasswordConfirmValue] = React.useState("");

    const passwordConfirmChange = (e) => {
        setPasswordConfirmValue(e.target.value);
        passwordConfirmKeyPress(e.target.value);
    };

    const [passwordConfirmCheckMessage, setPasswordConfirmCheckMessage] =
        React.useState();
    const [passwordConfirmIsValid, setPasswordConfirmIsValid] =
        React.useState(false);
    const [passwordConfirmAfterRegex, setPasswordConfirmAfterRegex] =
        React.useState("");

    const checkPasswordConfirmByRegex = (password, passwordConfirm) => {
        if (passwordConfirm?.length > 0 && password === passwordConfirm) {
            setPasswordConfirmCheckMessage("비밀번호가 일치합니다");
            setPasswordConfirmIsValid(true);
            setPasswordConfirmAfterRegex(passwordConfirm);
        } else if (passwordConfirm?.length === 0) {
            setPasswordConfirmCheckMessage("");
            setPasswordConfirmIsValid(false);
            setPasswordConfirmAfterRegex(passwordConfirm);
        } else if (
            passwordConfirm?.length > 0 &&
            password !== passwordConfirm
        ) {
            setPasswordConfirmCheckMessage("비밀번호가 일치하지 않습니다");
            setPasswordConfirmIsValid(false);
        }
    };

    // 1차 로그인 완료

    const [userData, setUserData] = React.useState({});
    const [page, setPage] = React.useState(1);
    const [firstPageComplete, setFirstPageComplete] = React.useState(false);

    const checkfirstpageComplete = () => {
        if (
            emailAxiosCheck &&
            nicknameAxiosCheck &&
            emailafterCheck === email &&
            nicknameafterCheck === nickname &&
            passwordIsValid &&
            passwordConfirmIsValid &&
            passwordAfterRegex === password &&
            passwordConfirmAfterRegex === passwordConfirm
        ) {
            setFirstPageComplete(true);
            // setPage(2);
        } else {
            setFirstPageComplete(false);
        }
    };
    const signup = () => {
        if (
            emailAxiosCheck &&
            nicknameAxiosCheck &&
            passwordIsValid &&
            passwordConfirmIsValid &&
            emailafterCheck === email &&
            nicknameafterCheck === nickname &&
            passwordAfterRegex === password &&
            passwordConfirmAfterRegex === passwordConfirm
        ) {
            console.log("success!");
            setPage(2);
            let firstSignupData = {
                email: email,
                nickname: nickname,
                password: password,
            };
            setFinalSignupValue({ ...firstSignupData });
        }
    };

    // mbti image

    const selectMbti = (e) => {
        let mbtiValue = e.target.innerHTML.split(" ");
        let mbtiSignupValue = { mbti: mbtiValue[0] };
        setFinalSignupValue({ ...finalSignupValue, ...mbtiSignupValue });
        setPage(3);
    };

    // header
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/signin");
    };

    React.useEffect(() => {
        checkEmailByRegex(email);
        checkNicknameByRegex(nickname);
        checkPasswordByRegex(password);
        checkPasswordConfirmByRegex(password, passwordConfirm);
        setUserData({
            email: email,
            nickname: nickname,
            password: password,
        });
        checkfirstpageComplete();
    }, [
        email,
        nickname,
        password,
        passwordConfirm,
        emailAxiosCheck,
        nicknameAxiosCheck,
        emailafterCheck,
        nicknameafterCheck,
        passwordIsValid,
        passwordConfirmIsValid,
        passwordAfterRegex,
        passwordConfirmAfterRegex,
    ]);

    return (
        <>
            <Grid mystyles="position: relative; margin-top: 41px;">
                <Grid mystyles="position: absolute; right: 10; margin-top: -10px;">
                    <IconButton onClick={goBack}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Grid>
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin: auto; width: 173px;"
                >
                    <Text mystyles="font-weight: 700; font-size: 16px;">
                        회원가입
                    </Text>
                </Grid>
            </Grid>
            {page === 1 && (
                <Grid mystyles="margin-top: 72px;">
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        mystyles="padding: 0 50px;"
                    >
                        <Input
                            mystyles="height: 32px; width: 220px; border-top: none; border-left: none; border-right: none; border-bottom: 1px solid rgba(180, 189, 183, 0.5); padding-left: 5px; "
                            defaultValue={emailValue}
                            onChange={emailChange}
                            placeholder="이메일"
                        />

                        <Grid>
                            <Button
                                onClick={checkEmail}
                                mystyles="width: 70px; height: 32px; margin-left: -5px; background: #05240E; color: white; border: none;"
                            >
                                중복확인
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid flex mystyles="margin: 0 50px;">
                        <Grid mystyles="width: 240px;">
                            <Text mystyles="font-size: 12px;">
                                {emailCheckMessage}
                            </Text>
                        </Grid>
                        {emailAxiosCheck && emailafterCheck === email && (
                            <CheckBoxSharpIcon
                                style={{
                                    color: "green",
                                }}
                            ></CheckBoxSharpIcon>
                        )}
                        {emailIsValid &&
                            !emailAxiosCheck &&
                            emailafterCheck === email && (
                                <DangerousIcon
                                    style={{
                                        color: "red",
                                    }}
                                ></DangerousIcon>
                            )}
                    </Grid>
                    <Grid mystyles="margin-top: 5px;">
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="center"
                            mystyles="padding: 0 50px;"
                        >
                            <Input
                                mystyles="height: 32px; width: 220px; border-top: none; border-left: none; border-right: none; border-bottom: 1px solid rgba(180, 189, 183, 0.5); padding-left: 5px; "
                                defaultValue={nicknameValue}
                                onChange={nicknameChange}
                                placeholder="닉네임을 입력하세요"
                            />
                            <Grid>
                                <Button
                                    onClick={checkNickname}
                                    mystyles="width: 70px; height: 32px; margin-left: -5px; background: #05240E; color: white; border: none;"
                                >
                                    중복확인
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid flex mystyles="margin: 0 50px;">
                            <Grid mystyles="width: 240px;">
                                <Text mystyles="font-size: 12px;">
                                    {nicknameCheckMessage}
                                </Text>
                            </Grid>
                            {nicknameAxiosCheck &&
                                nicknameafterCheck === nickname && (
                                    <CheckBoxSharpIcon
                                        style={{
                                            color: "green",
                                        }}
                                    ></CheckBoxSharpIcon>
                                )}
                            {nicknameIsValid &&
                                !nicknameAxiosCheck &&
                                nicknameafterCheck === nickname && (
                                    <DangerousIcon
                                        style={{
                                            color: "red",
                                        }}
                                    ></DangerousIcon>
                                )}
                        </Grid>
                    </Grid>
                    <Grid
                        flex
                        direction="column"
                        mystyles=" padding-left: 50px"
                    >
                        <Grid mystyles="position: relative">
                            <Input
                                mystyles="height: 32px; width: 220px; border-top: none; border-left: none; border-right: none; border-bottom: 1px solid rgba(180, 189, 183, 0.5); padding-left: 5px; "
                                defaultValue={passwordValue}
                                onChange={passwordChange}
                                placeholder="비밀번호를 입력하세요"
                                type="password"
                            />
                            {passwordIsValid &&
                                passwordAfterRegex === password && (
                                    <CheckBoxSharpIcon
                                        style={{
                                            color: "green",
                                            position: "absolute",
                                            right: "30",
                                        }}
                                    ></CheckBoxSharpIcon>
                                )}
                            {password !== "" &&
                                !passwordIsValid &&
                                passwordAfterRegex === password && (
                                    <DangerousIcon
                                        style={{
                                            color: "red",
                                            position: "absolute",
                                            right: "30",
                                        }}
                                    ></DangerousIcon>
                                )}
                        </Grid>
                        <DuplicateCheck mystyles="">
                            {passwordCheckMessage}
                        </DuplicateCheck>
                    </Grid>
                    <Grid
                        flex
                        direction="column"
                        mystyles=" padding-left: 50px;margin-top: 12px;"
                    >
                        <Grid mystyles="position: relative">
                            <Input
                                mystyles="height: 32px; width: 220px; border-top: none; border-left: none; border-right: none; border-bottom: 1px solid rgba(180, 189, 183, 0.5); padding-left: 5px; "
                                defaultValue={passwordConfirmValue}
                                onChange={passwordConfirmChange}
                                placeholder="비밀번호 확인해주세요"
                                type="password"
                            />
                            {passwordConfirmIsValid &&
                                passwordConfirmAfterRegex ===
                                    passwordConfirm && (
                                    <CheckBoxSharpIcon
                                        style={{
                                            color: "green",
                                            position: "absolute",
                                            right: "30",
                                        }}
                                    ></CheckBoxSharpIcon>
                                )}
                            {passwordConfirm !== "" &&
                                !passwordConfirmIsValid &&
                                passwordConfirmAfterRegex !==
                                    passwordConfirm && (
                                    <DangerousIcon
                                        style={{
                                            color: "red",
                                            position: "absolute",
                                            right: "30",
                                        }}
                                    ></DangerousIcon>
                                )}
                        </Grid>
                        <DuplicateCheck mystyles="">
                            {passwordConfirmCheckMessage}
                        </DuplicateCheck>
                    </Grid>
                    <Grid></Grid>
                    {firstPageComplete ? (
                        <>
                            <Grid
                                flex
                                direction="column"
                                mystyles=" padding-left: 80px"
                            >
                                <Button
                                    mystyles="height: 50px; width: 200px; border-radius: 25px; margin-top: 20px; border: none; font-size: 20px; font-weight: bold; background-color: #D6E9FE"
                                    onClick={signup}
                                >
                                    회원가입
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <>
                            {" "}
                            <Grid
                                flex
                                direction="column"
                                mystyles=" padding-left: 80px"
                            >
                                <Button
                                    mystyles="height: 50px; width: 200px; border-radius: 25px; margin-top: 20px; border: none; font-size: 20px; font-weight: bold; background-color: #D6E9FE"
                                    onClick={signup}
                                >
                                    회원가입
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            )}
            {page === 2 && (
                <>
                    <Grid mystyles="min-height: 30vh">
                        <motion.h2
                            initial={{ y: -250, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            당신의 MBTI는 무엇인가요?
                        </motion.h2>
                    </Grid>
                    <Mbti onClick={selectMbti} />
                </>
            )}
        </>
    );
}

const Carousel = styled(motion.div)`
    cursor: grab;
    overflow: hidden;
`;
const InnerCarousel = styled(motion.div)`
    display: flex;
`;
const Item = styled(motion.div)`
    min-height: 20vh;
    min-width: 33%;
    padding: 40px;
    cursor: grab;
`;

const Img = styled(motion.img)`
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
    height: 200px;

    border-radius: 50px;
`;
