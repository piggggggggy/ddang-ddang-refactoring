import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import IconButton from "@mui/material/IconButton";

import ProfilePreview from "../../Sign/Signup/components/ProfilePreview";
import env from "react-dotenv";

import { Input } from "./index";

import axios from "axios";
import api from "../../../modules/api";
import { useSelector } from "react-redux";

// aws s3 bucket
import AWS from "aws-sdk";

const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const REGION = process.env.REACT_APP_AWS_REGION;

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRECT_ACCESS_KEY,
});

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

const AWS_API_ENDPOINT = process.env.REACT_APP_AWS_API_ENDPOINT;

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
    height: "300px",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px",
};

export default function BasicModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const userData = useSelector((state) => state.user?.user);

    // profile image
    const [profileImage, setProfileImage] = React.useState("");
    const [myKey, setMyKey] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [finalData, setFinalData] = React.useState({
        nickname: userData?.nickname,
        profileImg: "",
    });

    const handleImgChange = async (e) => {
        const f = e.target.files[0];
        // preview 보여주기
        var reader = new FileReader();
        reader.onload = function () {
            setProfileImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
        reader.readAsDataURL(f);

        const response = await axios({
            method: "GET",
            url: AWS_API_ENDPOINT,
        });
        setMyKey(response.data.Key);

        const result = await fetch(response.data.uploadURL, {
            method: "PUT",
            headers: {
                "Content-Type": "image/jpeg",
            },
            body: f,
        });
        console.log(result.url);
    };

    const getUrl = () => {
        console.log(typeof myKey);
        console.log(myKey);
        const url = myBucket.getSignedUrl("getObject", {
            Bucket: S3_BUCKET,
            Key: myKey,
        });
        console.log(url);
        setUrl(url);
        let finalImage = { profileImg: url };
        let finalNickname = { nickname: nickname };
        console.log(finalImage);
        setFinalData({ ...finalData, ...finalImage, ...finalNickname });
        console.log(finalData);
        finalsignup();
    };

    console.log(finalData);

    const finalsignup = async () => {
        await api
            .patch("/api/players/edit", {
                body: finalData,
            })
            .then((res) => {
                console.log(res);
            });
    };

    const [nickname, setNickname] = React.useState(userData?.nickname);

    const nicknameChange = (e) => {
        console.log(e.target.value);
        setNickname(e.target.value);
    };

    return (
        <div>
            <Button onClick={handleOpen}>프로필 바꾸기</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ProfilePreview
                        src={profileImage}
                        mystyles="width: 100px; height: 100px; border-radius: 100px;"
                    />
                    <input
                        id="profilelabel"
                        type="file"
                        onChange={handleImgChange}
                    />

                    <Input
                        defaultValue={userData?.nickname}
                        onChange={nicknameChange}
                    />
                    <button
                        onClick={getUrl}
                        style={{
                            width: "130px",
                            height: "35px",
                            marginTop: "15px",
                            borderRadius: "25px",
                            border: "none",
                            backgroundColor: "#FBA3A0",
                        }}
                    >
                        프로필 변경
                    </button>
                </Box>
            </Modal>
        </div>
    );
}
