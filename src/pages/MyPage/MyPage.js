import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../shared/Cookie";
import { getProfileDetailsAxios } from "../../store/thunk-actions/userActions";

import { Grid, Input, Text, Button } from "../../elements/index";

import ProfilePreview from "../Sign/Signup/components/ProfilePreview";
import DuplicateCheck from "../Sign/Signup/components/DuplicateCheck";

import {
    checkNickname,
    profileUpdatesAxios,
} from "../../store/thunk-actions/userActions";
import { useForm } from "react-hook-form";

import { motion } from "framer-motion";

import AWS from "aws-sdk";
const S3_BUCKET = "lewigolski-bk.shop";
const REGION = "ap-northeast-2";

AWS.config.update({
    accessKeyId: "AKIARWI6Z2AK3TCNHHVV",
    secretAccessKey: "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",
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

window.Buffer = window.Buffer || require("buffer").Buffer;

export default function MyPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();
    const token = getCookie("token");
    const userDetail = useSelector((state) => state.user);
    const onSubmit = async (values) => {
        console.log(values.nickname);
        try {
            const response = await axios.post("/players/dupNickname", {
                nickname: values.nickname,
            });
            console.log(response); // if 문 사용하기
            setUpdatedProfile({ ...updatedProfile, nickname: values.nickname });
        } catch (err) {
            console.log(err);
        }
    };

    async function fetchData() {
        try {
            const response = await axios.get("/api/players/mypage", {
                headers: { Authorization: `${token}` },
            });
            console.log(response);
            console.log(response.data?.profile?.profileImg);
            fetchImg = response.data?.profile?.profileImg;
            console.log(fetchImg);
            setProfileImage(fetchImg);
        } catch (err) {
            console.log(err);
        }
    }

    React.useEffect(() => {
        fetchData();
    }, []);
    fetchData();

    console.log(userDetail);
    console.log(userDetail?.user?.profileImg);
    let email = userDetail?.user?.email;
    let nickname = "";
    if (userDetail.user !== null) {
        nickname = userDetail?.user?.nickname;
    }
    console.log(nickname);

    // profile
    let profileImg = "";
    if (userDetail.user !== null) {
        profileImg = userDetail.user.profileImg;
    }
    console.log(profileImg);

    const [profileImage, setProfileImage] = React.useState("");
    let fetchImg = "";

    // profile image upload

    const handleFileInput = (e) => {
        uploadFile(e.target.files[0]);
    };

    const uploadFile = async (file) => {
        const params = {
            ACL: "public-read",
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name,
            ContentType: "image/jpeg",
        };

        myBucket.putObject(params).on("httpUploadProgress", (evt) => {
            console.log(evt);
        });

        const url = await myBucket.getSignedUrl("getObject", {
            Bucket: S3_BUCKET,
            Key: file.name,
        });
        console.log(url);
        const jpg = url.split("?");
        console.log(jpg[0]);
        setProfileImage(jpg[0]);
        setUpdatedProfile({ ...updatedProfile, profileImg: jpg[0] });
    };

    const [updatedProfile, setUpdatedProfile] = React.useState({
        email: email,
    });
    console.log(updatedProfile);

    // final update
    const profileUpdate = async () => {
        dispatch(
            profileUpdatesAxios(updatedProfile, token, (url) => {
                navigate(url);
            })
        );
    };

    return (
        <>
            <Grid direction="column">
                <motion.h1 animate={{ fontSize: "40px" }}>
                    프로필 수정
                </motion.h1>

                <Grid direction="column">
                    <ProfilePreview
                        src={profileImage}
                        alt=""
                        mystyles="width: 200px; height: 200px"
                    />
                    <Input type="file" onChange={handleFileInput} />
                </Grid>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid direction="column">
                        <Text>닉네임을 바꿔주세요</Text>
                        <input
                            type="text"
                            defaultValue={nickname}
                            {...register("nickname")}
                            style={{
                                height: "30px",
                                width: "250px",
                                borderRadius: "50px",
                                padding: "10px",
                            }}
                        />
                        <Button type="submit">닉네임 바꾸기</Button>
                    </Grid>
                </form>
                <button onClick={profileUpdate}>프로필 수정하기</button>
            </Grid>
        </>
    );
}
