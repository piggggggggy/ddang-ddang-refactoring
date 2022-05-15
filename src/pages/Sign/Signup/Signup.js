import React from "react";
import lo from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../shared/Cookie";

import { Grid, Input, Text, Button } from "../../../elements/index";

import DuplicateCheck from "../Signup/components/DuplicateCheck";
import ProgressDonut from "../Signup/components/ProgressDonut";
import ProfilePreview from "../Signup/components/ProfilePreview";

import {
    signupAxios,
    checkEmail,
    checkNickname,
} from "../../../store/thunk-actions/userActions";

import axios from "axios";

import AWS from "aws-sdk";
const S3_BUCKET = "lewigolski-bk.shop";
const REGION = "ap-northeast-2";

AWS.config.update({
    accessKeyId: "AKIARWI6Z2AK3TCNHHVV",
    secretAccessKey: "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",
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

window.Buffer = window.Buffer || require("buffer").Buffer;

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = React.useState("");
    const [emailCheckMessage, setEmailCheckMessage] = React.useState();
    const [emailIsValid, setEmailIsValid] = React.useState();
    const [isemailCheck, setIsEmailCheck] = React.useState(false);

    const [nickname, setNickname] = React.useState("");
    const [nicknameCheckMessage, setNicknameCheckMessage] = React.useState();
    const [nicknameIsValid, setNicknameIsValid] = React.useState();
    const [isnicknameCheck, setIsNicknameCheck] = React.useState(false);

    const [password, setPassword] = React.useState("");
    const [passwordCheckMessage, setPasswordCheckMessage] = React.useState();
    const [passwordIsValid, setPasswordIsValid] = React.useState();

    const [passwordConfirm, setPasswordConfirm] = React.useState("");
    const [passwordConfirmCheckMessage, setPasswordConfirmCheckMessage] =
        React.useState();
    const [passwordConfirmIsValid, setPasswordConfirmIsValid] =
        React.useState();

    React.useEffect(() => {
        checkEmailByRegex(email);
        checkNicknameByRegex(nickname);
        checkPasswordByRegex(password);
        checkPasswordConfirmByRegex(password, passwordConfirm);
        progressMove(
            isemailCheck,
            isnicknameCheck,
            passwordIsValid,
            passwordConfirmIsValid
        );
    }, [
        email,
        nickname,
        password,
        passwordConfirm,
        isemailCheck,
        isnicknameCheck,
        passwordIsValid,
        passwordConfirmIsValid,
    ]);

    // 이메일

    const emailDebounce = lo.debounce((k) => setEmail(k), 500);
    const emailKeyPress = React.useCallback(emailDebounce, []);
    const [emailValue, setEmailValue] = React.useState("");

    const changeEmail = (e) => {
        setEmailValue(e.target.value);
        emailKeyPress(e.target.value);
    };

    const checkEmailByRegex = (email) => {
        const regEmail = /^((\w|[.])+)@((\w|[-.])+)\.([A-Za-z]+){2,3}$/;
        if (email && !regEmail.test(email)) {
            setEmailCheckMessage("이메일을 다시 확인해주세요!");
            setEmailIsValid(false);
        } else if (email && regEmail.test(email)) {
            setEmailCheckMessage("올바른 이메일 형식입니다");
            setEmailIsValid(true);
        } else {
            setEmailCheckMessage();
            setEmailIsValid(false);
        }
    };

    // progress donut
    const [progress, setProgress] = React.useState(100);
    const [complete, setComplete] = React.useState("");

    const progressMove = (
        isemailCheck,
        isnicknameCheck,
        passwordIsValid,
        passwordConfirmIsValid
    ) => {
        if (
            isemailCheck &&
            isnicknameCheck === false &&
            passwordIsValid === false &&
            passwordConfirmIsValid === false
        ) {
            setProgress(60);
            setComplete("");
        } else if (
            isemailCheck &&
            isnicknameCheck &&
            passwordIsValid === false &&
            passwordConfirmIsValid === false
        ) {
            setProgress(40);
            setComplete("");
        } else if (
            isemailCheck &&
            isnicknameCheck &&
            passwordIsValid &&
            passwordConfirmIsValid === false
        ) {
            setProgress(20);
            setComplete("");
        } else if (
            isemailCheck &&
            isnicknameCheck &&
            passwordIsValid &&
            passwordConfirmIsValid
        ) {
            setProgress(0);
            setComplete("완료");
        }
    };

    // mbti페이지 + 프로필 사진으로 넘어가기
    const nextSignup = () => {
        if (page === 1) {
            setPage(2);
        }
        if (page === 2) {
            setPage(3);
        }
    };

    const moveBackPage = () => {
        if (page == 3) {
            setPage(2);
        }
        if (page === 2) {
            setPage(1);
        }
    };

    // 이메일 중복확인

    const emailDupCheck = async () => {
        const token = getCookie("token");
        console.log(email);
        console.log(token);
        console.log(emailIsValid);
        if (emailIsValid === true) {
            const response = await axios.post("/players/dupEmail", {
                email: email,
            });
            console.log(response);
            if (response.data.ok === true) {
                console.log("이메일이 존재함");
                setIsEmailCheck(false);
            } else {
                setIsEmailCheck(true);
            }
        }
    };

    // 닉네임
    const nicknameDebounce = lo.debounce((k) => setNickname(k), 500);
    const nicknameKeyPress = React.useCallback(nicknameDebounce, []);
    const [nicknameValue, setNicknameValue] = React.useState("");

    const changeNickname = (e) => {
        setNicknameValue(e.target.value);
        nicknameKeyPress(e.target.value);
    };

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

    // 닉네임 중복확인

    const nicknameDupCheck = async () => {
        const token = getCookie("token");
        console.log(token);
        console.log(nicknameIsValid);
        if (nicknameIsValid === true) {
            const response = await axios.post("/players/dupNickname", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response);
            if (response.data.row === true) {
                console.log("닉네임 존재함");
                setIsNicknameCheck(false);
            } else {
                setIsNicknameCheck(true);
            }
        }
    };

    // 비밀번호;
    const passwordDebounce = lo.debounce((k) => setPassword(k), 500);
    const passwordKeyPress = React.useCallback(passwordDebounce, []);
    const [passwordValue, setPasswordValue] = React.useState("");

    const changePassword = (e) => {
        setPasswordValue(e.target.value);
        passwordKeyPress(e.target.value);
    };

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
        } else if (password && regPassword.test(password)) {
            setPasswordCheckMessage(
                "올바른 비밀번호입니다.확인 비밀번호를 입력해주세요"
            );
            setPasswordIsValid(true);
        }
    };

    // 비밀번호 확인

    const passwordConfirmDebounce = lo.debounce(
        (k) => setPasswordConfirm(k),
        500
    );
    const passwordConfirmKeyPress = React.useCallback(
        passwordConfirmDebounce,
        []
    );
    const [passwordConfirmValue, setPasswordConfirmValue] = React.useState("");

    const changePasswordConfirm = (e) => {
        setPasswordConfirmValue(e.target.value);
        passwordConfirmKeyPress(e.target.value);
    };

    const checkPasswordConfirmByRegex = (password, passwordConfirm) => {
        if (passwordConfirm.length !== 0 && password === passwordConfirm) {
            setPasswordConfirmCheckMessage("비밀번호가 일치합니다");
            setPasswordConfirmIsValid(true);
        } else if (passwordConfirm.length === 0) {
            setPasswordConfirmCheckMessage();
            setPasswordConfirmIsValid(false);
        } else {
            setPasswordConfirmCheckMessage("비밀번호가 일치하지 않습니다");
            setPasswordConfirmIsValid(false);
        }
    };

    // mbti page + profile page
    const [page, setPage] = React.useState(1);
    const [mbti, setMbti] = React.useState("");
    const handleChange = (e) => {
        console.log(e.target.value);
        setMbti(e.target.value);
    };

    // profile image

    const [selectedFile, setSelectedFile] = React.useState(null);
    const [profileImage, setProfileImage] = React.useState("");

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
        uploadFile(e.target.files[0]);
    };

    const uploadFile = async (file) => {
        const params = {
            ACL: "public-read",
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name,
            ContentType: "image/jpeg",
        };

        myBucket.putObject(params).on("httpUploadProgress", (evt) => {
            console.log(evt);
        });

        const url = await myBucket.getSignedUrl("getObject", {
            Bucket: S3_BUCKET,
            Key: file.name,
        });
        console.log(url);
        const jpg = url.split("?");
        console.log(jpg[0]);
        setProfileImage(jpg[0]);
    };

    const finishSignup = () => {
        console.log(email, nickname, password, mbti, profileImage);
        dispatch(
            signupAxios(email, nickname, password, mbti, profileImage, (url) =>
                navigate(url)
            )
        );
    };

    return (
        <>
            {page === 1 && (
                <>
                    <Grid mystyles="min-height: 30vh; ">
                        <h1>회원가입</h1>
                    </Grid>
                    <Grid direction="column" mystyles="min-height: 40vh; ">
                        <Grid direction="column" mystyles="min-height:10vh; ">
                            <Input
                                placeholder="이메일"
                                mystyles="height: 30px; width: 300px; border-radius: 25px; padding-left: 10px;"
                                value={emailValue}
                                onChange={changeEmail}
                            ></Input>
                            <DuplicateCheck duplicate onClick={emailDupCheck}>
                                {emailCheckMessage}
                            </DuplicateCheck>
                        </Grid>
                        <Grid direction="column" mystyles="min-height:10vh; ">
                            <Input
                                placeholder="닉네임"
                                mystyles="height: 30px; width: 300px; border-radius: 25px; padding-left: 10px;"
                                value={nicknameValue}
                                onChange={changeNickname}
                            ></Input>
                            <DuplicateCheck
                                duplicate
                                onClick={nicknameDupCheck}
                            >
                                {nicknameCheckMessage}
                            </DuplicateCheck>
                        </Grid>
                        <Grid direction="column" mystyles="min-height:10vh;">
                            <Input
                                placeholder="비밀번호"
                                type="password"
                                value={passwordValue}
                                mystyles="height: 30px; width: 300px; border-radius: 25px; padding-left: 10px;"
                                onChange={changePassword}
                            ></Input>
                            <DuplicateCheck>
                                {passwordCheckMessage}
                            </DuplicateCheck>
                        </Grid>
                        <Grid
                            direction="column"
                            mystyles="min-height:10vh; border: 2px solid red"
                        >
                            <Input
                                type="password"
                                value={passwordConfirmValue}
                                placeholder="비밀번호 확인"
                                mystyles="height: 30px; width: 300px; border-radius: 25px; padding-left: 10px;"
                                onChange={changePasswordConfirm}
                            ></Input>
                            <DuplicateCheck>
                                {passwordConfirmCheckMessage}
                            </DuplicateCheck>
                        </Grid>
                        <Grid>
                            <ProgressDonut
                                progress={progress}
                                size={120}
                                strokeWidth={15}
                                circleOneStroke="black"
                                circleTwoStroke="gray"
                                onClick={() => {
                                    if (complete) {
                                        nextSignup();
                                    }
                                }}
                            >
                                {complete}
                            </ProgressDonut>
                        </Grid>
                    </Grid>
                </>
            )}
            {page === 2 && (
                <>
                    <Grid>
                        <h1>MBTI</h1>
                    </Grid>
                    <Grid direction="column" mystyles="min-height: 50vh">
                        <Text>mbti 유형을 선택해주세요</Text>
                        <select onChange={handleChange} name="" id="">
                            <option value="enfp">선택하기</option>
                            <option value="enfp">enfp</option>
                            <option value="enfp">enfp</option>
                            <option value="enfp">enfp</option>
                            <option value="enfp">enfp</option>
                            <option value="enfp">enfp</option>
                            <option value="enfp">enfp</option>
                        </select>
                        <Grid mystyles="min-height: 20vh">
                            <Button
                                mystyles="width: 200px"
                                onClick={nextSignup}
                            >
                                다음으로
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
            {page === 3 && (
                <>
                    <Grid direction="column">
                        <h1>프로필 이미지 설정</h1>
                        <ProfilePreview
                            src={profileImage}
                            alt=""
                            mystyles="width: 200px; height: 200px"
                        />
                        <Input type="file" onChange={handleFileInput} />
                        <Grid mystyles="min-height: 50vh">
                            <Button
                                onClick={finishSignup}
                                mystyles="width: 200px; height: 30px; border-radius: 20px"
                            >
                                프로필 설정
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
