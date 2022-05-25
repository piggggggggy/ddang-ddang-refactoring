import { setWithExpiry, getWithExpiry } from "../modules/localStorageControl";

class TokenService {
    getLocalRefreshToken() {
        const user = getWithExpiry("refreshToken");
        return user;
    }
    getLocalAccessToken() {
        const user = getWithExpiry("accessToken");
        // const user = JSON.parse(localStorage.getItem("accesToken"))
        return user;
    }
    updateLocalAccessToken(newToken) {
        let accessToken = JSON.parse(localStorage.getItem("accessToken"));

        if (!accessToken) return this.setAccessToken(newToken);

        accessToken.accessToken = newToken;
        setWithExpiry("accessToken", JSON.stringify(accessToken), 3000000);
        // localStorage.setItem("accessToken", JSON.stringify(accessToken))
    }
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
    setAccessToken(accessToken) {
        setWithExpiry("accessToken", accessToken, 1000 * 60 * 120);
        // localStorage.setItem("accessToken", JSON.stringify(accessToken))
    }
    setRefreshToken(refreshToken) {
        setWithExpiry("refreshToken", refreshToken, 1000 * 60 * 24 * 12);
        // localStorage.setItem("refreshToken", JSON.stringify(refreshToken))
    }
    removeUser(name) {
        localStorage.removeItem(name); // accessToken + refreshToken 을 넣어준다
    }
}
export default new TokenService();
