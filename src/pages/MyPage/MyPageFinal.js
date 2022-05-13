import React from "react";
import { motion } from "framer-motion";
import { Grid } from "../../elements/index";
import { Text } from "../MyPage/elements/index";
import AWS from "aws-sdk";
import styled from "styled-components";
import axios from "axios";

import ProfilePreview from "../Sign/Signup/components/ProfilePreview";

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
            const response = await axios.get("/api/feeds");
            console.log(response.data.rows[0]);
            setNickname(response.data.rows[1].player.nickname);
            setLevel(response.data.rows[1].player.level);
            setExp(response.data.rows[1].player.exp);
        } catch (err) {
            console.log(err);
        }
    }

    console.log(nickname, level, exp);

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, padding: "20px" }}
                transition={{ delay: 0.1 }}
            >
                <Grid direction="row" justifyContent="space-between">
                    <Text></Text>
                    <Text inlineStyles="font-weight: 600;">마이페이지</Text>
                    <Text></Text>
                </Grid>
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, padding: "10px" }}
                transition={{ delay: 0.4 }}
                style={{ border: "1px solid red" }}
            >
                <Grid direction="row" justifyContent="space-between">
                    <ProfilePreview
                        src={preview}
                        inlineStyles="width: 100px; height: 100px; border-radius: 50px"
                    ></ProfilePreview>

                    <Grid
                        direction="column"
                        inlineStyles="width: 250px; align-items: flex-start; border: 2px red solid"
                    >
                        <Text inlineStyles="font-weight: 600; height: 10px">
                            Level: {nickname}
                        </Text>
                        <Text inlineStyles="font-weight: 600; height: 10px">
                            닉네임: {level}
                        </Text>
                        <Text inlineStyles="font-weight: 600; height: 10px">
                            Exp: {exp}
                        </Text>
                    </Grid>
                </Grid>
            </motion.div>
        </>
    );
}
