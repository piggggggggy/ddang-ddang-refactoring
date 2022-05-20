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
        getFeed();
    }, []);

    const data = {
        regionSi: "서울시",
        regionGu: "강남구",
        regionDong: "삼성동",
        lat: 33.5563,
        lng: 127.4147562,
    };

    const getFeed = async () => {
        await axios
            .post(`http://diasm.mooo.com:3000/api/feeds?type=popularity`, {
                body: { currentRegion: data },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const [userLocation, setUserLocation] = React.useState({
        lat: 36.3298522,
        lng: 127.4147562,
    });
    console.log(userLocation);

    console.log(items);

    const [tabIndex, setTabIndex] = React.useState(0);

    const tabList = [
        {
            name: "최신순",
            color: "#EB6042",
            type: "mob",
        },
        {
            name: "인기순",
            color: "#61B7FA",
            type: "time",
        },
        {
            name: "거리순",
            color: "#EDEA50",
            type: "feed",
        },
    ];

    const [feedLocation, setFeedLocation] = React.useState([
        "33.5563",
        "126.79581",
        "현재 내 위치",
    ]);

    // 카테고리
    const [category, setCategory] = React.useState("1");
    console.log(category);

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
                    {tabList.map((item, index) => (
                        <Tabcard
                            initial={{ y: -250, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            key={item.name}
                            onClick={() => setTabIndex(index)}
                            style={
                                tabIndex === index
                                    ? {
                                          background: item.color,
                                          color: "white",
                                      }
                                    : {}
                            }
                        >
                            {item.name}
                        </Tabcard>
                    ))}
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
                <Grid
                    flex
                    direction="column"
                    initial={{ x: -250, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    mystyles="margin-bottom: 200px;"
                >
                    <AnimateSharedLayout>
                        <UnorderedList layout initial={{ borderRadius: 25 }}>
                            {items.map((feed, idx) => (
                                <FeedItem
                                    page={category}
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

export const items = [
    {
        id: 1,
        image1_url: "111",
        image2_url: "222",
        image3_url: "333",
        content: "new oneeee",
        createdAt: "2022-05-12T01:00:57.861Z",
        updatedAt: "2022-05-13T05:53:41.100Z",
        deletedAt: null,
        quest: {
            id: 2,
            lat: "36.320485",
            lng: "127.399521",
            type: "",
            title: "test title2",
            description: "test description2",
            difficulty: 3,
            reward: 2,
            timeUntil: null,
        },
        player: {
            id: 1,
            email: "test@test.com",
            nickname: "kiwooseok",
            mbti: "intp",
            profileImg: "s3-upload",
            level: 1,
            exp: 0,
        },
        comments: [
            {
                id: 4,
                comment: "lets gooooo",
                createdAt: "2022-05-12T03:50:10.513Z",
                updatedAt: "2022-05-12T03:50:10.513Z",
                deletedAt: null,
            },
        ],
        likes: [
            {
                id: 2,
            },
        ],
        region: {
            id: 1,
            date: "2022-05-13 10:01:40",
            regionSi: "대전시",
            regionGu: "중구",
            regionDong: "목동",
        },
        likeCnt: 1,
        liked: true,
        commentCnt: 1,
    },
    {
        id: 2,
        image1_url: "iii",
        image2_url: "kkk",
        image3_url: "aaa",
        content: "second content",
        createdAt: "2022-05-12T01:22:15.000Z",
        updatedAt: "2022-05-13T05:53:41.100Z",
        deletedAt: null,
        quest: {
            id: 3,
            lat: "37.237824",
            lng: "127.023137",
            type: "",
            title: "test title3",
            description: "test description3",
            difficulty: 2,
            reward: 1,
            timeUntil: null,
        },
        player: {
            id: 1,
            email: "test@test.com",
            nickname: "kiwooseok",
            mbti: "intp",
            profileImg: "s3-upload",
            level: 1,
            exp: 0,
        },
        comments: [
            {
                id: 3,
                comment: "lets go",
                createdAt: "2022-05-12T03:49:44.644Z",
                updatedAt: "2022-05-12T03:49:44.644Z",
                deletedAt: null,
            },
            {
                id: 2,
                comment: "asdf",
                createdAt: "2022-05-12T02:04:26.000Z",
                updatedAt: "2022-05-12T02:43:23.226Z",
                deletedAt: null,
            },
            {
                id: 1,
                comment: "tdddest comment",
                createdAt: "2022-05-12T01:47:45.408Z",
                updatedAt: "2022-05-12T02:03:51.000Z",
                deletedAt: null,
            },
        ],
        likes: [
            {
                id: 3,
            },
        ],
        region: {
            id: 1,
            date: "2022-05-13 10:01:40",
            regionSi: "서울시",
            regionGu: "강남구",
            regionDong: "삼성동",
        },
        likeCnt: 1,
        liked: true,
        commentCnt: 3,
    },
    {
        id: 3,
        image1_url: "000",
        image2_url: "yyy",
        image3_url: "rrr",
        content: "testtest333",
        createdAt: "2022-05-12T06:19:43.000Z",
        updatedAt: "2022-05-13T05:53:41.100Z",
        deletedAt: null,
        quest: {
            id: 1,
            lat: "37.508498",
            lng: "127.454534",
            type: "",
            title: "test title",
            description: "test description",
            difficulty: 3,
            reward: 2,
            timeUntil: null,
        },
        player: {
            id: 2,
            email: "test2@test.com",
            nickname: "wsssss",
            mbti: "esfp",
            profileImg: "ssssssss",
            level: 1,
            exp: 0,
        },
        comments: [],
        likes: [],
        region: {
            id: 1,
            date: "2022-05-13 10:01:40",
            regionSi: "경기도",
            regionGu: "수원",
            regionDong: "군사시설",
        },
        likeCnt: 0,
        liked: false,
        commentCnt: 0,
    },
];
