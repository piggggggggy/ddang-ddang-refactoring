import React from "react";
import lo from "lodash";

import { useNavigate } from "react-router-dom";

import { Grid, Text } from "../../../elements/index";
import { Button, Input } from "../../Sign/elements/index";
import Mbti from "../Signup/components/Mbti";

import CheckBoxSharpIcon from "@mui/icons-material/CheckBoxSharp";
import DangerousIcon from "@mui/icons-material/Dangerous";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import DoneIcon from "@mui/icons-material/Done";

import AuthService from "../../../apis/auth.service";

export default function SignupFinal() {
    // header
    const navigate = useNavigate();
    const goBack = () => {
        if (page === 1) {
            navigate("/signin");
        } else if (page === 2) {
            setPage(1);
        }
    };

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

    const [emailafterCheck, setEmailAfterCheck] = React.useState("");
    const [emailAxiosCheck, setEmailAxiosCheck] = React.useState();

    const checkEmailByRegex = (email) => {
        const regEmail = /^((\w|[.])+)@((\w|[-.])+)\.([A-Za-z]+){2,3}$/;
        if (email && !regEmail.test(email)) {
            setEmailCheckMessage("이메일 형식을 다시 확인해주세요");
            setEmailIsValid(false);
        } else if (email && regEmail.test(email) && emailAxiosCheck) {
            setEmailCheckMessage("중복확인 성공");
            setEmailIsValid(true);
        } else if (email && regEmail.test(email) && emailAxiosCheck == null) {
            setEmailCheckMessage("올바른 이메일 형식입니다!");
            setEmailIsValid(true);
        } else if (email && regEmail.test(email) && emailAxiosCheck === false) {
            setEmailCheckMessage("중복확인 실패");
            setEmailIsValid(true);
        } else if (email === "") {
            setEmailCheckMessage("");
            setEmailIsValid(false);
        }
    };

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

    const [nicknameafterCheck, setNicknameAfterCheck] = React.useState("");
    const [nicknameAxiosCheck, setNicknameAxiosCheck] = React.useState();

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

    // 동의서
    const [firstModal, setFirstModal] = React.useState(false);
    const [firstAgree, setFirstAgree] = React.useState(false);

    const [secondModal, setSecondModal] = React.useState(false);
    const [secondAgree, setSecondAgree] = React.useState(false);

    const [thirdModal, setThirdModal] = React.useState(false);
    const [thirdAgree, setThirdAgree] = React.useState(false);

    const [allAgree, setAllAgree] = React.useState(false);

    // all
    const agreeAll = () => {
        setFirstAgree(true);
        setSecondAgree(true);
        setThirdAgree(true);
        setAllAgree(true);
    };

    const cancelAll = () => {
        setFirstAgree(false);
        setSecondAgree(false);
        setThirdAgree(false);
        setAllAgree(false);
    };

    // first
    const openFirstModal = () => {
        setFirstModal(true);
    };
    const closeFirstModal = () => {
        setFirstModal(false);
    };

    const agreeFirst = () => {
        setFirstAgree(true);
        setFirstModal(false);
    };

    const cancelAgreeFirst = () => {
        setFirstAgree(false);
    };
    // second
    const openSecondModal = () => {
        setSecondModal(true);
    };
    const closeSecondModal = () => {
        setSecondModal(false);
    };

    const agreeSecond = () => {
        setSecondAgree(true);
        setSecondModal(false);
    };

    const cancelAgreeSecond = () => {
        setSecondAgree(false);
    };

    // third
    const openThirdModal = () => {
        setThirdModal(true);
    };
    const closeThirdModal = () => {
        setThirdModal(false);
    };

    const agreeThird = () => {
        setThirdAgree(true);
        setThirdModal(false);
    };

    const cancelAgreeThird = () => {
        setThirdAgree(false);
    };

    // 최종 회원 가입 값
    const [finalSignupValue, setFinalSignupValue] = React.useState({
        email: "string",
        nickname: "string",
        password: "string",
        mbti: "string",
        profileImg: "string",
    });

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
            setPage(2);
            let firstSignupData = {
                email: email,
                nickname: nickname,
                password: password,
            };
            setFinalSignupValue({ ...firstSignupData });
        }
    };

    React.useEffect(() => {
        checkEmailByRegex(email);
        checkNicknameByRegex(nickname);
        checkPasswordByRegex(password);
        checkPasswordConfirmByRegex(password, passwordConfirm);
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
        <Grid mystyles="position: relative;">
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

                        <Grid mystyles="position: relative">
                            <Button
                                onClick={checkEmail}
                                mystyles="width: 70px; height: 32px; margin-left: -5px; background: #DADEDB; color: #05240E; border: none;"
                            >
                                중복확인
                            </Button>
                            {emailAxiosCheck && emailafterCheck === email && (
                                <CheckBoxSharpIcon
                                    style={{
                                        color: "green",
                                        position: "absolute",
                                        left: 0,
                                        marginLeft: "-30px",
                                        marginTop: "5px",
                                    }}
                                ></CheckBoxSharpIcon>
                            )}
                            {emailIsValid &&
                                !emailAxiosCheck &&
                                emailafterCheck === email && (
                                    <DangerousIcon
                                        style={{
                                            color: "red",
                                            position: "absolute",
                                            left: 0,
                                            marginLeft: "-30px",
                                            marginTop: "5px",
                                        }}
                                    ></DangerousIcon>
                                )}
                        </Grid>
                    </Grid>
                    <Grid flex mystyles="margin: 0 55px;">
                        <Grid mystyles="width: 240px; height: 12px;">
                            <Text mystyles="font-size: 12px;">
                                {emailCheckMessage}
                            </Text>
                        </Grid>
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
                                    mystyles="width: 70px; height: 32px; margin-left: -5px; background: #DADEDB; color: #05240E; border: none;"
                                >
                                    중복확인
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid flex mystyles="margin: 0 50px;">
                            <Grid mystyles="width: 240px; height: 12px">
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
                        <Grid>
                            <Input
                                mystyles="height: 32px; width: 220px; border-top: none; border-left: none; border-right: none; border-bottom: 1px solid rgba(180, 189, 183, 0.5); padding-left: 5px; "
                                defaultValue={passwordValue}
                                onChange={passwordChange}
                                placeholder="비밀번호를 입력하세요"
                                type="password"
                            />
                        </Grid>
                        <Grid
                            flex
                            justifyContent="space-between"
                            mystyles="width: 240px; height: 18px"
                        >
                            <Text mystyles="font-size: 12px;">
                                {passwordCheckMessage}
                            </Text>
                            {passwordIsValid &&
                                passwordAfterRegex === password && (
                                    <CheckBoxSharpIcon
                                        style={{
                                            color: "green",
                                        }}
                                    ></CheckBoxSharpIcon>
                                )}
                            {password !== "" &&
                                !passwordIsValid &&
                                passwordAfterRegex === password && (
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
                        mystyles="padding-left: 50px;margin-top: 12px;"
                    >
                        <Grid>
                            <Input
                                mystyles="height: 32px; width: 220px; border-top: none; border-left: none; border-right: none; border-bottom: 1px solid rgba(180, 189, 183, 0.5); padding-left: 5px; "
                                defaultValue={passwordConfirmValue}
                                onChange={passwordConfirmChange}
                                placeholder="비밀번호 확인해주세요"
                                type="password"
                            />
                            <Grid
                                flex
                                justifyContent="space-between"
                                mystyles="width: 240px; height: 12px"
                            >
                                <Text mystyles="font-size: 12px;">
                                    {passwordConfirmCheckMessage}
                                </Text>
                                {passwordConfirmIsValid &&
                                    passwordConfirmAfterRegex ===
                                        passwordConfirm && (
                                        <CheckBoxSharpIcon
                                            style={{
                                                color: "green",
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
                                            }}
                                        ></DangerousIcon>
                                    )}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        direction="column"
                        mystyles=" padding-left: 50px; margin-top: 40px;"
                    >
                        <Grid>
                            <Text
                                mystyles="font-weight: 700; font-size: 12px; color: #05240E;
"
                            >
                                약관 동의
                            </Text>
                        </Grid>
                        <Grid flex mystyles=" margin-top: 20px;">
                            {allAgree && (
                                <Grid
                                    onClick={cancelAll}
                                    mystyles="width: 16px; height: 16px; border-radius: 16px; border: 0.5px solid #05240E; background:black; position: relative"
                                >
                                    <Grid mystyles="position: absolute; margin-top: -4px; ">
                                        <DoneIcon
                                            sx={{
                                                color: "white",
                                                fontSize: "14px",
                                                fontWeight: "700",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            {!allAgree && (
                                <Grid
                                    onClick={agreeAll}
                                    mystyles="width: 16px; height: 16px; border-radius: 16px; border: 0.5px solid #05240E;"
                                ></Grid>
                            )}
                            <Text
                                pointer
                                onClick={agreeAll}
                                mystyles="font-weight: 400; font-size: 12px; margin-left: 7px; color: #05240E; width: 200px; "
                            >
                                전체 동의
                            </Text>
                        </Grid>
                        <Grid flex mystyles=" margin-top: 20px;">
                            {firstAgree && (
                                <Grid
                                    onClick={cancelAgreeFirst}
                                    mystyles="width: 16px; height: 16px; border-radius: 16px; border: 0.5px solid #05240E; background:black; position: relative"
                                >
                                    <Grid mystyles="position: absolute; margin-top: -4px; ">
                                        <DoneIcon
                                            sx={{
                                                color: "white",
                                                fontSize: "14px",
                                                fontWeight: "700",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            {!firstAgree && (
                                <Grid
                                    onClick={agreeFirst}
                                    mystyles="width: 16px; height: 16px; border-radius: 16px; border: 0.5px solid #05240E;"
                                ></Grid>
                            )}
                            <Text
                                pointer
                                onClick={openFirstModal}
                                mystyles="font-weight: 400; font-size: 12px; margin-left: 7px; color: #05240E; width: 200px; "
                            >
                                이용약관 동의 (필수)
                            </Text>
                            <Text
                                pointer
                                onClick={openFirstModal}
                                mystyles="font-weight: 400; font-size: 12px; color: rgba(5, 36, 14, 0.3);"
                            >
                                내용 보기
                            </Text>
                        </Grid>
                        <Grid flex mystyles=" margin-top: 20px;">
                            {secondAgree && (
                                <Grid
                                    onClick={cancelAgreeSecond}
                                    mystyles="width: 16px; height: 16px; border-radius: 16px; border: 0.5px solid #05240E; background:black; position: relative"
                                >
                                    <Grid mystyles="position: absolute; margin-top: -4px; ">
                                        <DoneIcon
                                            sx={{
                                                color: "white",
                                                fontSize: "14px",
                                                fontWeight: "700",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            {!secondAgree && (
                                <Grid
                                    onClick={agreeSecond}
                                    mystyles="width: 16px; height: 16px; border-radius: 16px; border: 0.5px solid #05240E;"
                                ></Grid>
                            )}
                            <Text
                                pointer
                                onClick={openSecondModal}
                                mystyles="font-weight: 400; font-size: 12px; margin-left: 7px; color: #05240E; width: 200px; "
                            >
                                개인정보 취급방침 동의 (필수)
                            </Text>
                            <Text
                                pointer
                                onClick={openSecondModal}
                                mystyles="font-weight: 400; font-size: 12px; color: rgba(5, 36, 14, 0.3);"
                            >
                                내용 보기
                            </Text>
                        </Grid>
                        <Grid flex mystyles=" margin-top: 20px;">
                            {thirdAgree && (
                                <Grid
                                    onClick={cancelAgreeThird}
                                    mystyles="width: 16px; height: 16px; border-radius: 16px; border: 0.5px solid #05240E; background:black; position: relative"
                                >
                                    <Grid mystyles="position: absolute; margin-top: -4px; ">
                                        <DoneIcon
                                            sx={{
                                                color: "white",
                                                fontSize: "14px",
                                                fontWeight: "700",
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                            {!thirdAgree && (
                                <Grid
                                    onClick={agreeThird}
                                    mystyles="width: 16px; height: 16px; border-radius: 16px; border: 0.5px solid #05240E;"
                                ></Grid>
                            )}
                            <Text
                                pointer
                                onClick={openThirdModal}
                                mystyles="font-weight: 400; font-size: 12px; margin-left: 7px; color: #05240E; width: 200px; "
                            >
                                위치정보 수집 동의 (필수)
                            </Text>
                            <Text
                                pointer
                                onClick={openThirdModal}
                                mystyles="font-weight: 400; font-size: 12px; color: rgba(5, 36, 14, 0.3);"
                            >
                                내용 보기
                            </Text>
                        </Grid>
                    </Grid>
                    <Modal open={firstModal} onClose={closeFirstModal}>
                        <Grid mystyles="width: 300px; height: 300px; margin: auto; background: white; overflow: scroll; position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%)">
                            <Text>이용약관 동의</Text>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="margin: 30px 0px;"
                            >
                                <Button
                                    onClick={agreeFirst}
                                    mystyles="width: 200px;"
                                >
                                    동의하기
                                </Button>
                            </Grid>
                        </Grid>
                    </Modal>
                    <Modal open={secondModal} onClose={closeSecondModal}>
                        <Grid mystyles="width: 300px; height: 300px; margin: auto; background: white; overflow: scroll; position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%)">
                            <Text>개인정보 취급방침 동의</Text>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="margin: 30px 0px;"
                            >
                                <Button
                                    onClick={agreeSecond}
                                    mystyles="width: 200px;"
                                >
                                    동의하기
                                </Button>
                            </Grid>
                        </Grid>
                    </Modal>
                    <Modal open={thirdModal} onClose={closeThirdModal}>
                        <Grid mystyles="width: 300px; height: 300px; margin: auto; background: white; overflow: scroll; position: absolute; top: 50%; left:50%; transform: translate(-50%, -50%)">
                            <Text>위치정보 수집 동의</Text>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="margin: 30px 0px;"
                            >
                                <Button
                                    onClick={agreeThird}
                                    mystyles="width: 200px;"
                                >
                                    동의하기
                                </Button>
                            </Grid>
                        </Grid>
                    </Modal>
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="center"
                        mystyles="margin-top: 240px;"
                    >
                        <Grid mystyles="width: 8px; height: 8px; border-radius: 8px; border: 0.5px solid #05240E; background: #05240E"></Grid>
                        <Grid mystyles="margin-left: 16px; width: 8px; height: 8px; border-radius: 8px; border: 0.5px solid #05240E;"></Grid>
                    </Grid>
                    {firstPageComplete ? (
                        <>
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="margin-top: 20px;"
                            >
                                <Button
                                    mystyles="height: 40px; width: 300px; border: none; border: 1.5px solid #5CEB84; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); background: white; font-weight: 700; font-size: 14px;"
                                    onClick={signup}
                                    animate={{ background: "#5CEB84" }}
                                    transition={{ delay: 0.2 }}
                                >
                                    다음
                                </Button>
                            </Grid>
                        </>
                    ) : (
                        <>
                            {" "}
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="margin-top: 20px;"
                            >
                                <Button
                                    mystyles="height: 40px; width: 300px; border: none; border: 1.5px solid #5CEB84; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15); background: white; font-weight: 700; font-size: 14px;"
                                    onClick={signup}
                                >
                                    다음
                                </Button>
                            </Grid>
                        </>
                    )}
                </Grid>
            )}
            {page === 2 && (
                <>
                    <Mbti finalSignupValue={finalSignupValue} />
                </>
            )}
        </Grid>
    );
}
