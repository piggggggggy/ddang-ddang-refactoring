import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TokenService from "../../../../services/token.service";
import { googleLogin } from "../../../../store/thunk-actions/userActions";
import api from "../../../../modules/api";
import axios from "axios";

const OAuth2RedirectHandler = async (props) => {
    // 인가코드


    let code = new URL(window.location.href).searchParams.get("code");
    console.log(code);

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
    const accesstoken = response.headers["accesstoken"];

    TokenService.setAccessToken(accesstoken);
    console.log(accesstoken);



    useEffect(() => {
        // dispatch(googleLogin(code));
    }, []);

    return <>hello world</>;
};

export default OAuth2RedirectHandler;
