import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import axios from "axios";
import ProfilePreview from "../elements/ProfilePreview";

// aws s3 bucket
import AWS from "aws-sdk";

const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUKCET;
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
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50px",
};

export default function ModalProfile(props) {
    // profile image
    const [profileImage, setProfileImage] = React.useState("");
    const [myKey, setMyKey] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [finalData, setFinalData] = React.useState({
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
        console.log(finalImage);
        // finalsignup();
    };

    // const finalsignup = async () => {
    //     await api
    //         .patch("/api/players/edit", {
    //             body: finalData,
    //         })
    //         .then((res) => {
    //             console.log(res);
    //         });
    // };

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ProfilePreview
                        src={profileImage}
                        mystyles="width: 100px; height: 100px; border-radius: 100px;"
                    ></ProfilePreview>
                    <input type="file" onChange={handleImgChange} />
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
        </>
    );
}
