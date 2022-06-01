import axios from "axios";

export default function KakaoLogin() {
    try {
        const res = axios.get("http://localhost:8080/api/players/kakao");
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}
