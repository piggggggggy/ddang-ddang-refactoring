import { setWithExpiry, getWithExpiry } from "../modules/localStorageControl";

class TokenService {
    getLocalRefreshToken() {
        const user = getWithExpiry("refreshToken");
        return user;
    }
    getLocalAccessToken() {
        const user = getWithExpiry("accessToken");

        return user;
    }
    updateLocalAccessToken(newToken) {
        try{

        // 현재 가지고 있는 토큰이을 불러온다.
        let accessToken = JSON.parse(localStorage.getItem("accessToken")).value;

        if (!accessToken) return this.setAccessToken(newToken);

        setWithExpiry("accessToken", accessToken, 3000000);


        }catch(err){
            console.log(err.message)
        }
    }
    getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
    setAccessToken(accessToken) {
        setWithExpiry("accessToken", accessToken, 1000 * 60 * 120);
    }
    setRefreshToken(refreshToken) {
        setWithExpiry("refreshToken", refreshToken, 1000 * 60 * 24 * 12);
    }
    removeUser(name) {
        localStorage.removeItem(name); // accessToken + refreshToken 을 넣어준다
    }
}
export default new TokenService();
