import React from "react";
import { Grid, Text } from "../elements/index";
import Cancel from "../../../assets/images/png/mypage/cancel.png";

export default function Settings(props) {
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
                <Text mystyles="margin-left: 49px; font-weight: 700; font-size: 12px;">
                    설정
                </Text>
            </Grid>
            <Grid>
                <Grid>
                    <Text>닉네임 변경</Text>
                    <Grid mystyles="height: 20px; width: 20px; border: 2px solid red;"></Grid>
                </Grid>
                <Grid>
                    <Text>로그아웃</Text>
                </Grid>
                <Grid>
                    <Text></Text>
                </Grid>
                <Grid>
                    <Text></Text>
                </Grid>
            </Grid>
        </Grid>
    );
}
