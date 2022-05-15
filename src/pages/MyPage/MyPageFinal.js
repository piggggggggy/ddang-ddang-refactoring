import React from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import { Grid } from "../../elements/index";
import { Text, Button } from "../MyPage/elements/index";
import AWS from "aws-sdk";
import styled from "styled-components";
import axios from "axios";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { getCookie } from "../../shared/Cookie";
import { useNavigate } from "react-router-dom";

import ProfilePreview from "../Sign/Signup/components/ProfilePreview";
import BasicModal from "../MyPage/components/ProfileEdit";

import enfp from "../../assets/images/png/enfp.png";

// aws s3 settings
const S3_BUCKET = "image-uploading-pol";
const REGION = "ap-northeast-2";

AWS.config.update({
    accessKeyId: "AKIARWI6Z2AKSPUWWMXF",
    secretAccessKey: "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",
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

export default function MyPage() {
    const [preview, setPreview] = React.useState("");
    const [nickname, setNickname] = React.useState();
    const [level, setLevel] = React.useState();
    const [exp, setExp] = React.useState();
    React.useEffect(() => {
        fetchData();
    }, []);

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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, padding: "20px" }}
                transition={{ delay: 0.1 }}
            >
                <Grid mystyles="position: relative; ">
                    <Button
                        mystyles="width: 50%; height: 40px; border: none; font-size: 20px; font-weight: bold; background-color: #D6E9FE; position: absolute; right: 0"
                        onClick={logout}
                    >
                        로그아웃
                    </Button>
                </Grid>
                <Grid
                    direction="row"
                    justifyContent="space-between"
                    mystyles="margin-top: 10px"
                >
                    <Text></Text>
                    <Text mystyles="font-weight: 600;">마이페이지</Text>
                    <Text></Text>
                </Grid>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, padding: "10px" }}
                transition={{ delay: 0.4 }}
                style={{ border: "1px solid red", height: "20vh" }}
            >
                <Grid direction="row" justifyContent="space-between">
                    <Grid
                        direction="column"
                        mystyles="border: 1px solid red; width: 150px;"
                    >
                        <ProfilePreview
                            src={preview}
                            mystyles="width: 100px; height: 100px; border-radius: 50px"
                        ></ProfilePreview>
                        <BasicModal />
                    </Grid>
                    <Grid
                        direction="column"
                        mystyles="width: 270px; align-items: flex-start; border: 2px red solid"
                    >
                        <Text mystyles="font-weight: 600; height: 10px">
                            Level: {level}
                        </Text>
                        <Text mystyles="font-weight: 600; height: 10px; margin-bottom: 20px">
                            닉네임: {nickname}
                        </Text>
                        <Grid direction="row">
                            <Text mystyles="margin-right: 10px; font-weight: 600;">
                                Exp:
                            </Text>
                            <Grid mystyles="position: relative; height: 20px;  background-color: #E4E0E0; border-radius: 50px;">
                                <ProgressBar
                                    transition={{ delay: 0.6, duration: 1 }}
                                    animate={{ width: "150px" }}
                                ></ProgressBar>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </motion.div>
            <Grid
                direction="row"
                justifyContent="flex-start"
                mystyles="border: 1px solid red; align-items: flex-start"
            >
                <MbtiImg src={enfp} alt="" />
            </Grid>
            <Grid justifyContent="space-between">
                <Button mystyles="width: 100%; height: 40px; border: none; font-size: 20px; font-weight: bold; background-color: #D6E9FE">
                    내 점령 장소
                </Button>
                <Button mystyles="width: 100%; height: 40px; border: none; font-size: 20px; font-weight: bold; background-color: #FBA3A0">
                    내 퀘스트
                </Button>
            </Grid>
            <Grid mystyles="border: 2px solid red   ">
                <Map
                    center={{ lat: 33.5563, lng: 126.79581 }}
                    style={{ width: "100%", height: "360px" }}
                >
                    <MapMarker position={{ lat: 33.55635, lng: 126.795841 }}>
                        <div style={{ color: "#000" }}>Hello World!</div>
                    </MapMarker>
                </Map>
            </Grid>
        </>
    );
}

const ProgressBar = styled(motion.div)`
    position: absolute;
    left: 0;
    background-color: #9eefb5;
    height: 20px;
    border-radius: 50px;
`;

const MbtiImg = styled(motion.img)`
    border-radius: 100px;
    border: 2px solid red;
    width: 150px;
    height: 150px;
`;
