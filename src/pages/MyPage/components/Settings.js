import React from "react";
import { Grid, Text } from "../elements/index";
import Cancel from "../../../assets/images/png/mypage/cancel.png";
import AuthService from "../../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/slices/userSlice";

export default function Settings(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        AuthService.logout();
        dispatch(userActions.signout());
        navigate("/signin");
    };

    return (
        <Grid>
            <Grid
                flex
                alignItems="center"
                justifyContent="center"
                mystyles="position: relative; margin-top: 38px;"
            >
                <Grid mystyles="position: absolute; margin-left: 60px;">
                    <img onClick={props.goBack} src={Cancel} alt="" />
                </Grid>
                <Text mystyles="font-weight: 700; font-size: 16px;">설정</Text>
            </Grid>
            <Grid
                flex
                alignItems="center"
                mystyles="background: #D9D9D9; margin-top: 32px; height: 24px;"
            >
                <Text mystyles="margin-left: 30px; font-weight: 700; font-size: 12px; cursor: pointer;">
                    설정
                </Text>
            </Grid>
            <Grid mystyles="padding: 20px;">
                <Grid
                    flex
                    alignItems="center"
                    mystyles="height: 40px; border-bottom: 2px solid rgba(180, 189, 183, 0.5); padding-left: 10px; "
                >
                    <Text mystyles="font-weight: 400; font-size: 12px;cursor: pointer;">
                        닉네임 변경
                    </Text>
                </Grid>
                <Grid
                    flex
                    alignItems="center"
                    mystyles="height: 40px; border-bottom: 2px solid rgba(180, 189, 183, 0.5); padding-left: 10px; "
                >
                    <Text
                        onClick={logout}
                        mystyles="font-weight: 400; font-size: 12px; cursor: pointer;"
                    >
                        로그아웃
                    </Text>
                </Grid>
            </Grid>
            <Grid
                flex
                alignItems="center"
                mystyles="background: #D9D9D9; margin-top: 32px; height: 24px;"
            >
                <Text mystyles="margin-left: 30px; font-weight: 700; font-size: 12px; ">
                    기타 설정
                </Text>
            </Grid>
            <Grid mystyles="padding: 20px;">
                <Grid
                    flex
                    alignItems="center"
                    mystyles="height: 40px; border-bottom: 2px solid rgba(180, 189, 183, 0.5); padding-left: 10px; "
                >
                    <Text mystyles="font-weight: 400; font-size: 12px; cursor: pointer;">
                        이용약관
                    </Text>
                </Grid>
                <Grid
                    flex
                    alignItems="center"
                    mystyles="height: 40px; border-bottom: 2px solid rgba(180, 189, 183, 0.5); padding-left: 10px; "
                >
                    <Text mystyles="font-weight: 400; font-size: 12px; cursor: pointer;">
                        개인정보 취급 방침
                    </Text>
                </Grid>
                <Grid
                    flex
                    alignItems="center"
                    mystyles="height: 40px; border-bottom: 2px solid rgba(180, 189, 183, 0.5); padding-left: 10px; "
                >
                    <Text mystyles="font-weight: 400; font-size: 12px; cursor: pointer;">
                        위치 정보 취급 방침
                    </Text>
                </Grid>
                <Grid
                    flex
                    alignItems="center"
                    mystyles="height: 40px; border-bottom: 2px solid rgba(180, 189, 183, 0.5); padding-left: 10px; "
                >
                    <Text mystyles="font-weight: 400; font-size: 12px; cursor: pointer;">
                        회원 탈퇴
                    </Text>
                </Grid>
            </Grid>
        </Grid>
    );
}
