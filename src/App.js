import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./shared/Cookie";
import {
    loginCheckAxios,
    getProfileDetailsAxios,
} from "./store/thunk-actions/userActions";
import Container from "./elements/Container";
import AppRouter from "./shared/Router";

import { Spinner } from "./elements/index";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(true);

    // React.useEffect(() => {
    //     const token = getCookie("token");
    //     console.log(token);
    //     if (token) {
    //         dispatch(
    //             loginCheckAxios(token, (url) => {
    //                 navigate(url);
    //             })
    //         );
    //     } else {
    //         navigate("/signin");
    //     }
    //     setIsLoading(false);
    // }, []);

    // if (isLoading) {
    //     return <Spinner>Loading...</Spinner>;
    // }

    return (
        <Container>
            <AppRouter />
        </Container>
    );
}

export default App;
