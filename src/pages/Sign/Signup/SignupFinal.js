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

// aws s3 bucket
import AWS from "aws-sdk";
const S3_BUCKET = "image-uploading-pol";
const REGION = "ap-northeast-2";

AWS.config.update({
    accessKeyId: "AKIARWI6Z2AKSPUWWMXF",
    secretAccessKey: "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",
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

const API_ENDPOINT =
    "https://txtyz08kc4.execute-api.ap-northeast-2.amazonaws.com/default/getPresignedImageURL";

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
            axios
                .post("http://15.164.213.175:3000/api/players/dupEmail", {
                    email: email,
                })
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
                });
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
            axios
                .post("http://15.164.213.175:3000/api/players/dupNickname", {
                    nickname: nickname,
                })
                .then((res) => {
                    console.log(res);
                    if (!res.data.row) {
                        setNicknameAfterCheck(nickname);
                        setNicknameAxiosCheck(true);
                    } else {
                        setNicknameAfterCheck(nickname);
                        setNicknameAxiosCheck(false);
                    }
                });
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

    // profile image
    const [profileImage, setProfileImage] = React.useState("");
    const [myKey, setMyKey] = React.useState("");

    const handleImgChange = async (e) => {
        const f = e.target.files[0];
        // preview 보여주기
        var reader = new FileReader();
        reader.onload = function () {
            console.log(reader.result);
            setProfileImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
        reader.readAsDataURL(f);
        console.log(f);
        const response = await axios({
            method: "GET",
            url: API_ENDPOINT,
        });
        console.log(response.data.Key);
        setMyKey(response.data.Key);

        const result = await fetch(response.data.uploadURL, {
            method: "PUT",
            headers: {
                "Content-Type": "image/jpeg",
            },
            body: f,
        });
        console.log(result.url);
    };

    const getUrl = () => {
        console.log(typeof myKey);
        console.log(myKey);
        const url = myBucket.getSignedUrl("getObject", {
            Bucket: S3_BUCKET,
            Key: myKey,
        });
        console.log(url);
        let finalImage = { profileImg: url };
        setFinalSignupValue({ ...finalSignupValue, ...finalImage });
        console.log(finalSignupValue);
        // final submit
        finalsignup();
    };
    const navigate = useNavigate();
    console.log(finalSignupValue);

    const finalsignup = async () => {
        console.log(finalSignupValue);
        await axios
            .post(
                "http://15.164.213.175:3000/api/players/signup",
                finalSignupValue
            )
            .then((res) => {
                console.log(res);
                navigate("/signin");
            })
            .catch((err) => {
                console.log(err);
            });
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
            {page === 1 && (
                <>
                    <Grid>
                        <Text>Go Back</Text>
                    </Grid>
                    <Grid
                        flex
                        justifyContent="center"
                        alignItems="center"
                        mystyles="min-height: 20vh"
                    >
                        <motion.h1
                            initial={{ y: -250, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            회원가입
                        </motion.h1>
                    </Grid>
                    <Grid
                        flex
                        direction="column"
                        mystyles=" padding-left: 50px"
                    >
                        <Grid mystyles="position: relative">
                            <Input
                                mystyles="height: 40px; width: 250px; border-radius: 10px; border: none; box-shadow: 2px 5px 16px 0px #0B325E"
                                whileFocus={{ scale: 1.1 }}
                                defaultValue={emailValue}
                                onChange={emailChange}
                                placeholder="이메일을 입력하세요"
                            />
                            {emailAxiosCheck && emailafterCheck === email && (
                                <CheckBoxSharpIcon
                                    style={{
                                        color: "green",
                                        position: "absolute",
                                        right: "30",
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
                                            right: "30",
                                        }}
                                    ></DangerousIcon>
                                )}
                        </Grid>
                        <DuplicateCheck
                            duplicate
                            onClick={checkEmail}
                            mystyles=""
                        >
                            {emailCheckMessage}
                        </DuplicateCheck>
                    </Grid>
                    <Grid
                        flex
                        direction="column"
                        mystyles=" padding-left: 50px"
                    >
                        <Grid mystyles="position: relative">
                            <Input
                                mystyles="height: 40px; width: 250px; border-radius: 10px; border: none; box-shadow: 2px 5px 16px 0px #0B325E"
                                whileFocus={{ scale: 1.1 }}
                                defaultValue={nicknameValue}
                                onChange={nicknameChange}
                                placeholder="닉네임을 입력하세요"
                            />
                            {nicknameAxiosCheck &&
                                nicknameafterCheck === nickname && (
                                    <CheckBoxSharpIcon
                                        style={{
                                            color: "green",
                                            position: "absolute",
                                            right: "30",
                                        }}
                                    ></CheckBoxSharpIcon>
                                )}
                            {nicknameIsValid &&
                                !nicknameAxiosCheck &&
                                nicknameafterCheck === nickname && (
                                    <DangerousIcon
                                        style={{
                                            color: "red",
                                            position: "absolute",
                                            right: "30",
                                        }}
                                    ></DangerousIcon>
                                )}
                        </Grid>
                        <DuplicateCheck
                            duplicate
                            onClick={checkNickname}
                            mystyles=""
                        >
                            {nicknameCheckMessage}
                        </DuplicateCheck>
                    </Grid>
                    <Grid
                        flex
                        direction="column"
                        mystyles=" padding-left: 50px"
                    >
                        <Grid mystyles="position: relative">
                            <Input
                                mystyles="height: 40px; width: 250px; border-radius: 10px; border: none; box-shadow: 2px 5px 16px 0px #0B325E"
                                whileFocus={{ scale: 1.1 }}
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
                                mystyles="height: 40px; width: 250px; border-radius: 10px; border: none; box-shadow: 2px 5px 16px 0px #0B325E"
                                whileFocus={{ scale: 1.1 }}
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
                                    transition={{
                                        ease: "linear",
                                        duration: 0.2,
                                        repeat: Infinity,
                                    }}
                                    animate={{
                                        scale: 1.1,
                                        color: "#FFFFFF",
                                    }}
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
                                    whileHover={{
                                        scale: 1.1,
                                        color: "#FFFFFF",
                                        textShadow:
                                            "0px 0px 8px rbg(255,255,255)",
                                        boxShadow:
                                            "0px 0px 8px rgb(255,255,255)",
                                        transition: { yoyo: 10 },
                                    }}
                                >
                                    회원가입
                                </Button>
                            </Grid>
                        </>
                    )}
                </>
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
            {page === 3 && (
                <>
                    <Grid direction="column">
                        <Grid>
                            <motion.h1
                                initial={{ y: -250, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                            >
                                프로필 사진을
                            </motion.h1>
                        </Grid>
                        <Grid>
                            <motion.h1
                                initial={{ y: -250, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                            >
                                선택해주세요!
                            </motion.h1>
                        </Grid>
                        <ProfilePreview
                            src={profileImage}
                            mystyles="width: 300px; height: 300px; border-radius: 300px; border: 3px solid grey"
                        ></ProfilePreview>
                        <Grid
                            direction="row"
                            justifyContent="center"
                            alignItes="center"
                        >
                            <Input type="file" onChange={handleImgChange} />
                        </Grid>
                        <Grid mystyles="height: 30vh">
                            <Button
                                mystyles="height: 50px; width: 200px; border-radius: 25px; border: none; font-size: 20px; font-weight: bold; background-color: #FBA3A0"
                                onClick={getUrl}
                            >
                                회원가입 완료
                            </Button>
                        </Grid>
                    </Grid>
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
