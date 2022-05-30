import React from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";

import { Container } from "../../elements/index";
import Navigation from "../../components/Navigation";
import { Grid, Button, Text } from "../Feed/elements/index";
// import CardItem from "../Feed/components/CardItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import FeedItem from "./components/FeedItem";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    feedsLatestAxios,
    feedsPopularityAxios,
    feedsDistanceAxios,
} from "../../store/thunk-actions/feedActions";

import FeedsService from "../../services/feed.service";
import KakaoService from "../../services/kakao.service";

export default function Feed() {
    const [currentMapPosition, setCurrentMapPosition] = React.useState(null);

    console.log(currentMapPosition);

    const getPosition = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position);

            setCurrentMapPosition({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });

        const tempLocation = {
            lat: 37.5172363,
            lng: 127.0473248,
        };

        // console.log(getPosition())
        const data = KakaoService.getAddress({ location: tempLocation });

        setCurrentAddress(data);
    };

    const [currentAddress, setCurrentAddress] = React.useState(null);

    const navigate = useNavigate();

    const regionsi = "서울";
    const regionGu = "강남구";
    const regionDong = "삼성동";
    const lat = 37.5139848;
    const lng = 127.0565207;

    const [items, setItems] = React.useState([]);

    // const feeds = useSelector((state) => state.feed.feeds);
    const [feedsLatestArr, setFeedsLatest] = React.useState([]);
    const [feedsPopularityArr, setFeedsPopularity] = React.useState([]);
    const [feedsDistanceArr, setFeedsDistance] = React.useState([]);
    console.log(feedsLatestArr, feedsPopularityArr, feedsDistanceArr);

    const feedsLatest = () => {
        // if (currentAddress !== null && currentMapPosition !== null) {
        FeedsService.feedsLatestAxios(
            // currentAddress.si,
            // currentAddress.gu,
            // currentAddress.dong,
            // currentMapPosition.lat,
            // currentMapPosition.lng
            regionsi,
            regionGu,
            regionDong,
            lat,
            lng
        )
            .then((res) => {
                console.log(res);
                setFeedsLatest(res.data.rows);
            })
            .catch((err) => {
                console.log(err);
            });
        // }
    };

    const feedsPopularity = () => {
        // dispatch(feedsPopularityAxios(data));
        FeedsService.feedsPopularityAxios(
            regionsi,
            regionGu,
            regionDong,
            lat,
            lng
        )
            .then((res) => {
                console.log(res);
                setFeedsPopularity(res.data.rows);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const feedsDistance = () => {
        // dispatch(feedsDistanceAxios(data));
        FeedsService.feedsDistanceAxios(
            regionsi,
            regionGu,
            regionDong,
            lat,
            lng
        )
            .then((res) => {
                console.log(res);
                setFeedsDistance(res.data.rows);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [tabIndex, setTabIndex] = React.useState(1);

    const [feedLocation, setFeedLocation] = React.useState([
        "33.5563",
        "126.79581",
        "현재 내 위치",
    ]);

    // 함수 호출
    const getLatest = React.useCallback(() => {
        navigate("/feed");
    }, []);

    const getPopularity = React.useCallback(() => {
        feedsPopularity();
    }, []);

    const getDistance = React.useCallback(() => {
        navigate("/feed/distance");
    }, []);

    React.useEffect(() => {
        feedsLatest();
        feedsPopularity();
        feedsDistance();
        getPosition();
    }, [getLatest, getPopularity, getDistance, tabIndex]);

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
                    <Text mystyles="font-size: 16px; color: white;"></Text>
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
                                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", //
                                size: {
                                    widht: 24,
                                    height: 35,
                                },
                            }}
                        ></MapMarker>
                    </Map>
                </Grid>
                {tabIndex === 0 && feedsLatestArr !== null && (
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
                                    <Grid
                                        onClick={() => {
                                            setFeedLocation([
                                                feedsLatestArr?.[idx]?.quest
                                                    ?.lat,
                                                feedsLatestArr?.[idx]?.quest
                                                    ?.lng,
                                                feedsLatestArr?.[idx]?.id,
                                            ]);
                                        }}
                                    >
                                        <FeedItem
                                            page={tabIndex}
                                            key={idx}
                                            item={feed}
                                            id={feed[idx]?.id}
                                            liked={feed.liked}
                                        />
                                    </Grid>
                                ))}
                            </UnorderedList>
                        </AnimateSharedLayout>
                    </Grid>
                )}
                {tabIndex === 1 && feedsPopularityArr !== null && (
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
                                {feedsPopularityArr.map((feed, idx) => (
                                    <FeedItem
                                        page={tabIndex}
                                        onClick={() => {
                                            setFeedLocation([
                                                feedsPopularityArr?.[idx]?.quest
                                                    ?.lat,
                                                feedsPopularityArr?.[idx]?.quest
                                                    ?.lng,
                                                feedsPopularityArr?.[idx]?.id,
                                            ]);
                                        }}
                                        key={idx}
                                        item={feed}
                                        id={feed[idx]?.id}
                                        liked={feed.liked}
                                    />
                                ))}
                            </UnorderedList>
                        </AnimateSharedLayout>
                    </Grid>
                )}
                {tabIndex === 2 && feedsDistanceArr !== null && (
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
                                {feedsDistanceArr.map((feed, idx) => (
                                    <FeedItem
                                        page={tabIndex}
                                        onClick={() => {
                                            setFeedLocation([
                                                feedsDistanceArr?.[idx]?.quest
                                                    ?.lat,
                                                feedsDistanceArr?.[idx]?.quest
                                                    ?.lng,
                                                feedsDistanceArr?.[idx]?.id,
                                            ]);
                                        }}
                                        key={idx}
                                        item={feed}
                                        id={feed[idx]?.id}
                                        liked={feed.liked}
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
