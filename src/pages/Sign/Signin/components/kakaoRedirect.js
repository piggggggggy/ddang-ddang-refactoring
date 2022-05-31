import React from "react";
import Container from "../../../../elements/Container";
import splashmp4 from "../../../../assets/images/png/sign/NDND_splash.mp4";
import TokenService from "../../../../services/token.service";
import api from "../../../../modules/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Mbti from "../../../Sign/Signup/components/Mbti";

const OAuth2RedirectHandler = async (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(true);
    //파라미터에서 리프레쉬 값가져오기

    const kakaoLogin = async () => {
        let code = new URL(window.location.href).searchParams.get("code");
        console.log(code);

        // 리프레쉬 토큰을 로컬스토리지에 저장
        TokenService.setRefreshToken(code);

        try {
            // 리프레쉬 토큰을 가지고 엑세스 토큰발행(로그인 과정)
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_URL}/api/players/auth/getToken`,
                {
                    headers: {
                        Accept: "/",
                        "content-type": "application/json;charset=UTF-8",
                        "Access-Control-Allow-Origin": "*",
                        refreshtoken: code,
                    },
                }
            );

            // console.log(response)

            // 가져온 엑세스 토큰을 로컬스토리지 저장
            // const accesstoken = infodata.headers["Authorization"];
            const accesstoken = response.headers["accesstoken"];

            TokenService.setAccessToken(accesstoken);

            const infodata = await api.get("/api/players/auth");
            const { mbti } = infodata.data.user;

            if (mbti) {
                //MBTI 입력해야함
                const gotoMbti = () => navigate("/mbti");
            }
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    //페이지 이동
    React.useEffect(() => {
        console.log("hello")
        kakaoLogin();
        // dispatch(googleLogin(code));
        if (isLoading) {
            return (
                <Container>
                    {/* <Grid flex alignItems="center" justifyContent="center">
                    <img
                        src={loadingSpinnerGif}
                        alt=""
                        style={{ width: "50%", height: "50%" }}
                    />
                </Grid> */}

                    <video
                        width="100%"
                        height="100%"
                        preload="auto"
                        muted
                        autoPlay={true}
                    >
                        <source src={splashmp4} type="video/mp4" />
                        Your browser does not support HTML5 video.
                    </video>
                </Container>
            );
        }
        navigate("/");
    }, []);

    return <>hello world</>;
};

export default OAuth2RedirectHandler;
