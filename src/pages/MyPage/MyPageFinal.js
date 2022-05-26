import React from "react";
import styled from "styled-components";
import { Container } from "../../elements/index";
import Navigation from "../../components/Navigation";
import { Grid, Text, Button } from "../MyPage/elements/index";
import Header from "../MyPage/components/Header";
import AchievementHeader from "../MyPage/components/AchievementHeader";
import Graph from "../MyPage/components/Graph";
import BackgroundPaper from "../MyPage/components/BackgroundPaper";
import Achievement from "../MyPage/components/Achievement";

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
                <Graph />
                <Achievement />
            </Grid>
            <Navigation />
        </Container>
    );
}
