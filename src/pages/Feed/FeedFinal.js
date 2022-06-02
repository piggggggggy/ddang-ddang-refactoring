import React from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";
import { Container } from "../../elements/index";
import Navigation from "../../components/Navigation";
import { Grid, Text } from "../Feed/elements/index";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import FeedItem from "./components/FeedItem";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import FeedsService from "../../services/feed.service";
import Blue from "../../assets/images/png/blue-marker-circle.png";
import { useSelector } from "react-redux";

export default function Feed() {
    const [currentMapPosition, setCurrentMapPosition] = React.useState(null);
    const [siGuDong, setSiGuDong] = React.useState(null);

    const playerEmail = useSelector((state) => {
        if (state.user.user !== null) {
            return state.user.user.email;
        }
    });

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position);
            setCurrentMapPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            setFeedLocation([
                position.coords.latitude,
                position.coords.longitude,
            ]);
            await getmyAddress(
                position.coords.latitude,
                position.coords.longitude
            );
        });
    };

    // 카카오 api 로 시, 구, 동 정보 받기
    const getmyAddress = async (lat, lng) => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_MAP_KAKAO_BASE_URL}/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
                {
                    headers: {
                        Accept: "*/*",
                        Authorization: `KakaoAK ${process.env.REACT_APP_MAP_KAKAO_REST_API_KEY}`,
                    },
                }
            );

            const data = {
                si: res.data.documents[0].address.region_1depth_name,
                gu: res.data.documents[0].address.region_2depth_name,
                dong: res.data.documents[0].address.region_3depth_name,
            };
            setSiGuDong(data);
            feedsLatest(lat, lng, data.si, data.gu, data.dong);

            return data;
        } catch (err) {
            console.log(err);
        }
    };

    const navigate = useNavigate();
    const [feedsLatestArr, setFeedsLatest] = React.useState(null);

    const feedsLatest = (lat, lng, si, gu, dong) => {
        console.log(lat, lng, si, gu, dong);
        FeedsService.feedsLatestAxios(si, gu, dong, lat, lng)
            .then((res) => {
                console.log(res);
                setFeedsLatest(res.data.rows);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [tabIndex, setTabIndex] = React.useState(0);

    const [feedLocation, setFeedLocation] = React.useState(null);

    // 함수 호출
    const getLatest = React.useCallback(() => {
        feedsLatest();
    }, []);

    const getPopularity = React.useCallback(() => {
        navigate("/feed/popular");
    }, []);

    const getDistance = React.useCallback(() => {
        navigate("/feed/distance");
    }, []);

    React.useEffect(() => {
        getPosition();
    }, []);

    return (
        <Container>
            <BackgroundPaper />
            <Grid
                mystyles={"position: relative; z-index: 100; padding: 0 30px;"}
            >
                <Grid
                    flex
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 50px"
                >
                    <LocationOnIcon sx={{ color: "white" }} />
                    {siGuDong !== null && (
                        <Text mystyles="font-size: 16px; color: white;">
                            {siGuDong.si} {siGuDong.gu} {siGuDong.dong}
                        </Text>
                    )}
                </Grid>
                <Grid
                    flex
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 47px"
                >
                    <Tabcard
                        onClick={getLatest}
                        style={
                            tabIndex === 0
                                ? {
                                      background: "#F3AC9C",
                                      color: "white",
                                  }
                                : {
                                      background: "white",
                                      color: "#EB6042",
                                  }
                        }
                    >
                        최신순
                    </Tabcard>
                    <Tabcard
                        onClick={getPopularity}
                        style={
                            tabIndex === 1
                                ? {
                                      background: "#A3D4FB",
                                      color: "white",
                                  }
                                : {
                                      background: "white",
                                      color: "#EB6042",
                                  }
                        }
                    >
                        인기순
                    </Tabcard>
                    <Tabcard
                        onClick={getDistance}
                        style={
                            tabIndex === 2
                                ? {
                                      background: "#EDEA50",
                                      color: "white",
                                  }
                                : {
                                      background: "white",
                                      color: "#EB6042",
                                  }
                        }
                    >
                        거리순
                    </Tabcard>
                </Grid>
                <Grid
                    mystyles="overflow: hidden; margin-top:23px; border-radius: 20px;"
                    animate={{ opacity: 1 }}
                >
                    {feedLocation !== null && (
                        <Map
                            center={{
                                lat: parseFloat(feedLocation[0]).toFixed(4),
                                lng: parseFloat(feedLocation[1]).toFixed(4),
                            }}
                            level={2}
                            style={{
                                width: "368px",
                                height: "240px",
                                position: "relative",
                            }}
                        >
                            <MapMarker
                                position={{
                                    lat: parseFloat(feedLocation[0]).toFixed(4),
                                    lng: parseFloat(feedLocation[1]).toFixed(4),
                                }}
                                image={{
                                    src: Blue,
                                    size: {
                                        widht: 14,
                                        height: 14,
                                    },
                                }}
                            ></MapMarker>
                        </Map>
                    )}
                </Grid>

                {feedsLatestArr !== null && playerEmail !== undefined && (
                    <Grid
                        flex
                        direction="column"
                        initial={{ x: -250, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        mystyles="margin-bottom: 200px;"
                    >
                        <AnimateSharedLayout>
                            <UnorderedList
                                layout
                                initial={{ borderRadius: 25 }}
                            >
                                {feedsLatestArr.map((feed, idx) => (
                                    <FeedItem
                                        page={tabIndex}
                                        onClick={() => {
                                            setFeedLocation([
                                                feedsLatestArr?.[idx]?.quest
                                                    ?.lat,
                                                feedsLatestArr?.[idx]?.quest
                                                    ?.lng,
                                                feedsLatestArr?.[idx]?.id,
                                            ]);
                                        }}
                                        key={idx}
                                        item={feed}
                                        id={feed[idx]?.id}
                                        liked={feed.liked}
                                        playerEmail={playerEmail}
                                    />
                                ))}
                            </UnorderedList>
                        </AnimateSharedLayout>
                    </Grid>
                )}
            </Grid>
            <Navigation />
        </Container>
    );
}

const BackgroundPaper = styled.div`
    position: absolute;
    top: -1130px;
    left: calc(50% - 750px);
    z-index: 0;
    width: 1500px;
    height: 1500px;
    background: #5deb85;
    border-radius: 50%;
`;

const Tabcard = styled(motion.div)`
    width: 112px;
    height: 50px;
    margin: 10px;
    border-radius: 10px;
    background-color: white;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 14px;
    color: #c4c4c4;
    cursor: pointer;
`;

const UnorderedList = styled(motion.ul)`
    list-style-type: none;
`;
