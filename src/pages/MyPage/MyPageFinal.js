import React from "react";
import styled from "styled-components";
import axios from "axios";
import { getCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import Grid from "../MyPage/elements/Grid";
import { Text, Button } from "../MyPage/elements/index";
import { Map, MapMarker } from "react-kakao-maps-sdk";

import ProfilePreview from "../Sign/Signup/components/ProfilePreview";

import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";

export default function MyPage() {
    const [preview, setPreview] = React.useState("");
    const [nickname, setNickname] = React.useState();
    const [level, setLevel] = React.useState();
    const [exp, setExp] = React.useState();
    React.useEffect(() => {
        fetchData();
    }, []);

    // 퀘스트 여러개 마커 표시하기
    const positions = [
        {
            title: "카카오",
            latlng: { lat: 33.450705, lng: 126.570677 },
        },
        {
            title: "생태연못",
            latlng: { lat: 33.450936, lng: 126.569477 },
        },
        {
            title: "텃밭",
            latlng: { lat: 33.450879, lng: 126.56994 },
        },
        {
            title: "근린공원",
            latlng: { lat: 33.451393, lng: 126.570738 },
        },
    ];

    async function fetchData() {
        try {
            const response = await axios.get("/api/players/mypage");
            console.log(response.data.rows[0]);
            setNickname(response?.data?.rows[1].player.nickname);
            setLevel(response?.data?.rows[1].player.level);
            setExp(response?.data?.rows[1].player.exp);
        } catch (err) {
            console.log(err);
        }
    }

    // 로그아웃
    const token = getCookie("token");
    const navigate = useNavigate();
    const logout = () => {
        axios
            .get("/players/signout", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
                navigate("/signin");
            })
            .catch((err) => {
                console.log(err);
                navigate("/signin");
            });
    };

    return (
        <>
            <motion.div
                style={{
                    backgroundColor: "rgba(214, 225, 217, 0.5)",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    borderBottomRightRadius: "20px",
                }}
            >
                <Grid mystyles="min-height: 40px; width: 100%; border-top-left-radius: 20px; border-top-right-radius: 20px; position: relative; ">
                    <Button
                        mystyles="width: 50%; height: 40px; border: none; font-size: 20px; font-weight: bold; background-color: #eb6042; color: white; position: absolute; right: 0; border-top-right-radius: 20px"
                        onClick={logout}
                        whileHover={{ fontSize: "25px" }}
                    >
                        로그아웃
                    </Button>
                    <Button
                        mystyles="width: 50%; height: 40px; border: none; font-size: 20px; font-weight: bold; background-color: #eb6042; color: white; position: absolute; left: 0; border-top-left-radius: 20px; border-right: 3px solid white;"
                        onClick={logout}
                        whileHover={{ fontSize: "25px" }}
                    >
                        이전 페이지
                    </Button>
                </Grid>
                <Grid>
                    <Grid
                        initial={{ y: -250, opacity: 0 }}
                        animate={{ y: 0, opacity: 1, padding: "20px" }}
                        transition={{ delay: 0.1 }}
                        mystyles="background-color: white; width: 70%; margin: 10px; border-radius: 20px;"
                    >
                        <Grid direction="row">
                            <Text
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.3, yoyo: Infinity }}
                                mystyles="font-weight: bolder; font-size: 30px"
                            >
                                <StarIcon />
                            </Text>
                            <Text mystyles="font-weight: bolder; font-size: 30px; color: rgba(183, 31,168, 1)">
                                마이페이지
                            </Text>
                            <Text
                                initial={{ y: -10 }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.3, yoyo: Infinity }}
                                mystyles="font-weight: bolder; font-size: 30px"
                            >
                                <StarIcon />
                            </Text>
                        </Grid>
                    </Grid>
                </Grid>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, padding: "10px" }}
                    transition={{ delay: 0.4 }}
                    style={{ height: "20vh" }}
                >
                    <Grid>
                        <ProfilePreview
                            src={preview}
                            mystyles="width: 150px; height: 150px; border-radius: 50px"
                        ></ProfilePreview>
                    </Grid>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, padding: "10px" }}
                        transition={{ delay: 0.7 }}
                    >
                        <Grid
                            justifyContent="center"
                            alignItems="center"
                            direction="row"
                            mystyles="height: 50px; "
                        >
                            <motion.div>
                                <Icon
                                    sx={{ fontSize: "40px" }}
                                    color="primary"
                                />
                            </motion.div>
                            <motion.div>
                                <Icon
                                    sx={{ fontSize: "40px" }}
                                    color="secondary"
                                />
                            </motion.div>
                            <motion.div>
                                <Icon
                                    sx={{ fontSize: "40px" }}
                                    color="success"
                                />
                            </motion.div>
                            <motion.div>
                                <Icon sx={{ fontSize: "40px" }} color="error" />
                            </motion.div>
                        </Grid>
                    </motion.div>
                </motion.div>
                <Grid>
                    <motion.div
                        style={{
                            height: "20vh",
                            width: "80%",
                            border: "2px solid red",
                            borderRadius: "20px",
                            margin: "10px",
                            padding: "20px",
                            backgroundColor: "white",
                        }}
                    >
                        <motion.div
                            style={{
                                height: "40px",
                            }}
                        >
                            <Grid
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Text mystyles="font-weight: bolder; font-size: 20px">
                                    업적
                                </Text>
                                <Button
                                    mystyles="height: 30px; border-radius: 25px; border: none; background-color: #FBA3A0"
                                    whileHover={{ color: "yellow" }}
                                >
                                    배지 수여 기준
                                </Button>
                            </Grid>
                        </motion.div>
                        <motion.div
                            style={{
                                height: "40px",
                                marginTop: "20px",
                            }}
                        >
                            <Grid
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Text mystyles="font-weight: bolder;">
                                    Exp.0
                                </Text>
                                <Grid mystyles="position: relative; height: 20px; background-color: #E4E0E0; border-radius: 50px; width: 200px;">
                                    <ProgressBar
                                        transition={{ delay: 0.6, duration: 1 }}
                                        animate={{ width: "150px" }}
                                        style={{ backgroundColor: "#9eefb5" }}
                                    ></ProgressBar>
                                </Grid>
                                <EmojiEventsIcon color="primary" />
                            </Grid>
                        </motion.div>
                        <motion.div
                            style={{
                                height: "40px",
                                marginTop: "20px",
                            }}
                        >
                            <Grid
                                direction="row"
                                justifyContent="space-between"
                            >
                                <Text mystyles="font-weight: bolder;">
                                    Lv.0
                                </Text>
                                <Grid mystyles="position: relative; height: 20px; background-color: #E4E0E0; border-radius: 50px; width: 200px;">
                                    <ProgressBar
                                        transition={{ delay: 0.6, duration: 1 }}
                                        animate={{ width: "100px" }}
                                        style={{ backgroundColor: "#D6E9FE" }}
                                    ></ProgressBar>
                                </Grid>
                                <EmojiEventsIcon />
                            </Grid>
                        </motion.div>
                    </motion.div>
                </Grid>
                <motion.div
                    style={{
                        padding: "20px",
                        margin: "20px",
                        marginTop: "0px",
                        border: "4px solid white",
                        borderRadius: "20px",
                        backgroundColor: "white",
                    }}
                >
                    <Grid justifyContent="space-between">
                        <Button
                            whileHover={{ fontSize: "25px" }}
                            mystyles="width: 100%; height: 40px; border: none; font-size: 20px; font-weight: bold; background-color: #D6E9FE; border-top-left-radius: 20px"
                        >
                            내 점령 장소
                        </Button>
                        <Button
                            whileHover={{ fontSize: "25px" }}
                            mystyles="width: 100%; height: 40px; border: none; font-size: 20px; font-weight: bold; background-color: #FBA3A0; border-top-right-radius: 20px"
                        >
                            내 퀘스트
                        </Button>
                    </Grid>
                    <Grid>
                        <Map
                            center={{ lat: 33.450705, lng: 126.570677 }}
                            style={{
                                width: "100%",
                                height: "360px",
                                borderBottomRightRadius: "20px",
                                borderBottomLeftRadius: "20px",
                            }}
                        >
                            {positions.map((position, index) => (
                                <MapMarker
                                    key={`${position.title}-${position.latlng}`}
                                    position={position.latlng} // 마커를 표시할 위치
                                    image={{
                                        src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
                                        size: {
                                            widht: 24,
                                            height: 35,
                                        }, // 마커이미지의 크기입니다
                                    }}
                                    title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                                />
                            ))}
                        </Map>
                    </Grid>
                </motion.div>
            </motion.div>
        </>
    );
}

const Icon = styled(EmojiEventsIcon)`
    &:hover {
        font-size: 60px;
    }
`;

const ProgressBar = styled(motion.div)`
    position: absolute;
    left: 0;
    height: 20px;
    border-radius: 50px;
`;
