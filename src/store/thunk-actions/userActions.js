import { userActions } from "../slices/userSlice";
import axios from "axios";

// 토큰 확인
export const loginCheckAxios = (token, navigate) => {
    return async function (dispatch) {
        try {
            const response = await axios.get("/players/auth", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response);
            const user = {
                email: response.data.row.email,
                nickname: response.data.row.nickname,
            };
            dispatch(userActions.loginCheck({ user, isValid: true }));
        } catch (err) {
            dispatch(userActions.loginCheck({ user: null, isValid: false }));
            window.alert("로그인이 만료되었습니다");
            navigate("/signin");
            console.log(err);
        }
    };
};

// 로그인 middleware
export const signinAxios = (email, password, navigate) => {
    return async function (dispatch) {
        let user = {
            email,
            password,
        };
        console.log(user);
        try {
            const response = await axios.post("/players/signin", user);
            user = { email, nickname: response.data.row.nickname };
            console.log(user);

            const tokenFullString = response.headers.authorization;
            const tokenArr = tokenFullString.split(" ");
            console.log(tokenArr[1]);
            dispatch(userActions.signin({ user, token: tokenArr[1] }));
            navigate("/");
        } catch (error) {
            console.log("회원가입 실패:", error.response);
        }
    };
};

// 이메일 중복 확인
export const checkEmail = (email) => {
    console.log(email);
    let data = { email: email };
    return async function (dispatch) {
        try {
            const response = await axios.post("/players/dupEmail", data);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };
};

// 닉네임 중복 확인
export const checkNickname = (nickname) => {
    console.log(nickname);
    let data = { nickname: nickname };
    return async function (dispatch) {
        try {
            const response = await axios.post("/players/dupNickname", data);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };
};

// 회원 가입 middleware
export const signupAxios = (
    email,
    nickname,
    password,
    mbti,
    profileImg,
    navigate
) => {
    return async function (dispatch) {
        let user = {
            email,
            nickname,
            password,
            mbti,
            profileImg,
        };

        try {
            const response = await axios.post("/players/signup", user);

            user = { email, nickname, password, mbti, profileImg };
            console.log(response);

            dispatch(userActions.signup({ user }));
            navigate("/");
        } catch (error) {
            console.log("회원가입 실패: ", error.response);
        }
    };
};

// 유저 프로필 상세 가져오기 (현재: 프로필 추가) + 유효성 검사

export const getProfileDetailsAxios = (token, navigate) => {
    return async function (dispatch) {
        try {
            const response = await axios.get("/players/mypage", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(response);
            const user = {
                email: response.data.profile.email,
                nickname: response.data.profile.nickname,
                profileImg: response.data.profile.profileImg,
            };
            console.log(user);
            dispatch(userActions.getProfileDetails({ user }));
        } catch (err) {
            console.log(err);
            navigate("/signin");
        }
    };
};

// 프로필 수정
export const profileUpdatesAxios = (profile, token, navigate) => {
    return async function (dispatch) {
        let { nickname, profileImg, email } = profile;
        console.log(nickname, profileImg);
        try {
            const response = await axios.patch(
                "/players/edit",
                { nickname: nickname, profileImg: profileImg, email: email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(response);
            const user = {
                nickname: nickname,
                profileImg: profileImg,
            };
            console.log(user);
            dispatch(userActions.updateProfile({ user }));
        } catch (err) {
            console.log(err);
            navigate("/signin");
        }
    };
};
