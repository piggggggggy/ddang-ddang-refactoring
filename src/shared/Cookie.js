// import { Cookies } from "react-cookie"
import TokenService from "../services/token.service";

const cookies = new Cookies();

export const getLocalAccessToekn = () => {
    cookies.get("accessToken");
    return TokenService.getLocalAccessToken();
};

export const setLocalAccessToken = (value) => {
    return TokenService.setAccessToken(value);
};

export const deleteLoaclAccessToken = (name) => {
    return TokenService.removeUser(name);
};

// export const getCookie = (name) => {
//   return cookies.get(name)
// }

// export const setCookie = (name, value) => {
//   return cookies.set(name, value, {
//     path: "/",
//   })
// }
