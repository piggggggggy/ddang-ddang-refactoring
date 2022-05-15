import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { Grid } from "../../../elements/index";
import { Text } from "../elements/index";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import CardItem from "./CardItem";

import { getCookie } from "../../../shared/Cookie";

export default function Feed() {
    const dispatch = useDispatch();
    const playerId = useSelector((state) => state?.user?.user?.playerId);
    console.log(playerId);
    const token = getCookie("token");

    // 시 구 동 정보 body로 request 보내기
    React.useEffect(() => {
        axios
            .get("/api/feeds", {
                headers: { Authorization: `Bearer ${token}` },
                data: {},
            })
            .then((res) => {
                console.log(res.data.row);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    console.log(items);

    // 지도 경도 표시

    const [feedLocation, setFeedLocation] = React.useState([
        "33.5563",
        "126.79581",
        "",
    ]);

    console.log(feedLocation);
    console.log(parseFloat(feedLocation[0]).toFixed(4));
    console.log(parseFloat(feedLocation[1]).toFixed(4));

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, padding: "20px" }}
                transition={{ delay: 0.1 }}
            >
                <Grid direction="row" justifyContent="space-between">
                    <Text></Text>
                    <Text mystyles="font-weight: 600;">동네 페이지</Text>
                    <Text></Text>
                </Grid>
            </motion.div>
            <Grid>
                <MapContaner animate={{ opacity: 1 }}>
                    <Map
                        center={{
                            lat: parseFloat(feedLocation[0]).toFixed(4),
                            lng: parseFloat(feedLocation[1]).toFixed(4),
                        }}
                        level={10}
                        style={{
                            width: "400px",
                            height: "360px",
                            position: "relative",
                        }}
                    >
                        <MapMarker
                            position={{
                                lat: parseFloat(feedLocation[0]).toFixed(4),
                                lng: parseFloat(feedLocation[1]).toFixed(4),
                            }}
                        >
                            <div style={{ color: "#000" }}>
                                {feedLocation[2]}
                            </div>
                        </MapMarker>
                    </Map>
                </MapContaner>
            </Grid>
            <Grid direction="column">
                <AnimateSharedLayout>
                    {items.map((item, idx) => (
                        <UnorderedList layout initial={{ borderRadius: 25 }}>
                            <CardItem
                                onClick={() => {
                                    setFeedLocation([
                                        item?.quest?.lat,
                                        item?.quest?.lng,
                                        item?.id,
                                    ]);
                                }}
                                key={idx}
                                item={item}
                            />
                        </UnorderedList>
                    ))}
                </AnimateSharedLayout>
            </Grid>
        </>
    );
}

const MapContaner = styled(motion.div)`
    border: 2px solid red;
    border-radius: 50px;
    overflow: hidden;
`;

const UnorderedList = styled(motion.ul)`
    width: 300px;
    display: flex;
    flex-direction: column;
    background: white;
    padding: 20px;
    border-radius: 25px;
    border: 2px solid red;
    margin-bottom: 5px;
`;

// 대전
// (36.320485, 127.399521)
// 수원
// 37.237824, 127.023137;
const items = [
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
