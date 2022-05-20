import axios from "axios";
import React from "react";

export default function APITest() {
    // o
    const signin = async () => {
        axios
            .post("http://15.164.213.175:3000/api/players/signin", {
                email: "paul@gmail.com",
                password: "Paul1996!",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // o
    const dupEmail = async () => {
        axios
            .post("http://15.164.213.175:3000/api/players/dupEmail", {
                email: "paul@gmail.com",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // o
    const dupNickname = async () => {
        axios
            .post("http://15.164.213.175:3000/api/players/dupNickname", {
                nickname: "asdfas",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // o
    const signup = async () => {
        axios
            .post("http://15.164.213.175:3000/api/players/signup", {
                email: "paulasfd@gmail.com",
                nickname: "asfdsadf",
                password: "Paul1996!",
                mbti: "enfp",
                profileImg:
                    "https://image-uploading-pol.s3.ap-northeast-2.amazonaws.com/9739066.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIARWI6Z2AKSPUWWMXF%2F20220520%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20220520T132224Z&X-Amz-Expires=900&X-Amz-Signature=6f41260ead146664243a27fb24dc8510cdc9d1c7d1a56a3b48e2cc59091dafd7&X-Amz-SignedHeaders=host",
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoicGF1bEBnbWFpbC5jb20iLCJuaWNrbmFtZSI6ImNoYW5nZWQgbmlja25hbWUiLCJpYXQiOjE2NTMwNTQ5NTAsImV4cCI6MTY1MzA2MjE1MH0.VsvasoBW-ADp4hFDvGdoFj8gR1N1mAQK6oGRr7a4JyY";

    const signout = async () => {
        axios
            .post("http://15.164.213.175:3000/api/players/signout", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const auth = async () => {
        axios
            .post("http://15.164.213.175:3000/api/players/auth", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // update 중
    const mypage = async () => {
        axios
            .post("http://15.164.213.175:3000/api/players/mypage", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const edit = async () => {
        axios
            .patch(
                "http://15.164.213.175:3000/api/players/edit",
                {
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjQsImVtYWlsIjoicGF1bEBnbWFpbC5jb20iLCJuaWNrbmFtZSI6ImNoYW5nZWQgbmlja25hbWUiLCJpYXQiOjE2NTMwNTQ5NTAsImV4cCI6MTY1MzA2MjE1MH0.VsvasoBW-ADp4hFDvGdoFj8gR1N1mAQK6oGRr7a4JyY",
                    },
                },
                { nickname: "posdfdsfl", profileImg: "string" }
            )
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const data = {
        currentRegion: {
            regionSi: "서울시",
            regionGu: "강남구",
            regionDong: "삼성동",
        },
    };

    // 랭킹 조회 o
    const ranks = async () => {
        axios
            .post("http://15.164.213.175:3000/api/ranks", data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const feedsPolpularity = async () => {
        axios
            .post(`http://15.164.213.175:3000/api/feeds?type=popularity`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const feedsLatest = async () => {
        axios
            .post(`http://15.164.213.175:3000/api/feeds?type=latest`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const feedsDistance = async () => {
        axios
            .post(`http://15.164.213.175:3000/api/feeds?type=distance`, data)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const createComment = async () => {
        axios
            .post("http://15.164.213.175:3000/feeds/:1/comments")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        ranks();
    }, []);

    return <>API Test</>;
}
