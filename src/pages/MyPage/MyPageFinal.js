import React from "react";
import styled from "styled-components";
import { Container } from "../../elements/index";
import Navigation from "../../components/Navigation";
import { Grid, Text } from "../MyPage/elements/index";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ProgressBar from "../MyPage/components/ProgressBar";
import Header from "../MyPage/components/Header";

import api from "../../modules/api";

export default function MyPageFinal() {
    React.useEffect(() => {
        getData();
    }, []);

    const [userData, setUserData] = React.useState({});
    console.log(userData);

    const [feed, setFeed] = React.useState([]);
    console.log(feed);

    const getData = () => {
        api.get("/api/players/mypage")
            .then((res) => {
                console.log(res);
                setUserData({ ...userData, ...res?.data?.rows });
                setFeed(
                    res?.data?.rows?.achievedMission?.filter((value) => {
                        return value.type === "feed";
                    })
                );
            })
            .catch((res) => {
                console.log(res);
            });
    };
    console.log("helsssldo");
    return (
        <Container>
            <BackgroundPaper />
            <Grid
                flex
                direction="column"
                alignItems="center"
                justifyContent="center"
                mystyles={
                    "position: relative; z-index: 100; padding: 0 20px; margin-bottom: 200px;"
                }
            >
                <Header userData={userData} />
                <Grid
                    flex
                    direction="row"
                    mystyles="border: 2px solid red; margin-top: 20px; height: 100px; padding: 10px; background: white;"
                >
                    <Grid
                        flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        mystyles="border: none; background: white; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                    >
                        <Text mystyles="font-weight: 400; font-size: 12px; color: #266137">
                            점령한 땅
                        </Text>
                        <Text mystyles="font-weight: 700; font-size: 18px; margin-top: 5px; color: #266137">
                            {userData?.achievedMission?.length}땅
                        </Text>
                    </Grid>
                    <Grid
                        flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        mystyles="border-left: 2px solid red; border-right: 2px solid red; background: white; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                    >
                        <Text mystyles="font-weight: 400; font-size: 12px; color: #266137">
                            누적 포인트
                        </Text>
                        <Text mystyles="font-weight: 700; font-size: 18px; margin-top: 5px; color: #266137">
                            {userData?.profile?.[0]?.exp}P
                        </Text>
                    </Grid>
                    <Grid
                        flex
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        mystyles="border: none; background: white;box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                    >
                        <Text mystyles="font-weight: 400; font-size: 12px; color: #266137">
                            작성한 피드
                        </Text>
                        <Text mystyles="font-weight: 700; font-size: 18px; margin-top: 5px; color: #014A83;">
                            {feed?.length}개
                        </Text>
                    </Grid>
                </Grid>
            </Grid>
            <Navigation />
        </Container>
    );
}
const BackgroundPaper = styled.div`
    position: absolute;
    top: -1280px;
    left: calc(50% - 750px);
    z-index: 0;
    width: 1500px;
    height: 1500px;
    background: #266137;
    box-shadow: 1px 1px 3px rgba(137, 142, 139, 0.7);
`;
