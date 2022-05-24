import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import IconButton from "@mui/material/IconButton";

import ProfilePreview from "../../Sign/Signup/components/ProfilePreview";

import { Input } from "../elements/index";

import axios from "axios";
import { getCookie } from "../../../shared/Cookie";
import { useSelector } from "react-redux";

// aws s3 bucket
import AWS from "aws-sdk";
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

const API_ENDPOINT =
    "https://txtyz08kc4.execute-api.ap-northeast-2.amazonaws.com/default/getPresignedImageURL";

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
    const token = getCookie("token");

    const userData = useSelector((state) => state.user?.user);
    console.log(userData);

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
            console.log(reader.result);
            setProfileImage(reader.result);
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
        };
        reader.readAsDataURL(f);
        console.log(f);
        const response = await axios({
            method: "GET",
            url: API_ENDPOINT,
        });
        console.log(response.data.Key);
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
        await axios
            .patch(
                "/api/players/edit",
                {
                    body: finalData,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
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
