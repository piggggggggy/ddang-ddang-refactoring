import { userActions } from "../slices/userSlice";
import axios from "axios";
import AuthService from "../../apis/auth.service";
import { getWithExpiry } from "../../modules/localStorageControl";
import { setCookie } from "../../shared/Cookie";

// 토큰 확인
export const loginCheckAxios = (token, navigate) => {
    return async function (dispatch) {
        try {
            console.log(token);
            const response = await AuthService.auth();

            console.log(response);
            const user = {
                email: response.data.user.email,
                nickname: response.data.user.nickname,
                playerId: response.data.user.playerId,
            };
            console.log(user);
            dispatch(userActions.loginCheck({ user, token }));
            // navigate("/");
        } catch (err) {
            navigate("/signin");
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
        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            user = { email, nickname: response.data.row.nickname };

            console.log(getWithExpiry("accessToken"));
            setCookie("token", getWithExpiry("accessToken"));

            const tokenFullString = response.headers.accesstoken;
            const tokenArr = tokenFullString.split(" ");
            console.log(tokenArr);
            dispatch(userActions.signin({ user, token: tokenArr[1] }));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
};

// 이메일 중복 확인
export const checkEmailAxios = (email) => {
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
        AuthService.register(email, password, nickname, mbti, profileImg)
            .then((res) => {
                console.log(res);
                dispatch(
                    userActions.signup({
                        email,
                        nickname,
                        password,
                        mbti,
                        profileImg,
                    })
                );
            })
            .catch((err) => {
                console.log(err);
            });
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
