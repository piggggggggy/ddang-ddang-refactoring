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
import MapView from "../MyPage/components/Map";
import { useSelector } from "react-redux";
import api from "../../modules/api";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import ProfileModal from "../MyPage/components/ProfileModal";
import Settings from "../MyPage/components/Settings";
import MapSideTab from "../MyPage/components/MapSideTab";

export default function MyPageFinal() {
    const [userData, setUserData] = React.useState(null);
    console.log(userData);

    const [feed, setFeed] = React.useState([]);
    console.log(feed);
    const authData = useSelector((state) => state.user.user);
    console.log(authData);

    const getData = () => {
        api.get("/api/players/mypage")
            .then((res) => {
                console.log(res);
                setUserData({ ...userData, ...res.data.rows });
                if (res.data.rows.achievedMission !== null) {
                    setFeed(
                        res.data.rows.achievedMission.filter((value) => {
                            return value.type === "feed";
                        })
                    );
                }
            })
            .catch((res) => {
                console.log(res);
            });
    };

    React.useEffect(() => {
        getData();
    }, []);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const [page, setPage] = React.useState(1);
    const goBack = () => {
        setPage(1);
    };

    const settingsOpen = () => {
        setPage(2);
    };

    return (
        <Container>
            {page === 1 && (
                <>
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
                        {userData !== null && (
                            <>
                                <Header
                                    profile={
                                        userData !== null
                                            ? userData.profile[0].profileImg
                                            : ""
                                    }
                                    userData={userData}
                                    openModal={handleOpen}
                                    settingsOpen={settingsOpen}
                                />
                                <AchievementHeader
                                    userData={userData}
                                    feed={feed}
                                />
                                <Graph />
                                <Achievement />
                                <MapView />
                                <ProfileModal
                                    open={open}
                                    handleClose={handleClose}
                                />
                                <MapSideTab userData={userData} />
                            </>
                        )}
                    </Grid>
                    <Navigation />
                </>
            )}
            {page === 2 && (
                <>
                    <Settings goBack={goBack} />
                </>
            )}
        </Container>
    );
}
