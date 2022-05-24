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

// profile image
const [profileImage, setProfileImage] = React.useState("");
const [myKey, setMyKey] = React.useState("");

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
    let finalImage = { profileImg: url };
    setFinalSignupValue({ ...finalSignupValue, ...finalImage });
    console.log(finalSignupValue);
    // final submit
    finalsignup();
};
const navigate = useNavigate();
console.log(finalSignupValue);

const finalsignup = async () => {
    console.log(finalSignupValue);
    await axios
        .post("/api/players/signup", finalSignupValue)
        .then((res) => {
            console.log(res);
            navigate("/signin");
        })
        .catch((err) => {
            console.log(err);
        });
};
