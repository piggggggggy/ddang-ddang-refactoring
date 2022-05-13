import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "./shared/Cookie";
import {
    loginCheckAxios,
    getProfileDetailsAxios,
} from "./store/thunk-actions/userActions";
import "./App.css";
import Container from "./elements/Container";
import AppRouter from "./shared/Router";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = getCookie("token");
    React.useEffect(() => {
        console.log(token);
        if (token) {
            dispatch(
                getProfileDetailsAxios(token, (url) => {
                    navigate(url);
                })
            );
        } else {
            navigate("/signin");
        }
    }, [dispatch, navigate, token]);
    return (
        <Container>
            <AppRouter />
        </Container>
    );
}

export default App;
