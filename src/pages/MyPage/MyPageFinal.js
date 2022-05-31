import React from "react";
import { Container } from "../../elements/index";
import Navigation from "../../components/Navigation";
import { Grid } from "../MyPage/elements/index";
import Profile from "./components/Profile";
import AchievementSummary from "./components/AchievementSummary";
import MyRecord from "./components/MyRecord";
import BackgroundPaper from "../MyPage/components/BackgroundPaper";
import Achievement from "./components/Achievement";
import MapView from "../MyPage/components/Map";
import api from "../../modules/api";
import Settings from "../MyPage/components/Settings";
import BottomPost from "../MyPage/components/BottomPost";
import FeedBottomPost from "../MyPage/components/FeedBottomPost";
import ProfileSettings from "../MyPage/components/ProfileSettings";
import KakaoService from "../../services/kakao.service";
import RankingService from "../../services/ranking.service";
import FooterContent from "./components/FooterContent";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/slices/userSlice";

export default function MyPageFinal() {
    const dispatch = useDispatch();
    const [userData, setUserData] = React.useState(null);
    const [feed, setFeed] = React.useState([]);
    const [address, setAddress] = React.useState({});

    function getData() {
        navigator.geolocation.getCurrentPosition(async (res) => {
            const region = await KakaoService.getAddress({
                location: {
                    lat: res.coords.latitude,
                    lng: res.coords.longitude,
                },
            });

            setAddress(region);
        });

        api.get("/api/players/mypage")
            .then((res) => {
                setUserData({ ...userData, ...res.data.rows });
                const user = {
                    email: res.data.rows.profile[0].email,
                    expPoints: res.data.rows.profile[0].expPoints,
                    level: res.data.rows.profile[0].level,
                    mbti: res.data.rows.profile[0].mbti,
                    nickname: res.data.rows.profile[0].nickname,
                    playerId: res.data.rows.profile[0].playerId,
                    points: res.data.rows.profile[0].points,
                    profileImg: res.data.rows.profile[0].profileImg,
                };

                dispatch(userActions.loginCheck({ user }));

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
    }

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

    const profileOpen = () => {
        setPage(3);
    };

    const [tabIndex, setTabIndex] = React.useState(false);
    const changeTab = () => {
        setTabIndex(!tabIndex);
    };

    const [openSideMenu, setOpenSideMenu] = React.useState(false);
    const sideOpen = () => {
        setOpenSideMenu(!openSideMenu);
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
                            "position: relative; z-index: 100; padding: 0 36px; margin-bottom: 200px;"
                        }
                    >
                        {userData !== null && (
                            <>
                                <Profile
                                    profile={
                                        userData !== null
                                            ? userData.profile[0].profileImg
                                            : ""
                                    }
                                    userData={userData}
                                    openModal={handleOpen}
                                    settingsOpen={settingsOpen}
                                    openSideMenu={sideOpen}
                                    profileOpen={profileOpen}
                                />
                                <AchievementSummary
                                    userData={userData}
                                    feed={feed}
                                />
                                <MyRecord address={address} />

                                <Achievement
                                    changeTab={changeTab}
                                    tabIndex={tabIndex}
                                />
                                <FooterContent />
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
            {page === 3 && (
                <>
                    {userData !== null && (
                        <ProfileSettings userData={userData} goBack={goBack} />
                    )}
                </>
            )}
        </Container>
    );
}
