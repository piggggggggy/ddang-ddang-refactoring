import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    loginCheckAxios,
    getProfileDetailsAxios,
} from "./store/thunk-actions/userActions";
import Container from "./elements/Container";
import AppRouter from "./shared/Router";
import TokenService from "./services/token.service";

// import { Spinner } from "./elements/index";
import splashGif from "./assets/gif/NDND_splash.gif";
import splashmp4 from "./assets/images/png/sign/NDND_splash.mp4";
import loadingSpinner from "./assets/images/png/sign/circle2.mp4";
import loadingSpinnerGif from "./assets/images/png/sign/circle.gif";
import Grid from "./elements/Grid";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const refreshtoken = TokenService.getLocalRefreshToken();
        const accesstoken = TokenService.getLocalAccessToken();



        if (!refreshtoken && !accesstoken) {
            alert("로그인이 필요합니다.");
            navigate("/signin");
            setIsLoading(false);
        } else {
            dispatch(
                loginCheckAxios(accesstoken)
            );
            setIsLoading(false);
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    if (isLoading) {
        return (
            <Container>
                <Grid flex alignItems="center" justifyContent="center">
                    <img
                        src={loadingSpinnerGif}
                        alt=""
                        style={{ width: "50%", height: "50%" }}
                    />
                </Grid>

                {/* <video
                    width="100%"
                    height="100%"
                    preload="auto"
                    muted
                    autoPlay={true}
                >
                    <source src={loadingSpinner} type="video/mp4" />
                    Your browser does not support HTML5 video.
                </video> */}
            </Container>
        );
    }

    return (
        <Container>
            {" "}
            <AppRouter />
        </Container>
    );
}

export default App;
