import api from "../modules/api";
import TokenService from "./token.service";

const register = async (email, password, nickname, mbti, profileImg) => {
    return await api.post("/api/players/signup", {
        email,
        password,
        nickname,
        mbti,
        profileImg,
    });
};

const auth = async () => {
    return await api.get("/api/players/auth");
};

const login = async (email, password) => {
    const response = await api.post("/api/players/signin", {
        email,
        password,
    });

    const accessToken = response.headers["accesstoken"];
    const refreshToken = response.headers["refreshtoken"];

    if (accessToken && refreshToken) {
        TokenService.setAccessToken(accessToken);
        TokenService.setRefreshToken(refreshToken);
    }
    return response;
};
const logout = () => {
    TokenService.removeUser("accessToken");
    TokenService.removeUser("refreshToken");
};

const checkEmail = async (email) => {
    return await api.post("api/players/dupEmail", { email: email });
};

const checkNickname = async (nickname) => {
    return await api.post("api/players/dupNickname", { nickname: nickname });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};
const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    auth,
    checkEmail,
    checkNickname,
};
export default AuthService;
