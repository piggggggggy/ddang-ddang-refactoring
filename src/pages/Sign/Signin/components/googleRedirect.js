import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TokenService from "../../../../services/token.service";
import { kakaoLogin } from "../../../../store/thunk-actions/userActions";
import api from "../../../../modules/api";
import axios from "axios";

const GoogleRedirect = async (props) => {
    const dispatch = useDispatch();

    // 인가코드
    let code = new URL(window.location.href).searchParams.get("code");

    TokenService.setRefreshToken(code);

    const response = await axios.get(
        "http://localhost:8080/api/players/auth/getToken",
        {
            headers: {
                Accept: "/",
                "content-type": "application/json;charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                refreshtoken: code,
            },
        }
    );

    console.log(response);

    useEffect(() => {
        dispatch(kakaoLogin(code));
    }, []);

    return <>hello world</>;
};

export default GoogleRedirect;
