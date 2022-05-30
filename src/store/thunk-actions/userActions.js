import { userActions } from "../slices/userSlice";
import api from "../../modules/api";
import AuthService from "../../services/auth.service";
import TokenService from "../../services/token.service";

// 토큰 확인
export const loginCheckAxios = (token, navigate) => {
    return async function (dispatch) {
        try {
            const response = await AuthService.auth();
            const user = {
                email: response.data.user.email,
                expPoints: response.data.user.expPoints,
                level: response.data.user.level,
                mbti: response.data.user.mbti,
                nickname: response.data.user.nickname,
                playerId: response.data.user.playerId,
                points: response.data.user.points,
                profileImg: response.data.user.profileImg,
            };

            dispatch(userActions.loginCheck({ user, token }));
        } catch (err) {
            console.log(err);
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

            user = { email, nickname: response.data.row.nickname };
            TokenService.setAccessToken(response.headers["accesstoken"]);

            const tokenFullString = response.headers.accesstoken;
            const tokenArr = tokenFullString.split(" ");

            dispatch(userActions.signin({ user, token: tokenArr[1] }));
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
};

// 이메일 중복 확인
export const checkEmailAxios = (email) => {
    let data = { email: email };
    return async function (dispatch) {
        try {
            await api.post("/players/dupEmail", data);
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
            const response = await api.post("/players/dupNickname", data);
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
        console.log(email, password, nickname, mbti, profileImg);
        AuthService.register(email, password, nickname, mbti, profileImg)
            .then((res) => {
                console.log(res);
                dispatch(
                    userActions.signup({
                        email,
                        nickname,
                        mbti,
                        profileImg,
                    })
                );
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

// 프로필 수정
export const profileUpdatesAxios = (profile, token, navigate) => {
    return async function (dispatch) {
        let { nickname, profileImg, email } = profile;
        console.log(nickname, profileImg);
        try {
            await api.patch("/players/edit", {
                nickname: nickname,
                profileImg: profileImg,
                email: email,
            });

            const user = {
                nickname: nickname,
                profileImg: profileImg,
            };
            dispatch(userActions.updateProfile({ user }));
        } catch (err) {
            console.log(err);
            navigate("/signin");
        }
    };
};
