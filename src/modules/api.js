import axios from "axios";
import { getWithExpiry } from "../modules/localStorageControl";
import TokenService from "./token.service";
import { useNavigate } from "react-router-dom";

const instance = axios.create({
    baseURL: "https://thaitour.shop", // 백엔드 서버 .env 파일 만들기
    headers: {
        Accept: "/",
        "content-type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        Authorization: getWithExpiry("accessToken"),
    },
});
instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["accesstoken"] = token; // for Node.js Express back-end
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
instance.interceptors.response.use(
    (res) => {
        console.log(res);
        return res;
    },
    async (err) => {
        const originalConfig = err.config;
        if (originalConfig.url !== "/api/players/signin" && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;
                try {
                    console.log("리프레쉬 토큰 요청");
                    console.log(getWithExpiry("refreshToken"));
                    if (!getWithExpiry("refreshToken")) {
                        return alert("로그인 해주세요");
                    }
                    const rs = await instance.get(
                        "/api/players/auth/getToken",
                        {
                            headers: {
                                refreshToken:
                                    TokenService.getLocalRefreshToken(),
                            },
                        }
                    );
                    console.log(rs);
                    const accesstoken = rs.headers["accesstoken"];
                    TokenService.updateLocalAccessToken(accesstoken);
                    return instance(originalConfig);
                } catch (_error) {
                    console.log(_error.message);
                    return Promise.reject(_error);
                }
            }
        }
        return Promise.reject(err);
    }
);
export default instance;
