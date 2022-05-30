import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../../../modules/api";
import { Grid, Text, Input, Button } from "../elements/index";
import Cancel from "../../../assets/images/png/mypage/cancel.png";
import ProfilePreview from "../elements/ProfilePreview";
import UserService from "../../../services/user.service";

// aws s3 bucket
import AWS from "aws-sdk";

const AWS_API_ENDPOINT = process.env.REACT_APP_AWS_API_ENDPOINT;

export default function ProfileSettings(props) {
    const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUKCET;
    console.log(process.env.REACT_APP_AWS_S3_BUKCET);
    const REGION = "ap-northeast-2";

    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRECT_ACCESS_KEY,
    });

    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    });

    const navigate = useNavigate();

    const [profileImage, setProfileImage] = React.useState(
        props.userData.profile[0].profileImg
    );
    const [myKey, setMyKey] = React.useState("");
    const [url, setUrl] = React.useState("");

    // userDetails
    const [userProfileImg, setUserProfileImg] = React.useState(
        props.userData.profile[0].profileImg
    );
    console.log(userProfileImg);
    const [nickname, setNickname] = React.useState(
        props.userData.profile[0].nickname
    );
    const hiddenFileInput = React.useRef(null);
    const handleClick = (event) => {
        hiddenFileInput.current.click();
    };

    const nicknameChange = (e) => {
        setNickname(e.target.value);
        console.log(nickname);
    };

    const [profileChange, setProfileChange] = React.useState(false);

    const handleImgChange = async (e) => {
        const f = e.target.files[0];
        console.log(f);
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
        setProfileChange(true);
    };

    const getUrl = () => {
        const url = myBucket.getSignedUrl("getObject", {
            Bucket: S3_BUCKET,
            Key: myKey,
        });
        setUserProfileImg(url);
    };

    const finalsignup = () => {
        console.log(nickname, userProfileImg);
        UserService.playerEdit(nickname, userProfileImg)
            .then((res) => {
                console.log(res);
                window.location.reload();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <Grid>
            <Grid
                flex
                alignItems="center"
                justifyContent="center"
                mystyles="position: relative; margin-top: 38px;"
            >
                <Grid mystyles="position: absolute; margin-left: 60px;">
                    <img onClick={props.goBack} src={Cancel} alt="" />
                </Grid>
                <Text mystyles="font-weight: 700; font-size: 16px;">
                    프로필 변경
                </Text>
                <Text
                    onClick={finalsignup}
                    mystyles="font-weight: 700; font-size: 16px; position: absolute;  right: 0; margin-right: 30px;"
                >
                    저장
                </Text>
            </Grid>
            <Grid mystyles="position: relative; width: 75px; height: 75px; border-radius: 50%; overflow: hidden; margin: 56px auto 10px auto;">
                <ProfilePreview
                    mystyles="position: absolute; width: 100%; height: 100%; border-radius: 75px;"
                    src={userProfileImg}
                />
                <Grid
                    flex
                    alignItems="center"
                    justifyContent="center"
                    mystyles="width: 100%; height: 20px; position: absolute; background: rgba(44, 44, 44, 0.5); bottom: 0; left: 0; pointer: cursor;"
                >
                    <Button
                        mystyles="font-weight: 400; font-size: 8px; color: white; background: none; border: none;"
                        onClick={handleClick}
                    >
                        편집
                    </Button>
                    <input
                        id="profile-upload"
                        type="file"
                        onChange={handleImgChange}
                        ref={hiddenFileInput}
                        style={{
                            display: "none",
                        }}
                    />
                </Grid>
            </Grid>
            {profileChange === true && (
                <Grid flex alignItems="center" justifyContent="center">
                    <Button
                        onClick={getUrl}
                        mystyles="background: #F3AC9C; border: none; border-radius: 4px; height: 27px; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.15);"
                    >
                        사진 변경하기
                    </Button>
                </Grid>
            )}
            <Grid
                flex
                alignItems="center"
                justifyContent="flex-start"
                mystyles="width: 312px; margin: auto; padding: 5px;"
            >
                <Text mystyles="font-weight: 400; font-size: 12px; color: rgba(5, 36, 14, 0.5);">
                    닉네임
                </Text>
            </Grid>
            <Grid flex alignItems="center" justifyContent="center">
                <Input
                    onChange={nicknameChange}
                    defaultValue={nickname}
                    mystyles="width: 312px; height: 40px; font-weight: 400; font-size: 16px; border: none; box-shadow: 1px 1px 4px 1px rgba(155, 155, 155, 0.3);border-radius: 4px; padding-left: 10px;"
                ></Input>
            </Grid>
        </Grid>
    );
}
