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

import { Spinner } from "./elements/index";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            dispatch(
                loginCheckAxios(token, (url) => {
                    navigate(url);
                })
            );

            setIsLoading(false);
        } else {
            return;
        }
    }, []);

    // if (isLoading) {
    //     return <Spinner>Loading...</Spinner>;
    // }

    return (
        <Container>
            {" "}
            <AppRouter />
        </Container>
    );
}

export default App;
