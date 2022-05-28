import axios from "axios";
import AWS from "aws-sdk";
import api from "../../../modules/api";

const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const REGION = process.env.REACT_APP_AWS_REGION;
const AWS_API_ENDPOINT = process.env.REACT_APP_AWS_API_ENDPOINT;

export const data = {
    profileImage: "url",
    myKey: "hello",
    url: "welkjfe",
    finalData: "lwejef",
};

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
});

AWS.config.update({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRECT_ACCESS_KEY,
});

const handleImgChange = async (file) => {
    const f = file[0];

    // preview 보여주기
    var reader = new FileReader();

    // AWS에서 키 받기
    const response = await axios({
        method: "GET",
        url: AWS_API_ENDPOINT,
    });

    // 이미지 변경
    await fetch(response.data.uploadURL, {
        method: "PUT",
        headers: {
            "Content-Type": "image/jpeg",
        },
        body: f,
    });

    return { response: response.data.key, readerResult: reader.result };
};

const getUrl = (myKey) => {
    console.log(typeof myKey);
    console.log(myKey);
    const url = myBucket.getSignedUrl("getObject", {
        Bucket: S3_BUCKET,
        Key: myKey,
    });
    console.log(url);
    //   setUrl(url)
    let finalImage = { profileImg: url };
    let finalNickname = { nickname: nickname };
    console.log(finalImage);
    setFinalData({ ...finalData, ...finalImage, ...finalNickname });
    console.log(finalData);
    finalsignup();
};

const finalsignup = async () => {
    await api
        .patch("/api/players/edit", {
            body: finalData,
        })
        .then((res) => {
            console.log(res);
        });
};
