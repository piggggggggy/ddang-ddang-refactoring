import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Container } from "../../elements/index";
import Navigation from "../../components/Navigation";
import { Grid, Text } from "../MyPage/elements/index";
import ProfilePreview from "../MyPage/components/ProfilePreview";
import ProfileEdit from "../MyPage/components/ProfileEdit";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import api from "../../modules/api";
import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function MyPageFinal() {
    React.useEffect(() => {
        mypage();
    }, []);

    const [tabIndex, setTabIndex] = React.useState(false);
    const [allData, setAllData] = React.useState({});

    const achievedMission = allData?.achievedMission;
    const notAchievedMission = allData?.notAchievedMission;

    const positions = allData?.profile?.[0]?.completes;

    const mypage = async () => {
        await api
            .get("/api/players/mypage")
            .then((res) => {
                setAllData({ ...res.data.rows });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Container>
            <BackgroundPaper />
            <Grid
                mystyles={
                    "position: relative; z-index: 100; padding: 0 30px; margin-bottom: 200px;"
                }
            >
                <Grid
                    flex
                    justifyContent="space-between"
                    alignItems="center"
                    mystyles="margin-top: 100px"
                >
                    <Grid mystyles="width: 200px;">
                        <Text mystyles="font-weight: 700; font-size: 30px; color: white;">
                            {allData?.profile?.[0]?.nickname}
                        </Text>
                        <Text mystyles="font-weight: 400; font-size: 14px; color: white;">
                            개포동 {allData?.profile?.[0]?.mbti}
                        </Text>
                        <ProfileEdit></ProfileEdit>
                    </Grid>
                    <Grid
                        flex
                        alignItems="center"
                        justifyContent="space-between"
                        mystyles="width: 101px"
                    >
                        <ProfilePreview
                            src={allData?.profile?.[0].profileImg}
                            mystyles="width: 101px; height: 101px; border-radius: 101px; background-color: white;"
                        ></ProfilePreview>
                    </Grid>
                </Grid>

                <Grid mystyles="position: relative; height: 20px; background-color: #D9D9D9; border-radius: 50px; width: 150px; margin-top: 35px; margin-left: 5px;">
                    <ProgressBar
                        transition={{ delay: 0.6, duration: 1 }}
                        animate={{ width: "100px" }}
                        style={{ backgroundColor: "#EDEA50" }}
                    ></ProgressBar>
                    <Text mystyles="position: absolute; right: -35px; color: white; font-size: 18px; font-weight: 600">
                        Lv.2
                    </Text>
                </Grid>
                <Grid mystyles="margin-top: 38px;">
                    <Text mystyles="font-weight: 400; font-size: 16px; color: white;">
                        가장 최근에 달성한 땅땅뱃지
                    </Text>
                </Grid>
                <Grid
                    flex
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mystyles="width: 320px; margin-top: 20px;"
                >
                    {achievedMission?.map((item, idx) => (
                        <Grid
                            flex
                            alignItems="center"
                            justifyContent="center"
                            direction="column"
                            key={idx}
                            mystyles="background-color: white; width: 100px; height: 77px; border-radius: 10px; box-shadow: 2px 5px 16px 0px #0B325E"
                        >
                            <MilitaryTechIcon
                                sx={{ fontSize: "40px", color: "silver" }}
                            />
                            <Text mystyles="font-size: 12px; font-size: 800; color: #F3AC9C; ">
                                {item.title}
                            </Text>
                        </Grid>
                    ))}
                </Grid>
                <Grid>
                    <Grid
                        flex
                        direction="row"
                        mystyles="margin-top: 30px; margin-left: 10px;"
                    >
                        <TabCard
                            style={
                                tabIndex === false
                                    ? {
                                          background: "#16CE9E",
                                          color: "white",
                                          zIndex: 2,
                                          boxShadow:
                                              "1px 1px 1px 3px rgba(0, 0, 0, 0.05)",
                                      }
                                    : { background: "white" }
                            }
                            onClick={() => {
                                setTabIndex(false);
                            }}
                        >
                            <Text>달성업적</Text>
                        </TabCard>
                        <TabCard
                            onClick={() => {
                                setTabIndex(true);
                            }}
                            style={
                                tabIndex === true
                                    ? {
                                          background: "#16CE9E",
                                          color: "white",
                                          marginLeft: "-10px",
                                          zIndex: 2,
                                          boxShadow:
                                              "-3px 1px 1px 3px rgba(0, 0, 0, 0.05)",
                                      }
                                    : {
                                          background: "white",
                                          marginLeft: "-10px",
                                      }
                            }
                        >
                            <Text>미달성 업적</Text>
                        </TabCard>
                    </Grid>
                    <Grid
                        flex
                        alignItems="center"
                        direction="column"
                        mystyles="box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05); width: 300px; height: 440px; border-radius: 10px; margin-top:-5px; margin-left: 15px; padding: 10px;"
                    >
                        {tabIndex === false && (
                            <>
                                {achievedMission?.map((items, idx) => (
                                    <Grid
                                        flex
                                        justifyContent="space-between"
                                        alignItems="center"
                                        direction="row"
                                        mystyles="height: 100px; margin-top: 20px; box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05); border-radius: 10px;"
                                        initial={{ x: -250, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Grid
                                            flex
                                            alignItems="center"
                                            justifyContent="center"
                                            direction="column"
                                            mystyles="background-color: white; width: 120px; height: 77px; border-radius: 10px; "
                                        >
                                            <MilitaryTechIcon
                                                sx={{
                                                    fontSize: "40px",
                                                    color: "silver",
                                                }}
                                            />
                                            <Text mystyles="font-size: 12px; font-size: 800; color: #F3AC9C; ">
                                                {items.title}
                                            </Text>
                                        </Grid>
                                        <Grid mystyles="width: 185px;">
                                            <Text mystyles="font-size: 14px; color:#A3D4FB;">
                                                미션:
                                            </Text>
                                            <Text mystyles="font-size: 14px; color:#A3D4FB ">
                                                {items.description}
                                            </Text>
                                            <Text mystyles="font-size: 14px; color: #EDEA50;">
                                                퀘스트: {items.type}
                                            </Text>
                                        </Grid>
                                    </Grid>
                                ))}
                            </>
                        )}
                        {tabIndex === true && (
                            <>
                                {notAchievedMission?.map((items, idx) => (
                                    <Grid
                                        flex
                                        justifyContent="space-between"
                                        alignItems="center"
                                        direction="row"
                                        mystyles="height: 100px; margin-top: 20px; box-shadow: 1px 1px 1px 3px rgba(0, 0, 0, 0.05); border-radius: 10px;"
                                        initial={{ x: -250, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <Grid
                                            flex
                                            alignItems="center"
                                            justifyContent="center"
                                            direction="column"
                                            mystyles="background-color: white; width: 125px; height: 77px; border-radius: 10px; "
                                        >
                                            <MilitaryTechIcon
                                                sx={{
                                                    fontSize: "40px",
                                                    color: "silver",
                                                }}
                                            />
                                            <Text mystyles="font-size: 12px; font-size: 800; color: #F3AC9C; ">
                                                {items.title}
                                            </Text>
                                        </Grid>
                                        <Grid mystyles="width: 180px; margin-left: 6px;">
                                            <Text mystyles="font-size: 14px; color:#A3D4FB;">
                                                미션:
                                            </Text>
                                            <Text mystyles="font-size: 14px; color:#A3D4FB ">
                                                {items.description}
                                            </Text>
                                            <Text mystyles="font-size: 14px; color: #EDEA50;">
                                                퀘스트: {items.type}
                                            </Text>
                                        </Grid>
                                    </Grid>
                                ))}
                            </>
                        )}
                    </Grid>
                </Grid>
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 20px;"
                >
                    <Text mystyles="font-weight: 400; font-size: 16px; color: #58E07E;">
                        내가 먹은 땅
                    </Text>
                </Grid>
                <Grid>
                    <Map
                        center={{ lat: 37.608518, lng: 126.919766 }}
                        style={{
                            width: "100%",
                            height: "360px",
                            borderRadius: "50px",
                            marginTop: "20px",
                            boxShadow: "1px 1px 1px 3px rgba(0, 0, 0, 0.05)",
                        }}
                        level={10}
                    >
                        {positions?.map((position, idx) => (
                            <MapMarker
                                key={idx}
                                position={{
                                    lat: Number(position?.quest?.lat),
                                    lng: Number(position?.quest?.lng),
                                }} // 마커를 표시할 위치
                                image={{
                                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                                    size: {
                                        widht: 24,
                                        height: 35,
                                    }, // 마커이미지의 크기입니다
                                }}
                                title={position?.quest?.title}
                                style={{ cursor: "pointer" }}
                            >
                                <Grid mystyles="word-break: break-all; width: 50px; height: 30px; cursor: pointer;">
                                    <Text
                                        key={idx}
                                        mystyles="word-break: break-all;"
                                    >
                                        {position?.quest?.title}
                                    </Text>
                                </Grid>
                            </MapMarker>
                        ))}
                    </Map>
                </Grid>
            </Grid>
            <Navigation />
        </Container>
    );
}
const BackgroundPaper = styled.div`
    position: absolute;
    top: -1020px;
    left: calc(50% - 750px);
    z-index: 0;
    width: 1500px;
    height: 1500px;
    background: #5deb85;
    border-radius: 50%;
`;

const ProgressBar = styled(motion.div)`
    position: absolute;
    left: 0;
    height: 20px;
    border-radius: 50px;
`;

const TabCard = styled(motion.div)`
    width: 116px;
    height: 40px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
