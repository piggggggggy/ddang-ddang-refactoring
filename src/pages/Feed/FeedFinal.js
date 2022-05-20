import React from "react";
import styled from "styled-components";
import { motion, AnimateSharedLayout } from "framer-motion";
import axios from "axios";

import { Container } from "../../elements/index";
import Navigation from "../../components/Navigation";
import { Grid, Button, Text } from "../Feed/elements/index";
// import CardItem from "../Feed/components/CardItem";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Map, MapMarker } from "react-kakao-maps-sdk";
import FeedItem from "./components/FeedItem";

export default function Feed() {
    React.useEffect(() => {
        feedsLatest();
    }, []);

    const data = {
        regionSi: "서울시",
        regionGu: "강남구",
        regionDong: "삼성동",
        lat: 33.5563,
        lng: 127.4147562,
    };

    const [userLocation, setUserLocation] = React.useState({
        lat: 36.3298522,
        lng: 127.4147562,
    });

    const [tabIndex, setTabIndex] = React.useState(0);
    console.log(tabIndex);

    const [items, setItems] = React.useState([]);
    console.log(items);

    const feedsLatest = async () => {
        await axios
            .post(`http://15.164.213.175:3000/api/feeds?type=latest`, data)
            .then((res) => {
                console.log(res);
                setItems([...res.data.rows]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const feedsPopularity = async () => {
        await axios
            .post(`http://15.164.213.175:3000/api/feeds?type=popularity`, data)
            .then((res) => {
                console.log(res);
                setItems([...res.data.rows]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const feedsDistance = async () => {
        await axios
            .post(`http://15.164.213.175:3000/api/feeds?type=distance`, data)
            .then((res) => {
                console.log(res);
                setItems([...res.data.rows]);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [feedLocation, setFeedLocation] = React.useState([
        "33.5563",
        "126.79581",
        "현재 내 위치",
    ]);

    // 카테고리
    const [category, setCategory] = React.useState("1");

    // 함수 호출

    const getLatest = () => {
        setTabIndex(0);
        feedsLatest();
    };
    const getPopularity = () => {
        setTabIndex(1);
        feedsPopularity();
    };
    const getDistance = () => {
        setTabIndex(2);
        feedsDistance();
    };

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
                    <Text mystyles="font-size: 16px; color: white;">
                        서울특별시 용산구 보광동
                    </Text>
                </Grid>
                <Grid
                    flex
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    mystyles="margin-top: 47px"
                >
                    <Tabcard
                        initial={{ y: -250, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
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
                        initial={{ y: -250, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
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
                        initial={{ y: -250, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
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
                {tabIndex === 0 && (
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
                                {items.map((feed, idx) => (
                                    <FeedItem
                                        page={tabIndex}
                                        onClick={() => {
                                            setFeedLocation([
                                                items[idx]?.quest?.lat,
                                                items[idx]?.quest?.lng,
                                                items[idx]?.id,
                                            ]);
                                        }}
                                        key={idx}
                                        item={feed}
                                        id={feed[idx]?.id}
                                    />
                                ))}
                            </UnorderedList>
                        </AnimateSharedLayout>
                    </Grid>
                )}
                {tabIndex === 1 && (
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
                                {items.map((feed, idx) => (
                                    <FeedItem
                                        page={tabIndex}
                                        onClick={() => {
                                            setFeedLocation([
                                                items[idx]?.quest?.lat,
                                                items[idx]?.quest?.lng,
                                                items[idx]?.id,
                                            ]);
                                        }}
                                        key={idx}
                                        item={feed}
                                        id={feed[idx]?.id}
                                    />
                                ))}
                            </UnorderedList>
                        </AnimateSharedLayout>
                    </Grid>
                )}
                {tabIndex === 2 && (
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
                                {items.map((feed, idx) => (
                                    <FeedItem
                                        page={tabIndex}
                                        onClick={() => {
                                            setFeedLocation([
                                                items[idx]?.quest?.lat,
                                                items[idx]?.quest?.lng,
                                                items[idx]?.id,
                                            ]);
                                        }}
                                        key={idx}
                                        item={feed}
                                        id={feed[idx]?.id}
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
