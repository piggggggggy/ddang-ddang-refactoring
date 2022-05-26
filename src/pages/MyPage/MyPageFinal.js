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
import AchievementHeader from "../MyPage/components/AchievementHeader";
import ProgressDonut from "../MyPage/components/ProgressDonut";

import api from "../../modules/api";

export default function MyPageFinal() {
    React.useEffect(() => {
        getData();
    }, []);

    const [userData, setUserData] = React.useState({});

    const [feed, setFeed] = React.useState([]);

    const getData = () => {
        api.get("/api/players/mypage")
            .then((res) => {
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
                <AchievementHeader userData={userData} feed={feed} />
                <Grid mystyles="border: 2px solid red; margin-top: 40px; ">
                    <Grid mystyles="margin-bottom: 15px; margin-left: 15px">
                        <Text mystyles="font-weight: 700; font-size: 16px; color: #05240E;">
                            나의 기록
                        </Text>
                    </Grid>
                    <Grid
                        flex
                        mystyles="border: 2px solid red; width: 350px; height: 170px; margin: auto;"
                    >
                        <Grid mystyles="border: 2px solid red;">
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="border: 2px solid red; height: 32px; border-radius: 4px 4px 0px 0px; background: #266137; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                            >
                                <Text mystyles="font-weight: 700; font-size: 12px; color: white;">
                                    가장 많이 점령한 지역
                                </Text>
                            </Grid>
                            <Grid></Grid>
                        </Grid>
                        <Grid mystyles="border: 2px solid red; margin-left: 15px;">
                            <Grid
                                flex
                                alignItems="center"
                                justifyContent="center"
                                mystyles="border: 2px solid red; height: 32px; border-radius: 4px 4px 0px 0px;background: #266137; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                            >
                                <Text mystyles="font-weight: 700;  font-size: 12px; color: white;">
                                    이번달 최고 포인트
                                </Text>
                            </Grid>
                            <Grid>
                                <ProgressDonut
                                    progress={30}
                                    size={100}
                                    strokeWidth={50}
                                    circleOneStroke="#5DED86"
                                    circleTwoStroke="#B3FCC8"
                                />
                            </Grid>
                        </Grid>
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
